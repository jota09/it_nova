<?php

if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class AccionesListasmaestras extends S3Accion {

    public function accionEditar() {

        parent::accionEditar();
        global $aplicacion;

        require_once 'modelo/_Modulo.php';
        $objMod = new Modulo();


        $aplicacion->getVista()->assign('modulos', $objMod->obtenerListaRegistros());
    }

    public function accionListar() {
        parent::accionListar();
        global $aplicacion;
        
        require_once 'modelo/_Modulo.php';
        $objMod = new Modulo();


        $aplicacion->getVista()->assign('modulos', $objMod->obtenerListaRegistros());
        $aplicacion->getVista()->assign('contenidoModulo', 'modulos/listasmaestras/listar');
    }

}
