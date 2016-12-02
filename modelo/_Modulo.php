<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class Modulo extends S3TablaBD {

    protected $table = 'modulo';

    public function obtenerListaRegistros() {
        require_once 'modelo/_ModuloAccion.php';
        $objModuloAccion = new ModuloAccion();
        
        $dir = './modulos/';
        $listaRegistros = array();
        
        $objRequest = new S3Request();
        $vars = $objRequest->obtenerVariables();
        
        //__P($vars, false);
        if ($dir_modulos = opendir($dir)) {
            while (false !== ($modulo = readdir($dir_modulos))) {
                if ($modulo != "." && $modulo != ".." && is_dir($dir . $modulo)) {
                    $tmp = $this->obtenerRegistroxNombre($modulo);
                    if (empty($tmp)) {
                        $tmp = $this->crearModulo($modulo);
                    } else {
                        $tmp = $tmp[0]['id'];
                    }
                    
                    $listaRegistros[] = array(
                        'id' => $tmp,
                        'nombre' => $modulo,
                        'acciones' => $objModuloAccion->obtenerRegistrosxModulo($modulo, $tmp)
                    );
                }
            }
            closedir($dir_modulos);
        }

        return $listaRegistros;
    }

    private function crearModulo($nombre) {
        $bdObjeto = $this;

        $bdObjeto->nombre = $nombre;
        $bdObjeto->save();
        return $bdObjeto->id;
    }

}