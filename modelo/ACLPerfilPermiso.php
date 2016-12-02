<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class ACLPerfilPermiso extends S3TablaBD {

    protected $table = "acl_perfil_permiso";

    public function eliminarxPerfil($perf_id) {
        static::query()
                ->where('perfil_id', '=', $perf_id)
                ->delete();
    }

    public function guardarACL($perfil_id, $mod, $tipo_permiso) {

        //__P($registroId);

        $data = array(
            "perfil_id" => $perfil_id,
            "modulo_accion_id" => $mod,
            "activo" => 1,
            "lista_tipo_permiso" => $tipo_permiso
        );
        static::insert($data);
    }

    public function verificarPermiso($perfil_id, $modulo, $accion) {

        $flag = 0;
        $bdACL = static::selectRaw('COUNT(acl_perfil_permiso.perfil_id) AS tiene_permiso')
                ->join('perfil as pe', 'pe.id', '=', 'acl_perfil_permiso.perfil_id')
                ->join('modulo_accion as ma', 'ma.id', '=', 'acl_perfil_permiso.modulo_accion_id')
                ->join('modulo as mo', 'mo.id', '=', 'ma.modulo_id')
                ->join('accion as ac', 'ac.id', '=', 'ma.accion_id')
                ->where('acl_perfil_permiso.perfil_id', '=', $perfil_id)
                ->where('mo.nombre', '=', $modulo)
                ->where('ac.nombre', '=', $accion)
                ->first();

        if ($bdACL !== null) {
            $flag = $bdACL->tiene_permiso > 0 ? 1 : 0;
        }
        return $flag;
    }

    public function obtenerPermiso($perfil_id, $modulo, $accion) {


        $bdACL = static::selectRaw('lista_tipo_permiso')
                ->join('perfil as pe', 'pe.id', '=', 'acl_perfil_permiso.perfil_id')
                ->join('modulo_accion as ma', 'ma.id', '=', 'acl_perfil_permiso.modulo_accion_id')
                ->join('modulo as mo', 'mo.id', '=', 'ma.modulo_id')
                ->join('accion as ac', 'ac.id', '=', 'ma.accion_id')
                ->where('acl_perfil_permiso.perfil_id', '=', $perfil_id)
                ->where('mo.nombre', '=', $modulo)
                ->where('ac.nombre', '=', $accion)
                ->first();

        if ($bdACL !== null) {
            $flag = $bdACL->lista_tipo_permiso;
        }
        return $flag;
    }

    public function obtenerPermisoXModulo($perfil_id, $moduloId) {
                
        $bdACL = static::selectRaw('ma.accion_id, acl_perfil_permiso.lista_tipo_permiso')
                ->join('modulo_accion as ma', 'ma.id', '=', 'acl_perfil_permiso.modulo_accion_id')
                ->join('modulo as mo', 'mo.id', '=', 'ma.modulo_id')
                ->where('acl_perfil_permiso.perfil_id', '=', $perfil_id)
                ->where('mo.id', '=', $moduloId)
                ->get();
        $flag = array();
        if ($bdACL !== null) {
            $flag = $bdACL->toArray();
        }
        //__P($flag);
        return $flag;
    }

}
