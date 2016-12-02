id_calendario = '#calendarioNiceCRM';

function renderCalendar() {
  try {
    $(id_calendario).fullCalendar({
      defaultView: 'agendaWeek',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      eventClick: function (event, jsEvent, view) {
         window.open("index.php?modulo=actividades&accion=editar&registro="+event.id,'_blank');
        //obtenerDialogoActividad(cargarEventos(event.id), event);
        //campos_tipo_calendario();
      },
      editable: true,
      selectable: true,
      eventDragStop: function (event, jsEvent, ui, view) {
        //            console.log(jsEvent);
        bootbox.confirm(s3vars.L_MOD.lbl_confirmacion, function (result) {
          if (result) {
            var actualizar = actulizarDataDropStopReSize(event);
            cargarEventos(event.id, actualizar);
          } else {
            $(id_calendario).fullCalendar('destroy');
            renderCalendar(id_calendario);
          }

        });
      },
      eventResize: function (event, delta, revertFunc) {

        bootbox.confirm(s3vars.L_MOD.lbl_confirmacion_hora, function (result) {
          if (result) {
            var actualizar = actulizarDataDropStopReSize(event);
            cargarEventos(event.id, actualizar);
          } else {
            revertFunc();
          }
        });

      },
      select: function (start, end) {
        //            console.log(moment(start._d).format("YYYY-MM-DD"));
        //            console.log(moment(end._d).format("YYYY-MM-DD"));
        var fechaActual = new Date();

        var hora = fechaActual.getHours();
        var meridiano = "AM";
        var minutos = fechaActual.getMinutes();
        if (parseInt(minutos) > 45 && parseInt(minutos) < 60) {
          hora += 1;
        } else if (parseInt(minutos) > 30 && parseInt(minutos) < 46) {
          minutos = 45;
        } else if (parseInt(minutos) > 15 && parseInt(minutos) < 31) {
          minutos = 30;
        } else {
          minutos = 15;
        }
        if (parseInt(hora) > 11) {
          meridiano = "PM";
        }
        if (parseInt(hora) > 12) {
          hora = hora - 12;
        }
        var horaF = hora + 1;
        if (parseInt(hora) < 10) {
          hora = "0" + hora;
        }
        var meridianoF = "AM";
        if (parseInt(horaF) > 11) {
          meridianoF = "PM";
        }
        if (parseInt(horaF) > 12) {
          horaF = horaF - 12;
        }
        if (parseInt(horaF) < 10) {
          horaF = "0" + horaF;
        }
        var data = {
          'start': moment(start._d).add(1, 'days').format("YYYY-MM-DD"),
          'end': moment(end._d).format("YYYY-MM-DD"),
          'fecha_inicio_hora': hora,
          'fecha_inicio_minutos': minutos,
          'fecha_inicio_am': meridiano,
          'fecha_fin_minutos': minutos,
          'fecha_fin_hora': horaF,
          'fecha_fin_am': meridianoF,
          'id': '-1',
          //'start': moment(start._d).add(1, 'days').format("YYYY-MM-DD"),
          //        'start': moment(start._d).format("YYYY-MM-DD"),
          //                'end': moment(end._d).format("YYYY-MM-DD"),
        };
        obtenerDialogoActividad(data);
      },
       eventAfterAllRender: function () {
        
        //$("#cargar_calendario").addClass("hidden");
        //$("#calendarioNiceCRM").removeClass("hidden");
          console.log("car -- -grdo---");
        },
      eventLimit: true, // allow "more" link when too many events
      events: cargarEventos(),
      timeFormat: 'hh:mm A',
      axisFormat: 'hh:mm A'
    });
  } catch (ex) {
    console.log(ex);
  }
}

function obtenerDialogoActividad(datos, event) {
 
  if (datos.id > 0) {
    bootbox.dialog({
      title: (datos.id >= 0) ? s3vars.L_MOD.lbl_editar_actividad : s3vars.L_MOD.lbl_nueva_actividad,
      message: obtenerFormularioActividad(datos), //data
      buttons: {
        success: {
          label: s3vars.L_APP.lbl_boton_guardar,
          className: "btn-primary",
          callback: function () {
            if (validarFormulario_calendario()) {
              $.ajax({
                url: 'index.php?modulo=actividades&accion=editar&ajax=true',
                type: 'POST',
                dataType: 'json',
                async: false,
                data: $('#form_actividades').serialize(),
                success: function (data) {
                  //console.log(data);
                  if (data) {

                    var eventData = {
                      'id': data.id,
                      'title': data.nombre,
                      'start': data.fecha_inicio,
                      'end': data.fecha_fin,
                      'nuevo': data.nuevo,
                    };
                    renderCalendar();
                    if (eventData.nuevo) {
                      $(id_calendario).fullCalendar('renderEvent', eventData, true); // stick? = true
                    } else {
                      event.title = eventData.title;
                      event.start = eventData.start;
                      event.end = eventData.end;
                      $(id_calendario).fullCalendar('updateEvent', event); // stick? = true
                    }
                  }
                }
              });
            } else {
              return false;
            }

          }
        }
      }
    });
    $(".datepicker").css("z-index", '10000');
    cambioTipo();
    cambioCategoria();
    try {
      $('#jqxFileUpload').jqxFileUpload({
        theme: 'energyblue',
        width: 300,
        uploadUrl: null,
        fileInputName: 'fileInput'
      });

      $('#jqxButton').jqxButton({
        height: '40px',
        width: '100px'
      });

      $('#jqxButton').on('click', function () {
        $('#jqxFileUpload').jqxFileUpload('browse');
      });
    } catch (ex) {

    }
    /* REGLAS */
    //$("#estado_id option[value='50']").attr('disabled', 'disabled');
  }

}

function cargarEventos(id, actualizar) {

  var user = "&usuario="+ $("#usuario_calendario").val();
  var update = '';
  if (id) {
    id = '&id=' + id;
    if (actualizar) {
      update = "&actualizar=true";
      var datos_request = actualizar;
    }
  } else {
    id = '';
    $("#cargar_calendario").removeClass("hidden");
  }
  var datos;
  $.ajax({
    url: 'index.php?modulo=actividades&accion=obtenerActividades' + id + update + user,
    type: 'POST',
    dataType: 'json',
    data: datos_request,
    async: false,
    success: function (data) {
      datos = data;
      $("#cargar_calendario").addClass("hidden");
      //window.location.assign("index.php?modulo=actividades&accion=editar&registro="+datos.id);
      console.log(datos);
      //console.error(data);
    }
  });
  return datos;
}

function actulizarDataDropStopReSize(event) {

  //    console.log(event);
  var fecha_inicio = event.start._d;
  fecha_inicio = fecha_inicio.getUTCFullYear() + "-" + (fecha_inicio.getUTCMonth() + 1) + "-" + fecha_inicio.getUTCDate();
  //+ " " + fecha_inicio.getUTCHours() + ":" + fecha_inicio.getUTCMinutes() + ":" + fecha_inicio.getUTCSeconds();
  var fecha_fin = event.end._d;
  fecha_fin = fecha_fin.getUTCFullYear() + "-" + (fecha_fin.getUTCMonth() + 1) + "-" + fecha_fin.getUTCDate();
  //+ " " + fecha_fin.getUTCHours() + ":" + fecha_fin.getUTCMinutes() + ":" + fecha_fin.getUTCSeconds();
  var datos = {
    'id': event.id,
    'nombre': event.title,
    'fecha_inicio': fecha_inicio,
    'fecha_fin': fecha_fin,
    'hora_inicio': fecha_inicio.getUTCHours() + ":" + fecha_inicio.getUTCMinutes() + ':00',
    'hora_fin': fecha_fin.getUTCHours() + ":" + fecha_fin.getUTCMinutes() + ':00',
    'tipo': event.tipo,
    'relacionado': event.relacionado,
    'relacionado_id': event.relacionado_id,
    'estado': event.estado,
    'aviso': event.aviso,
    'prioridad': event.prioridad,
    'contacto': event.contacto,
    'duracion': event.duracion,
    'tipo_llamada': event.tipo_llamada,
    'lugar': event.lugar,
    'descripcion': event.descripcion,
  };
  return datos;
}

$(document).ready(function () {

  bootbox.setDefaults({
    locale: "es"
  });
  renderCalendar();

  $("#usuario_calendario").change(function(){
    var userID = $("#usuario_calendario").select2('val');
    console.log(userID);
    //$("#cargar_calendario").removeClass("hidden");
    //$("#calendarioNiceCRM").addClass("hidden");
    //$('#calendarioNiceCRM').fullCalendar('removeEvents');
    //$('#calendarioNiceCRM').fullCalendar('refetchEvents');
    $(id_calendario).fullCalendar('destroy');
            renderCalendar(id_calendario);
    //$('#calendarioNiceCRM').fullCalendar('addEventSource', 'index.php?modulo=actividades&accion=obtenerActividades&usuario='+userID);
    //$('#calendarioNiceCRM').fullCalendar('refetchEvents');
    
  });

  triggersInvitado_act();
});


function t_modulo_actividad_act(obj) {
  //define la lista de cliente o de usuarios

  option = '';
  option = '<option value="-1">Seleccionar</option>';
  if ($(obj).val() == '1') {
    for (i = 0; i < s3vars.clientes_calendario.length; i++) {
      option += '<option value="' + s3vars.clientes_calendario[i]['id'] + '">' + s3vars.clientes_calendario[i]['nombre'] + '</option>';
    }
  }
  if ($(obj).val() == '2') {
    for (i = 0; i < s3vars.usuarios_calendario.length; i++) {
      option += '<option value="' + s3vars.usuarios_calendario[i]['id'] + '">' + s3vars.usuarios_calendario[i]['nombre'] + '</option>';
    }
  }


  $($(obj).parent().parent()[0]['children'][3]['children'][1]).html('');
  $($(obj).parent().parent()[0]['children'][3]['children'][1]).append(option);
  $($(obj).parent().parent()[0]['children'][3]['children'][1]).select2("val", "-1");

  //    $($($(obj).parent().parent()[0]['children'][3]).children()[1][0]).html('');
  //    console.log($($($(obj).parent().parent()[0]['children'][3]).children()[1]));
  //    $($($(obj).parent().parent()[0]['children'][3]).children()[1][0]).append(option);
}

function obtener_email_actividad(obj) {
  id = $(obj).val();
}



function cargar_invitados_cal(id) {
  var invitados = '';
  $.ajax({
    type: "POST",
    url: 'index.php?modulo=actividades&accion=obtenerinvitados',
    data: 'id=' + id,
    dataType: "json",
    async: false,
    //        processData: false,
    //        contentType: false
  }).done(function (result) {
    //        console.log(result);
    invitados = result;
  });

 
  return invitados;
}

function campos_tipo_calendario() {
  op = $("#tipo").val();

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
