<?php

/**
 * Clase que controla las operaciones con los registros de las tablas. 
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

use Illuminate\Database\Eloquent\Model as Eloquent;

class S3OpcionesListaMaestra extends Eloquent {

    protected $table = 'opcion_lista_maestra';

    public function obtenerOpcionesListaMaestraxLMID($lista_maestra_id) {
        $listaRegistros = array();

        $bdObjeto = static::query()
                ->where('lista_maestra_id', '=', $lista_maestra_id)
                ->where('eliminado', '=', 0)
                ->get();

        $arrOLM = $bdObjeto->toArray();
        
        foreach ($arrOLM as $olm) {
            $listaRegistros[] = array(
                'id' => $olm['id'],
                'nombre' => $olm['nombre'],
                'por_defecto' => $olm['por_defecto'],
            );
        }
        return $listaRegistros;
    }
}
