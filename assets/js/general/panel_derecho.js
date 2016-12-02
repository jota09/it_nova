function Crear_revision() {

  id_doc = $("#registro_id").val();
  nombre = $("#nombre_revision").val();
  revision = $("#version_revision").val();
  descripcion = $("#descripcion_revision").val();
  adjunto = '';
  if ($('#adjunto_revision').val() != '') {
    adjunto = $('#adjunto_revision')[0].files[0].name;
  }

  if (id_doc == '' || revision == '' || descripcion == '' || adjunto == '') {

    alert('No se puede crear la revisión, debe haber algun campo vacio');
  }

  if (id_doc != '' && revision != '' && descripcion != '' && adjunto != '') {
    var datos = new FormData();
    var files = $('#adjunto_revision')[0].files;

    $.each(files, function (key, value)
    {
      datos.append('file', value);
    });

    datos.append('id_doc', $("#registro_id").val());
    datos.append('nombre', $("#nombre").val());
    datos.append('revision', $("#version_revision").val());
    datos.append('descripcion', $("#descripcion_revision").val());

    $.ajax({
      type: "POST",
      url: 'index.php?modulo=documentos&accion=crear_revision',
      data: datos,
      dataType: "json",
      processData: false,
      contentType: false
    }).done(function (result) {
      version = result[2];
      $(".version").html(version);
      $(".version").val(version);
      $(".dir").prop("href", "uploads/adjuntos/" + result[1]);
      $(".dir").html(result[0]);
      $("#versiones").html('');

      recargar_versiones();

      $('#nuevo_revision').find('input,select,textarea').val('');
      $('#nuevo_revision').modal('hide');
    });
  }
}

function recargar_versiones() {
  var id = $("#registro_id").val();
  $.ajax({
    type: "POST",
    url: 'index.php?modulo=documentos&accion=obtener_revisiones',
    data: 'id=' + id,
    dataType: "json",
  }).done(function (result) {
    var version = '';
    for (i = 0; i < result.length; i++) {
      version += '<div class="clearfix"></div>';
      version += ' <div class="col-md-3 no-padding-left">';
      version += ' <a href="uploads/adjuntos/' + result[i]['adjunto'] + '" target="blank"><i class="fa fa-paperclip"></i></a> ';
      version += result[i]['nombre_adjunto'];
      version += ' </div>';
      version += '  <div class="col-md-2 no-padding-left">';
      version += result[i]['version'];
      version += ' </div>';
      version += '  <div class="col-md-2 no-padding-left">';
      version += result[i]['fecha_creacion'];
      version += '</div>'
      version += '<div class="col-md-2 no-padding-left">';
      version += result[i]['nombre_usuario'];
      version += '</div>'
              + '<div class="col-md-3 no-padding-left">';
      version += result[i]['descripcion'];
      version += '</div>'
      version += '<div class="clearfix"></div>';
    }
    $("#versiones").html(version);
  });
}


function quitar_documento(obj) {
  var id_act = $(obj).attr('id_doc');
  var r = confirm("Esta Seguro de Eliminar el Documento?");
  if (r == true) {
    $.ajax({
      type: "POST",
      url: 'index.php?modulo=documentos&accion=quitar_documento',
      data: 'id=' + id_act,
      dataType: "json",
    }).done(function (result) {
      cargar_documentos();
      crearTablaListaDocumentos();
    });
  }
}

function cargar_documentos() {

  $.ajax({
    type: "POST",
    url: 'index.php?modulo=documentos&accion=obtener_documentos',
    data: 'id=' + s3vars.registro.id + '&modulo_id=' + s3vars.modulo_id,
    dataType: "json",
  }).done(function (result) {

    documentos = '';
    documentos = result;
    $("#docs").html('');
    docs = result['count_doc'];
    $("#docs").append(docs);
  });


  $('.limpiar_nuevo_documento').find('input,select,textarea').val('');
  $('#nuevo_documento').modal('hide');
}

function crear_documento() {
  if (validarDocumento()) {
    if ($("#form_documento").validationEngine('validate')) {
      var datosd = new FormData();
      var files = $('#adjunto_nuevo')[0].files;
      $.each(files, function (key, value) {
        datosd.append('adjunto', value);
      });

      datosd.append('nombre', $("#nombre_nuevo").val());
      datosd.append('tipo_documento', $("#tipo_documento_nuevo").val());
      datosd.append('modulo_relacionado', $("#modulo_relacionado_nuevo").val());
      datosd.append('modulo_relacionado_id_nuevo', $("#modulo_relacionado_id_nuevo").val());
      datosd.append('version', $("#version_nuevo").val());
      datosd.append('categoria', $("#categoria_nuevo").val());
      datosd.append('estado', $("#estado_nuevo").val());
      datosd.append('fecha_publicacion', $("#fecha_publicacion_nuevo").val());
      datosd.append('descripcion', $("#descripcion_nuevo").val());

      $.ajax({
        type: "POST",
        url: 'index.php?modulo=documentos&accion=crear_documento',
        data: datosd,
        dataType: "json",
        processData: false,
        contentType: false
      }).done(function (result) {
        if (result == '0') {
          alert('No se ha creado el registro, por favor verifique el tipo de adjunto');
        }
        cargar_documentos();

      });
    }
  }
}

function crear_actividad() {

  $.each($(".select2-container"), function ($k, $v) {
    //console.log($v.id);
    $("#" + $v.id).removeClass("validate[required]");
  });

  var bandera = $('#form_actividades').validationEngine('validate');
  cargaDatePicker();

  if (bandera) {

    var x = $('input[id^=email_actividad]').length;

    if ($("#tipo_id").val() == 40 && $("#categoria_id").val() == 44) { //COMPUESTA - TAREAS
      if (x > 0) {

        var formData = new FormData($("#form_actividades")[0]);

        $.ajax({
          url: 'index.php?modulo=actividades&accion=Crear_actividad',
          type: "post",
          dataType: "html",
          data: formData,
          cache: false,
          contentType: false,
          processData: false

        }).done(function (data) {
          console.log(data);
          $('#form_actividades').find('input,select,textarea').val('');
          $('#nueva_actividad').modal('hide');
        });

      } else {
        alert('Debe existir al menos un Invitado');
      }
    } else {


      var formData = new FormData($("#form_actividades")[0]);

      $.ajax({
        url: 'index.php?modulo=actividades&accion=Crear_actividad',
        type: "post",
        dataType: "html",
        data: formData,
        cache: false,
        contentType: false,
        processData: false

      }).done(function (data) {
        console.log(data);
        $('#form_actividades').find('input,select,textarea').val('');
        $('#nueva_actividad').modal('hide');
      });

    }

  }

  return bandera;

  /*   cargaDatePicker();
   if (validarActividades()) {
   $('#nuevo_actividad').append('<form id="form_actividades" ></form>');
   $('#form_actividades').html($('#nuevo_actividad .modal-body').clone());
   var x = $('input[id^=email_actividad]').length;
   
   if ($("#tipo_actividad").val() != '222') {
   var datosd = $("#form_actividades").serialize();
   $.ajax({
   type: "POST",
   url: 'index.php?modulo=actividades&accion=crear_actividad',
   data: datosd,
   dataType: "json",
   }).done(function (result) {
   $('#nuevo_actividad').find('input,select,textarea').val('');
   $('#nuevo_actividad').modal('hide');
   cargar_actividades();
   });
   }
   
   if ($("#tipo_actividad").val() == '222') {
   if (x > 0) {
   var datosd = $("#form_actividades").serialize();
   $.ajax({
   type: "POST",
   url: 'index.php?modulo=actividades&accion=crear_actividad',
   data: datosd,
   dataType: "json",
   }).done(function (result) {
   $('#nuevo_actividad').find('input,select,textarea').val('');
   $('#nuevo_actividad').modal('hide');
   cargar_actividades();
   });
   } else {
   alert('Debe existir almenos un Invitado');
   }
   }
   }*/
}

function validarDocumento() {

  if (validar_datos('#form_documento')) {
    return true;
  } else {
    alert();
    alert('Algunos datos no son validos, por favor verifique he intente nuevamente.');
    return false;
  }
}
function validarActividades() {
  var bandera = true;
  $.each($('#nuevo_actividad .addreq'), function (k, v) {
    if (!$('#nuevo_actividad #' + $(v).attr('id')).validationEngine('validate')) {
      bandera = false;
    }
  });
  return bandera;

}

$(document).ready(function () {

  $(".adjunto_documento").change(function () {
    adjunto(this);
  })

  $('#nuevo_documento').on('hidden.bs.modal', function (e) {
    $("#nuevo_documento").find('input,select,textarea').removeClass('required');
    $('.limpiar_nuevo_documento').find('input,textarea').val('');
    $("#tipo_documento_nuevo").select2("val", "-1");
    $("#categoria_nuevo").select2("val", "-1");
    $("#estado_nuevo").select2("val", "-1");
  });

  $('#nuevo_documento').on('show.bs.modal', function (e) {
    $("#nombre_nuevo").addClass('required');
    $("#modulo_relacionado_nuevo").addClass('required');
    $("#adjunto_nuevo").addClass('required');
    $("#version_nuevo").addClass('required');

  });

  $('#nuevo_revision').on('hidden.bs.modal', function (e) {
    $('#nuevo_revision').find('input,textarea').val('');
  });

  $('#nuevo_actividad').on('show.bs.modal', function (e) {
    var target_id = e.relatedTarget.id;
    var id = s3vars.registro.id;
    var modulo_id = s3vars.modulo_id;
    $("#relacionado_id_actividad").val(id);
    $("#relacionado_actividad").val(modulo_id);
    $(".tipo_actividad").html('');
    if (target_id == '1') {
      $("#tipo_actividad").val('222');
      $(".tipo_actividad").html('Reunión');
    }
    if (target_id == '2') {
      $("#tipo_actividad").val('221');
      $(".tipo_actividad").html('Llamada');
    }
    if (target_id == '3') {
      $("#tipo_actividad").val('220');
      $(".tipo_actividad").html('Tarea');
    }

    selectChange($("#tipo_actividad"));
    campos_tipo();
    $('#nuevo_actividad .addreq').addClass('validate[required]');
  });
  $('#nuevo_actividad').on('hidden.bs.modal', function (e) {
    $("#nuevo_actividad").find('input,select,textarea').removeClass('required');
    $('#nuevo_actividad').find('input,select,textarea').val('');
    $(".addreq").select2("val", "");
    $("#invitados").html('');
    $('#nuevo_actividad .addreq').removeClass('validate[required]');
    $('#nuevo_actividad .formError').remove();
    $('#form_actividades').remove();
  });

  $('#nuevo_actividad').find('input,select,textarea').val('');
  $('#lista_actividades').on('show.bs.modal', function (e) {
    var target_id = e.relatedTarget.id;

    if (target_id == '1') {
      crearTablaListaTareas(1);
    }
    if (target_id == '2') {
      crearTablaListaTareas(2);
    }
    if (target_id == '3') {
      crearTablaListaTareas(3);
    }
  });
  $('#lista_documentos').on('show.bs.modal', function (e) {
    crearTablaListaDocumentos();
  });

  $("#tipo_documento_nuevo").change(function () {

    verificar_campos_tipo_nuevo();
  });
  $("#tipo_documento").change(function () {

    verificar_campos_tipo();
  });
  cargar_documentos();
  cargar_oportunidades();
});


function verificar_campos_tipo() {
  if ($("#tipo_documento").val() == '195') {
    $("#depende_estado").show();
    $("#estado").addClass('required');
    $("#fecha_publicacion").addClass('required');
  }
  if ($("#tipo_documento").val() == '196') {
    $("#depende_estado").hide();
    $("#estado").removeClass('required');
    $("#fecha_publicacion").removeClass('required');
  }

}
function verificar_campos_tipo_nuevo() {

  if ($("#tipo_documento_nuevo").val() == '195') {
    $("#depende_estado_nuevo").show();
    $("#estado_nuevo").addClass('required');
    $("#fecha_publicacion_nuevo").addClass('required');
  }
  if ($("#tipo_documento_nuevo").val() == '196') {
    $("#depende_estado_nuevo").hide();
    $("#estado_nuevo").removeClass('required');
    $("#fecha_publicacion_nuevo").removeClass('required');

  }
}


$(document).ready(function () {
  actividades = '';
  cargar_actividades();
  campos_tipo();

  $("#tipo_actividad").change(function () {
    campos_tipo();
  });

});

function del_actividad(obj) {
  var id_act = $(obj).attr('id_act');
  var r = confirm("Esta Seguro de Eliminar la Actividad");
  if (r == true) {
    $.ajax({
      type: "POST",
      url: 'index.php?modulo=actividades&accion=eliminar_actividad',
      data: 'id=' + id_act,
      dataType: "json",
    }).done(function (result) {
      cargar_actividades();

    });
  }
}

function campos_tipo() {
  op = $("#tipo_actividad").val();
  if (op == '220') {

    $(".panel-tarea").show();
    $(".panel-tarea").find('input,select').removeAttr('disabled');
    $(".panel-tarea").find('.addreq').addClass('required');
    $(".panel-tarea").find('.addreq').addClass('required');
    $(".panel-llamada").find('.addreq').removeClass('required');
    $(".panel-llamada").find('.addreq').removeClass('required');
    $(".panel-llamada").find('input').removeClass('required');
    $(".panel-reunion").find('input').removeClass('required');



    $(".panel-llamada").hide();
    $(".panel-reunion").hide();
    $(".panel-llamada").find('input,select').attr('disabled', 'disabled');
    $(".panel-reunion").find('input,select').attr('disabled', 'disabled');
  }
  if (op == '221') {
    $(".panel-llamada").show();
    $(".panel-llamada").find('input,select').removeAttr('disabled');
    $(".panel-llamada").find('.addreq').addClass('required');
    $(".panel-tarea").find('.addreq').removeClass('required');
    $(".panel-reunion").find('.addreq').removeClass('required');
    $(".panel-tarea").hide();
    $(".panel-reunion").hide();
    $(".panel-tarea").find('input,select').attr('disabled', 'disabled');
    $(".panel-reunion").find('input,select').attr('disabled', 'disabled');
  }
  if (op == '222') {
    $(".panel-reunion").show();
    $(".panel-reunion").find('input,select').removeAttr('disabled');
    $(".panel-reunion").find('.addreq').addClass('required');
    $(".panel-llamada").find('.addreq').removeClass('required');
    $(".panel-tarea").find('.addreq').removeClass('required');
    $(".panel-llamada").hide();
    $(".panel-tarea").hide();
    $(".panel-llamada").find('input,select').attr('disabled', 'disabled');
    $(".panel-tarea").find('input,select').attr('disabled', 'disabled');
  }
}


function cargar_actividades() {

  var id = s3vars.registro.id;
  var modulo_id = s3vars.modulo_id;

  $("#relacionado_id_actividad").val(id);
  $("#relacionado_actividad").val(modulo_id);

  $.ajax({
    type: "POST",
    url: 'index.php?modulo=actividades&accion=obtener_actividadesxmodulo',
    data: 'id=' + id + '&modulo_id=' + modulo_id,
    dataType: "json",
  }).done(function (result) {
    actividades = '';
    actividades = result;
    col_act = '';
    col_act = result['campos'];

    $("#meet").html('');
    $("#call").html('');
    $("#tas").html('');
    $("#meet").append(result['cnt_reunion']);
    $("#call").append(result['cnt_llamada']);
    $("#tas").append(result['cnt_tarea']);
    llamada = '';
    reunion = '';
    tarea = '';
  });
  cargarFotos();
}

function cargarFotos() {
  if (s3vars.registro.id > 0) {
    $.ajax({
      type: "POST",
      url: 'index.php?modulo=gestion_inmuebles&accion=obtenerfotos',
      data: 'gestion_id=' + s3vars.registro.id,
      dataType: "json",
    }).done(function (result) {
      $('#rel-images').text(result.length);
    });
  }
}


function set_estado_calendario(obj) {
  campos_tipo_calendario();
  id = $(obj).val();
  op = '<option value ="-1">Seleccionar</option>';
  if (id == '220') {
    for (key in s3vars.listas_actividades['estado_tarea']) {
      op += "<option value='" + s3vars.listas_actividades['estado_tarea'][key]['id'] + "'";
      op += ">" + s3vars.listas_actividades['estado_tarea'][key]['nombre'] + "</option>";
    }
  }
  if (id == '221') {
    for (key in s3vars.listas_actividades['estado_llamada']) {
      op += "<option value='" + s3vars.listas_actividades['estado_llamada'][key]['id'] + "'";
      op += ">" + s3vars.listas_actividades['estado_llamada'][key]['nombre'] + "</option>";
    }
  }
  if (id == '222') {
    for (key in s3vars.listas_actividades['estado_reunion']) {
      op += "<option value='" + s3vars.listas_actividades['estado_reunion'][key]['id'] + "'";
      op += ">" + s3vars.listas_actividades['estado_reunion'][key]['nombre'] + "</option>";
    }
  }
  $("#estado").html('');
  $("#estado").append(op);
  $("#estado").select2('val', '-1');
}
function set_relacionado(obj) {
  id = $(obj).val();
  tabla = '';
  campos = '';
  op_mod_rel = '<option value="-1">Seleccionar</option>';
  for (key in s3vars.modulos_actividades) {
    if (id == s3vars.modulos_actividades[key]['id']) {
      tabla = s3vars.modulos_actividades[key]['tabla'];
      campos = s3vars.campos[key];
    }
  }
  $.ajax({
    type: "POST",
    url: 'index.php?modulo=actividades&accion=obtener_registrosxmodulo',
    data: {tabla: tabla, campos: campos},
    cache: false,
    dataType: "json",
    async: false,
  }).done(function (result) {
    if (result.length > 0) {
      for (key in result) {
        op_mod_rel += "<option value='" + result[key]['id'] + "'";
        op_mod_rel += ">" + result[key]['nombre_general'] + "</option>";
      }
    }


  });
  $("#relacionado_id").html('');
  $("#relacionado_id").append(op_mod_rel);
  $("#relacionado_id").select2("val", "-1");

}

function validarFormulario_calendario() {
  if (validar_datos('#form_actividades')) {
    return true;
  } else {
    alert();
    alert('Algunos datos no son validos, por favor verifique he intente nuevamente.');
    return false;
  }
}
var tablaPopups = null;

function crearTablaListaTareas(x) {

  var table = $('#tabla_listar_tareas').DataTable();
  table.destroy();

  if (x == 1) {
    datos_tabla = actividades['reunion'];
  }
  if (x == 2) {
    datos_tabla = actividades['llamada'];
  }
  if (x == 3) {
    datos_tabla = actividades['tarea'];
  }
  var id = $("#registro_id").val();
  var modulo_id = $("#modulo_id").val();

  tablaPopups = $('#tabla_listar_tareas').dataTable({
    "ordering": false,
    data: datos_tabla,
    "columns": col_act,
    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      $.each($(nRow).find('td'), function (a, b) {
        if (a == '9') {
          $(b).addClass('del_act');
          $(b).attr('id_act', aData.id);
          $(b).attr('tipo', aData.tipo);
          $(b).attr('onclick', 'eliminar_actividad(this)');
        }

        if (a > -1 && a < 9) {
          $(b).click(function () {
            location.href = "index.php?modulo=actividades&accion=editar&registro=" + aData.id;
          });
        }
      });

    }
  });
}

$(".del_act").on('click', function () {
  eliminar_actividad($(this));
});

function eliminar_actividad(obj) {
  var id_act = $(obj).attr('id_act');
  var tipo = $(obj).attr('tipo');

  var r = confirm("Esta Seguro de Eliminar la Actividad");
  if (r == true) {
    console.log(tipo);
    $.ajax({
      type: "POST",
      url: 'index.php?modulo=actividades&accion=eliminar_actividad',
      data: 'id=' + id_act,
      dataType: "json",
      async: false,
    }).done(function (result) {
      cargar_actividades();
      var table = $('#tabla_listar_tareas').DataTable();
      table.destroy();
      if (tipo == 'Reunion') {
        crearTablaListaTareas(1);
      }
      if (tipo == 'Llamada') {
        crearTablaListaTareas(1);
      }
      if (tipo == 'Tarea') {
        crearTablaListaTareas(3);
      }
    });
  }
}


function crearTablaListaDocumentos() {

  var table_doc = $('#tabla_listar_documentos').DataTable();
  table_doc.destroy();

  tablaPopups = $('#tabla_listar_documentos').dataTable({
    "ordering": false,
    data: documentos['docs'],
    "columns": documentos['campos'],
    "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
      $.each($(nRow).find('td'), function (a, b) {
        if (a == '1') {
          $(b).html('');
          $(b).html('<a href="uploads/adjuntos/' + aData['adjunto'][0] + '" target="blank"><i class="fa fa-paperclip fa-lg"></i> ' + aData["adjunto"][1] + '</a>');
        }
        if (a == '3') {
          $(b).addClass('del_doc');
          $(b).attr('id_doc', aData.id);
          $(b).attr('onclick', 'quitar_documento(this)');
        }
        if (a == 0 || a == 2) {
          $(b).click(function () {
            location.href = "index.php?modulo=documentos&accion=editar&registro=" + aData.id;
          });
        }
      });

    }
  });
}

function adjunto(obj) {
  var ext = $(obj).val().split('.').pop().toLowerCase();
  if ($.inArray(ext, ['doc', 'docx', 'pdf', 'xls', 'xlsx']) == -1) {
    alert('Documento no valido!');
    $(obj).val('');
    $(obj).parent().parent().addClass('has-error')
  }
}