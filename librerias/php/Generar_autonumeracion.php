<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Generar_autonumeracion
 *
 * @author rafiko
 */
use Illuminate\Database\Eloquent\Model as Eloquent;

/**
 * uyiuyikuy
 */
class Generar_autonumeracion extends Eloquent {

    var $prefijo;
    var $separador = "";
    var $minimo_tamano;
    var $campo_tabla;
    var $tabla;
    var $query;

    /**
     * Generar consecutivos con numero y letras
     * @param string $tabla //Nombre de la tabla en BD
     * @param string $campo_tabla //Nombre del campo de la tabla que va a ser autonumeracion personalizada
     * @param string $prefijo //Letras antes de del Numero ejemplo AAA
     * @param stringe $separador //carater de separador entre prefijo y el numero generado
     * @param int $minimo_tamano //ejemplos 0001, 0002, etc
     */
    function __construct($tabla, $campo_tabla, $prefijo = "", $separador = "-", $minimo_tamano = 3) {
        $this->tabla = $tabla;
        $this->prefijo = $prefijo;
        $this->campo_tabla = $campo_tabla;
        $this->separador = $separador;
        $this->minimo_tamano = $minimo_tamano;
        $contadandoPrefijo = strlen($prefijo);
        $this->query = "SELECT SUBSTR(" . $this->campo_tabla . ", 1," . $contadandoPrefijo . ") AS codigo_letras,SUBSTR(" . $this->campo_tabla . ", " . ($this->minimo_tamano) . ") AS " . $this->campo_tabla . "  FROM " . $this->tabla . " 
				  WHERE (" . $this->campo_tabla . " <> '' OR " . $this->campo_tabla . " IS NOT NULL)
                                      AND SUBSTR(" . $this->campo_tabla . ", 1," . $contadandoPrefijo . ") LIKE '" . $this->prefijo . "%'
				  ORDER BY " . $this->campo_tabla . "
				  DESC 
				  LIMIT 1";
    }

    function primera_forma() {
        $obj = S3TablaBD::hydrateRaw($this->query);
        $row = $obj->toArray();
        $row = $row[0];

        $codigo = $row[$this->campo_tabla] + 1;
        $this->prefijo = $row[$this->campo_tabla . '_letras'];
        // Put it all together	
        if ($codigo > 999) {
            $codigo = 0;
            $this->prefijo = $this->generarLetrasConsecutivas($row[$this->campo_tabla . '_letras']);
        }
        $codigo = str_pad($codigo, $this->minimo_tamano, "0", STR_PAD_LEFT);

        $prefix = $this->prefijo . $this->separador;
        // Put it all together		
        $new_code = date('y') . $prefix . $codigo;
        return $new_code;
    }

    function segunda_forma() {

        $obj = S3TablaBD::hydrateRaw($this->query);
        $row = $obj->toArray();
        if (empty($row)) {
            $codigo = 1;
        } else {
            $row = $row[0];
            $codigo = $row[$this->campo_tabla] + 1;
        }

        $codigo = str_pad($codigo, $this->minimo_tamano, "0", STR_PAD_LEFT);

        $prefix = $this->prefijo . $this->separador;
        // Put it all together		
        $new_code = $prefix . $codigo;
        
        return $new_code;
    }

    function generarLetrasConsecutivas($codletra) {
        for ($i = 65; $i <= 90; $i++) {
            $letras[] = chr($i);
        }
        for ($i = 0; $i < count($letras); $i++) {
            for ($j = 0; $j < count($letras); $j++) {
                for ($k = 0; $k < count($letras); $k++) {
                    $codigoLetras[] = $letras[$i] . $letras[$j] . $letras[$k];
                }
            }
        }
        $posicion = array_search($codletra, $codigoLetras);
        return $codigoLetras[$posicion + 1];
    }

}
