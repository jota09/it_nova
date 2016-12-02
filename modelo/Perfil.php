<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class Perfil extends S3TablaBD {

    protected $table = "perfil";

    public function obtenerRegistro($registro) {
        require_once 'modelo/_Modulo.php';
        require_once 'modelo/_Accion.php';
        $objAccion = new Accion();
        $acciones = $objAccion->obtenerListaRegistros();

        $objModulo = new Modulo();
        $arrModulos = $objModulo->obtenerListaRegistros();

        $bdObjeto = $this->query()
                ->find($registro);

        $registro = array();

        $registro['id'] = $bdObjeto->id;
        $registro['nombre'] = $bdObjeto->nombre;
        $tmpArr = array();

        foreach ($arrModulos as $row) {
            $tmpArr[] = array(
                'id' => $row['id'],
                'modulo' => $row['nombre'],
                'permiso' => $this->tienePermiso($bdObjeto->id, $row['id']),
                //'permisos' => $acciones,
                'acciones' => $row['acciones']
            );
        }

        $registro['modulos'] = $tmpArr;

        return $registro;
    }

    public function tienePermiso($perfil_id, $modulo_id) {
        require_once 'modelo/ACLPerfilPermiso.php';
        $bdACL = ACLPerfilPermiso::selectRaw('acl_perfil_permiso.id');
        $flag = false;

        $bdACL->join('modulo_accion as ma', 'ma.id', '=', 'acl_perfil_permiso.modulo_accion_id')
                ->where('acl_perfil_permiso.perfil_id', '=', $perfil_id)
                ->where('ma.modulo_id', '=', $modulo_id)
                ->get();

        if ($bdACL !== null) {
            $flag = ($bdACL->count() > 0) ? true : false;
        }
        return $flag;
    }

    protected function postguardar(&$bdObjeto) {
        parent::postguardar($bdObjeto);

        require_once 'modelo/ACLPerfilPermiso.php';

        $request = new S3Request();
        $vars = $request->obtenerVariables();

        $objACL = new ACLPerfilPermiso();
        $objACL->eliminarxPerfil($bdObjeto->id);

        foreach ($vars['permiso'] as $mod => $acc) {
            //__P($bdObjeto->id.' as '.$mod.' => '.$acc);
            $objACL->guardarACL($bdObjeto->id, $mod, $acc);
        }
    }

    public function obtenerListaRegistros($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0), 1 => array('columna' => 'activo', 'condicional' => '=', 'valor' => 1)), $ajaxTabla = false, $only = false) {
        $this->cargarCampos();
        $bdObjeto = static::query()
                ->selectRaw("perfil.id, nombre, perfil.activo ");

        $this->prelistar($bdObjeto);

        foreach ($where AS $w) {
            if (in_array($w['columna'], $this->camposTabla)) {
                $bdObjeto->where($this->table . '.' . $w['columna'], $w['condicional'], $w['valor']);
                //__P($this->table . '.' . $w['columna'].','.$w['condicional'].', '.$w['valor'], false);
            }
        }
        //__P($ajaxTabla.' - ' .$only, false);
        if ($ajaxTabla) {
            $this->obtenerListaRegistrosAjaxTabla($bdObjeto);
        }

        if ($only) {
            $bdObjeto->take(1)->skip(0);
        }

        $rtnListaRegistros = $bdObjeto->get()->toArray();

        if ($ajaxTabla) {
            $this->postObtenerListaRegistrosAjaxTabla($rtnListaRegistros);
        }
        //__P($bdObjeto->toSql(), false);
        return $rtnListaRegistros;
    }

    protected function obtenerListaRegistrosAjaxTabla(&$bdObjeto) {
        $request = new S3Request();
        $post = $request->obtenerVariables();

        if (isset($post['search']['value']) && $post['search']['value'] != '') {
            $where = "(perfil.id LIKE '%" . $post['search']['value'] . "%' OR perfil.nombre LIKE '%" . $post['search']['value'] . "%' )";

            $bdObjeto->whereRaw($where);
            //__P($bdObjeto->toSql(), false);
            $tmpObj = clone $bdObjeto;
            $this->cantFil = $tmpObj->count();
        }
        //
        $this->modObtenerListaRegistrosAjaxTabla($bdObjeto);
        $bdObjeto->take($post['length'])->skip($post['start']);
    }
    
}