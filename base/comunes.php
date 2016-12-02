<?php

function __P($elemento, $detener = true) {
  echo "<pre>";
  print_r($elemento);
  echo "</pre>";
  if ($detener) {
    die();
  }
}

function __V($elemento, $detener = true) {
  echo "<pre>";
  var_dump($elemento);
  echo "</pre>";
  if ($detener) {
    die();
  }
}

function cHtml($val) {
  return htmlspecialchars($val, ENT_QUOTES, 'utf-8');
}

function _SERVER($vn = NULL) {
  if ($vn === NULL) {
    return filter_input_array(INPUT_SERVER);
  } else {
    return filter_input(INPUT_SERVER, $vn);
  }
}

function key2val($key, $array, $return = false) {
  if (isset($array[$key])) {
    if ($return) {
      return $array[$key];
    } else {
      echo $array[$key];
    }
  } else {
    if ($return) {
      return ucfirst(strtolower($key));
    } else {
      echo ucfirst(strtolower($key));
    }
  }
}

function permisoModuloAccion() {
  $return = NULL;
  if (file_exists('modelo/_ModuloRelacion.php')) {
    require_once 'modelo/_ModuloRelacion.php';

    if (class_exists('ModuloRelacion')) {
      $objModuloRelacion = new ModuloRelacion();
      if (method_exists($objModuloRelacion, 'verificar_modulo')) {
        $return = $objModuloRelacion->verificar_modulo();
      }
    }
  }

  return $return;
}

function permisoModuloAccion_actividades() {
  $return = NULL;
  if (file_exists('modelo/_ModuloRelacion.php')) {
    require_once 'modelo/_ModuloRelacion.php';

    if (class_exists('ModuloRelacion')) {
      $objModuloRelacion = new ModuloRelacion();
      if (method_exists($objModuloRelacion, 'verificar_modulo_actividades')) {
        $return = $objModuloRelacion->verificar_modulo_actividades();
      }
    }
  }

  return $return;
}

function obtenerHoras() {
  for ($h = 1; $h <= 12; $h++) {
    $horas[] = array(
        'hora' => ($h <= 9) ? '0' . $h : $h
    );
  }
  return $horas;
}

function obtenerMinutos($ciclo = 4, $cadamin = 15) {
  $m = 0;
  for ($h = 0; $h < $ciclo; $h++) {
    $minutos[] = array(
        'minutos' => ($m < 1) ? '0' . $m : $m
    );
    $m += $cadamin;
  }
  return $minutos;
}

function obtenerTiempoTranscurrido($time) {
  $time = time() - strtotime($time);
  $time = ($time < 1) ? 1 : $time;
  $tokens = array(
      31536000 => 'a&ntilde;o',
      2592000 => 'mes',
      604800 => 'semana',
      86400 => 'd&iacute;a',
      3600 => 'hora',
      60 => 'minuto',
      1 => 'segundo'
  );

  foreach ($tokens as $unit => $text) {
    if ($time < $unit)
      continue;
    $numberOfUnits = floor($time / $unit);
    return $numberOfUnits . ' ' . $text . (($numberOfUnits > 1) ? 's' : '');
  }
}

function obtenerNuevoFormatoFecha($fecha) {
  $dia_ltr = date_format(date_create($fecha), 'D');
  $dia_num = date_format(date_create($fecha), 'j');
  $mes_ltr = date_format(date_create($fecha), 'M');
  $anno = date_format(date_create($fecha), 'Y');
  //date_format(date_create($arrayComentarios.fecha_comentario), 'D j M Y')"} {function="date_format(date_create($arrayComentarios.fecha_comentario), 'g:i A')"


  return obtenerNombreDia($dia_ltr) . ', ' . $dia_num . ' ' . obtenerNombreMes($mes_ltr) . ' ' . $anno;
}

function obtenerNombreDia($day) {
  $dia = array(
      'Mon' => "Lun",
      'Tue' => "Mar",
      'Wed' => "Mie",
      'Thu' => "Jue",
      'Fri' => "Vie",
      'Sat' => "Sáb",
      'Sun' => "Dom",
  );

  return $dia[$day];
}

function obtenerNombreMes($month) {

  $mes = array(
      'Jan' => "Ene",
      'Feb' => "Feb",
      'Mar' => "Mar",
      'Apr' => "Abr",
      'May' => "May",
      'jun' => "Jun",
      'Jul' => "Jul",
      'Aug' => "Ago",
      'Sep' => "Sep",
      'Oct' => "Oct",
      'Nov' => "Nov",
      'Dec' => "Dic",
  );

  return $mes[$month];
}
