<?php

/**
 * Clase que encapsula las funciones de envio de correos usando PHPMailer
 * 
 * @author Brandon Sanchez
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
  die('No es un punto de entrada valido');
}

class S3Mailer {

  private $plantilla;
  private $tpl_base = 'mail';
  private $datos;
  private $objMailer = NULL;

  /**
   * @todo Cargar la configuracion de la conexion SMTP
   * 
   * @global array $aplicacion
   * @param bool $exceptions
   */
  public function __construct($exceptions = false) {
    require_once 'base/librerias/php/php-mailer/class.phpmailer.php';
    $this->objMailer = new PHPMailer();

    global $aplicacion;
    $config = $aplicacion->getConfig();
    $smtp_conf = $config->getVariableConfig('aplicacion-smtp');

    $this->objMailer->SMTPDebug = 0;
    $this->objMailer->isSMTP();
    $this->objMailer->Host = $smtp_conf['host'];
    $this->objMailer->Port = $smtp_conf['puerto'];
    $this->objMailer->SMTPSecure = $smtp_conf['seguridad'];
    $this->objMailer->SMTPAuth = true; //CEMEX es false
    $this->objMailer->isHTML(true);
    $this->objMailer->Username = $smtp_conf['usuario'];
    $this->objMailer->Password = base64_decode(base64_decode($smtp_conf['contrasenia']));
    $this->objMailer->From = $smtp_conf['from'];
    $this->objMailer->FromName = $smtp_conf['fromName'];
    $this->objMailer->Timeout = $smtp_conf['timeout'];
  }

  /**
   * 
   * @global array $aplicacion
   * @param string $receptor
   * @param string $asunto
   */
  public function enviarCorreo($receptor, $asunto) {
    global $aplicacion;

    foreach ($this->datos as $key => $dato) {
      $aplicacion->getVista()->assign($key, $dato);
    }

    $aplicacion->getVista()->assign('contenidoMail', $this->plantilla);
    $html = $aplicacion->getVista()->draw($this->tpl_base, true);

    if (is_array($receptor)) {
      foreach ($receptor as $r) {
        $this->objMailer->addAddress($r);
      }
    } else if (is_string($receptor)) {
      $receptores = explode(',', $receptor);
      foreach ($receptores as $r) {
        $this->objMailer->addAddress($r);
      }
    }

    $this->objMailer->Subject = utf8_decode($asunto);
    $this->objMailer->Body = utf8_decode($html);
    $this->objMailer->msgHTML(utf8_decode($html));
    $this->objMailer->AltBody = "";
    //$this->objMailer->SMTPDebug  = 2;
    //__P($this->objMailer);
    return $this->objMailer->send();
  }

  /**
   * 
   * @param string $plantilla
   */
  public function asignarPlantilla($plantilla) {
    $this->plantilla = $plantilla;
  }

  /**
   * 
   * @param string $tpl_base
   */
  public function asignarTplBase($tpl_base) {
    $this->tpl_base = $tpl_base;
  }

  /**
   * 
   * @param array $datos
   */
  public function asignarDatos($datos) {
    $this->datos = $datos;
  }

  public function asignarAdjuntos($adjuntos) {

    for ($i = 0; $i < sizeof($adjuntos); $i++) {
      $this->objMailer->AddAttachment("uploads/adjuntos/".$adjuntos[$i]['adjunto']);
    }
  }

}
