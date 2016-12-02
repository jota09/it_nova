<?php

/**
 * Clase que controla la logica del usuario
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
    die('No es un punto de entrada valido');
}

require_once 'modelo/Usuario.php';

class S3Usuario extends Usuario {

    private $id = NULL;
    private $nombres = NULL;
    private $apellidos = NULL;
    private $perfil_id = NULL;
    private $perfil = NULL;
    private $administrador = NULL;
    private $correo = NULL;
    protected $selectRaw = 'usuario.*, pe.nombre AS perfil_nombre';
    private $imagen = NULL;
    
    public function getId() {
        return $this->id;
    }

    public function getNombre() {
        return $this->nombres;
    }

    public function getApellido() {
        return $this->apellidos;
    }

    public function getNombreCompleto() {
        return $this->nombres . ' ' . $this->apellidos;
    }

    public function getPerfil() {
        return $this->perfil;
    }

    public function getPerfilId() {
        return $this->perfil_id;
    }

    public function getAdmin() {
        return $this->administrador;
    }

    public function getCorreo() {
        return $this->correo;
    }
    
    public function getAvatar() {
        return $this->imagen;
    }

    public function autenticar($nombreUsuario, $contrasenia) {
        global $aplicacion;
        require_once 'modelo/Usuario.php';

        $config = $aplicacion->getConfig();
        $hash_pwd = sha1(base64_encode(md5($contrasenia) . $config->getVariableConfig('aplicacion-salthash')));

        $bdUsuario = Usuario::selectRaw('usuario.*, pe.nombre AS perfil_nombre')
                ->join('contrasenia as co', 'usuario.id', '=', 'co.usuario_id')
                ->join('perfil as pe', 'usuario.perfil_id', '=', 'pe.id')
                ->whereRaw('(usuario.correo = ? OR usuario.nombre_usuario = ?)', array($nombreUsuario, $nombreUsuario))
                ->where('co.hash', '=', $hash_pwd)
                ->where('co.eliminado', '=', 0)
                ->where('usuario.eliminado', '=', 0)
                ->where('usuario.activo', '=', 1)
                ->first();

        if ($bdUsuario !== null) {
            $arrUsuario = $bdUsuario->toArray();
            $this->id = $arrUsuario['id'];
        } else {
            $this->id = NULL;
        }
    }

    public function cargar() {
//        require_once 'modelo/Usuario.php';

        $session = new S3Session();
        $usuarioId = $session->getVariable('usuario_id');

        $bdUsuario = parent::selectRaw($this->selectRaw)
                ->join('perfil as pe', 'usuario.perfil_id', '=', 'pe.id')
                ->where('usuario.eliminado', '=', 0)
                ->where('usuario.activo', '=', 1)
                ->where('usuario.id', '=', $usuarioId)
                ->first();
       
        if ($bdUsuario !== null) {
            $arrUsuario = $bdUsuario->toArray();
            $this->id = $arrUsuario['id'];
            $this->nombres = $arrUsuario['nombres'];
            $this->apellidos = $arrUsuario['apellidos'];
            $this->administrador = $arrUsuario['administrador'];
            $this->perfil_id = $arrUsuario['perfil_id'];
            $this->perfil = $arrUsuario['perfil_nombre'];
            $this->correo = $arrUsuario['correo'];
            $this->imagen = $arrUsuario['avatar'];

            if (method_exists($this, 'setExtras')) {
                $this->setExtras($bdUsuario);
            }
        } else {
            $this->id = NULL;
        }//__P($this->pefil_id);
    }

    public function estaAutenticado() {
        return (!empty($this->id)) ? true : false;
    }

}