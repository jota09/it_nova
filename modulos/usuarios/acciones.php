<?php

if (!defined('s3_entrada') || !s3_entrada) {
   die('No es un punto de entrada valido');
}

class AccionesUsuarios extends S3Accion {

   public function accionAutenticar() {
      global $aplicacion;

      $config = $aplicacion->getConfig()->getConfigApp();
      $request = new S3Request();
      $vars = $request->obtenerVariables();

      $loginUsuario = $vars['login_usuario'];
      $loginContrasenia = $vars['login_contrasenia'];

      $usuario = $aplicacion->getUsuario();
      $usuario->autenticar($loginUsuario, $loginContrasenia);

      if ($usuario->estaAutenticado()) {
         $aplicacion->getSession()->setVariable('usuario_id', $usuario->getId());
         $modulo = $config['aplicacion']['modulo_predeterminado'];
         $accion = $config['aplicacion']['accion_predeterminado'];

         $peticion = array(
             'modulo' => $modulo,
             'accion' => $accion
         );

         $request->redireccionar($peticion);
      } else {
         $aplicacion->getVista()->assign('error_login', 1);
      }
   }

   public function accionLogin() {
      global $aplicacion;
      require_once 'modelo/Usuario.php';
      $objUsuario = new Usuario();
      $objUsuario->desAutenticacion();
      if(isset($_GET['id'])&&$_GET['id']!==0){
      $aplicacion->getVista()->draw('recuperar');
      }
      else{
      $aplicacion->getVista()->draw('login');
      }
   }

   public function accionLogout() {
      global $aplicacion;
      $aplicacion->getUsuario()->desAutenticacion();
   }

   public function accionEditar() {
      parent::accionEditar();

      global $aplicacion;

      require_once 'modelo/Perfil.php';
      $objPerfil = new Perfil();
      require_once 'modelo/Area.php';
      $objArea = new Area();
      require_once 'modelo/Cargo.php';
      $objCargo = new Cargo();
      require_once 'modelo/Usuario.php';
      $objUsuario = new Usuario();
      $this->cargarPermisos();
      $request = new S3Request();
      $vars = $request->obtenerVariables();

      if (file_exists('assets/js/modulos/' . $this->modulo . '/editar.js')) {
         $this->scripts[] = 'assets/js/modulos/' . $this->modulo . '/editar.js';
      }
      $registro = $objUsuario->obtenerRegistro($vars['registro']);
      $aplicacion->getVista()->assign('registro', $registro);

      $scripts = array_merge($this->scripts, $this->scripts);
      $aplicacion->getVista()->assign('perfiles', $objPerfil->obtenerListaRegistros());
      $aplicacion->getVista()->assign('areas', $objArea->obtenerListaRegistros());
      $aplicacion->getVista()->assign('cargos', $objCargo->obtenerCargosXArea($registro['area_id']));
      $aplicacion->getVista()->assign('informar', $objUsuario->obtenerUsuariosAInformar());
   }

   public function accionListar() {
      global $aplicacion;
      parent::accionListar();
      $aplicacion->getVista()->assign('contenidoModulo', 'modulos/usuarios/listar');
   }

   public function cargarPermisos() {
      global $aplicacion;
      $request = new S3Request();
      $vars = $request->obtenerPeticion();
      require_once 'modelo/ACLPerfilPermiso.php';
      require_once 'modelo/Usuario.php';
      $usu = new Usuario();
      $ACLPerfilPermiso = new ACLPerfilPermiso();

      //SESIONES
      $session = new S3Session();
      $usuarioId = $session->getVariable('usuario_id');
      $registroUsuario = $usu->obtenerRegistro($usuarioId);
      $permiso = $ACLPerfilPermiso->obtenerPermisoXModulo($registroUsuario['perfil_id'], $vars['modulo_id']);
      $aplicacion->getVista()->assign('permiso', $permiso);
   }

   public function accionWsObtener() {

      if (isset($_SERVER['HTTP_ORIGIN'])) {
         header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
         header('Access-Control-Allow-Credentials: true');
         header('Access-Control-Max-Age: 86400');
      }

      if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

         if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

         if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
      }

      require_once 'modelo/Usuario.php';
      $objUsuario = new Usuario();
      return $objUsuario->obtenerListaRegistros();
   }

   public function accionRecuperar() {

      $request = new S3Request();
      $post = $request->obtenerVariables();

      require_once 'modelo/Usuario.php';
      $objUsuario = new Usuario();

      $usuario = $objUsuario->obtenerRegistroxEmail($post['email']);

      if (!empty($usuario)) {
         $objUsuario->enviarCorreoRecuperacion($usuario);
         echo json_encode("1");
      } else {
         echo json_encode("0");
      }
   }
   public function accionEnvioCorreo() {

      $request = new S3Request();
      $post = $request->obtenerVariables();
      require_once 'modelo/Usuario.php';
      $objUsuario = new Usuario();

//    __P($post);
    $correo = $objUsuario->EnviarCorreo($post);
    die(json_encode($correo));
   }

   public function accionCambiar() {
      global $aplicacion;

      $request = new S3Request();
      $post = $request->obtenerVariables();
   
      if (!isset($post['tkn']) || $post['tkn'] == '') {
         header('Location: index.php');
         die();
      }

      $aplicacion->getVista()->assign('tkn', $post['tkn']);
   }

   public function accionCambiarContrasenia() {
      global $aplicacion;

      $request = new S3Request();
      $post = $request->obtenerVariables();

      require_once 'modelo/Usuario.php';
      require_once 'modelo/_Contrasenia.php';

      $objUsuario = new Usuario();
      $objContrasenia = new Contrasenia();

      $usuario = $objUsuario->obtenerRegistroxCambio($post['tkn']);
      //__P($usuario);
      if ($usuario['id'] > 0) {
         $objContrasenia->actualizarContrasenia($usuario['id'], $post['pass1']);
         echo json_encode("1");
      } else {
         echo json_encode("0");
      }
      //__P($post);
   }

    public function accionWsAutenticar() {
        //id, nombres, apellidos, correo, logueado, avatar, usuario
        if (isset($_SERVER['HTTP_ORIGIN'])) {
            header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');
        }

        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }

        $request = new S3Request();
        $vars = $request->obtenerVariables();

        $loginUsuario = $vars['user'];
        $loginContrasenia = $vars['pass'];

        require_once 'modelo/Usuario.php';
        $objUsuario = new Usuario();
        return $objUsuario->autenticarWS($loginUsuario, $loginContrasenia);
    }
    
    public function accionConsultarExitencia() {
    $request = new S3Request();
    $post = $request->obtenerVariables();

    require_once 'modelo/Usuario.php';
    $usuario = new Usuario();
//    __P('entro aqui');
    $validado = $usuario->consultarExitencia($post);
    die(json_encode($validado));
  }
    public function accionConsultarExitencia2() {
    $request = new S3Request();
    $post = $request->obtenerVariables();

    require_once 'modelo/Cliente.php';
    $cliente = new Cliente();
//    __P('entro aqui');
    $validado = $cliente->consultarExitencia($post);
    die(json_encode($validado));
  }
  
  public function accionGuardarContrasenia() {
        require_once 'modelo/_Contrasenia.php';
        $objContrasenia = new Contrasenia();
        $request = new S3Request();
        $post = $request->obtenerVariables();
//        __P($post);
        $objContrasenia->eliminarxUsuario($post['id']);
        $objContrasenia->guardar($post['id'], $post['contrasenia']);
            die(json_encode($objContrasenia));

        
    }
    
    public function accionGuardarUsuario() {

      $request = new S3Request();
      $post = $request->obtenerVariables();
      require_once 'modelo/Usuario.php';
      $objUsuario = new Usuario();

//    __P($post);
    $correo = $objUsuario->guardarCliente();
    die(json_encode($correo));
   }

}
