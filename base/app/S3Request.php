<?php

/**
 * Clase que controla las peticiones de parte del cliente.
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class S3Request {

    public function obtenerPeticion() {
        global $aplicacion;
        $config = $aplicacion->getConfig()->getConfigApp();
        $modulo = $this->obtenerVariablePGR('modulo');
        $modulo_id = $this->obtenerIdModulo($modulo);
        $accion = $this->obtenerVariablePGR('accion');
        $accion_id = $this->obtenerIdAccion($accion);

        if (empty($modulo)) {
            $modulo = $config['aplicacion']['modulo_predeterminado'];
            $accion = $config['aplicacion']['accion_predeterminado'];
        }

        return array(
            'modulo' => $modulo,
            'modulo_id' => $modulo_id,
            'accion' => $accion,
            'accion_id' => $accion_id,
            'parametros' => array(
                'registro' => $this->obtenerVariablePGR('registro'),
                'ajax' => $this->obtenerVariablePGR('ajax')
            )
        );
    }

    public function obtenerVariablePGR($variable) {
        $variablePGR = "";

        $__GET = filter_input(INPUT_GET, $variable);
        $__POST = filter_input(INPUT_POST, $variable);
        $__REQUEST = filter_input(INPUT_REQUEST, $variable);

        if (!empty($__REQUEST)) {
            $variablePGR = $__REQUEST;
        }
        if (!empty($__GET)) {
            $variablePGR = $__GET;
        }
        if (!empty($__POST)) {
            $variablePGR = $__POST;
        }

        return $variablePGR;
    }

    public function obtenerVariables() {
        $__POST = filter_input_array(INPUT_POST);
        $__REQUEST = filter_input_array(INPUT_REQUEST);
        $__GET = filter_input_array(INPUT_GET);

        if (count($__POST)) {
            return $__POST;
        }else if(count($__GET)) {
            return $__GET;
        } else if (count($__REQUEST)) {
            return $__REQUEST;
        } else {
            return $_REQUEST;
        }
    }
    
    public function obtenerVariableServer ($clave = NULL) {
        $__SERVER = filter_input_array(INPUT_SERVER);
        
        if ($clave != NULL) {
            $__SERVER = filter_input(INPUT_SERVER, $clave);
        }
        
        return $__SERVER;
    }

    public function redireccionar($peticion) {
        $urlParametros = "";
        if (isset($peticion['parametros']) && !empty($peticion['parametros'])) {
            foreach ($peticion['parametros'] as $parametroId => $parametro) {
                $urlParametros .= "&$parametroId=$parametro";
            }
        }
        $url = 'index.php?modulo=' . $peticion['modulo'] . '&accion=' . $peticion['accion'] . $urlParametros;
        header("Location: $url");
        die();
    }

    public function obtenerIdModulo($nombre_modulo) {
        require_once 'modelo/_Modulo.php';
        $objDb = Modulo::query()
                ->whereRaw("activo=1 AND eliminado=0 AND nombre = ?", array($nombre_modulo))
                ->first();
        $id = null;
        if (!empty($objDb)) {
            $registro = $objDb->toArray();
            $id = $registro['id'];
        }
        return $id;
    }

    public function obtenerIdAccion($nombre_accion) {
        require_once 'modelo/_Accion.php';
        $objDb = Accion::query()
                ->whereRaw("activo=1 AND eliminado=0 AND nombre = ?", array($nombre_accion))
                ->first();
        $id = null;
        if (!empty($objDb)) {
            $registro = $objDb->toArray();
            $id = $registro['id'];
        }
        return $id;
    }

}
