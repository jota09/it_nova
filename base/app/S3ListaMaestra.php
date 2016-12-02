<?php

/**
 * Clase que controla las operaciones con los registros de las tablas. 
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

use Illuminate\Database\Eloquent\Model as Eloquent;

class S3ListaMaestra extends Eloquent {

    protected $table = 'lista_maestra';
    private $listas = array();

    /**
     * Asigna las listas maestras a la vista en la variable $s3listas
     * 
     * @global type $aplicacion
     */
    public function asignarListaMaestra() {
        global $aplicacion;

        $aplicacion->getVista()->assign('s3listas', $this->listas);
    }

    /**
     * Carga las opciones de las listas maestras que se encuentran almacenadas en la base de datos;
     * si no se envia el parametro $modulo_id, se toma el id del modulo actual y se cargan las listas del mismo
     * y las generales.
     * 
     * @param int $modulo_id
     */
    public function cargarListaMaestra($modulo_id = NULL) {
        $request = new S3Request();
        $peticion = $request->obtenerPeticion();

        if ($modulo_id == NULL) {
            $modulo_id = $peticion['modulo_id'];
        }

        $generales = $this->_obtenerListasGenerales();
        $xmodulo = $this->_obtenerListasxModulo($modulo_id);

        $this->listas = array(
            'general' => $generales,
            'modulo' => $xmodulo,
        );
    }

    /**
     * Retorna la variable listas que contiene el array de las listas maestras en formato
     * Array (
     *      general => array(...),
     *      modulo => array(...)
     * );
     * 
     * @return array
     */
    public function obtenerListaMaestra() {
        if (empty($this->listas)) {
            $this->cargarListaMaestra();
        }

        return $this->listas;
    }

    private function _obtenerListasGenerales() {
        require_once 'base/app/_S3OpcionesListaMaestra.php';
        $objOpcLisMae = new S3OpcionesListaMaestra();
        $listaRegistros = array();

        $bdObjeto = static::query()
                ->where('general', '=', 1)
                ->get();

        $arrLM = $bdObjeto->toArray();

        foreach ($arrLM as $lm) {
            $listaRegistros[$lm['etiqueta']] = $objOpcLisMae->obtenerOpcionesListaMaestraxLMID($lm['id']);
        }
        return $listaRegistros;
    }

    private function _obtenerListasxModulo($modulo_id) {
        require_once 'base/app/_S3OpcionesListaMaestra.php';
        $objOpcLisMae = new S3OpcionesListaMaestra();
        $listaRegistros = array();

        $bdObjeto = static::query()
                ->where('general', '=', 0)
                ->where('modulo_id', '=', $modulo_id)
                ->get();

        $arrLM = $bdObjeto->toArray();

        foreach ($arrLM as $lm) {
            $listaRegistros[$lm['etiqueta']] = $objOpcLisMae->obtenerOpcionesListaMaestraxLMID($lm['id']);
        }
        return $listaRegistros;
    }
}
