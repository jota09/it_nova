<?php

/**
 * Clase que encapsulas las funciones generales
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
  die('No es un punto de entrada valido');
}

class S3Utils {

  /**
   * Obtiene el nombre de la clase de negocio a partir del nombre de la tabla (Data Object).
   * @return string
   */
  public function obtenerClaseNegocioDeDO($nombreDO) {
    $nombreDO = str_replace("_", " ", $nombreDO);
    $nombreDO = ucwords(strtolower($nombreDO));
    $nombreDO = str_replace(" ", "", $nombreDO);
    return $nombreDO;
  }

  public function getUrl($modulo, $accion = NULL, $param1 = NULL, $param2 = NULL) {
    global $aplicacion;

    $pretty_url = $aplicacion->getConfig()->getVariableConfig('aplicacion-urls_amigables');
    if ($pretty_url == 1) {
      $url = $aplicacion->getConfig()->getVariableConfig('aplicacion-prefix_url_amigable') . '/' . $modulo;

      if (!empty($accion)) {
        $url .= '/' . $accion;
      }

      if (!empty($param1)) {
        $url .= '/' . $param1;
      }

      if (!empty($param2)) {
        $url .= '/' . $param2;
      }
    } else {
      $url = 'index.php?modulo=' . $modulo . '&accion=';

      if (!empty($accion)) {
        $url .= $accion;
      } else {
        $url .= 'listar';
      }

      if (!empty($param1)) {
        $url .= '&' . $param1;
      }

      if (!empty($param2)) {
        $url .= '=' . $param2;
      }
    }

    return $url;
  }

  public function obtener_nombre_mes($mes) {
    $meses = array(
        "01" => "Enero",
        "02" => "Febrero",
        "03" => "Marzo",
        "04" => "Abril",
        "05" => "Mayo",
        "06" => "Junio",
        "07" => "Julio",
        "08" => "Agosto",
        "09" => "Septiembre",
        "10" => "Octubre",
        "11" => "Noviembre",
        "12" => "Diciembre");
    return $meses[$mes];
  }

  public function obtener_meses() {
    $meses = array(
        array("name" => "Enero", "id" => 1),
        array("name" => "Febrero", "id" => 2),
        array("name" => "Marzo", "id" => 3),
        array("name" => "Abril", "id" => 4),
        array("name" => "Mayo", "id" => 5),
        array("name" => "Junio", "id" => 6),
        array("name" => "Julio", "id" => 7),
        array("name" => "Agosto", "id" => 8),
        array("name" => "Septiembre", "id" => 9),
        array("name" => "Octubre", "id" => 10),
        array("name" => "Noviembre", "id" => 11),
        array("name" => "Diciembre", "id" => 12)
    );
    return $meses;
  }

  public function _numeroMes($mes) {
    $mes_n = strtoupper($mes);
    $numMeses = array(
        "ENERO" => "01",
        "FEBRERO" => "02",
        "MARZO" => "03",
        "ABRIL" => "04",
        "MAYO" => "05",
        "JUNIO" => "06",
        "JULIO" => "07",
        "AGOSTO" => "08",
        "SEPTIEMBRE" => "09",
        "OCTUBRE" => "10",
        "NOVIEMBRE" => "11",
        "DICIEMBRE" => "12");
    return $numMeses[$mes_n];
  }

}
