<?php

/**
 * Clase que controla la visualización del Menu
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class S3Menu {

    public function obtenerEstructuraUsuario() {
        global $aplicacion;

        $lang = $aplicacion->getConfig()->getVariableConfig('aplicacion-lenguaje');
        $perfil = $aplicacion->getUsuario()->getPerfil();
        $menu = Spyc::YAMLLoad('config/menu/' . $lang . '.yml');

        if (isset($menu[$perfil])) {
            $menu = $menu[$perfil];
        } else {
            $menu = $menu['default'];
        }
        
        $menu_final = $this->verificarPermisosMenu($menu);

        return $this->limpiarMenu($menu_final);
    }

    private function verificarPermisosMenu($menu) {
        global $aplicacion;
        $newMenu = array();
        $objACL = new S3ACL();
        $aplicacion->getUsuario()->cargar();
        $uid = $aplicacion->getUsuario()->getId();

        foreach ($menu as $kM => $vM) {

            if (isset($vM['accion']) && isset($vM['modulo'])) {

                if ($objACL->verificarPermiso($uid, $vM['modulo'], $vM['accion'])) {
                    $newMenu[$kM]['icono'] = $vM['icono'];
                    $newMenu[$kM]['modulo'] = $vM['modulo'];
                    $newMenu[$kM]['accion'] = $vM['accion'];
                }
            } else if (is_array($vM)) {
                $newMenu[$kM] = $this->verificarPermisosMenu($vM);
                if (isset($vM['icono'])) {
                    $newMenu[$kM]['icono'] = $vM['icono'];
                }
            }
        }

        return $newMenu;
    }

    private function limpiarMenu($menu) {
        $cleanMenu = array();

        foreach ($menu as $kM => $vM) {
            if (isset($vM['submenu']) && count($vM['submenu']) > 0) {
                $cleanMenu[$kM] = $vM;
                if (isset($vM['icono'])) {
                    $cleanMenu[$kM]['icono'] = $vM['icono'];
                }
            } else if (isset($vM['secciones'])) {
                $tmp = $this->limpiarMenu($vM['secciones']);
                if (count($tmp) > 0) {
                    $cleanMenu[$kM]['secciones'] = $tmp;
                }
                if (isset($vM['icono'])) {
                    $cleanMenu[$kM]['icono'] = $vM['icono'];
                }
            }
        }

        return $cleanMenu;
    }

}
