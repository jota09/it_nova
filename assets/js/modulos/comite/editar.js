
$(document).ready(function () {

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


   $('#btn_buscar').click(function () {
      buscarRegistros();
   });
   buscarRegistros();
   
   $('#btn_buscar_historico').click(function () {
      buscarRegistrosHistorico();
   });
   buscarRegistrosHistorico();

   $(".cmpst").css({display: 'none'});
   $(".plan").css({display: 'none'});
   $(".invitacion").css({display: 'none'});
   $(".tarea").css({display: 'none'});
   $(".reunion").css({display: 'none'});

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


   $(".plan").css({display: 'none'});
   $(".invitacion").css({display: 'none'});
   $(".solicitud").css({display: 'none'});
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
      console.log(identificador);
      if (identificador[2]) {

         $(".plan_hija").css({display: 'none'});
         $(".invitacion_hija").css({display: 'none'});
         $(".solicitud_hija").css({display: 'none'});
         $(".tarea_hija").css({display: 'none'});
         $(".reunion_hija").css({display: 'none'});

         if ($(this).val() == 41) { //plan
            $(".plan_hija").css({display: 'inline'});
         }
         if ($(this).val() == 42) { //invitacion
            $(".invitacion_hija").css({display: 'inline'});
         }
         if ($(this).val() == 44) { //$(this).val() == 43 || solicutud //tarea
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
            $(".invitacion").css({display: 'inline'});
         }
         if ($(this).val() == 44) { //$(this).val() == 43 || solicutud //tarea
            $(".tarea").css({display: 'inline'});
         }
         if ($(this).val() == 43) { // solicutud
            $(".solicitud").css({display: 'inline'});
            $("#informar_a option[value='67']").remove();
         }
         if ($(this).val() == 45) { // reunion
            $(".reunion").css({display: 'inline'});
         }
         if ($(this).val() == 41 || $(this).val() == 44) {

            $("#nueva_actividad #responsable_id").select2("val", $("#usuarioIdSession").val());
            $('#nueva_actividad #responsable_id').select2('readonly', true);
         } else {
            if($("#tipo_id").val() == 39){
            $('#nueva_actividad #responsable_id').select2('readonly', false);
            $("#nueva_actividad #responsable_id").select2("val", "");
         }}
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
   triggersActividad();

   $('.numberFloat').number(true, 2, ',', '.');

   $('select').each(function (i, o) {
      $(o).select2();
   });



   $('#form_actividades').submit(function () {
      crear_actividad();
      return $('#form_actividades').validationEngine('validate');
   });

   $(".cancelar_nueva_act_hija").click(function (k, v) {
      $('#nueva_actividad_hija').modal('hide');
      $('#nueva_actividad').modal('show');
   });

});

function buscarRegistros() {
   $("#cargar_busqueda").removeClass("hidden");
   data = {
      nombre: $("#nombre").val(),
      citado: $("#citado").val(),
      citar: $("#citar").val(),
      estado: $("#estado").val(),
      respuesta: $("#respuesta").val()
   };

   $.ajax({
      url: 'index.php?modulo=comite&accion=buscarRegistrosComite',
      type: "post",
      data: data,
      cache: false,
      dataType: "json",
      async: false

   }).done(function (data) {
      console.log(data);
      tablaDatos = "";
      $("#cargar_busqueda").addClass("hidden");
      if (data.length > 0) {
         tablaDatos = "<table class='table table-striped'>";
         tablaDatos += "<tr> <th>Asunto</th><th>Usuario Cita</th><th>Usuario Citado</th><th>Fecha Asignacion</th><th>Fecha Respuesta</th><th>Respuesta</th><th>Fecha Realización</th><th>Estado</th><th> &nbsp;</th> </tr>";
         $.each(data, function (k, v) {
            tablaDatos += "<tr class='" + v.id + "'> " +
                    "<td><b><a target='_blank' href='index.php?modulo=actividades&accion=editar&registro=" + v.id + "' >" + v.nombre + "</a></b></td>" +
                    "<td>" + v.ucitar + "</td>" +
                    "<td>" + v.ucitado + "</td>" +
                    "<td class='text-center'>" + v.fecha_creacion + "</td>" +
                    "<td class='text-center'>" + v.f_respuesta + "</td>" +
                    "<td>" + v.respuesta + "</td>" +
                    "<td class='text-center'>" + v.f_realizada + "</td>" +
                    "<td>" + v.estado + "</td>" +
                    "<td><button onclick='marcarActividad(" + v.id + ");' data-toggle='modal' data-target='#socializar_actividad' type='button' class='btn p_sitio '>Socializada</button></td>" +
                    "</tr>";
         });

         tablaDatos += "<table>";
      } else {
         tablaDatos = '<div class="alert alert-danger" style=" font-size:15px; margin-bottom:0px; " ><strong>Información!</strong> No se han encontrado registros.</div>';
      }

      $("#resulta_filtro").html(tablaDatos).parent().parent().removeClass("hidden");

   });
}


function crear_actividad() {
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
               console.log(data);
               $('#form_actividades').find('input,select,textarea').val('');
               $('select').each(function (i, o) {
                  $(o).select2("val", "");
               });
               $('#modal-transparent').modal('toggle');
               setTimeout(function () {
                  $('#modal-transparent').modal('toggle');
               }, 1000);
               $("#nueva_act_esperar").addClass("hidden").parent().removeAttr('disabled').css({'background-color': '#e3303d'});
               $('#nueva_actividad').modal('hide');
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
            console.log(data);
            $('#form_actividades #jqxFileUpload').jqxFileUpload('cancelAll');
            $('#form_actividades').find('input,select,textarea').val('');
            $('select').each(function (i, o) {
               $(o).select2("val", "");
            });
            $('#tipo_id').select2("val", "39");

            $('#modal-transparent').modal('toggle');
            setTimeout(function () {
               $('#modal-transparent').modal('toggle');
            }, 3500);
            $('.examinar_act').val('Examinar');
            $("#nueva_act_esperar").addClass("hidden");
            $('#nueva_actividad').modal('hide');
            $("#div_agregar_invitados").html("");
         });
      }
   }

   return bandera;

}


function agregarActividadHija() {

   html = '<div class="col-sm-12">' +
           '<input type="hidden" class="id" id="hija_id_' + fila_hija + '" name="hija_id[]" value="">' +
           '<input type="hidden" class="eliminado" id="hija_eliminado_' + fila_hija + '" name="hija_eliminado[]" value="0">' +
           '<div class="control-label col-sm-3">' +
           '<input type="text" class="form-control  validate[required]" value="" id="nombre_hija_' + fila_hija + '" name="nombre_hija[]"  >' +
           '</div>' +
           '<div class="control-label col-sm-3">' +
           '<select class="form-control " id="usuario_id_hija_' + fila_hija + '" name="usuario_id_hija[]" >' +
           ' <option value="">hola' + s3vars.L_APP.lbl_select + '</option>';

   for (var i = 0; i < s3vars.usuarios.length; i++) {

      html += ' <option value="' + s3vars.usuarios[i].id + '" >' + s3vars.usuarios[i].nombres + '</option>';

   }

   html += '</select>   ' +
           '</div>' +
           '<div class="control-label col-sm-2  no-padding" style="width: 70px;">' +
           '<input type="text" class="form-control numberFloat validate[required]" value="" id="porcentaje_hija_' + fila_hija + '" name="porcentaje_hija[]" onkeyup="calcular();">' +
           '</div>' +
           '<div class="control-label col-sm-2"  style="width: 160px;">' +
           '<div class="input-group">  <input type="text" class="form-control fecha validate[required]" value="" id="fecha_hija_' + fila_hija + '" name="fecha_hija[]" ><div class="input-group-addon"> <img src="assets/img/general/Calendario.png" /> </div> </div> </div>' +
           '<div class="control-label col-sm-1 no-padding" style="width: 105px;">' +
           '<div class="input-group">   <input type="text" class="form-control hora validate[required]" value="" id="hora_hija_' + fila_hija + '" name="hora_hija[]" > <div class="input-group-addon"> <i class="fa fa-clock-o" style="font-size: 28px;"></i> </div> </div>' +
           '</div>' +
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

function marcarActividad(id) {
   //console.log(id);
   $("#registroACt_s").val(id);

}

function socializar_actividad() {

   var actividadId = $("#registroACt_s").val();
   var bandera = $('#form_actividad_socializada').validationEngine('validate');

   if (bandera) {
      $("#socializar_act_esperar").removeClass("hidden");
      var formData = new FormData($("#form_actividad_socializada")[0]);

      $.ajax({
         url: 'index.php?modulo=comite&accion=socializarActividad',
         type: "post",
         dataType: "html",
         data: formData,
         cache: false,
         contentType: false,
         processData: false

      }).done(function (data) {
         $("#socializar_act_esperar").addClass("hidden");
         $('#form_actividad_socializada').find('input,select,textarea').val('');
         $('#socializar_actividad').modal('hide');
         //console.log('$('+data+').addClass("hidden")');
         $("." + data).addClass("hidden");

      });

   }
   return false;
}

function buscarRegistrosHistorico() {
   $("#cargar_busqueda_historico").removeClass("hidden");
   data = {
      nombre: $("#nombre").val(),
      citado: $("#citado").val(),
      citar: $("#citar").val(),
      estado: $("#estado").val(),
      respuesta: $("#respuesta").val()
   };

   $.ajax({
      url: 'index.php?modulo=comite&accion=buscarRegistrosComiteHistorico',
      type: "post",
      data: data,
      cache: false,
      dataType: "json",
      async: false

   }).done(function (data) {
      console.log(data);
      tablaDatos = "";
      $("#cargar_busqueda_historico").addClass("hidden");
      if (data.length > 0) {
         tablaDatos = "<table class='table table-striped'>";
         tablaDatos += "<tr> <th>Asunto</th><th>Usuario Cita</th><th>Usuario Citado</th><th>Fecha Asignacion</th><th>Fecha Respuesta</th><th>Respuesta</th><th>Fecha Realización</th><th>Estado</th> </tr>";
         $.each(data, function (k, v) {
            tablaDatos += "<tr class='" + v.id + "'> " +
                    "<td><b><a target='_blank' href='index.php?modulo=actividades&accion=editar&registro=" + v.id + "' >" + v.nombre + "</a></b></td>" +
                    "<td>" + v.ucitar + "</td>" +
                    "<td>" + v.ucitado + "</td>" +
                    "<td class='text-center'>" + v.fecha_creacion + "</td>" +
                    "<td class='text-center'>" + v.f_respuesta + "</td>" +
                    "<td>" + v.respuesta + "</td>" +
                    "<td class='text-center'>" + v.f_realizada + "</td>" +
                    "<td>" + v.estado + "</td>" +
                    "</tr>";
         });

         tablaDatos += "<table>";
      } else {
         tablaDatos = '<div class="alert alert-danger" style=" font-size:15px; margin-bottom:0px; " ><strong>Información!</strong> No se han encontrado registros.</div>';
      }

      $("#resulta_filtro_historico").html(tablaDatos).parent().parent().removeClass("hidden");

   });
}