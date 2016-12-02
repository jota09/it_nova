<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class Factura extends S3TablaBD {

    protected $table = 'factura';

    public function obtenerListaRegistros($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0)), $ajaxTabla = false, $only = false) {
        $this->cargarCampos();
        
        $bdObjeto = static::query()->selectRaw($this->table.'.*')
              ->where('activo','=',1)
              ->where('eliminado','=',0)
              ->orderBy('fecha', 'DESC');

        foreach ($where AS $w) {
            if (in_array($w['columna'], $this->camposTabla)) {
                $bdObjeto->where($this->table . '.' . $w['columna'], $w['condicional'], $w['valor']);
                //__P($this->table . '.' . $w['columna'].','.$w['condicional'].', '.$w['valor'], false);
            }
        }

        if ($ajaxTabla) {
            $this->obtenerListaRegistrosAjaxTabla($bdObjeto);
        }

        if ($only) {
            $bdObjeto->take(1)->skip(0);
        }

        $lista = $bdObjeto->get()->toArray();
//    __P($lista);
        $tmp = Array();
        //preformatea lo que se va a imprimir
        for ($i = 0; $i < count($lista); $i++) {
            $tmp[$i]['numero_factura'] = $lista[$i]['numero_factura'];
            $tmp[$i]['referencia'] = $lista[$i]['referencia'];
            $tmp[$i]['tipo_documento'] = $lista[$i]['tipo_documento'];
            $tmp[$i]['estado_id'] = $lista[$i]['estado_id'];
            $tmp[$i]['valor'] =  '$'.number_format($lista[$i]['valor'], 0, ',', '.');
            $tmp[$i]['fecha'] = $lista[$i]['fecha'];
            $tmp[$i]['comprador'] = $lista[$i]['comprador'];
            $tmp[$i]['id'] = $lista[$i]['id'];
            
            $datetime1 = date_create(date("Y") . "-" . date("m") . "-" . date("d"));
            $datetime2 = date_create($lista[$i]['fecha']);
            $interval = date_diff($datetime1, $datetime2);
            if($interval->days < 31 ) {
            $tmp[$i]['bandera'] = 1; }
            else {
            $tmp[$i]['bandera'] = 0; }
            if($lista[$i]['estado_id'] == 'Solicitud de Cancelaci&oacute;n'){
            $tmp[$i]['bandera'] = 0; }
        }
        $array['campos'] = Array
            (
            '0' => Array
                (
                'data' => 'numero_factura',
                'mData' => 'numero_factura'
            ),
            '1' => Array
                (
                'data' => 'referencia',
                'mData' => 'referencia'
            ),
            '2' => Array
                (
                'data' => 'tipo_documento',
                'mData' => 'tipo_documento'
            ),
            '3' => Array
                (
                'data' => 'estado_id',
                'mData' => 'estado_id'
            ),
            '4' => Array
                (
                'data' => 'valor',
                'mData' => 'valor'
            ),
            '5' => Array
                (
                'data' => 'fecha',
                'mData' => 'fecha'
            ),
            '6' => Array
                (
                'data' => 'comprador',
                'mData' => 'comprador'
            ),
            '7' => Array
                (
                'data' => 'id',
                'mData' => 'id'
            )
        );

        $array['factura'] = $tmp;
//__P($tmp);
        return $array;

        if ($ajaxTabla) {
            $this->postObtenerListaRegistrosAjaxTabla($lista);
        }
        //__P($bdObjeto->toSql(), false);
        return $lista;
    }
    public function obtenerListaRegistrosFiltro($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0)), $ajaxTabla = false, $only = false) {
        $this->cargarCampos();
//        __P($where);
        $w = $where;
        $bdObjeto = static::query()->selectRaw($this->table.'.*')
              ->where('activo','=',1)
              ->where('eliminado','=',0)
              ->orderBy('fecha', 'DESC');

            if ($w['numero_factura']!=='')
            {
               $bdObjeto->whereRaw("factura.numero_factura like '%" . $w['numero_factura'] . "%' ");
            }
            if ($w['referencia']!=='')
            {
               $bdObjeto->whereRaw("factura.referencia like '%" . $w['referencia'] . "%' ");
            }
            if ($w['estado_id']!=='')
            {
               $bdObjeto->whereRaw("factura.estado_id like '%" . $w['estado_id'] . "%' ");
            }
            if ($w['valorD']!=='')
            {
               $bdObjeto->where('factura.valor', '>', $w['valorD']);
            }
            if ($w['valorH']!=='')
            {
               $bdObjeto->where('factura.valor', '<', $w['valorH']);
            }
            if ($w['fechaD']!=='')
            {
               $bdObjeto->where('factura.fecha', '>', $w['fechaD']);
            }
            if ($w['fechaH']!=='')
            {
               $bdObjeto->where('factura.fecha', '<', $w['fechaH']);
            }
        

//    __P($bdObjeto->toSql());
        if ($ajaxTabla) {
            $this->obtenerListaRegistrosAjaxTabla($bdObjeto);
        }

        if ($only) {
            $bdObjeto->take(1)->skip(0);
        }

        $lista = $bdObjeto->get()->toArray();
//                __P($lista);

        $tmp = Array();
        number_format($número, 2, ',', ' ');
        //preformatea lo que se va a imprimir
        for ($i = 0; $i < count($lista); $i++) {
            $tmp[$i]['numero_factura'] = $lista[$i]['numero_factura'];
            $tmp[$i]['referencia'] = $lista[$i]['referencia'];
            $tmp[$i]['tipo_documento'] = $lista[$i]['tipo_documento'];
            $tmp[$i]['estado_id'] = $lista[$i]['estado_id'];
            $tmp[$i]['valor'] = '$'.number_format($lista[$i]['valor'], 0, ',', '.');
            $tmp[$i]['fecha'] = $lista[$i]['fecha'];
            $tmp[$i]['comprador'] = $lista[$i]['comprador'];
            $tmp[$i]['id'] = $lista[$i]['id'];
            
            $datetime1 = date_create(date("Y") . "-" . date("m") . "-" . date("d"));
            $datetime2 = date_create($lista[$i]['fecha']);
            $interval = date_diff($datetime1, $datetime2);
            if($interval->days < 31 ) {
            $tmp[$i]['bandera'] = 1; }
            else {
            $tmp[$i]['bandera'] = 0; }
            if($lista[$i]['estado_id'] == 'Solicitud de Cancelaci&oacute;n'){
            $tmp[$i]['bandera'] = 0; }
        }
        $array['campos'] = Array
            (
            '0' => Array
                (
                'data' => 'numero_factura',
                'mData' => 'numero_factura'
            ),
            '1' => Array
                (
                'data' => 'referencia',
                'mData' => 'referencia'
            ),
            '2' => Array
                (
                'data' => 'tipo_documento',
                'mData' => 'tipo_documento'
            ),
            '3' => Array
                (
                'data' => 'estado_id',
                'mData' => 'estado_id'
            ),
            '4' => Array
                (
                'data' => 'valor',
                'mData' => 'valor'
            ),
            '5' => Array
                (
                'data' => 'fecha',
                'mData' => 'fecha'
            ),
            '6' => Array
                (
                'data' => 'comprador',
                'mData' => 'comprador'
            ),
            '7' => Array
                (
                'data' => 'id',
                'mData' => 'id'
            )
        );

        $array['factura'] = $tmp;
//__P($tmp);
        return $array;

        if ($ajaxTabla) {
            $this->postObtenerListaRegistrosAjaxTabla($lista);
        }
        //__P($bdObjeto->toSql(), false);
        return $lista;
    }
    
    public function cantidadDeRegistros($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0)), $ajaxTabla = false, $only = false) {
        $this->cargarCampos();
        $bdObjeto = static::query();

        $this->prelistar($bdObjeto);

        foreach ($where AS $w) {
            if (in_array($w['columna'], $this->camposTabla)) {
                $bdObjeto->where($this->table . '.' . $w['columna'], $w['condicional'], $w['valor']);
                //__P($this->table . '.' . $w['columna'].','.$w['condicional'].', '.$w['valor'], false);
            }
        }

        if ($ajaxTabla) {
            $this->obtenerListaRegistrosAjaxTabla($bdObjeto);
        }

        if ($only) {
            $bdObjeto->take(1)->skip(0);
        }

        $lista = $bdObjeto->get()->toArray();
        $cantidad = sizeof($lista);
        
        return $cantidad;
    }
   public function EstadoRechazoRegistro($post) {
//      __P($post);
        $bdObjeto = new Factura();
        $bdObjeto = static::query()
                 ->find($post['id']);
        $bdObjeto->estado_id = 'Solicitud de Cancelaci&oacute;n';
        $bdObjeto->descripcion_rechazo = $post['descripcion'];
        $bdObjeto->update();
        
        return 0;
    }

}
