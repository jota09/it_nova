<?php

/**
 * Description of _ModuloAccion
 *
 * @author Desarrollo Web
 */
class ModuloAccion extends S3TablaBD {

    protected $table = 'modulo_accion';

    public function obtenerRegistrosxModulo($modulo, $moduloId) {
        $listaRegistros = array();

        require_once 'modelo/_Accion.php';
        $objAccion = new Accion();
        $acciones = $objAccion->obtenerListaRegistros();

        require_once 'modelo/ACLPerfilPermiso.php';
        $objACL = new ACLPerfilPermiso();
        $objRequest = new S3Request();
        $vars = $objRequest->obtenerVariables();

        foreach ($acciones as $accion) {

            $tmp = $this->existeModuloAccion($moduloId, $accion['id']);
            
            if (count($tmp) == 0) {
                $tmp = $this->crearModuloAccion($moduloId, $accion['id']);
                
            } else {
                $tmp = $tmp[0]['id'];
            }

            $permiso = $objACL->obtenerPermiso($vars['registro'], $modulo, $accion['nombre']);

            $listaRegistros[] = array(
                'id' => $tmp,
                'nombre' => ucfirst($accion['nombre']),
                'permiso' => $permiso
            );
        }

        return $listaRegistros;
    }

    private function crearModuloAccion($moduloId, $accionId) {
        $bdObjeto = new $this;

        $bdObjeto->modulo_id = $moduloId;
        $bdObjeto->accion_id = $accionId;
        $bdObjeto->activo = 1;
        $bdObjeto->eliminado = 0;
        $bdObjeto->save();
        return $bdObjeto->id;
    }

    private function existeModuloAccion($moduloId, $accionId) {

        return static::selectRaw('id')
                        
                        ->where('modulo_accion.accion_id', '=', $accionId)
                        ->where('modulo_accion.modulo_id', '=', $moduloId)
                        ->where('modulo_accion.eliminado', '=', 0)
                        ->get()->toArray();
    }

}
