<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if (!defined('s3_entrada') || !s3_entrada) {
  die('No es un punto de entrada valido');
}

/**
 * Description of Lista_maestra
 *
 * @author rafiko
 */
class Lista_maestra extends S3TablaBD {

  protected $table = 'lista_maestra';

  public function obtenerOpcionesxId($listaId) {
    require_once 'modelo/Opciones_lista_maestra.php';
    $op = Opciones_lista_maestra::query()
            ->whereRaW('lista_maestra_id=? AND eliminado=?', array($listaId, 0))
            ->get();
    return $op->toArray();
  }

  public function obtenerListaPorModulo($moduloId) {

    $bdObjeto = static::query()
                    ->selectRaw('lista_maestra.* ')
                    ->where('eliminado', '=', 0)
                    ->whereRaw('id <> 16 AND lista_maestra.modulo_id=' . $moduloId)
                    ->get()->toArray();

    return $bdObjeto;
  }

  public function obtenerOpcionesPorModulo($moduloId) {

    $listaRegistros = array();
    $bdObjeto = static::query()
            ->selectRaw('lista_maestra.etiqueta AS lista,op.nombre,op.id ')
            ->join('opcion_lista_maestra AS op', 'op.lista_maestra_id', '=', 'lista_maestra.id')
            ->where('lista_maestra.modulo_id', '=', $moduloId)
            ->where('op.eliminado', '=', 0)
            ->get();
    $my_array = $bdObjeto->toArray();
    foreach ($my_array as $registro) {
      $listaRegistros[$registro['lista']][] = array(
          'id' => $registro['id'],
          'nombre' => $registro['nombre'],
      );
    }
    return $listaRegistros;
  }

  public function obtenerOpcionesGeneral() {

    $listaRegistros = array();
    $bdObjeto = static::query()
            ->selectRaw('lista_maestra.etiqueta AS lista, op.nombre,op.id, op.por_defecto ')
            ->join('opcion_lista_maestra AS op', 'op.lista_maestra_id', '=', 'lista_maestra.id')
            ->where('lista_maestra.general', '=', 1)
            ->where('op.eliminado', '=', 0)
//                ->toSql();
            ->get();
    $my_array = $bdObjeto->toArray();
    foreach ($my_array as $registro) {
      $listaRegistros[$registro['lista']][] = array(
          'id' => $registro['id'],
          'nombre' => $registro['nombre'],
          'defecto' => $registro['por_defecto'],
      );
    }

    return $listaRegistros;
  }

}
