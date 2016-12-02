<?php

/**
 * Clase que controla las acciones
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

class S3Accion {

    protected $modulo;
    protected $accion;
    protected $registro;
    protected $confModulo;
    protected $listaRegistros;
    protected $scripts;
    protected $estilos;

    function __construct() {
        $request = new S3Request();
        $this->modulo = $request->obtenerVariablePGR('modulo');
        $this->accion = $request->obtenerVariablePGR('accion');
        $this->registro = $request->obtenerVariablePGR('registro');

        $this->confModulo = Spyc::YAMLLoad('modulos/' . $this->modulo . '/config.yml');
    }

    public function accionListar() {
        global $aplicacion;
        
      
        $listado = new S3Listado($this->confModulo['global']['objetoBD']);
        $this->scripts = array('base/librerias/js/datatables/jquery.dataTables.min.js','base/librerias/js/select2/select2.min.js', 'assets/js/general/listar.js');
        $this->estilos = array('base/librerias/css/datatables/jquery.dataTables.min.css','base/librerias/js/select2/select2.css', 'base/librerias/js/select2/select2-bootstrap.css');

        if (file_exists('assets/js/modulos/' . $this->modulo . '/listar.js')) {
            $this->scripts[] = 'assets/js/modulos/' . $this->modulo . '/listar.js';
        }

        if (file_exists('assets/css/modulos/' . $this->modulo . '/listar.css')) {
            $this->estilos[] = 'assets/css/modulos/' . $this->modulo . '/listar.css';
        }

        $config = $aplicacion->getConfig();
        $config->cargarConfiguracionAplicacion();
        $ajax = $config->getVariableConfig('listado_ajax');

        if (!$ajax) {
            $this->listaRegistros = $listado->obtenerRegistros(true);
        } else {
            $this->listaRegistros = $listado->obtenerRegistros();
        }
        $campos = $listado->obtenerNombresCampos($this->listaRegistros);

        $aplicacion->getVista()->assign('campos', $campos);
        $aplicacion->getVista()->assign('modulo', $this->modulo);
        $aplicacion->getVista()->assign('configModulo', $this->confModulo);
        $aplicacion->getVista()->assign('listaRegistros', $this->listaRegistros);
        $aplicacion->getVista()->assign('scripts', $this->scripts);
        $aplicacion->getVista()->assign('estilos', $this->estilos);
        $aplicacion->getVista()->assign('contenidoModulo', 'general/listar');
    }

    public function accionAjaxtabla() {
        $listado = new S3Listado($this->confModulo['global']['objetoBD']);
        $datos = $listado->obtenerRegistrosTablaAjax();
        //__P($datos);
        die(json_encode($datos));
    }

    public function accionEditar() {
        global $aplicacion;

        $this->scripts = array('base/librerias/js/select2/select2.min.js', 'assets/js/general/editar.js');
        $this->estilos = array('base/librerias/js/select2/select2.css', 'base/librerias/js/select2/select2-bootstrap.css');

        if (file_exists('assets/js/modulos/' . $this->modulo . '/editar.js')) {
            $this->scripts[] = 'assets/js/modulos/' . $this->modulo . '/editar.js';
        }

        if (file_exists('assets/css/modulos/' . $this->modulo . '/editar.css')) {
            $this->estilos[] = 'assets/css/modulos/' . $this->modulo . '/editar.css';
        }

        $ver = new S3Ver($this->confModulo['global']['objetoBD']);
        $registro = $ver->obtenerRegistro($this->registro);

        $aplicacion->getVista()->assign('registro', $registro);
        $aplicacion->getVista()->assign('configModulo', $this->confModulo);
        $aplicacion->getVista()->assign('contenidoModulo', 'general/editar');
        $this->asignarPanel();
        $aplicacion->getVista()->assign('scripts', $this->scripts);
        $aplicacion->getVista()->assign('estilos', $this->estilos);
    }

    private function asignarPanel() {
        global $aplicacion;

        require_once 'modelo/Usuario.php';
        $objUsuario = new Usuario();

        $config = $aplicacion->getConfig();
        $usuario_id = $aplicacion->getUsuario()->getId();

        $reg_user = $objUsuario->obtenerRegistro($usuario_id);
        $aplicacion->getVista()->assign('perfil', $reg_user['perfil_id']);


        if (file_exists('modelo/_ModuloRelacion.php')) {
            require_once 'modelo/_ModuloRelacion.php';

            if (class_exists('ModuloRelacion')) {

                $objModuloRelacion = new ModuloRelacion();
                if (method_exists($objModuloRelacion, 'ObtenerRegistrosModulo')) {

                    $campos = $objModuloRelacion->ObtenerRegistrosModulo();
                    $aplicacion->getVista()->assign('campos', $campos);

                    //require_once 'modelo/Cuenta.php';
                    require_once 'modelo/Usuario.php';
                    $usu = new Usuario();
                    $usuarios_actividades = $usu->obtenerUsuarios();
                    //$cuenta = new Cuenta();
                    //$cuenta_actividades = $cuenta->obtenerClientes();
                    $aplicacion->getVista()->assign('clientes_actividades', $cuenta_actividades);
                    //$aplicacion->getVista()->assign('usuarios_actividades', $usuarios_actividades);
                }
            }
        }

        if (file_exists('modelo/Lista_maestra.php') || file_exists('modelo/ListaMaestra.php')) {
            $rutaListaMaestra = file_exists('modelo/Lista_maestra.php') ? 'modelo/Lista_maestra.php' : 'modelo/ListaMaestra.php';
            require_once $rutaListaMaestra;

            if (class_exists('ListaMaestra') || class_exists('Lista_maestra')) {
                $claseListaMaestra = class_exists('ListaMaestra') ? 'ListaMaestra' : 'Lista_maestra';
                $objListaMaestra = new $claseListaMaestra();

                if (method_exists($objListaMaestra, 'obtenerOpcionesPorModulo')) {
                    $lm_documentos_id = $config->getVariableConfig('aplicacion-relaciones-lm_documentos_id');
                    $lm_actividades_id = $config->getVariableConfig('aplicacion-relaciones-lm_actividades_id');

                    $this->scripts = array_merge(array('base/librerias/js/select2/select2.min.js', 'base/librerias/js/datatables/jquery.dataTables.min.js'), $this->scripts);
                    $this->estilos = array_merge($this->estilos, array('base/librerias/js/select2/select2.css', 'base/librerias/js/select2/select2-bootstrap.css', 'base/librerias/css/datatables/jquery.dataTables.min.css'));

                    $listas_documentos = $objListaMaestra->obtenerOpcionesPorModulo($lm_documentos_id);
                    $listas_actividades = $objListaMaestra->obtenerOpcionesPorModulo($lm_actividades_id);
                    $estado = array();
                    $estado['actividad'] = array();
                    foreach ($listas_actividades['tipo'] as $key => $val) {
                        // $estado['actividad'] = array_merge($estado['actividad'], $objListaMaestra->obtener_estados_actividades($val['id'], $listas_actividades));
                    }
                    $aplicacion->getVista()->assign('listas_documentos', $listas_documentos);
                    $aplicacion->getVista()->assign('listas_actividades', $listas_actividades);
                    $aplicacion->getVista()->assign('estado_actividad', $estado['actividad']);
                    $aplicacion->getVista()->assign('horas', obtenerHoras());
                    $aplicacion->getVista()->assign('minutos', obtenerMinutos());
//                   
//                       __P($listas_actividades); 
                }
            }
        }
        $extTpl = '.' . $config->getVariableConfig('aplicacion-tpl_ext');
        $dirTpls = $aplicacion->getVista()->getDirTpl();

        if (file_exists($dirTpls . 'general/panel_extra_editar' . $extTpl)) {
            $aplicacion->getVista()->assign('panel_extra_editar', 'general/panel_extra_editar');
        }
        if (file_exists($dirTpls . 'general/actividades' . $extTpl)) {
            $aplicacion->getVista()->assign('actividades', 'general/actividades');
        }
    }

    public function accionVer() {
        global $aplicacion;
        $request = new S3Request();
        $ver = new S3Ver($this->confModulo['global']['objetoBD']);
        $this->registro = $request->obtenerVariablePGR('registro_id');
        $registro = $ver->obtenerRegistro($this->registro);
        $aplicacion->getVista()->assign('registro', $registro);

        $aplicacion->getVista()->assign('configModulo', $this->confModulo);
        $aplicacion->getVista()->assign('contenidoModulo', 'modulos/' . $request->obtenerVariablePGR('modulo') . '/ver.tpl');

        return $registro;
    }

    public function accionGuardar() {
        $request = new S3Request();
        $utils = new S3Utils();
        $claseON = $utils->obtenerClaseNegocioDeDO($this->confModulo['global']['objetoBD']);

        require_once('modelo/' . $claseON . '.php');

        $objetoNegocio = new $claseON();
        $objetoNegocio->guardar();

        $vars = $request->obtenerVariables();

        if (!empty($vars['registro_id'])) {
            $regId = $vars['registro_id'];
        } else {
            $regId = $objetoNegocio->id;
        }
        $peticion = array(
            'modulo' => $this->modulo,
            'accion' => 'editar',
            'parametros' => array('registro' => $regId)
        );

        $request->redireccionar($peticion);
    }

    public function accionEliminar() {
        $request = new S3Request();
        $utils = new S3Utils();
        $claseON = $utils->obtenerClaseNegocioDeDO($this->confModulo['global']['objetoBD']);
        require_once('modelo/' . $claseON . '.php');
        $objetoNegocio = new $claseON();
        $objetoNegocio->eliminar();

        $peticion = array(
            'modulo' => $this->modulo,
            'accion' => 'listar'
        );

        $request->redireccionar($peticion);
    }

    public function accionToggleactivar() {
        $request = new S3Request();
        $utils = new S3Utils();
        $claseON = $utils->obtenerClaseNegocioDeDO($this->confModulo['global']['objetoBD']);
        require_once('modelo/' . $claseON . '.php');
        $objetoNegocio = new $claseON();
        $objetoNegocio->in_activar();

        $peticion = array(
            'modulo' => $this->modulo,
            'accion' => 'listar'
        );

        $request->redireccionar($peticion);
    }

}
