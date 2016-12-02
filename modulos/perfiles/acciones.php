<?php

if (!defined('s3_entrada') || !s3_entrada):
  die('No es un punto de entrada valido');
endif;

class AccionesPerfiles extends S3Accion {

  public function accionEditar() {
    parent::accionEditar();

    global $aplicacion;

    require_once 'modelo/Lista_maestra.php';
    $ListaMaestra = new Lista_maestra();

    $this->cargarPermisos();
    $listasG = $ListaMaestra->obtenerOpcionesGeneral();

    $aplicacion->getVista()->assign('listasG', $listasG);
  }

  public function accionListar() {
    parent::accionListar();

    $this->cargarPermisos();
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

}
