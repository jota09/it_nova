<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class ACLPerfilModulo extends S3TablaBD {

    protected $table = "acl_perfil_modulo";

    public function eliminarxPerfil($perf_id) {
        static::query()
                ->where('perfil_id', '=', $perf_id)
                ->delete();
    }

    public function guardarACL($perfil_id, $mod, $acciones) {
//        require_once 'modelo/_Accion.php';
        global $aplicacion;
//        $objAccion = new Accion();
//        $acciones = $objAccion->obtenerListaRegistros();
        
        foreach ($acciones as $accion) {
            $data = array(
                "perfil_id" => $perfil_id,
                "modulo_id" => $mod,
                "accion_id" => $accion,
                "fecha_creacion" => date('Y-m-d'),
                "creado_por" => $aplicacion->getUsuario()->getId(),
                "activo" => 1
            );
            static::insert($data);
        }     
    }

    public function verificarPermiso($perfil_id, $modulo, $accion) {
        $flag = 0;
        $bdACL = static::selectRaw('COUNT(acl_perfil_modulo.perfil_id) AS tiene_permiso')
                ->join('perfil as pe', 'pe.id', '=', 'acl_perfil_modulo.perfil_id')
                ->join('modulo as mo', 'mo.id', '=', 'acl_perfil_modulo.modulo_id')
                ->join('accion as ac', 'ac.id', '=', 'acl_perfil_modulo.accion_id')
                ->where('acl_perfil_modulo.perfil_id', '=', $perfil_id)
                ->where('mo.nombre', '=', $modulo)
                ->where('ac.nombre', '=', $accion)
                ->first();

        if ($bdACL !== null) {
            $flag = $bdACL->tiene_permiso > 0 ? 1 : 0;
        }
        return $flag;
    }

}
