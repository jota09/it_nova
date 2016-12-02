<?php

/**
 * Clase que controla las peticiones de parte del cliente.
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

use Illuminate\Database\Capsule\Manager as Capsule;

class S3BD {

    public function conectar($configuracion) {
        $capsule = new Capsule;
		
        $capsule->addConnection(array(
            'driver' => $configuracion['driver'],
            'host' => $configuracion['servidor'],
            'database' => $configuracion['base_datos'],
            'username' => $configuracion['usuario'],
            'password' => $configuracion['contrasenia'],
            'charset' => $configuracion['charset'],
            'collation' => $configuracion['collation'],
            'prefix' => $configuracion['prefix'],
        ));
        
        $capsule->bootEloquent();
    }

}
