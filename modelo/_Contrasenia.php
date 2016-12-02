<?php

if (!defined('s3_entrada') || !s3_entrada) {
   die('No es un punto de entrada valido');
}

class Contrasenia extends S3TablaBD {

   protected $table = 'contrasenia';

   public function eliminarxUsuario($perf_id) {
      static::query()
              ->where('usuario_id', '=', $perf_id)
              ->delete();
      return 1;
   }

   public function guardar($usuarioId, $contrasenia) {
      global $aplicacion;

      $salt_hash = $aplicacion->getConfig()->getVariableConfig('aplicacion-salthash');

      $data = array(
          "hash" => sha1(base64_encode(md5($contrasenia) . $salt_hash)),
          "usuario_id" => $usuarioId,
          "eliminado" => 0
      );
      static::insert($data);
      
      return 1;
   }

   public function actualizarContrasenia($usuarioId, $contrasenia) {
      global $aplicacion;
      $objConta = static::query()->where("usuario_id", "=", $usuarioId)->get()->toArray();


      $objContrasenia1 = static::query()->where("usuario_id", "=", $usuarioId)->find($objConta[0]['id']);
      $salt_hash = $aplicacion->getConfig()->getVariableConfig('aplicacion-salthash');
      //$objContrasenia1 = $this;

      $objContrasenia1->hash = sha1(base64_encode(md5($contrasenia) . $salt_hash));
      $objContrasenia1->usuario_id = $usuarioId;
      $objContrasenia1->eliminado = 0;

      //__P($objContrasenia1->id);// admin123
      if ($objContrasenia1->id > 0) {

         $objContrasenia1->update(); //die("####");
      } else {
         static::insert($data);
      }
   }

}
