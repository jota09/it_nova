<?php

/**
 * @author $Brandon Sanchez
 * Esta Clase se ejecutara antes de generar la vista, en caso de que
 * sea necesario hacer una validacion antes de mostrar la pagina, ej:
 * validar primer login... asi generar la vista que se debe generar
 */
if (!defined('s3_entrada')) {
    die('No es un punto de entrada valido');
}

class S3Preformatear {

    public function llamarFunciones() {
        $this->obtenerMenu();
        $this->cargarListasMaestras();
        $this->ejecutarPreformatearProyecto();
        $this->CargarConfig();
    }

    private function CargarConfig() {
        global $aplicacion;
        $config = $aplicacion->getConfig();
        $config->cargarConfiguracionAplicacion();

        $aplicacion->getVista()->assign('listadoAjax', $config->getVariableConfig('aplicacion-listado_ajax'));
    }

    private function ejecutarPreformatearProyecto() {
        if (file_exists('modelo/_Preformatear.php')) {
            include_once 'modelo/_Preformatear.php';

            if (class_exists('_Preformatear')) {
                $objPreformatearProyecto = new _Preformatear();

                if (method_exists(get_class($objPreformatearProyecto), 'initPreformatear')) {
                    $objPreformatearProyecto->initPreformatear();
                }
            }
        }
    }

    private function obtenerMenu() {
        global $aplicacion;
        $objMenu = new S3Menu();
        $ext_tpl = '.' . $aplicacion->getConfig()->getVariableConfig('aplicacion-tpl_ext');

        $menu = "";
        $dirTpls = $aplicacion->getVista()->getDirTpl();

        if (file_exists($dirTpls . 'general/menu/' . $aplicacion->getUsuario()->getPerfil() . $ext_tpl)) {
            $menu = 'general/menu/' . $aplicacion->getUsuario()->getPerfil();
        } else if (file_exists($dirTpls . 'general/menu/default' . $ext_tpl)) {
            $menu = 'general/menu/default';
        }

        $aplicacion->getVista()->assign('links_menu', $objMenu->obtenerEstructuraUsuario());
        $aplicacion->getVista()->assign('menu', $menu);
    }

    private function cargarListasMaestras() {
        $objListasMaestras = new S3ListaMaestra();

        $objListasMaestras->cargarListaMaestra();
        $objListasMaestras->asignarListaMaestra();
    }

}
