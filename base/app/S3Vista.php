<?php

/**
 * Clase que controla lo que tiene que ver con el motor de Template
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class S3Vista extends RainTPL {
    
    private $dir_tpls = 'vistas/';
    
    public function __construct() {
        global $aplicacion;

        $objConfig = $aplicacion->getConfig();
        $objConfig->cargarConfiguracionAplicacion();

        $debug = $objConfig->getVariableConfig('aplicacion-debug');
        $ext = $objConfig->getVariableConfig('aplicacion-tpl_ext');
        $dirTpls = $this->configurarVistaMobileDesktop();
        $this->dir_tpls = $dirTpls['tpl_dir'];
                
        $config = array(
            "base_url" => null,
            "tpl_dir" => $dirTpls['tpl_dir'],
            "cache_dir" => $dirTpls['cache_dir'],
            "remove_comments" => true,
            'tpl_ext' => $ext,
            'path_replace' => false,
            "debug" => true,
        );

        if ($debug == 0 && $debug == '0') {
            $config['debug'] = false;
        }

        $this->configure($config);
    }
    
    public function getDirTpl() {
        return $this->dir_tpls;
    }

    private function configurarVistaMobileDesktop() {
        global $aplicacion;

        $request = new S3Request();
        $objConfig = $aplicacion->getConfig();

        $objConfig->cargarConfiguracionAplicacion();

        $dominio = $request->obtenerVariableServer('SERVER_NAME');
        $dir_tpls = array('tpl_dir' => 'vistas/', 'cache_dir' => 'cache/tpl/');
        $responsive = $objConfig->getVariableConfig('aplicacion-responsive');

        require_once 'base/librerias/php/mobile-detect/Mobile_Detect.php';
        $objMobileDetect = new Mobile_Detect();
        $agente = $objMobileDetect->getHttpHeaders();
        if ($responsive['activado'] == '1' && $responsive['autodetectar'] == '1') {
            if ($objMobileDetect->isTablet()) {
                $dir_tpls['tpl_dir'] .= $responsive['dir_tablet'] . '/';
                $dir_tpls['cache_dir'] .= 'tablet/';
            } else if ($objMobileDetect->isMobile() || strpos($agente['HTTP_USER_AGENT'], "Mobile") > 0) {
                $dir_tpls['tpl_dir'] .= $responsive['dir_celular'] . '/';
                $dir_tpls['cache_dir'] .= 'mobile/';
            } else {
                $dir_tpls['tpl_dir'] .= $responsive['dir_desktop'] . '/';
                $dir_tpls['cache_dir'] .= 'desktop/';
            }
        } else if ($responsive['activado'] == '1' && $dominio == $responsive['url']) {
            if ($objMobileDetect->isTablet()) {
                $dir_tpls['tpl_dir'] .= $responsive['dir_tablet'] . '/';
                $dir_tpls['cache_dir'] .= 'tablet/';
            } else {
                $dir_tpls['tpl_dir'] .= $responsive['dir_celular'] . '/';
                $dir_tpls['cache_dir'] .= 'mobile/';
            }
        }

        return $dir_tpls;
    }

}
 