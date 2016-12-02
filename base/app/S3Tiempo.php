<?php

/**
 * Clase que encapsula las funciones de manipulación
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
   die('No es un punto de entrada valido');
}

class S3Tiempo {

   function formatearFecha($fecha, $formatoInicial = 'd/m/Y', $formatoFinal = 'Y-m-d') {
      if (isset($fecha) && !empty($fecha)) {
         list($dia, $mes, $anio) = split('[/]', $fecha);
         $marcaTiempo = mktime(0, 0, 0, date($mes), date($dia), date($anio));
         return date($formatoFinal, $marcaTiempo);
      } else {
         return 0;
      }
   }

   function suma_resta_Tiempo($fechaActual = '', $tiempo = 0, $tipo = 'day') {

      if (empty($fechaActual)) {
         $fechaActual = date('Y-m-d');
      }

      $arrayFechas = explode('-', $fechaActual);

      if ($tipo == 'day') {
         $arrayFechas[2] += $tiempo;
      }
      if ($tipo == 'month') {
         $arrayFechas[1] += $tiempo;
      }
      if ($tipo == 'year') {
         $arrayFechas[0] += $tiempo;
      }

      $fecha = date('Y-m-d', mktime(0, 0, 0, $arrayFechas[1], $arrayFechas[2], $arrayFechas[0]));

      return $fecha;
   }

   function obtenerAnio() {
      return date('Y');
   }

   function obtenerMes() {
      return date('m');
   }

   function obtenerDia() {
      return date('d');
   }

   function formatearDia_mes($dia) {
      if ((int) $dia < 10) {
         return '0' . (int) $dia;
      } else {
         return $dia;
      }
   }

   function compararFechas($fechaInicial, $fechaFinal) {
      $f_i = strtotime($fechaInicial);
      $f_f = strtotime($fechaFinal);

      if ($f_i < $f_f) {
         $estado = -1;
      } else if ($f_i == $f_f) {
         $estado = 0;
      } else if ($f_i > $f_f) {
         $estado = 1;
      } else {
         $estado = "";
      }
      return $estado;
   }

   /**
    * 
    * @param type $fechaInicial deafult fecha actual
    * @param type $tiempo valor numerico para realizar la operacion
    * @param type $tipo [horas, minutos, segundos]
    * @param type $operacion [+, -]
    * @return type
    */
   function sumar_restar_horas($fechaInicial, $tiempo, $tipo, $operacion) {

      if (empty($fechaInicial)) {
         $fechaInicial = date('Y-m-d H:i');
      }
     
      if ($tipo == "dias") {
         $fechaFin = strtotime($operacion . $tiempo . ' day', strtotime($fechaInicial));
      } else if ($tipo == "horas") {
         $fechaFin = strtotime($operacion . $tiempo . ' hour', strtotime($fechaInicial));
      } else if ($tipo == "minutos") {
         $fechaFin = strtotime($operacion . $tiempo . ' minute', strtotime($fechaInicial));
      } else if ($tipo == "segundos") {
         $fechaFin = strtotime($operacion . $tiempo . ' second', strtotime($fechaInicial));
      }

      return date('Y-m-d H:ia', $fechaFin);
   }

}
