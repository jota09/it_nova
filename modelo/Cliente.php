<?php

if (!defined('s3_entrada') || !s3_entrada) {
   die('No es un punto de entrada valido');
}

class Cliente extends S3TablaBD {

   protected $table = "cliente";

   //private $avatar = NULL;

public function obtenerListaRegistros($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0)), $ajaxTabla = false, $only = false) {
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

    $rtnListaRegistros = $bdObjeto->get()->toArray();

    if ($ajaxTabla) {
      $this->postObtenerListaRegistrosAjaxTabla($rtnListaRegistros);
    }
    //__P($bdObjeto->toSql(), false);
    return $rtnListaRegistros;
  }
  
    public function consultarExitencia($user) {

    $bdObjeto = static::query()
                ->whereRaw('nombre_usuario = '.$user['documento']);
//        __P($bdObjeto->toSql());
      $cliente = array();
      $cliente = $bdObjeto->get()->toArray();
//      __P($cliente);
      return $cliente;
   }
   

}
