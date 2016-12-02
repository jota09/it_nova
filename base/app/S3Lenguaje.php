<?php

/**
 * Clase que controla el idioma 
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class S3Lenguaje {

    private $lenguaje;

    public function setLenguaje($lenguaje) {
        $this->lenguaje = $lenguaje;
    }

    public function getLenguajeAplicacion() {
        $lenguajeAplicacion = Spyc::YAMLLoad('lenguaje/' . $this->lenguaje . '.yml');
        return $lenguajeAplicacion;
    }

    /**
     * Obtiene las etiquetas segun el modulo ingresado
     * @param $modulo
     * @return array
     */
    public function getLenguajeModulo($modulo) {
        $lenguajeModulo = Spyc::YAMLLoad('modulos/' . $modulo . '/lenguaje/' . $this->lenguaje . '.yml');
        return $lenguajeModulo;
    }

}
