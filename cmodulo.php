<?php

if (count($argv) != 4 || (count($argv) == 2 && $argv[1] == '-h')) {
    die("Para crear el modulo ejecutar:\r\n\r\n~$ php \033[1;34m" . basename(__FILE__) . "\033[0m \033[0;31mnombre_modulo nombre_modelo nombre_tabla\033[0m\r\n\r\n");
}


$nombre_modulo = $argv[1];
$nombre_modelo = $argv[2];
$nombre_tabla = $argv[3];
//$lenguaje = $argv[4];

if (!is_dir('./modulos/' . $nombre_modulo)) {
    mkdir('./modulos/' . $nombre_modulo, 0755);
}
if (!is_dir('./modulos/' . $nombre_modulo . '/lenguaje')) {
    mkdir('./modulos/' . $nombre_modulo . '/lenguaje', 0755);
}

$archivo = './modulos/' . $nombre_modulo . '/lenguaje/es_CO.yml';
if (!file_exists($archivo)) {
    $fp = fopen($archivo, "a");
    $string = "modulo: " . $nombre_modulo;
    fputs($fp, $string);
    fclose($fp);
}


$index = '';

$archivo = './modulos/' . $nombre_modulo . '/index.html';
$fp = fopen($archivo, "a");
fputs($fp, $index);
fclose($fp);

$archivo = './modulos/' . $nombre_modulo . '/lenguaje/index.html';
$fp = fopen($archivo, "a");
fputs($fp, $index);
fclose($fp);


$config_yml = "global: \r\n\tobjetoBD: " . $nombre_modelo;

$archivo = './modulos/' . $nombre_modulo . '/config.yml';
if (!file_exists($archivo)) {
    $fp = fopen($archivo, "a");
    fputs($fp, $config_yml);
    fclose($fp);
}


$acciones = "<?php \nif (!defined('s3_entrada') || !s3_entrada) {\n\tdie('No es un punto de entrada valido');\n}\n\nclass Acciones" . ucfirst($nombre_modulo) . " extends S3Accion {\n\n}";
$archivo = './modulos/' . $nombre_modulo . '/acciones.php';
if (!file_exists($archivo)) {
    $fp = fopen($archivo, "a");
    fputs($fp, $acciones);
    fclose($fp);
}



$objeto_bd = "<?php \nif (!defined('s3_entrada') || !s3_entrada) {\n\tdie('No es un punto de entrada valido');\n}\n\nclass " . str_replace(" ", "", ucfirst(str_replace("_", " ", $nombre_modelo))) . " extends S3TablaBD {\n\tprotected \$table = '" . $nombre_tabla . "';\n}";

$archivo = './modelo/' . str_replace(" ", "", ucwords(str_replace("_", " ", $nombre_modelo))) . '.php';

if (!file_exists($archivo)) {
    $fp = fopen($archivo, "a");
    fputs($fp, $objeto_bd);
    fclose($fp);
}

if (!is_dir('./vistas/modulos/' . $nombre_modulo)) {
    mkdir('./vistas/modulos/' . $nombre_modulo, 0755);
}

$archivo = './vistas/modulos/' . $nombre_modulo . '/editar.latte';

$fp = fopen($archivo, "a");
fputs($fp, "");
fclose($fp);

$archivo = './vistas/modulos/' . $nombre_modulo . '/index.html';
$fp = fopen($archivo, "a");
fputs($fp, $index);
fclose($fp);
