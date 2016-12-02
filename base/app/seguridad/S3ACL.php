<?php

/**
 * Clase que controla los permisos de la aplicación
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class S3ACL {

    public function verificarPermiso($usuarioId, $modulo, $accion) {
        require_once 'modelo/Usuario.php';
        
        $bdUsuario = Usuario::query()
                ->where('id', '=', $usuarioId)
                ->first();

        if (!$bdUsuario->perfil_id && ($accion == "listar" || $accion== "editar")) {
            $flag = false;
            $accion = ($accion == "editar") ? "crear" : $accion;
            require_once 'modelo/ACLPerfilPermiso.php';
            $bdACL = ACLPerfilPermiso::selectRaw(' COUNT(acl_perfil_permiso.perfil_id) AS tiene_permiso ');

            $bdACL->join('perfil as pe', 'pe.id', '=', 'acl_perfil_permiso.perfil_id')
                    ->join('modulo_accion as ma', 'ma.id', '=', 'acl_perfil_permiso.modulo_accion_id')
                    ->join('modulo as mo', 'mo.id', '=', 'ma.modulo_id')
                    ->join('accion as ac', 'ac.id', '=', 'ma.accion_id')
                    ->where('acl_perfil_permiso.perfil_id', '=', $bdUsuario->perfil_id)
                    ->where('mo.nombre', '=', $modulo)
                    ->where('ac.nombre', '=', $accion)
                    ->get();
            //__P($bdACL->toSql(), FALSE);
            if ($bdACL !== null) {
                $flag = $bdACL->count();
            }
            return $flag;
        } else {
            return true;
        }
    }

    public function verificarPermisoSolicitud($usuarioId, $modulo, $accion) {
        global $aplicacion;
        $config = $aplicacion->getConfig();
        //__P($usuarioId.','. $modulo.','. $accion);
        $accion = strtolower($accion);
        $modulo = strtolower($modulo);

        $moduloInicial = $config->getVariableConfig('aplicacion-modulo_predeterminado');
        $accionInicial = $config->getVariableConfig('aplicacion-accion_predeterminado');

        if ($modulo === $moduloInicial && $accion === $accionInicial) {
            return true;
        } else if ($modulo === "usuarios" && $accion === "login") {
            return false;
        }else{
            return $this->verificarPermiso($usuarioId, $modulo, $accion);
        }
    }

    public function verificarPermisoSolicitudLibre($modulo, $accion) {
        global $aplicacion;
        $config = $aplicacion->getConfig();

        $accion = strtolower($accion);
        $modulo = strtolower($modulo);

        $libres = $config->getVariableConfig('aplicacion-acceso_libre');

        if (array_key_exists($modulo, $libres) && in_array($accion, $libres[$modulo])) {
            return true;
        }

        return false;
    }

}
