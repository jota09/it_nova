<?php

if (!defined('s3_entrada') || !s3_entrada)
    die('No es un punto de entrada valido');

class Opciones_lista_maestra extends S3TablaBD {

    protected $table = 'opciones_lista_maestra';

    public function guardar($ListaId) {

        $request = new S3Request();
        $post = $request->obtenerVariables();
//        __P($post);
        foreach ($post['opcion_id'] as $k => $v) {
            if (!empty($v)) {
                $objOpcion = static::query()->find($v);
            } else {
                $objOpcion = $this;
            }

            $objOpcion->nombre = $post['opcion'][$k];
            $objOpcion->lista_maestra_id = $ListaId;
            $objOpcion->por_defecto = $post['por_defecto'][$k];
            $objOpcion->eliminado = $post['opcion_eliminado'][$k];
           
            $objOpcion->save();
        }
    }

}
