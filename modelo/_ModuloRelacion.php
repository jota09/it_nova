<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class ModuloRelacion extends S3TablaBD {

    protected $table = 'modulo';

// trae los campos generales y datos del modulo
    public function ObtenerRegistrosModulo() {
        $modulos = static::query()
                ->where('activo', '=', 1)
                ->where('eliminado', '=', 0)
                ->get()
                ->toArray();
        for ($m = 0; $m < count($modulos); $m++) {
            $configModulo = Spyc::YAMLLoad('modulos/' . $modulos[$m]['nombre'] . '/config.yml');
            $campo[$modulos[$m]['nombre']][] = $configModulo['global']['nombre_general'];
            $campo[$modulos[$m]['nombre']][] = $modulos[$m]['id'];
            $campo[$modulos[$m]['nombre']][] = $modulos[$m]['nombre'];
        }


        return $campo;
    }

    public function obtener_modulos() {

        $configModulo = Spyc::YAMLLoad('config/config.yml');
        $lista = $configModulo['aplicacion']['relaciones']['documentos'];
        return $lista;
    }
    public function obtener_modulos_act() {

        $configModulo = Spyc::YAMLLoad('config/config.yml');
        $lista = $configModulo['aplicacion']['relaciones']['actividades'];
        return $lista;
    }

    public function verificar_modulo() {

        $configModulo = Spyc::YAMLLoad('config/config.yml');
        $lista = $configModulo['aplicacion']['relaciones']['documentos'];

        global $aplicacion;
        $request = new S3Request();
        $request = $request->obtenerPeticion();

        $acl = new S3ACL();

        if ($acl->verificarPermisoSolicitud($aplicacion->getUsuario()->getId(), 'documentos', 'editar')) {
            foreach ($lista as $key => $value) {
                if ($key == $request['modulo']) {
                    return TRUE;
                }
            }
        } else {
            return FALSE;
        }
    }
    public function verificar_modulo_actividades() {

        $configModulo = Spyc::YAMLLoad('config/config.yml');
        $lista = $configModulo['aplicacion']['relaciones']['actividades'];

        global $aplicacion;
        $request = new S3Request();
        $request = $request->obtenerPeticion();

        $acl = new S3ACL();

        if ($acl->verificarPermisoSolicitud($aplicacion->getUsuario()->getId(), 'actividades', 'editar')) {
            foreach ($lista as $key => $value) {
                if ($key == $request['modulo']) {
                    return TRUE;
                }
            }
        } else {
            return FALSE;
        }
    }

}
