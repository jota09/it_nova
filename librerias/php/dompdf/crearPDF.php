<?php

require_once 'librerias/php/dompdf/dompdf_config.inc.php';

class crearPDF {

    public function __construct($html, $nombrePDF, $path = '', $domPDF = true) {
        ob_clean();
        if ($domPDF) {
            $dompdf = new DOMPDF();
            $dompdf->load_html($html);
            $dompdf->render();
            if (!empty($path)) {
                $pdf = $dompdf->output();
                $file_location = getcwd() . '/' . $path . $nombrePDF . ".pdf";
                file_put_contents($file_location, $pdf);
            } else {
                //agregar contraseña $dompdf->get_canvas()->get_cpdf()->setEncryption('trees','frogs',array('copy','print'));
                $dompdf->stream($nombrePDF . ".pdf");
            }
        } else {
            
        }
    }

}
