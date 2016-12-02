<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class OpcionListaMaestra extends S3TablaBD {

    protected $table = 'opcion_lista_maestra';

    public function guardar($lista_maestra_id) {
        $request = new S3Request();
        $post = $request->obtenerVariables();

        foreach ($post['opcion_id'] as $k => $v) {
            if (!empty($v)) {
                $objOpcion = static::query()->find($v);
            } else {
                $objOpcion = $this;
            }

            $objOpcion->nombre = $post['opcion'][$k];
            $objOpcion->lista_maestra_id = (empty($lista_maestra_id)) ? $post['opcion_lista_id'][$k] : $lista_maestra_id;
            $objOpcion->por_defecto = $post['por_defecto'][$k];
            $objOpcion->eliminado = $post['opcion_eliminado'][$k];

            if ($objOpcion->id > 0) {
                $objOpcion->update();
            } else {
                static::insert($objOpcion->toArray());
            }
        }
    }

    public function obtenerOpcionesxListaId($lista_maestra_id) {
        $op = static::query()
                ->whereRaW('lista_maestra_id = ? AND eliminado = ?', array($lista_maestra_id, 0))
                ->get();

        return $op->toArray();
    }

    public function obtenerOpcionxId($id) {
        $obj = static::query()
                ->whereRaW('id = ? AND eliminado = ?', array($id, 0))
                ->get()
                ->toArray();
        return $obj[0];
    }

}
