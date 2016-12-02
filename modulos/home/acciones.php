<?php

if (!defined('s3_entrada') || !s3_entrada) {
   die('No es un punto de entrada valido');
}

class AccionesHome extends S3Accion {

   public function accionInicio() {
      global $aplicacion;

      $request = new S3Request();

      if ($aplicacion->getUsuario()->getAdmin()) {
         $peticion = array(
             'modulo' => 'home',
             'accion' => 'administrador'
         );
      } else {
         $rol = $aplicacion->getUsuario()->getPerfil();
         switch ($rol) {
            default:
               $peticion = array(
                   'modulo' => 'home',
                   'accion' => 'default'
               );
               break;
         }
      }

      $request->redireccionar($peticion);
   }

   public function accionAdministrador() {

      global $aplicacion;
      $config = $aplicacion->getConfig();
      $request = new S3Request();

      $this->scripts = array('base/librerias/js/select2/select2.min.js', 'assets/js/general/editar.js', 'librerias/js/amcharts/amcharts.js', 'librerias/js/amcharts/pie.js', 'librerias/js/amcharts/serial.js', 'librerias/js/amcharts/themes/light.js', 'librerias/js/amcharts/gauge.js', 'assets/js/modulos/home/administracion.js', 'base/librerias/js/datatables/jquery.dataTables.min.js');

      $this->estilos = array('base/librerias/css/datatables/jquery.dataTables.min.css', 'base/librerias/js/select2/select2.css', 'base/librerias/js/select2/select2-bootstrap.css');

      $aplicacion->getVista()->assign('scripts', $this->scripts);
      $aplicacion->getVista()->assign('estilos', $this->estilos);

      $aplicacion->getVista()->assign('contenidoModulo', "general/administracion");
      require_once 'modelo/Factura.php';
      $objFactura = new Factura();

      require_once 'modelo/Usuario.php';
      $usuario = new Usuario();

      require_once 'modelo/Lista_maestra.php';
      $objListaMaestra = new Lista_maestra();

      $invitados = $usuario->obtenerInvitadosxActividad($request->obtenerVariablePGR('registro'));

      $lm_actividades_id = $config->getVariableConfig('aplicacion-relaciones-lm_actividades_id');
      $listas_actividades = $objListaMaestra->obtenerOpcionesPorModulo($lm_actividades_id);
      $aplicacion->getVista()->assign('listas_actividades', $listas_actividades);
      $listasG = $objListaMaestra->obtenerOpcionesGeneral();

      $aplicacion->getVista()->assign('listasG', $listasG);
      $aplicacion->getVista()->assign('invitados', $invitados);
      $aplicacion->getVista()->assign('usuarios', $usuario->obtenerListaRegistros());
      $aplicacion->getVista()->assign('cantidadFacturas', $objFactura->cantidadDeRegistros());
//    $aplicacion->getVista()->assign('mis_asignadas', $objActividad->misActividadesAsignadas());
      $aplicacion->getVista()->assign('contenidoModulo', "general/administracion");
//    __P($aplicacion);
   }

   public function accionDefault() {
      global $aplicacion;
      $config = $aplicacion->getConfig();
      $request = new S3Request();

      $this->scripts = array('base/librerias/js/select2/select2.min.js', 'assets/js/general/editar.js', 'librerias/js/amcharts/amcharts.js', 'librerias/js/amcharts/pie.js', 'librerias/js/amcharts/serial.js', 'librerias/js/amcharts/themes/light.js', 'librerias/js/amcharts/gauge.js', 'assets/js/modulos/home/administracion.js', 'base/librerias/js/datatables/jquery.dataTables.min.js');

      $this->estilos = array('base/librerias/css/datatables/jquery.dataTables.min.css', 'base/librerias/js/select2/select2.css', 'base/librerias/js/select2/select2-bootstrap.css');

      $aplicacion->getVista()->assign('scripts', $this->scripts);
      $aplicacion->getVista()->assign('estilos', $this->estilos);

      $aplicacion->getVista()->assign('contenidoModulo', "general/administracion");
      require_once 'modelo/Actividades.php';
      $objActividad = new Actividades();

      require_once 'modelo/Usuario.php';
      $usuario = new Usuario();

      require_once 'modelo/Lista_maestra.php';
      $objListaMaestra = new Lista_maestra();

      $invitados = $usuario->obtenerInvitadosxActividad($request->obtenerVariablePGR('registro'));

      $lm_actividades_id = $config->getVariableConfig('aplicacion-relaciones-lm_actividades_id');
      $listas_actividades = $objListaMaestra->obtenerOpcionesPorModulo($lm_actividades_id);
      $aplicacion->getVista()->assign('listas_actividades', $listas_actividades);
      $listasG = $objListaMaestra->obtenerOpcionesGeneral();

      $aplicacion->getVista()->assign('listasG', $listasG);
      $aplicacion->getVista()->assign('invitados', $invitados);
      $aplicacion->getVista()->assign('usuarios', $usuario->obtenerListaRegistros());
      $aplicacion->getVista()->assign('mis_pendientes', $objActividad->misActividadesPendientes());
      $aplicacion->getVista()->assign('mis_asignadas', $objActividad->misActividadesAsignadas());
      $aplicacion->getVista()->assign('contenidoModulo', "general/administracion");
   }

   public function menu_frecuentes() {
      $menu_frecuentes = Spyc::YAMLLoad('config/menu/frecuentes.es_CO.yml');

      foreach ($menu_frecuentes as $menu => $item) {
         $lista .= '<li><a href="index.php?modulo=' . $item['modulo'] . '&accion=' . $item['accion'] . '" >' . $menu . '</a></li>';
      }
      return $lista;
   }

   public function accionAlertaCalendario() {
      require_once 'modelo/Actividades.php';
      $actividad = new Actividades();
      $generarAlertas = $actividad->alertaCalendario();
      //__P($generarAlertas);

      die(json_encode($generarAlertas));
   }

   public function accionCambiarEstadoFactura() {

      $request = new S3Request();
      $post = $request->obtenerVariables();

      require_once 'modelo/Factura.php';
      $factura = new Factura();
//    __P($post);
      $facturas = $factura->EstadoRechazoRegistro($post);
      die(json_encode($facturas));
   }

   public function accionObtenerFacturas() {
      require_once 'modelo/Factura.php';
      $factura = new Factura();
//    __P('entro aqui');
      $facturas = $factura->obtenerListaRegistros();
      die(json_encode($facturas));
   }
   
   public function accionObtenerFacturasFiltro() {
      require_once 'modelo/Factura.php';
      $factura = new Factura();
       $request = new S3Request();
       $post = $request->obtenerVariables();
//        __P($post);
//    __P('entro aqui');
      $facturas = $factura->obtenerListaRegistrosFiltro($post);
      die(json_encode($facturas));
   }

   public function accionDescargarxml() {
      
      $enlace = "assets/img/general/pruebaXML.xml";
      header("Content-Disposition: attachment; filename=pruebaXML.xml");
      header("Content-Type: application/octet-stream");
      header("Content-Length: " . filesize($enlace));
      readfile($enlace);

   }

}
