<?php

/**
 * Clase que controla la configuracion
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class S3Config {

    private $configApp;

    public function getConfigApp() {
        return $this->configApp;
    }

    public function cargarConfiguracionAplicacion() {
        $objSpyc = new Spyc();        
        $this->configApp = $objSpyc->YAMLLoad('config/config.yml');
    }
    
    public function configurarAmbiente() {
        global $aplicacion;
        $debug = $aplicacion->getConfig()->getVariableConfig('aplicacion-debug');

        if ((int)$debug !== 0) {
            ini_set('display_errors', 'On');
        } else {
            ini_set('display_errors', 'Off');
        }

        error_reporting((int)$debug);
    }

    public function getVariableConfig($variable) {        
        $ruta = explode("-", $variable);
        $temp = $this->configApp;
        for ($r = 0; $r < count($ruta); $r++) {
            $clave = $ruta[$r];
            $temp = $temp[$clave];
        }
        return $temp;
    }

}
