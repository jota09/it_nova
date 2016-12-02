$(document).ready(function () {

   if ($("#tkn_cmb_pss").val() != "") {
      $("#cambiarContrasea").modal("show");
   }

   $("#btn_validar").click(function () {

      var valor = $('#recuperar_documento').val();

      if ($.trim(valor) == "" || $("#recuperar_documento").hasClass("invalid") || $("#btn_recuperar").hasClass("disabled")) {
         if ($.trim(valor) == "") {
            $("#msgAlert").html("El numero de documento es obligatorio.");

         }
         $("#khazerAlert").modal("show");
      } else {
         if( !isNaN(valor) ) {
            consultar_documento();
           }
      else {
         $("#msgAlert").html("Solo numeros por favor.");
         $("#khazerAlert").modal("show");
      }
   }
   });
   $("#btn_validar2").click(function () {

      var valor = $('#recuperar_documento2').val();

      if ($.trim(valor) == "" || $("#recuperar_documento2").hasClass("invalid") || $("#btn_recuperar").hasClass("disabled")) {
         if ($.trim(valor) == "") {
            $("#msgAlert").html("El numero de documento es obligatorio.");

         }
         $("#khazerAlert").modal("show");
      } else {
         if( !isNaN(valor) ) {
             consultar_documento2();
         }
      else {
         $("#msgAlert").html("Solo numeros por favor.");
         $("#khazerAlert").modal("show");
      }
   }
   });
   
   
 
      $("#btn_accesos").click(function () {

      var valor = $('#recuperar_documento').val();

      if ($.trim(valor) == "" || $("#recuperar_documento").hasClass("invalid") || $("#btn_recuperar").hasClass("disabled")) {
         if ($.trim(valor) == "") {
            $("#msgAlert").html("El numero de documento es obligatorio.");

         }
         $("#khazerAlert").modal("show");
      } else {
         if( !isNaN(valor) ) {
         //$('#Esperar').modal("show");
         $("#btn_recuperar").removeClass("waves-effect waves-light light-blue darken-4");
         $("#btn_recuperar").addClass("disabled");
         var datos = {
            'modulo': 'usuarios',
            'accion': 'Recuperar',
            valor: valor,
            ajax: true
         };

         $("#recordarcontrasea_esperar").removeClass("hidden");
         $.ajax({
            url: "index.php",
            data: datos,
            type: 'POST',
            dataType: 'json',
         }).done(function (result) {
            $("#recordarcontrasea_esperar").addClass("hidden");
            if (result == 1) {
               $("#msgAlert").html("Un corrreo fue enviado. \nPor favor, revisar su bandeja de documento.");
               $('#recordarcontrasea').modal("hide");
            } else {
               $("#msgAlert").html("No se encontro registro en nuestro sistema.<br />Por favor reviselo e intentelo de nuevo.");
            }
            $("#btn_recuperar").addClass("waves-effect waves-light light-blue darken-4");
            $("#btn_recuperar").removeClass("disabled");

            $("#khazerAlert").modal("show");
         });
      }
      else {
         $("#msgAlert").html("Solo numeros por favor.");
         $("#khazerAlert").modal("show");
      }
   }
   });
 
   $("#btn_cambiar").click(function () {

      var pass = $("#cambiar_pass").val();
      var pass_pass = $("#cambiar_pass_pass").val();

      if ($.trim(pass) != "" && $.trim(pass_pass) != "") {
         if (pass !== pass_pass) {
            texto = "Las contraseñas son diferentes";

            $("#msgAlert").html(texto);
            $('#khazerAlert').modal("show");
            return false;
         }
         //$('#Esperar').modal('show');
         $("#btn_cambiar").removeClass("waves-effect waves-light light-blue darken-4");
         $("#btn_cambiar").addClass("disabled");
         var datos = {
            'modulo': 'usuarios',
            'accion': 'cambiarContrasenia',
            pass1: pass,
            pass2: pass_pass,
            tkn: $("#tkn_cmb_pss").val(),
            ajax: true
         };


         $.ajax({
            url: "index.php",
            data: datos,
            type: 'POST',
            dataType: 'json',
         }).done(function (result) {
            if (result == 1) {
               texto = "Su contraseña ha sido cambia exitosamente.";
            } else {
               texto = "Hubo un problema, en el proceso de actualización. Por favor intentelo más tarde.";
            }

            $("#msgAlert").html(texto);
            $('#khazerAlert').modal("show");
            //$('#Esperar').modal('hide');
            $("#btn_cambiar").addClass("waves-effect waves-light light-blue darken-4");
            $("#btn_cambiar").removeClass("disabled");
            $('#cambiarcontrasea').modal("hide");

         });



      }
   });
//   console.log(parseInt($("#error_login").val()));
   if (parseInt($("#error_login").val()) === 1) {
      texto = "Usuario o Contraseña equivocada. Por favor corregir, e intentar de nuevo. <br />Si el error persiste contacte al administrador. ";
      $("#msgAlert").html(texto);

      $('#khazerAlert').modal("show");
   }
});
function consultar_documento() {
   
        $.ajax({
            url: 'index.php?modulo=usuarios&accion=consultarExitencia',
            type: "post",
            dataType: "json",
            data: 'documento=' + $('#recuperar_documento').val(),
            beforeSend: function () {
                    $('#btn_validar').attr('disabled', 'disabled');
                }
        }).done(function (result) {
            $('#btn_validar').removeAttr('disabled');
            if(result.length == 0){
                $("#msgRecuperar").html("");
                $('#documentoValidadoOlvidoNo').removeClass('hide');
                $('#documentoValidadoOlvido').addClass('hide');            
            }
            else{
//               console.log(result);
                $("#msgRecuperar").html(result[0].correo);
                $("#correoRecuperar").html('<a href="#!" data-nombre='+result[0].nombres+' data-apellido='+result[0].apellidos+' data-id='+result[0].id+' data-correo='+result[0].correo+' class="btn btn-primary" id="btn_recuperar" onclick="enviarCorreo(this)"><i id="recordarcontrasea_esperar" class="fa fa-refresh fa-spin hidden"></i>&nbsp;Enviar</a>');
                $('#documentoValidadoOlvido').removeClass('hide');            
                $('#documentoValidadoOlvidoNo').addClass('hide');            }
        });
    }
function consultar_documento2() {
        $.ajax({
            url: 'index.php?modulo=usuarios&accion=consultarExitencia2',
            type: "post",
            dataType: "json",
            data: 'documento=' + $('#recuperar_documento2').val(),
            beforeSend: function () {
                    $('#btn_validar2').attr('disabled', 'disabled');
                }
        }).done(function (result) {
            $('#btn_validar2').removeAttr('disabled');

            if(result.length == 0){
                $("#msgRecuperar").html("");
                $('#documentoValidadoAccesoNo').removeClass('hide');
                $('#documentoValidadoAcceso').addClass('hide');
            }
            else{
//               console.log(result);
                $("#msgAcceso").html(result[0].correo);
                $("#correoAcceso").html('<a href="#!" data-nombre='+result[0].nombres+' data-apellido='+result[0].apellidos+' data-id='+result[0].nombre_usuario+' data-correo='+result[0].correo+' class="btn btn-primary" id="btn_recuperarAcceso" onclick="enviarCorreoAcceso(this)"><i id="recordarcontrasea_esperar" class="fa fa-refresh fa-spin hidden"></i>&nbsp;Enviar</a>');
                $('#documentoValidadoAcceso').removeClass('hide');            
                $('#documentoValidadoAccesoNo').addClass('hide');            }
        });
    }
function enviarCorreo(obj){
      $.ajax({
            type: "POST",
            url: 'index.php?modulo=usuarios&accion=envioCorreo',
            data: 'id=' + $(obj).attr('data-id') + '&correo=' + $(obj).attr('data-correo') + '&nombre='+ $(obj).attr('data-nombre') + '&apellido=' + $(obj).attr('data-apellido'),
            dataType: "json",
            beforeSend: function () {
                    $('#btn_recuperar').attr('disabled', 'disabled');
                    $('#btn_recuperarAcceso').attr('disabled', 'disabled');
                    $('#btn_validar').attr('disabled', 'disabled');
                    $('#btn_validar2').attr('disabled', 'disabled');
                }
            }).done(function (result) {
                  $('#recordarcontrasea').modal("hide");
                  $('#solicitaraccesos').modal("hide");
                  bootbox.alert("Un correo se ha enviado a su direcci&oacute;n de correo electr&oacute;nico");
                  $('#btn_recuperar').removeAttr('disabled');
                  $('#btn_recuperarAcceso').removeAttr('disabled');
                  $('#btn_validar').removeAttr('disabled');
                  $('#btn_validar2').removeAttr('disabled');
            });
      
   }
function enviarCorreoAcceso(obj){
   console.log('entro aqui');
      $.ajax({
            type: "POST",
            url: 'index.php?modulo=usuarios&accion=guardarUsuario',
            data: 'nombre_usuario=' + $(obj).attr('data-id') + '&correo=' + $(obj).attr('data-correo') + '&nombres='+ $(obj).attr('data-nombre') + '&apellidos=' + $(obj).attr('data-apellido'),
            dataType: "json",
            beforeSend: function () {
                    $('#btn_recuperar').attr('disabled', 'disabled');
                    $('#btn_recuperarAcceso').attr('disabled', 'disabled');
                    $('#btn_validar').attr('disabled', 'disabled');
                    $('#btn_validar2').attr('disabled', 'disabled');
                }
            }).done(function (result) {
                  $('#recordarcontrasea').modal("hide");
                  $('#solicitaraccesos').modal("hide");
                  bootbox.alert("Un correo se ha enviado a su direcci&oacute;n de correo electr&oacute;nico");
                  $('#btn_recuperar').removeAttr('disabled');
                  $('#btn_recuperarAcceso').removeAttr('disabled');
                  $('#btn_validar').removeAttr('disabled');
                  $('#btn_validar2').removeAttr('disabled');
            });
      
   }
function recuperarContrasena() {
        $.ajax({
            url: 'index.php?modulo=usuarios&accion=guardarContrasenia',
            type: "post",
            dataType: "json",
            data: 'id=' + $('#usuarioR').val()+'&contrasenia=' + $('#contraseniaR').val(),
            beforeSend: function () {
                    $('#btn_cambiarContrasenia').attr('disabled', 'disabled');
                }
        }).done(function (result) {
            $('#btn_cambiarContrasenia').removeAttr('disabled');
            location.href = 'index.php';
        });
    }