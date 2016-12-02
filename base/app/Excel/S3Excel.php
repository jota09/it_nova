<?php

/**
 * Clase que controla la exportaci��n en Excel
 * @author Rafiko
 *
 */
require_once 'librerias/php/PHPExcel/Classes/PHPExcel.php';
require_once 'librerias/php/PHPExcel/Classes/PHPExcel/Cell/AdvancedValueBinder.php';
PHPExcel_Cell::setValueBinder(new PHPExcel_Cell_AdvancedValueBinder());

class S3Excel extends PHPExcel {

    private $objPHPExcel;
    private $nombreArchivo;
    private $tituloReporte;

    public function __construct() {
        /** Error reporting */
//        error_reporting(E_ALL);
//        ini_set('display_errors', TRUE);
        $this->objPHPExcel = new PHPExcel();
        $this->objPHPExcel->getProperties()->setCreator("Soluciones 360") // Nombre del autor
                ->setLastModifiedBy("Soluciones 360") //Ultimo usuario que lo modific��
                ->setTitle("Reporte Excel") // Titulo
                ->setSubject("Reporte Excel") //Asunto
                ->setDescription("Reporte") //Descripci��n
                ->setKeywords("Reporte excel Soluciones") //Etiquetas
                ->setCategory("Reporte excel"); //Categorias
    }

    public function crearLibro($nombreArchivo, $tituloReporte = False) {
        $this->nombreArchivo = $nombreArchivo;
        $this->tituloReporte = $tituloReporte;

        // Se asigna el nombre a la hoja
        $this->objPHPExcel->getActiveSheet()->setTitle($this->obtenerNombreHojaPrincipal());

        // Se activa la hoja para que sea la que se muestre cuando el archivo se abre
        $this->objPHPExcel->setActiveSheetIndex(0);
    }

    private function obtenerNombreHojaPrincipal() {
        $name = str_replace('_', ' ', $this->nombreArchivo);
        $name = str_replace('.xls', '', $name);
        return $name;
    }

    public function imprimirCabeceras($cabeceras, $personalizadas = FALSE) {
        // Se agregan los titulos del reporte

        for ($i = 0; $i < count($cabeceras); $i++) {
            $letra = $this->obtenerLetraDesdeNumero($i + 1);
            if ($personalizadas) {
                $this->objPHPExcel->getActiveSheet()->setCellValue($letra . '1', $cabeceras[$i]['titulo'])
                        ->getStyle($letra . '1:' . $letra . '1')
                        ->applyFromArray($this->estiloCabeceras('FFFFFF', $cabeceras[$i]['color_cabecera'])); // Asignar estilo cabeceras
            } else {
                $this->objPHPExcel->getActiveSheet()->setCellValue($letra . '1', $cabeceras[$i])
                        ->getStyle($letra . '1:' . $letra . '1')
                        ->applyFromArray($this->estiloCabeceras('FFFFFF', '008080')); // Asignar estilo cabeceras
            }
        }
    }

    public function imprimirDatos($registros) {

        //Se agregan los datos
        $row = 2; // 1-based index
        for ($i = 0; $i < count($registros); $i++) {
            $col = 0;
            for ($j = 0; $j < count($registros[$i]); $j++) {

                $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($col, $row, str_replace('/n', PHP_EOL, $registros[$i][$j]));

                $col++;
                // Asignar ancho de las columnas de forma automatica
                $this->objPHPExcel->setActiveSheetIndex()->getColumnDimension($this->obtenerLetraDesdeNumero($j + 1))->setAutoSize(TRUE);
            }
            $row++;
        }
    }

    public function imprimir() {
        // Se eliminan el archivo con extension nombreArchivo.xls
        $fullArchivo = 'cache/' . $this->nombreArchivo;

        if (file_exists($fullArchivo)) {
            unlink($fullArchivo);
        }
        // Se manda el archivo al navegador web, con el nombre que se indica, en formato 2007
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $this->nombreArchivo . '"');
        header('Cache-Control: max-age=0');

        $objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel2007');
        $objWriter->save($fullArchivo);

        readfile($fullArchivo);
        exit;
    }

    private function estiloCabeceras($colorTexto = '000000', $colorCabecera = 'FFFFFF') {
        $estiloCabeceras = array(
            'font' => array(
                'name' => 'Arial',
                'bold' => false,
                'italic' => false,
                'strike' => false,
                'size' => 12,
                'color' => array(
                    'rgb' => $colorTexto
                )
            ),
            'fill' => array(
                'type' => PHPExcel_Style_Fill::FILL_SOLID,
                'color' => array(
                    'rgb' => $colorCabecera)
            ),
            'borders' => array(
                'allborders' => array(
                    'style' => PHPExcel_Style_Border::BORDER_NONE
                )
            ),
            'alignment' => array(
                'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_CENTER,
                'vertical' => PHPExcel_Style_Alignment::VERTICAL_CENTER,
                'rotation' => 0,
                'wrap' => false
            )
        );
        return $estiloCabeceras;
    }

    private function obtenerLetraDesdeNumero($numero) {
        $letras = array('1' => 'A', '2' => 'B', '3' => 'C', '4' => 'D', '5' => 'E', '6' => 'F', '7' => 'G', '8' => 'H', '9' => 'I', '10' => 'J', '11' => 'K', '12' => 'L',
            '13' => 'M', '14' => 'N', '15' => 'O', '16' => 'P', '17' => 'Q', '18' => 'R', '19' => 'S', '20' => 'T', '21' => 'U', '22' => 'V', '23' => 'W',
            '24' => 'X', '25' => 'Y', '26' => 'Z', '27' => 'AA', '28' => 'AB', '29' => 'AC', '30' => 'AD', '31' => 'AE', '32' => 'AF', '33' => 'AG', '34' => 'AH', '35' => 'AI', '36' => 'AJ', '37' => 'AK', '38' => 'AL', '39' => 'AM', '40' => 'AN');
        return $letras[$numero];
    }

}
