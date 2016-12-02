<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class ListaMaestra extends S3TablaBD {

    protected $table = 'lista_maestra';

    protected function preguardar(&$bdObjeto) {
        parent::preguardar($bdObjeto);

        $request = new S3Request();
        $vars = $request->obtenerVariables();

        if ($bdObjeto->modulo_id == '-1' || ($vars['general'] > 0 && !isset($vars['modulo_id']))) {
            $bdObjeto->modulo_id = NULL;
        }

        $bdObjeto->etiqueta = strtolower($bdObjeto->etiqueta);

        if (empty($vars['general'])) {
            $bdObjeto->general = 0;
        }
    }

    protected function postguardar(&$bdObjeto) {
        parent::postguardar($bdObjeto);

        require_once 'modelo/OpcionListaMaestra.php';
        $objOpcLisMae = new OpcionListaMaestra();

        $objOpcLisMae->guardar($bdObjeto->id);
    }

    public function obtenerRegistro($registro) {
        $reg = parent::obtenerRegistro($registro);

        require_once 'modelo/OpcionListaMaestra.php';
        $objOpcLisMae = new OpcionListaMaestra();

        $reg['opciones'] = $objOpcLisMae->obtenerOpcionesxListaId($reg['id']);

        return $reg;
    }

    public function obtenerListaRegistros($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0)), $ajaxTabla = false, $only = false) {

        $this->cargarCampos();
        $bdObjeto = static::query()
                ->selectRaw("lista_maestra.id, lista_maestra.nombre, lista_maestra.etiqueta, IF(m.nombre != '', m.nombre, 'General') as Modulo, lista_maestra.activo")
                ->leftJoin('modulo as m', 'm.id', '=', 'lista_maestra.modulo_id')
                ->whereRaw("lista_maestra.activo = 1  and lista_maestra.eliminado = 0 ");

        if ($ajaxTabla) {
            $this->obtenerListaRegistrosAjaxTablaAux($bdObjeto);
        }

        if ($only) {
            $bdObjeto->take(1)->skip(0);
        }

        $arrayCli = $bdObjeto->get()->toArray();

        if ($ajaxTabla) {//__P($arrayCli, false);
            $this->postObtenerListaRegistrosAjaxTabla($arrayCli);
        }
        //__P($arrayCli);
        return $arrayCli;
    }

    protected function obtenerListaRegistrosAjaxTablaAux(&$bdObjeto) {
        $request = new S3Request();
        $post = $request->obtenerVariables();

        if (isset($post['search']['value']) && $post['search']['value'] != '') {
            $where = '(';
            foreach ($this->camposTabla AS $c) {
                if (preg_match('/./', $c)) {
                    $tmpC = explode('.', $c);
                    $c = implode('`.`', $tmpC);
                }

                $where .= '`' . $this->table . '`.`' . $c . '` LIKE "%' . $post['search']['value'] . '%" OR ';
            }

            $where = substr($where, 0, -4) . ')';
            $bdObjeto->whereRaw($where);

            $tmpObj = clone $bdObjeto;
            $this->cantFil = $tmpObj->count();
        }
        if (isset($post['filtroModulo'][0]) && $post['filtroModulo'][0] != '') {
            $whereAux = "";
            if (isset($post['filtroModulo'][1]) && $post['filtroModulo'][1] != '') {
                foreach ($post['filtroModulo'] as $modulo) {
                    if ($modulo == "General") {
                        $whereAux = ' OR ( ISNULL(`m`.`nombre` ) ) ';
                    } else {
                        $where .= "'" . $modulo . "',";
                    }
                    
                }
                $where = substr($where, 0, -1);
                $where = "(`m`.`nombre` IN ( " . $where . " ) " . $whereAux . " )";
            } else {
                if ($post['filtroModulo'][0] === "General") {
                    $where = '( ISNULL(`m`.`nombre` ) ) ';
                } else {
                    $where = '(`m`.`nombre` = "' . $post['filtroModulo'][0] . '" )';
                }
            }
            //__P($where);
            $bdObjeto->whereRaw($where);

            $tmpObj = clone $bdObjeto;
            $this->cantFil = $tmpObj->count();
        }
        //__P($bdObjeto);
        $this->modObtenerListaRegistrosAjaxTabla($bdObjeto);
        $bdObjeto->take($post['length'])->skip($post['start']);
    }

}
