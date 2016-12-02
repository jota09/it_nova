var fila_hija = 1;
var tbl_pend;
$(document).ready(function () {
   
   var filtroNum = document.getElementById("filtroNum"),
   filtroRef = document.getElementById("filtroReferencia"),
   filtroEst = document.getElementById("filtroEstado"),
   filtroValD = document.getElementById("filtroValorD"),
   filtroValH = document.getElementById("filtroValorH"),
    intervalo;
    
   filtroNum.addEventListener("keyup", function(){
        clearInterval(intervalo); //Al escribir, limpio el intervalo
        intervalo = setInterval(function(){ //Y vuelve a iniciar
            obtenerRegistrosFiltro(); //Cumplido el tiempo, se realiza el filtro
            clearInterval(intervalo); //Limpio el intervalo
        }, 1000);
    }, false);
   filtroRef.addEventListener("keyup", function(){
        clearInterval(intervalo); //Al escribir, limpio el intervalo
        intervalo = setInterval(function(){ //Y vuelve a iniciar
            obtenerRegistrosFiltro(); //Cumplido el tiempo, se realiza el filtro
            clearInterval(intervalo); //Limpio el intervalo
        }, 1000);
    }, false);
   filtroEst.addEventListener("keyup", function(){
        clearInterval(intervalo); //Al escribir, limpio el intervalo
        intervalo = setInterval(function(){ //Y vuelve a iniciar
            obtenerRegistrosFiltro(); //Cumplido el tiempo, se realiza el filtro
            clearInterval(intervalo); //Limpio el intervalo
        }, 1000);
    }, false);
   filtroValD.addEventListener("keyup", function(){
        clearInterval(intervalo); //Al escribir, limpio el intervalo
        intervalo = setInterval(function(){ //Y vuelve a iniciar
            obtenerRegistrosFiltro(); //Cumplido el tiempo, se realiza el filtro
            clearInterval(intervalo); //Limpio el intervalo
        }, 1000);
    }, false);
   filtroValH.addEventListener("keyup", function(){
        clearInterval(intervalo); //Al escribir, limpio el intervalo
        intervalo = setInterval(function(){ //Y vuelve a iniciar
            obtenerRegistrosFiltro(); //Cumplido el tiempo, se realiza el filtro
            clearInterval(intervalo); //Limpio el intervalo
        }, 1000);
    }, false);
   
   
    $('#filtroFechaD').datepicker().on('changeDate', function (ev) {
        obtenerRegistrosFiltro();
    });
    $('#filtroFechaH').datepicker().on('changeDate', function (ev) {
        obtenerRegistrosFiltro();
    });

   $("#eliminar_hide_tipo").click(function () {
      $(".sel_tipo_Act").removeClass("hidden");
      $(".sel_tipo_Act_hija").removeClass("hidden");
   });

   $(".modal-transparent").on('show.bs.modal', function () {
      setTimeout(function () {
         $(".modal-backdrop").addClass("modal-backdrop-transparent");
      }, 0);
   });
   $(".modal-transparent").on('hidden.bs.modal', function () {
      $(".modal-backdrop").addClass("modal-backdrop-transparent");
   });


   /* CREAR ACTIVIDAD */
   try {
      $('#jqxFileUpload').jqxFileUpload({
         theme: 'energyblue',
         width: 300,
         uploadUrl: null,
         fileInputName: 'fileInput'
      });

      $('#jqxButton').jqxButton({
         height: '40px', width: '100px'
      });

      $('#jqxButton').on('click', function () {
         $('#jqxFileUpload').jqxFileUpload('browse');
      });
   } catch (ex) {

   }
   /* ACEPTAR ACTIVIDAD */
   try {
      $('#jqxFileUpload2').jqxFileUpload({
         theme: 'energyblue',
         width: 300,
         uploadUrl: null,
         fileInputName: 'fileInput'
      });

      $('#jqxButton2').jqxButton({
         height: '40px', width: '100px'
      });

      $('#jqxButton2').on('click', function () {
         $('#jqxFileUpload2').jqxFileUpload('browse');
      });
   } catch (ex) {

   }

   /* CREAR ACTIVIDAD HIJA */
   try {
      $('#jqxFileUpload3').jqxFileUpload({
         theme: 'energyblue',
         width: 300,
         uploadUrl: null,
         fileInputName: 'fileInput'
      });

      $('#jqxButton3').jqxButton({
         height: '40px', width: '100px'
      });

      $('#jqxButton3').on('click', function () {
         $('#jqxFileUpload3').jqxFileUpload('browse');
      });
   } catch (ex) {

   }

   $(".cmpst").css({display: 'none'});
   $(".plan").css({display: 'none'});
   $(".invitacion").css({display: 'none'});
   $(".tarea").css({display: 'none'});
   $(".reunion").css({display: 'none'});
   $(".cmpst_hija").css({display: 'none'});
   $(".cmpst").css({display: 'none'});

   $(".tipo_id").change(function (k, v) {
      var identificador = this.id.split("_");

      console.log(identificador);
      if (identificador[2]) {

         $(".cmpst_hija").css({display: 'none'});
         $(".smpl_hija").css({display: 'none'});
         if ($(this).val() == 39) { //smpl
            $(".smpl_hija").css({display: 'inline'});
         }
         if ($(this).val() == 40) { //compuesta
            $(".cmpst_hija").css({display: 'inline'});
         }
         /*MOSTAR CARGUE DE ARCHIVOS */
         $(".sel_tipo_Act_hija").removeClass("hidden");
      } else {
         $(".smpl").css({display: 'none'});
         $(".cmpst").css({display: 'none'});

         if ($(this).val() == 39) { //smpl
            $(".smpl").css({display: 'inline'});

            $('#nueva_actividad #responsable_id').select2('readonly', false);
            $("#nueva_actividad #responsable_id").select2("val", "");
         }
         if ($(this).val() == 40) { //compuesta
            $(".cmpst").css({display: 'inline'});
            $("#nueva_actividad #responsable_id").select2("val", $("#usuarioIdSession").val());
            $('#nueva_actividad #responsable_id').select2('readonly', true);

         }
         /*MOSTAR CARGUE DE ARCHIVOS */
         $(".sel_tipo_Act").removeClass("hidden");
      }

   });

   $(".categoria_id").change(function (k, v) {

      var identificador = this.id.split("_");
      console.log("hija " + identificador[2]);
      if (identificador[2] === 'hija') {

         $(".plan_hija").css({display: 'none'});
         $(".invitacion_hija").css({display: 'none'});
         $(".solicitud_hija").css({display: 'none'});
         $(".tarea_hija").css({display: 'none'});
         $(".reunion_hija").css({display: 'none'});

         if ($(this).val() == 41) { //plan
            $(".plan_hija").css({display: 'inline'});
         }
         if ($(this).val() == 42) { //invitacion
            $(".invitacion_hija").css({display: 'block'});

         }
         if ($(this).val() == 44) { // tarea
            $(".tarea_hija").css({display: 'inline'});
         }
         if ($(this).val() == 43) { // solicutud
            $(".solicitud_hija").css({display: 'inline'});
         }
         if ($(this).val() == 45) { // reunion
            $(".reunion_hija").css({display: 'inline'});
         }
         if ($(this).val() == 41 || $(this).val() == 44) {

            $("#nueva_actividad_hija #responsable_id_hija").select2("val", $("#usuarioIdSession").val());
         } else {
            $("#nueva_actividad_hija #responsable_id_hija").select2("val", "");
         }
      } else {
         $(".plan").css({display: 'none'});
         $(".invitacion").css({display: 'none'});
         $(".solicitud").css({display: 'none'});
         $(".tarea").css({display: 'none'});
         $(".reunion").css({display: 'none'});

         if ($(this).val() == 41) { //plan
            $(".plan").css({display: 'inline'});
         }
         if ($(this).val() == 42) { //invitacion
            $(".invitacion").css({display: 'block'});
            $("#informar_a option[value='67']").remove();
         }
         if ($(this).val() == 44) { // tarea 
            $(".tarea").css({display: 'inline'});
         }
         if ($(this).val() == 43) { // solicutud
            $(".solicitud").css({display: 'inline'});
         }
         if ($(this).val() == 45) { // reunion
            $(".reunion").css({display: 'inline'});
         }
         if ($(this).val() == 41 || $(this).val() == 44) {

            $("#nueva_actividad #responsable_id").select2("val", $("#usuarioIdSession").val());
            $('#nueva_actividad #responsable_id').select2('readonly', true);
         } else {
            if ($("#tipo_id").val() == 39) {
               $('#nueva_actividad #responsable_id').select2('readonly', false);
               $("#nueva_actividad #responsable_id").select2("val", "");
            }
         }
         if ($("#tipo_id").val() == 40) {
            $(".cmpst").css({display: 'inline'});
            $(".smpl").css({display: 'none'});
         }
      }
   });


   $("#btn_agregar_actividad_hija").click(function () {
      $("#nueva_actividad_hija #eliminado").val(1);
      $('#nueva_actividad').modal('hide');
      $('.examinar_act_hija').val('Examinar');
      $(".cmpst_hija").css({display: 'none'});
      $(".smpl_hija").css({display: 'none'});
      $(".plan_hija").css({display: 'none'});
      $(".invitacion_hija").css({display: 'none'});
      $(".solicitud_hija").css({display: 'none'});
      $(".tarea_hija").css({display: 'none'});
      $(".reunion_hija").css({display: 'none'});

   });

   $("#nueva_actividad_hija").on('hidden.bs.modal', function () {
      $("#nueva_actividad").modal("show");
   });

   /*$(".cancelar_nueva_act_hija").click(function () {
    $("#nueva_actividad_hija #eliminado").val(1);
    
    $('#nueva_actividad').modal('show');
    });*/



   $('select').each(function (i, o) {
      $(o).select2();
   });

   $('#form_actividades').submit(function () {
      crear_actividad();
      return $('#form_actividades').validationEngine('validate');
   });



   $('#form_actividad_aceptada').submit(function () {
      aceptar_actividad();
      return false;//$('#form_actividad_aceptada').validationEngine();
   });

   $('#form_actividad_rechazada').submit(function () {
      rechazar_actividad();
      return false;//$('#form_actividad_aceptada').validationEngine();
   });

    obtenerRegistros();

   $('.limpiar_nueva_contacto').find('input,select,textarea').val('');
    $('#nueva_contacto').modal('hide');
   
   tbl_asig = $('#mis_asignadas').dataTable({
      "ordering": false,
      "processing": true,
      "ajax": {
         "url": "index.php?modulo=actividades&accion=filtrarActAsignadas",
         "type": "POST",
         "data": function (d) {
            d.referencia = $("#filtro_a_referencia").val();
            d.usuario = $("#filtro_a_usuario").val();
            d.fecha_desde = $("#filtro_a_fecha_desde").val();
            d.fecha_hasta = $("#filtro_a_fecha_hasta").val();
            d.codigo = $("#filtro_a_codigo").val();
         }
      },
      "columns": [
         {data: "id"}, {data: "nombre"}, {data: "categoria"}, {data: "usuario"},
         {data: "fecha_fin", className: "text-center"}, {data: "vacio", className: "td_asignado"}
      ],
      "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

      }
   });

   $(".cancelar_nueva_act_hija").click(function (k, v) {
      $('#nueva_actividad_hija').modal('hide');
      $('#nueva_actividad').modal('show');
   });

   $("#limpiar_a").click(function () {
      $("#filtro_act_asignada input").val("");
      $("#filtro_act_asignada select").val(null).trigger("change");
   });

   $("#limpiar_p").click(function () {
      $("#filtro_act_pendiente input").val("");
      $("#filtro_act_pendiente select").val(null).trigger("change");
   });

});

function crear_actividad() {
   //sconsole.log("crear_actividad");
   $.each($(".select2-container"), function ($k, $v) {
      //console.log($v.id);
      $("#" + $v.id).removeClass("validate[required]");
   });

   var bandera = $('#form_actividades').validationEngine('validate');
   cargaDatePicker();

   if (bandera) {
      $("#nueva_act_esperar").removeClass("hidden").parent().attr('disabled', 'disabled').css({'background-color': 'gray'});

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
               //console.log(data);
               $('#form_actividades').find('input,select,textarea').val('');
               $('#form_actividades select').each(function (i, o) {
                  $(o).select2("val", "");
               });
               $('#modal-transparent').modal('toggle');
               setTimeout(function () {
                  $('#modal-transparent').modal('toggle');
                  location.reload();
               }, 1000);
               $("#nueva_act_esperar").addClass("hidden").parent().removeAttr('disabled').css({'background-color': '#e3303d'});
               $('#nueva_actividad').modal('hide');
               $("#div_agregar_actividad").remove();
               $("#div_agregar_invitados").html("");
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
            //console.log(data);
            $('#form_actividades').find('input,select,textarea').val('');
            $('select').each(function (i, o) {
               $(o).select2("val", "");
            });
            $('#modal-transparent').modal('toggle');
            setTimeout(function () {
               $('#modal-transparent').modal('toggle');
               location.reload();
            }, 1000);
            $("#div_agregar_invitados").html("");
            $("#nueva_act_esperar").addClass("hidden").parent().removeAttr('disabled').css({'background-color': '#e3303d'});
            $('#nueva_actividad').modal('hide');
         });

      }

   }

   return bandera;

}

function agregarActividadHija(data) {
   console.log(data);
   html = '<div class="col-sm-12">' +
           '<input type="hidden" class="id" id="hija_id_' + fila_hija + '" name="hija_id[]" value="' + data.id + '">' +
           '<input type="hidden" class="eliminado" id="hija_eliminado_' + fila_hija + '" name="hija_eliminado[]" value="0">' +
           '<div class="control-label col-sm-3">' + data.nombre + '</div>' +
           '<div class="control-label col-sm-3">';

   for (var i = 0; i < s3vars.usuarios.length; i++) {
      if (data.responsable_id == s3vars.usuarios[i].id) {
         html += s3vars.usuarios[i].nombres;
      }
   }

   html += '</div>' +
           '<div class="col-sm-2  no-padding" style="width: 70px;">' +
           '<input type="text" class="form-control numberFloat validate[required]" value="" id="porcentaje_hija_' + fila_hija + '" name="porcentaje_hija[]" onkeyup="calcular();">' +
           '</div>' +
           '<div class="control-label col-sm-2"  style="width: 160px; text-align: right; ">' + data.fecha_fin + ' </div>' +
           '<div class="control-label col-sm-1 no-padding" style="width: 105px;">' + data.hora_fin + ' </div>' +
           '<div class="control-label col-sm-1">' +
           '<button type="button"  class="btn btn_eliminar_reg_actividad btn-primary"><i class="fa fa-minus"></i></button>' +
           '</div>' +
           '</div>';

   $('#div_agregar_actividad').append(html);
   triggersActividad();

   $('.numberFloat').number(true, 2, ',', '.');
   cargaDatePicker();
   fila_hija++;
   $('select').each(function (i, o) {
      $(o).select2();
   });
}

function triggersActividad() {
   $('.btn_eliminar_reg_actividad').click(function () {
      eliminarCampoRegistroActividad($(this).parent().parent());
   });

}

function eliminarCampoRegistroActividad(div) {
   if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
      $(div).find('.eliminado').val(1);
      $(div).addClass('hidden');
   } else {
      $(div).remove();
   }
}

function calcular() {
   var totalizado = 0;
   for (var i = 0; i < fila_hija; i++) {
      if ($('#porcentaje_hija_' + i).val() > 0) {
         totalizado += parseFloat($('#porcentaje_hija_' + i).val(), 2);
      }
   }
   $("#totalizado").html(totalizado);
}

function rechazarActividad(actividad) {

   var r = confirm("Realmente desea rechazar esta actividad?");
   if (r == true) {
      $("#eliminar_act_" + actividad).addClass("hidden");
      $("#esperar_eli_act_" + actividad).removeClass("hidden");

      $.ajax({
         url: 'index.php?modulo=actividades&accion=rechazarActividad',
         type: "post",
         data: {actividad: actividad},
         cache: false,
         dataType: "json",
         async: false

      }).done(function (data) {
         $("#aceptar_act_" + actividad).addClass("hidden");
         $("#esperar_eli_act_" + actividad).addClass("hidden");
         //javascript:location.reload();
      });

   } else {
      // alert("Rechazar actividad " + actividad);
   }

}

function aceptar_actividad() {


   var bandera = $('#form_actividad_aceptada').validationEngine('validate');
   cargaDatePicker();

   if (bandera) {
      $("#aceptar_act_esperar").removeClass("hidden");
      var formData = new FormData($("#form_actividad_aceptada")[0]);

      $.ajax({
         url: 'index.php?modulo=actividades&accion=aceptarActividad',
         type: "post",
         dataType: "html",
         data: formData,
         cache: false,
         contentType: false,
         processData: false

      }).done(function (data) {
         console.log(data);
         $("#aceptar_act_esperar").addClass("hidden");
         $('#form_actividad_aceptada').find('input,select,textarea').val('');
         $('#aprobar_actividad').modal('hide');
         javascript:location.reload();
      });
      return false;
   }
}

function filtrarPendientes() {

   $("#filtrar_pend_esperar").removeClass("hidden");
//   $('#facturas').DataTable().ajax.reload();
   $("#filtrar_pend_esperar").addClass("hidden");
   $('#filtro_act_pendiente').modal('hide');

}

function filtrarAsignadas() {

   $("#filtrar_asig_esperar").removeClass("hidden");
   $('#mis_asignadas').DataTable().ajax.reload();
   $("#filtrar_asig_esperar").addClass("hidden");
   $('#filtro_act_asignada').modal('hide');

}

function marcarActividad(id) {
   //console.log(id);
   $("#registroACt").val(id);
   $("#registroACt_r").val(id);
   $(".ocultar_reunion").removeClass("hidden");
   if ($("#isMeeting").val() == 1) {
      $(".ocultar_reunion").addClass("hidden");
   }
}

function rechazar_actividad() {

   $.each($("#form_actividad_rechazada .select2-container"), function ($k, $v) {
      //console.log($v.id);
      $("#" + $v.id).removeClass("validate[required]");
   });
   var bandera = $('#form_actividad_rechazada').validationEngine('validate');
   cargaDatePicker();

   if (bandera) {
      $("#rechazar_act_esperar").removeClass("hidden");
      var formData = new FormData($("#form_actividad_rechazada")[0]);

      $.ajax({
         url: 'index.php?modulo=actividades&accion=rechazarActividad',
         type: "post",
         dataType: "html",
         data: formData,
         cache: false,
         contentType: false,
         processData: false

      }).done(function (data) {
         console.log(data);
         $("#rechazar_act_esperar").addClass("hidden");
         $('#form_actividad_rechazada').find('input,select,textarea').val('');
         $('#rechazar_actividad').modal('hide');
         javascript:location.reload();
      });
      return false;
   }
}

function crear_actividad_hija() {

   $.each($("#form_actividades_hija .select2-container"), function ($k, $v) {
      //console.log($v.id);
      $("#" + $v.id).removeClass("validate[required]");
   });

   var bandera = $('#form_actividades_hija').validationEngine('validate');
   cargaDatePicker();

   if (bandera) {
      $("#nueva_act_hija_esperar").removeClass("hidden");
      var formData = new FormData($("#form_actividades_hija")[0]);

      $.ajax({
         url: 'index.php?modulo=actividades&accion=Crear_actividad',
         type: "post",
         dataType: "json",
         data: formData,
         cache: false,
         contentType: false,
         processData: false
      }).done(function (data) {
         //console.log(data);

         agregarActividadHija(data);
         $('#form_actividades_hija #jqxFileUpload3').jqxFileUpload('cancelAll');
         $('#form_actividades_hija').find('input,select,textarea').val('');
         $('#form_actividades_hija select').each(function (i, o) {
            $(o).select2("val", "");
         });
         $('#tipo_id_hija').each(function (i, o) {
            $(o).select2("val", "39");
         });
         $("#div_agregar_invitados_hija").html("");
         $("#nueva_act_hija_esperar").addClass("hidden");
         $('#nueva_actividad_hija').modal('hide');
         $('#nueva_actividad').modal('show');

      });
   }

   return false;

}

function cancelarActividad(actividad) {

   var r = confirm("Realmente desea cambiar esta actividad a Cumplida y cerrada?");
   if (r == true) {
      $("#cancelar_act_" + actividad).addClass("hidden");
      $("#esperar_cancel_act_" + actividad).removeClass("hidden");

      $.ajax({
         url: 'index.php?modulo=actividades&accion=cancelarActividad',
         type: "post",
         data: {actividad: actividad},
         cache: false,
         dataType: "json",
         async: false

      }).done(function (data) {

         $("#cancelar_act_" + actividad).parent().parent().hide(2000, function () {
            $(this).remove();
         });
      });

   } else {
      // alert("Rechazar actividad " + actividad);
   }
}
function crearTablaListaContactos(result) {
   
   var tabla = $('#facturas').DataTable();
   tabla.destroy();
   var tablaPopups = $('#facturas').DataTable({
        "ordering": false,
        bFilter: false,
        data: result['factura'],
        "columns": result['campos'],
        "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
         $.each($(nRow).find('td'), function (a, b) {
                $(b).addClass('text-center');
                if (a == '7') {
                   if(aData.bandera == 1){
                    $(b).html('<a title="PDF Factura" href="assets/img/general/factura-itnova.pdf" \n\
   target="_blank"><img src="assets/img/modulos/pdf_icono.png">\n\
</a><a title="XML Factura" href="index.php?modulo=home&accion=descargarXml" target="_blank"><img src="assets/img/modulos/xml_icono.png"></a>\n\
<a data-id=' + aData.id + ' data-numero=' + aData.numero_factura + ' style="cursor: pointer;" onclick="rechazo_factura(this)"><img src="assets/img/modulos/Cancelar.png"></a>');}
               else{
                  $(b).html('<a title="PDF Factura" href="assets/img/general/factura-itnova.pdf" \n\
   target="_blank"><img src="assets/img/modulos/pdf_icono.png"></a><a title="XML Factura"\n\
 href="index.php?modulo=home&accion=descargarXml" target="_blank"><img src="assets/img/modulos/xml_icono.png"></a>\n\
<div class="invisible" width="24" style="display: contents;">spac</div>');
               }
                }
            });
        }
    });
  preload();
}
function cambiar_estado_factura(obj) {
    bootbox.alert({
        message: "Fue enviado un mensaje de rechazo de la factura No " + $(obj).attr('data-numero') + " para que ésta sea anulada o cancelada"
    });
}
function rechazo_factura(obj) {
        bootbox.confirm({
        message:'<div class="form-group">'+
         '<label for="descripcion" class="fontSize16px">Raz&oacute;n de el rechazo de la factura:</label>'+
         '<textarea class="form-control" id="descripcion" name="descripcion" placeholder="Describa los '+
         'motivos por los que se rechaza la factura..."></textarea>'+
         '</div>',
        title: "Rechazo factura",
        buttons: {
            confirm: {
                label: '&nbsp;Si&nbsp;',
                className: 'btn btn-primary'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
           if(result){
           $.ajax({
            type: "POST",
            url: 'index.php?modulo=home&accion=cambiarEstadoFactura',
            data: 'id=' + $(obj).attr('data-id') + '&descripcion='+ $('#descripcion').val(),
            dataType: "json",
            async: false
            }).done(function (result) {
               obtenerRegistros();
               setTimeout(cambiar_estado_factura(obj),2000);
            });
         }
        }
    });
}
function obtenerRegistros() {
    $.ajax({
        type: "POST",
        url: 'index.php?modulo=home&accion=obtenerFacturas',
        data: 'modulo_name=' + s3vars.modulo,
        dataType: "json",
    }).done(function (result) {
       crearTablaListaContactos(result);
                
    });
    }
function obtenerRegistrosFiltro() {
   setTimeout(function(){
    $.ajax({
        type: "POST",
        url: 'index.php?modulo=home&accion=obtenerFacturasFiltro',
        data: 'numero_factura=' + $('#filtroNum').val() + '&referencia=' + $('#filtroReferencia').val() + '&estado_id=' + $('#filtroEstado').val() + '&valorD=' + $('#filtroValorD').val() + '&valorH=' + $('#filtroValorH').val() + '&fechaD=' + $('#filtroFechaD').val() + '&fechaH=' + $('#filtroFechaH').val(),
        dataType: "json"
    }).done(function (result) {
       crearTablaListaContactos(result);
                
    });
   },1500);
   
   
   
    }
function preload() { // makes sure the whole site is loaded 
   setTimeout(function(){
   $('#status').fadeOut(); // will first fade out the loading animation 
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('table #facturas').delay(350).css({'overflow':'visible'});
  $("#tabla_facturas").removeClass("invisible");
  $("#cantidadFacturas").removeClass("invisible");
   },5000);
  
}