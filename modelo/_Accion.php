<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class Accion extends S3TablaBD {

    protected $table = 'accion';

    public function obtenerRegistrosxModulo($modulo) {
        $listaRegistros = array();

        require_once 'modulos/' . $modulo . '/acciones.php';
        $acciones = get_class_methods('Acciones' . ucfirst($modulo));

        require_once 'modelo/ACLPerfilPermiso.php';
        $objACL = new ACLPerfilPermiso();
        $objRequest = new S3Request();
        $vars = $objRequest->obtenerVariables();
        __P($acciones);
        foreach ($acciones as $accion) {
            if ($accion !== '__construct') {
                $accion = strtolower(substr($accion, 6));
                $tmp = $this->obtenerRegistroxNombre($accion);

                if (empty($tmp)) {
                    $tmp = $this->crearAccion($accion);
                } else {
                    $tmp = $tmp[0]['id'];
                }

                $permiso = $objACL->verificarPermiso($vars['registro'], $modulo, $accion);

                $listaRegistros[] = array(
                    'id' => $tmp,
                    'nombre' => ucfirst($accion),
                    'permiso' => $permiso
                );
            }
        }

        return $listaRegistros;
    }

    private function crearAccion($nombre) {
        $bdObjeto = $this;

        $bdObjeto->nombre = $nombre;
        $bdObjeto->save();
        return $bdObjeto->id;
    }

}
