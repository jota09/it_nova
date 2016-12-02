<?php

/**
 * Clase que controla las operaciones con los registros de las tablas. 
 * @author Euclides Rodriguez Gaitan
 *
 */
if (!defined('s3_entrada') || !s3_entrada) {
  die('No es un punto de entrada valido');
}

use Illuminate\Database\Eloquent\Model as Eloquent;

class S3TablaBD extends Eloquent {

  const CREATED_AT = 'fecha_creacion';
  const UPDATED_AT = 'fecha_modificacion';

  protected $table;
  protected $camposTabla = array();
  public $timestamps = false;
  public $camposListado;

  public function cargarCampos() {
    $campos = $this->hydrateRaw('show columns from `' . $this->table . '`')->toArray();
    foreach ($campos as $vCampo) {
      $this->camposTabla[] = $vCampo['Field'];
    }
  }

  public function __construct(array $attributes = array()) {
    parent::__construct($attributes);

    global $aplicacion;
    $aplicacion->getConfig()->cargarConfiguracionAplicacion();
    $config = $aplicacion->getConfig()->getConfigApp();

    if (isset($config['aplicacion']['fechascomunes']) && $config['aplicacion']['fechascomunes'] == 1) {
      $this->timestamps = true;
    }
  }

  /**
   * @todo Calcula el siguiente ID que debe existir en la tabla
   *  
   * @param string $columna
   * @param string $tabla
   * @return int
   */
  public function calcularConsecutivo($columna = 'id', $tabla = NULL) {
    if ($tabla != NULL) {
      $this->table = $tabla;
    }

    $max = $this->max($columna);

    return $max + 1;
  }

  /**
   * @todo Retorna los titulos de las columnas de la selección que se hizo a la tabla
   * @return array
   */
  public function obtenerCamposListado() {
    return $this->camposListado;
  }

  /**
   * Función en caso de que sea necesario cambiar parametros en la consulta del listar.
   * 
   * @param objeto $bdObjeto
   */
  protected function prelistar(&$bdObjeto) {
    
  }

  /**
   * @todo Obtiene la lista de registros no eliminados de la tabla.
   * @param array $where -> Usar como filtro, si el campo no existe se omite
   * @return array
   */
  public function obtenerListaRegistros($where = array(0 => array('columna' => 'eliminado', 'condicional' => '=', 'valor' => 0)), $ajaxTabla = false, $only = false) {
    $this->cargarCampos();
    $bdObjeto = static::query();

    $this->prelistar($bdObjeto);

    foreach ($where AS $w) {
      if (in_array($w['columna'], $this->camposTabla)) {
        $bdObjeto->where($this->table . '.' . $w['columna'], $w['condicional'], $w['valor']);
        //__P($this->table . '.' . $w['columna'].','.$w['condicional'].', '.$w['valor'], false);
      }
    }

    if ($ajaxTabla) {
      $this->obtenerListaRegistrosAjaxTabla($bdObjeto);
    }

    if ($only) {
      $bdObjeto->take(1)->skip(0);
    }

    $rtnListaRegistros = $bdObjeto->get()->toArray();

    if ($ajaxTabla) {
      $this->postObtenerListaRegistrosAjaxTabla($rtnListaRegistros);
    }
    //__P($bdObjeto->toSql(), false);
    return $rtnListaRegistros;
  }

  /**
   * @todo Convierte el array de registros a la estructura necesaria por el jQuery DataTables
   * 
   * @param array $listaRegistros
   */
  protected function postObtenerListaRegistrosAjaxTabla(&$listaRegistros) {
    $request = new S3Request();
    $post = $request->obtenerVariables();

    for ($i = 0; $i < count($listaRegistros); $i++) {
      $listaRegistros[$i]['checkbox'] = '<label><input type="checkbox" name="id[]" value="' . $listaRegistros[$i]['id'] . '" class="minimal-red"></label>';
      $listaRegistros[$i]['activo'] = $listaRegistros[$i]['activo'] == 0 ? '<i class="fa fa-square-o"></i>' : '<i class="fa fa-check-square-o"></i>';
    }

    $listaRegistros = array(
        'data' => $listaRegistros,
        'draw' => $post['draw'],
        'recordsTotal' => $this->obtenerCount(),
        'recordsFiltered' => empty($this->cantFil) ? $this->obtenerCount() : $this->cantFil,
    );
  }

  /**
   * @todo Funcion para retornal la cantidad de registros no eliminados en una tabla
   * 
   * @return int
   */
  protected function obtenerCount() {
    return static::query()
                    ->where('eliminado', '=', 0)
                    ->count();
  }

  /**
   * @todo Metodo para aplicar los filtros básicos del JQuery DataTables
   * @param Object $bdObjeto
   */
  protected function obtenerListaRegistrosAjaxTabla(&$bdObjeto) {
    $request = new S3Request();
    $post = $request->obtenerVariables();

    if (isset($post['search']['value']) && $post['search']['value'] != '') {
      $where = '(';
      foreach ($this->camposTabla AS $c) {
        if (preg_match('/./', $c)) {
          $tmpC = explode('.', $c);
          $c = implode('`.`', $tmpC);
        }

        $where .= '`' . $c . '` LIKE "%' . $post['search']['value'] . '%" OR ';
      }

      $where = substr($where, 0, -4) . ')';
      $bdObjeto->whereRaw($where);

      $tmpObj = clone $bdObjeto;
      $this->cantFil = $tmpObj->count();
    }

    $this->modObtenerListaRegistrosAjaxTabla($bdObjeto);
    $bdObjeto->take($post['length'])->skip($post['start']);
  }

  /**
   * @todo Metodo para sobreescribir el bdobjeto, en caso de que se reuieran consultas especiales
   * 
   * @param object $bdObjeto
   */
  protected function modObtenerListaRegistrosAjaxTabla(&$bdObjeto) {
    
  }

  /**
   * @todo Retorna un arreglo con los datos encontrados en la tabla por el id que haya enviado en la variable $registro
   * @param int $registro
   * @return array
   */
  public function obtenerRegistro($registro) {
    $this->cargarCampos();
    $bdObjeto = static::query();

    if (in_array('eliminado', $this->camposTabla)) {
      $bdObjeto->where('eliminado', '=', 0);
    }

    $bdObjeto->where('id', '=', $registro);
    $tmpRtn = $bdObjeto->get()->toArray();
    $rtnReg = count($tmpRtn) == 1 ? $tmpRtn[0] : array();
    return $rtnReg;
  }

  /**
   * @todo Guardar y/o actualizar datos mediante el $_POST
   * @global object $aplicacion
   */
  public function guardar() {

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

      $this->preguardar($bdObjeto);
      $bdObjeto->save();
      $this->postguardar($bdObjeto);
    } else {

      if (in_array('creado_por', $this->camposTabla)) {
        $bdObjeto->creado_por = $aplicacion->getUsuario()->getId();
      }
      if (in_array('fecha_creacion', $this->camposTabla)) {

        $bdObjeto->fecha_creacion = date('Y-m-d H:i:s');
      }

      $this->preguardar($bdObjeto);
      $bdObjeto->save();
      $this->postguardar($bdObjeto);
    }
  }

  /**
   * @todo Funciones antes de realizar el guardado y/o actualizado de los datos
   * @param object $bdObjeto
   */
  protected function preguardar(&$bdObjeto) {
    
  }

  /**
   * @todo Funciones despues de realizar el guardado y/o actualizado de los datos
   * @param object $bdObjeto
   */
  protected function postguardar(&$bdObjeto) {
    
  }

  /**
   * @todo Marca como eliminado el registro enviado en la base de datos
   * @param boolean $real -> si desea hacer eliminado real enviar en TRUE
   */
  public function eliminar($real = FALSE, $reg_id = NULL) {
    $this->cargarCampos();

    if (in_array('eliminado', $this->camposTabla)) {
      $request = new S3Request();
      $variablesPost = $request->obtenerVariables();

      if ($reg_id !== NULL) {
        $variablesPost['registro_id'] = $reg_id;
      }

      if (isset($variablesPost['id']) && is_array($variablesPost['id'])) {
        foreach ($variablesPost['id'] as $registroId) {
          $bdObjeto = static::query()
                  ->find($registroId);

          if ($real) {
            $bdObjeto->delete();
          } else {
            $bdObjeto->eliminado = 1;
            $bdObjeto->save();
          }
        }
      } else if (isset($variablesPost['registro_id'])) {
        $registroId = $variablesPost['registro_id'];

        $bdObjeto = static::query()
                ->find($registroId);

        if ($real) {
          $bdObjeto->delete();
        } else {
          $bdObjeto->eliminado = 1;
          $bdObjeto->save();
        }
      }
    }
  }

  /**
   * @todo Si el registro esta con activo en TRUE lo actualiza a FALSE y/o viceversa
   */
  public function in_activar() {
    $this->cargarCampos();

    if (in_array('activo', $this->camposTabla)) {
      $request = new S3Request();
      $variablesPost = $request->obtenerVariables();

      if (isset($variablesPost['id']) && is_array($variablesPost['id'])) {
        foreach ($variablesPost['id'] as $registroId) {
          $bdObjeto = static::query()
                  ->find($registroId);

          if ($bdObjeto->activo == 0) {
            $bdObjeto->activo = 1;
          } else {
            $bdObjeto->activo = 0;
          }
          $bdObjeto->save();
        }
      } else if (isset($variablesPost['registro_id'])) {
        $registroId = $request->obtenerVariablePGR('registro_id');
        $bdObjeto = static::query()
                ->find($registroId);

        if ($bdObjeto->activo == 0) {
          $bdObjeto->activo = 1;
        } else {
          $bdObjeto->activo = 0;
        }
        $bdObjeto->save();
      }
    }
  }

  /**
   * @todo Retorna un arreglo con los datos encontrados en la tabla por el nombre que haya enviado en la variable $nombre
   * @param string $nombre
   * @return array
   */
  public function obtenerRegistroxNombre($nombre) {
    $this->cargarCampos();
    $registro = array();
    if (in_array('nombre', $this->camposTabla)) {
      $bdObjeto = static::query();

      if (in_array('eliminado', $this->camposTabla)) {
        $bdObjeto->where('eliminado', '=', 0);
      }

      $bdObjeto->where('nombre', '=', $nombre);
      $registro = $bdObjeto->get()->toArray();
    }
    return $registro;
  }

}
