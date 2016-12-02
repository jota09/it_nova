<?php

/**
 * Clase que controla los listados
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
  die('No es un punto de entrada valido');
}

class S3Listado {

  private $objetoBD;
  private $objetoNegocio;

  public function __construct($objeto) {
    $this->objetoBD = $objeto;
    $utils = new S3Utils();

    $claseON = $utils->obtenerClaseNegocioDeDO($this->objetoBD);
    require_once('modelo/' . $claseON . '.php');

    $this->objetoNegocio = new $claseON();
  }

  public function obtenerRegistros($only) {
    return $this->objetoNegocio->obtenerListaRegistros(false, false, $only);
  }

  public function obtenerRegistrosActivos() {
    return $this->objetoNegocio->obtenerListaRegistros($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0), 1 => array('columna' => 'activo', 'condicional' => '=', 'valor' => 1)), true, false);
  }

  public function obtenerRegistrosTablaAjax() {
    global $aplicacion;
    $request = new S3Request();
    $vars = $request->obtenerVariables();
    $permiso = $vars['filtroPermisos'];
    if ($permiso[4]['lista_tipo_permiso'] == 3) { //NADA
      return $this->objetoNegocio->obtenerListaRegistros($where = array(
                  0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => -1)
          ), true, false);
    } else if ($permiso[4]['lista_tipo_permiso'] == 2) { //PROPIETARIO
      return $this->objetoNegocio->obtenerListaRegistros($where = array(
                  0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0),
                  1 => array('columna' => 'responsable_id', 'condicional' => '=', 'valor' => $aplicacion->getUsuario()->getId())
          ), true, false);
    } else { //TODO
      return $this->objetoNegocio->obtenerListaRegistros($where = array(
                  0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0)
          ), true, false);
    }
    //return $this->objetoNegocio->obtenerListaRegistros($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0)), true, false);
  }

  public function obtenerNombresCampos($listaReg) {
    $campos = array();
    if (count($listaReg) > 0) {
      $campos = array_keys($listaReg[0]);
    }

    return $campos;
  }

}
