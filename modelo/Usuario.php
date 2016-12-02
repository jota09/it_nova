<?php

if (!defined('s3_entrada') || !s3_entrada) {
   die('No es un punto de entrada valido');
}

class Usuario extends S3TablaBD {

   protected $table = "usuario";

   //private $avatar = NULL;

   
   public function guardarCliente() {

    global $aplicacion;
    $this->cargarCampos();

    $request = new S3Request();
    $registroId = $request->obtenerVariablePGR('registro_id');
    $variablesPost = $request->obtenerVariables();

    if (!empty($registroId)) {
      $bdObjeto = static::query()
              ->find($registroId);
    } else {
      $bdObjeto = $this;
    }

    foreach ($variablesPost as $variablePost => $valorPost) {
      if (in_array($variablePost, $this->camposTabla)) {
        $bdObjeto->$variablePost = (empty($valorPost)) ? NULL : $valorPost;
      }
    }

    if (!empty($bdObjeto) && $bdObjeto->id > 0) {
      if (in_array('actualizado_por', $this->camposTabla)) {
        $bdObjeto->actualizado_por = $aplicacion->getUsuario()->getId();
      }
      if (in_array('fecha_modificacion', $this->camposTabla)) {
        $bdObjeto->fecha_modificacion = date('Y-m-d H:i:s');
      }
      $bdObjeto->perfil_id = 1;
      $bdObjeto->cliente_id = 1;
      $bdObjeto->administrador = 1;
      $this->preguardar($bdObjeto);
      $bdObjeto->save();
      $this->postguardarCliente($bdObjeto);
    } else {

      if (in_array('creado_por', $this->camposTabla)) {
        $bdObjeto->creado_por = $aplicacion->getUsuario()->getId();
      }
      if (in_array('fecha_creacion', $this->camposTabla)) {

        $bdObjeto->fecha_creacion = date('Y-m-d H:i:s');
      }
      $bdObjeto->perfil_id = 1;
      $bdObjeto->cliente_id = 1;
      $bdObjeto->administrador = 1;
      $this->preguardar($bdObjeto);
      $bdObjeto->save();
      $this->postguardarCliente($bdObjeto);
    }
  }
  
  
   protected function postguardar(&$bdObjeto) {
      parent::postguardar($bdObjeto);
      require_once 'modelo/_Contrasenia.php';
      $objContrasenia = new Contrasenia();

      $request = new S3Request();
      $vars = $request->obtenerVariables();
      if (!empty($_FILES["avatar"]) && $_FILES["avatar"]["error"] == 0) {
         $nomAvatar = $bdObjeto->nombre_usuario . '_' . $bdObjeto->id;
         $nomAvatar = $nomAvatar . '.' . pathinfo($_FILES["avatar"]["name"], PATHINFO_EXTENSION);
         $_FILES["avatar"]["name"] = $nomAvatar;
         $Uploadavatar = new S3Upload('img_usuario/');
         $Uploadavatar->setExtension(array('jpg', 'png', 'jpeg'));
         $Uploadavatar->subirArchivo('avatar', false);
         $bdObjeto->avatar = $nomAvatar;
         $bdObjeto->save();
      }

      if (isset($vars['contrasenia']) && isset($vars['contrasenia2']) && !empty($vars['contrasenia']) && !empty($vars['contrasenia2'])) {
         $objContrasenia->eliminarxUsuario($bdObjeto->id);
         $objContrasenia->guardar($bdObjeto->id, $vars['contrasenia']);
      }
   }
   
   protected function postguardarCliente(&$bdObjeto) {
      global $aplicacion;

      $datos = array(
          'servidor' => 'http://' . $_SERVER["SERVER_NAME"] . dirname($_SERVER["SCRIPT_NAME"]),
          'proceso' => 'Recuperación de Contraseña',
          'usuario' => $bdObjeto->nombre . ' ' . $bdObjeto->apellido,
          'id' => $bdObjeto->id,
      );

      $mailer = new S3Mailer();
      $mailer->asignarTplBase('modulos/plantillas_correo/correo_de_acceso');
      //$mailer->asignarPlantilla('correo_recuperacion.tpl');
      $mailer->asignarDatos($datos);

      $mailer->enviarCorreo($bdObjeto->correo, $aplicacion->getConfig()->getVariableConfig('aplicacion-titulo') . " - Accesos al Sistema");
      // ("Su nueva contraseña es: " . $contrasenia, , );
   }

   public function setExtras($bdUsuario) {
      $this->avatar = $bdUsuario['avatar'];
   }

   public function getAvatar() {
      return $this->avatar;
   }

   public function obtenerUsuarios($dashboard = false) {
      global $aplicacion;

      $where = '';

      if ($dashboard && $aplicacion->getUsuario()->getPerfilId() != 3) {
         $usuario_id = $aplicacion->getUsuario()->getId();
         $where .= ' AND usuario.informa_a=' . $usuario_id . ' OR usuario.id=' . $usuario_id;
      }

      return static::query()
                      ->selectRaw("usuario.id, concat(usuario.nombres, ' ', usuario.apellidos) as nombres")
                      ->whereRaw('usuario.eliminado=0 ' . $where)
                      ->get()->toArray();
   }

   public function atualizaAutenticacion($id) {
      if ($id > 0) {
         $objUsuario = Usuario::find($id);
         $objUsuario->autenticado = 1;
         $objUsuario->save();
      }
   }

   public function desAutenticacion() {
      $session = new S3Session();
      $usuarioId = $session->getVariable('usuario_id');
      if ($usuarioId > 0) {
         $objUsuario = Usuario::find($usuarioId);
         $objUsuario->autenticado = 0;
         //$objUsuario->save();
         $session->limpiar();
      }
   }

   public function obtenerUsuariosAInformar() {

      $request = new S3Request();
      $post = $request->obtenerVariables();

      if (!isset($post['registro']) || empty($post['registro'])) {
         $post['registro'] = 0;
      }

      $bdObjeto = static::query()
                      ->selectRaw("usuario.id, concat(usuario.nombres, ' ', usuario.apellidos) as nombres")
                      ->where('usuario.eliminado', '=', '0')
                      ->whereRaw('usuario.id != ' . $post['registro'])
                      ->get()->toArray();

      return $bdObjeto;
   }

   public function obtenerListaRegistros($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0)), $ajaxTabla = false, $only = false) {

      $this->cargarCampos();
      $bdObjeto = static::query()
              ->leftjoin('perfil AS p', 'p.id', '=', 'usuario.perfil_id')
              ->leftjoin('cargo AS c', 'c.id', '=', 'usuario.cargo_id')
              ->selectRaw("usuario.id ,TRIM(CONCAT(usuario.nombres,' ',usuario.apellidos)) AS nombres, p.nombre as perfil, c.nombre as cargo, usuario.correo as email, usuario.nombre_usuario AS usuario, usuario.activo ");

      foreach ($where AS $w) {

         if (in_array($w['columna'], $this->camposTabla)) {
            $bdObjeto->where($this->table . '.' . $w['columna'], $w['condicional'], $w['valor']);
         }
      }

      if ($ajaxTabla) {
         $this->obtenerListaRegistrosAjaxTablaAux($bdObjeto);
      }

      if ($only) {
         $bdObjeto->take(1)->skip(0);
      }

      $bdObjeto->orderBy($this->table . '.id', 'DESC');
      $arrayCli = $bdObjeto->get()->toArray();

      if ($ajaxTabla) {
         $this->postObtenerListaRegistrosAjaxTabla($arrayCli);
      }

      return $arrayCli;
   }

   public function obtenerInvitadosxActividad($idActividad) {

      $bdObjeto = static::query()
              ->selectRaw('usuario.*, ai.respuesta_id')
              ->join('actividad_invitado as ai', 'ai.usuario_id', '=', 'usuario.id')
              ->whereRaw('(ai.eliminado=? AND ai.actividad_id=?)', array(0, $idActividad))
              ->get();

      return $bdObjeto->toArray();
   }

   public function obtenerCorreo($registro) {
      $this->cargarCampos();
      $bdObjeto = static::query()
              ->selectRaw(" correo ");

      $bdObjeto->where('id', '=', $registro);
      $tmpRtn = $bdObjeto->get()->toArray();

      $rtnReg = count($tmpRtn) == 1 ? $tmpRtn[0] : array();
      return $rtnReg;
   }

   public function miembrosComite() {

      $bdObjeto = static::query()
              ->selectRaw(" usuario.* ");

      $bdObjeto->where('usuario.perfil_id', '=', 3);
      $tmpRtn = $bdObjeto->get()->toArray();

      return $tmpRtn;
   }

   public function obtenerUsuariosInforman() {
      global $aplicacion;
      return static::query()
                      ->selectRaw("usuario.id, concat(usuario.nombres, ' ', usuario.apellidos) as nombres")
                      ->where('usuario.eliminado', '=', '0')
                      ->whereRaw(' ( usuario.id = ' . $aplicacion->getUsuario()->getId() . ' OR usuario.informa_a = ' . $aplicacion->getUsuario()->getId() . ' ) ')
                      ->get()->toArray();
   }

   protected function obtenerListaRegistrosAjaxTablaAux(&$bdObjeto) {
      $request = new S3Request();
      $post = $request->obtenerVariables();

      if (isset($post['search']['value']) && $post['search']['value'] != '') {
         $where = '(';
         foreach ($this->camposTabla AS $c) {
            if (preg_match('/./', $c)) {
               $tmpC = explode('.', $c);
               $c = implode('`.`', $tmpC);
            }

            $where .= '`' . $this->table . '`.`' . $c . '` LIKE "%' . $post['search']['value'] . '%" OR ';
         }

         $where = substr($where, 0, -4) . ')';
         $bdObjeto->whereRaw($where);

         $tmpObj = clone $bdObjeto;
         $this->cantFil = $tmpObj->count();
      }
//        __P($post);
      if (isset($post['filtroCargo'][0]) && $post['filtroCargo'][0] != '') {
         $whereAux = "";
         if (isset($post['filtroCargo'][1]) && $post['filtroCargo'][1] != '') {
            foreach ($post['filtroCargo'] as $modulo) {
               if ($modulo == "General") {
                  $whereAux = ' OR (`usuario`.`cargo_id` > 0 ) ';
               } else {
                  $where .= "'" . $modulo . "',";
               }
            }
            $where = substr($where, 0, -1);
            $where = "(`usuario`.`cargo_id` IN ( " . $where . " ) " . $whereAux . " )";
         } else {
            if ($post['filtroCargo'][0] === "General") {
               $where = '(`usuario`.`cargo_id` > 0 )';
            } else {
               $where = '(`usuario`.`cargo_id` = ' . $post['filtroCargo'][0] . ' )';
            }
         }
         //__P($where);
         $bdObjeto->whereRaw($where);

         $tmpObj = clone $bdObjeto;
         $this->cantFil = $tmpObj->count();
      }
      if (isset($post['filtroPerfil'][0]) && $post['filtroPerfil'][0] != '') {
         $whereAux = "";
         if (isset($post['filtroPerfil'][1]) && $post['filtroPerfil'][1] != '') {
            foreach ($post['filtroPerfil'] as $modulo) {
               if ($modulo == "General") {
                  $whereAux = 'OR (`usuario`.`perfil_id` > 0 ) ';
               } else {
                  $where .= "'" . $modulo . "',";
               }
            }
            $where = substr($where, 0, -1);
            $where = "(`usuario`.`perfil_id` IN ( " . $where . " ) " . $whereAux . " )";
         } else {
            if ($post['filtroPerfil'][0] === "General") {
               $where = '(`usuario`.`perfil_id` > 0 )';
            } else {
               $where = '(`usuario`.`perfil_id` = ' . $post['filtroPerfil'][0] . ' )';
            }
         }
         //__P($where);
         $bdObjeto->whereRaw($where);

         $tmpObj = clone $bdObjeto;
         $this->cantFil = $tmpObj->count();
      }
      if (isset($post['filtroArea'][0]) && $post['filtroArea'][0] != '') {
         $whereAux = "";
         if (isset($post['filtroArea'][1]) && $post['filtroArea'][1] != '') {
            foreach ($post['filtroAreao'] as $modulo) {
               if ($modulo == "General") {
                  $whereAux = 'OR (`usuario`.`area_id` > 0 ) ';
               } else {
                  $where .= "'" . $modulo . "',";
               }
            }
            $where = substr($where, 0, -1);
            $where = "(`usuario`.`area_id` IN ( " . $where . " ) " . $whereAux . " )";
         } else {
            if ($post['filtroArea'][0] === "General") {
               $where = '(`usuario`.`area_id` > 0 )';
            } else {
               $where = '(`usuario`.`area_id` = ' . $post['filtroArea'][0] . ' )';
            }
         }

         //__P($where);
         $bdObjeto->whereRaw($where);

         $tmpObj = clone $bdObjeto;
         $this->cantFil = $tmpObj->count();
      }
      //__P($bdObjeto);
      $this->modObtenerListaRegistrosAjaxTabla($bdObjeto);
      $bdObjeto->take($post['length'])->skip($post['start']);
   }

   public function obtenerRegistroxEmail($correo) {
      $bdObjeto = static::query()
              ->where('correo', '=', $correo)
              ->where('activo', '=', 1)
              ->where('eliminado', '=', 0)
              ->first();

      if (!empty($bdObjeto)) {
         return $bdObjeto->toArray();
      } else {
         return "0";
      }
   }

   public function enviarCorreoRecuperacion($usuario) {
      global $aplicacion;
      $rand_part = str_shuffle("abcdefghijklmno-pqrstuvwxyz0123456789" . uniqid());

      $bdObjeto = static::query()
              ->find($usuario['id']);
      $bdObjeto->codigo_activacion = $rand_part;
      $bdObjeto->update();

      $datos = array(
          'servidor' => 'http://' . $_SERVER["SERVER_NAME"] . dirname($_SERVER["SCRIPT_NAME"]),
          'proceso' => 'Recuperación de Contraseña',
          'usuario' => $usuario['nombres'] . ' ' . $usuario['apellidos'],
          'codigo' => $rand_part
      );

      $mailer = new S3Mailer();
      $mailer->asignarTplBase('modulos/plantillas_correo/correo_recuperacion');
      //$mailer->asignarPlantilla('correo_recuperacion.tpl');
      $mailer->asignarDatos($datos);

      $mailer->enviarCorreo($usuario['correo'], $aplicacion->getConfig()->getVariableConfig('aplicacion-titulo') . " - Recuperación de Contraseña");
      // ("Su nueva contraseña es: " . $contrasenia, , );
   }
   
   public function EnviarCorreo($usuario) {
      global $aplicacion;

      $datos = array(
          'servidor' => 'http://' . $_SERVER["SERVER_NAME"] . dirname($_SERVER["SCRIPT_NAME"]),
          'proceso' => 'Recuperación de Contraseña',
          'usuario' => $usuario['nombre'] . ' ' . $usuario['apellido'],
          'id' => $usuario['id'],
      );

      $mailer = new S3Mailer();
      $mailer->asignarTplBase('modulos/plantillas_correo/correo_recuperacion');
      //$mailer->asignarPlantilla('correo_recuperacion.tpl');
      $mailer->asignarDatos($datos);

      $mailer->enviarCorreo($usuario['correo'], $aplicacion->getConfig()->getVariableConfig('aplicacion-titulo') . " - Recuperación de Contraseña");
      // ("Su nueva contraseña es: " . $contrasenia, , );
   }

   public function obtenerRegistroxCambio($tkn) {
      $bdObjeto = static::query()
              ->where('codigo_activacion', '=', $tkn)
              ->where('activo', '=', 1)
              ->where('eliminado', '=', 0)
              ->first();
      //__P($bdObjeto->toArray());
      if (!empty($bdObjeto)) {
         return $bdObjeto->toArray();
      } else {
         return "0";
      }
   }

    public function autenticarWS($nombreUsuario, $contrasenia) {

        require_once 'modelo/Usuario.php';

        $hash_pwd = sha1(base64_encode(md5($contrasenia) . '[*]n1c3crm%&_'));

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
            return  $bdUsuario->toArray();
            
        } else {
           return NULL;
        }
    }
    
    public function consultarExitencia($user) {

    $bdObjeto = static::query()
                ->whereRaw('nombre_usuario = '.$user['documento']);
//        __P($bdObjeto->toSql());
      $usuario = array();
      $usuario = $bdObjeto->get()->toArray();
//      __P($usuario);
      return $usuario;
   }
   
}
