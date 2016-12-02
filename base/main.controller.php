<?php

/**
 * El controlador Principal
 * @author Euclides Rodriguez Gaitan
 */
if (!defined('s3_entrada')) {
    die('No es un punto de entrada valido');
}

class Aplicacion {

    private $solicitud;
    private $config;
    private $session;
    private $lenguaje;
    private $bd;
    private $usuario;
    private $vista;
    private $acl;
    private $request;

    public function getVista() {
        return $this->vista;
    }

    public function getConfig() {
        return $this->config;
    }

    public function getSession() {
        return $this->session;
    }

    public function getUsuario() {
        return $this->usuario;
    }

    /**
     * @todo Realizar todas las configuraciones iniciales de la aplicacion
     */
    public function iniciar() {
        require_once('base/requires.php');

        $this->session = new S3Session();
        $this->config = new S3Config();
        $this->error = new S3Error();
        $this->lenguaje = new S3Lenguaje();
        $this->bd = new S3BD();
        $this->vista = new S3Vista();
        $this->request = new S3Request();
        $this->usuario = new S3Usuario();
        $this->acl = new S3ACL();

        $this->config->cargarConfiguracionAplicacion();
        $this->config->configurarAmbiente();

        $this->bd->conectar($this->config->getVariableConfig('aplicacion-bd'));
        $this->usuario->cargar();

        $utils = new S3Utils();
        $this->vista->assign('Utils', $utils);

        $preformat = new S3Preformatear();
        $preformat->llamarFunciones();
    }

    /**
     * @todo Procesa la funcion
     */
    public function procesar() {
      
        $this->solicitud = $this->request->obtenerPeticion();

        $this->lenguaje->setLenguaje($this->config->getVariableConfig('aplicacion-lenguaje'));
        $acl_permiso_libre = $this->acl->verificarPermisoSolicitudLibre($this->solicitud['modulo'], $this->solicitud['accion']);

        if (!$this->session->estaAutenticado() && $this->solicitud['modulo'] != 'usuarios' && $this->solicitud['accion'] != 'autenticar' && !$acl_permiso_libre) {

            $this->solicitud = array(
                'modulo' => 'usuarios',
                'accion' => 'login'
            );
        }
    }

    /**
     * @todo Finaliza la aplicacion cerrando conexiones,etc
     */
    public function finalizar() {
        $despachador = new S3Despachador();
        $despachador->setSolicitud($this->solicitud);
        
        $this->vista->assign('L_APP', $this->lenguaje->getLenguajeAplicacion());
        $this->vista->assign('L_MOD', $this->lenguaje->getLenguajeModulo($this->solicitud['modulo']));

        $acl_permiso = $this->acl->verificarPermisoSolicitud($this->usuario->getId(), $despachador->getModulo(), $despachador->getAccion());
        $acl_permiso_libre = $this->acl->verificarPermisoSolicitudLibre($despachador->getModulo(), $despachador->getAccion());

        if ($this->session->estaAutenticado()) {
            $this->usuario->cargar();
            $this->vista->assign('usuario', $this->usuario);
        }
        //__P($this->session->estaAutenticado().'#');
        if (is_array($this->solicitud)) {
            $this->vista->assign('modulo', $despachador->getModulo());
            $this->vista->assign('accion', $despachador->getAccion());
           
            if ($acl_permiso || $acl_permiso_libre || $this->solicitud['modulo'] == "home") {
                $despachador->procesarSolicitud();
            } else {
                if (!isset($this->solicitud['parametros']['ajax']) || !$this->solicitud['parametros']['ajax']) {
                    $this->vista->assign('contenidoModulo', 'general/sinpermisos');
                } else {
                    if($this->solicitud['parametros']['ajax'] == true){
                        $despachador->procesarSolicitud();
                        
                    }else{
                        die("Error: No tiene permisos");
                    }
                    
                }
            }
        } else {
            die('No hay solicitud');
        }

        $dirTpls = $this->vista->getDirTpl();

        if (empty($this->solicitud['parametros']['ajax']) || $this->solicitud['parametros']['ajax'] == false) {
            $this->vista->assign('title', $this->config->getVariableConfig('aplicacion-titulo'));

            if ($this->session->estaAutenticado()) {
                if ($acl_permiso) {
                    $allvars = json_encode($this->vista->var);

                    $this->vista->assign('S3VARS', $allvars);
                    $tpl = $this->getUsuario()->getPerfil();
                    $ext_tpl = '.' . $this->config->getVariableConfig('aplicacion-tpl_ext');

                    if (!$this->vista->is_draw) {
                        if (file_exists($dirTpls . $tpl . $ext_tpl)) {
                            $this->vista->draw($tpl);
                        } else {
                            $this->vista->draw('index');
                        }
                    }
                } else {
                    if (!$this->vista->is_draw) {
                        $this->vista->draw('index');
                    }
                }
            } else if ($acl_permiso_libre) {

                $allvars = json_encode($this->vista->var);

                $this->vista->assign('S3VARS', $allvars);
                $ext_tpl = '.' . $this->config->getVariableConfig('aplicacion-tpl_ext');

                if (file_exists($dirTpls . 'modulos/' . $despachador->getModulo() . '/' . $despachador->getAccion() . $ext_tpl)) {
                    if (!$this->vista->is_draw) {
                        $this->vista->draw('modulos/' . $despachador->getModulo() . '/' . $despachador->getAccion());
                    }
                } else {
                    $despachador->procesarSolicitud();
                    $allvars = json_encode($this->vista->var);
                    $this->vista->assign('S3VARS', $allvars);

                    if (!$this->vista->is_draw) {
                        $this->vista->draw('login');
                    }
                }
            } else {
                $despachador->procesarSolicitud();
                $allvars = json_encode($this->vista->var);
                $this->vista->assign('S3VARS', $allvars);

                if (!$this->vista->is_draw) {
                    $this->vista->draw('login');
                }
            }
            
        }
    }

}
