var olm_general = 0; 
function agregarOpcion() {
   var html = '<div  class="col-sm-12 form-group">' +
           '<input type="hidden" class="id" name="opcion_id[]" value="">' +
           '<input type="hidden" class="eliminado" name="opcion_eliminado[]" value="0">' +
           '<input type="hidden" class="lista" name="opcion_lista_id[]" value="' + olm_general + '">' +
           '<input type="hidden" class="opcion_principal" name="por_defecto[]" value="0">' +
           '<div class=" col-sm-2"></div>' +
           '<div class="col-sm-6">' +
          
           '<input type="text" class="form-control required"  id="opcion" name="opcion[]" >' +
          
           '</div>' +
           '<div class="col-sm-1">' +
           '<button type="button"  class="btn btn_eliminar_reg_opcion btn-primary"><i class="fa fa-minus"></i></button> ' +
           '</div>' +
           '</div>';

   $('#div_agregar_opcion').append(html);
   triggersOpcion();
}
function agregarOpcion_mobile() {
   var html = '<div  class="col-sm-12 form-group" style="display:flex;">' +
           '<input type="hidden" class="id" name="opcion_id[]" value="">' +
           '<input type="hidden" class="eliminado" name="opcion_eliminado[]" value="0">' +
           '<input type="hidden" class="lista" name="opcion_lista_id[]" value="' + olm_general + '">' +
           '<input type="hidden" class="opcion_principal" name="por_defecto[]" value="0">' +
           '<div class="col-sm-8">' +
           '<input type="text" class="form-control required"  id="opcion" name="opcion[]" >' +
           '</div>' +
           '<div class="col-sm-4  no-padding">' +
           '<button type="button"  class="btn btn_eliminar_reg_opcion btn-primary"><i class="fa fa-minus"></i></button> ' +
           '</div>' +
           '</div>';

   $('#div_agregar_opcion_mobile').append(html);
   triggersOpcion();
}

function eliminarCampoRegistroOpcion(div) {
   if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
      $(div).find('.eliminado').val(1);
      $(div).addClass('hidden');
   } else {
      $(div).remove();
   }
}
function opcionPrincipal() {
   $.each($('.opcion_principal'), function (k, v) {
      $(v).val('0');
   });
}

function triggersOpcion() {
   $('.btn_eliminar_reg_opcion').click(function () {
      eliminarCampoRegistroOpcion($(this).parent().parent());
   });

   $('.chk_opcion_principal').click(function () {
      $.each($('.opcion_principal'), function (k, v) {
         $(v).val('0');
      });
      var div = $(this).parent().parent().parent().parent();
      $($(div).find('.opcion_principal')).val('1');

   });
}

$(document).ready(function () {
   if ($('#general').val() == '0') {
//        $('#modulo_id').removeAttr('disabled').addClass('required');
   } else {
      $('#modulo_id').attr('disabled', 'disabled').removeClass('required');
      $('#modulo_id').select2('val', '1');
   }

   $('#btn_agregar_opcion').click(function () {
      agregarOpcion();
   });
   $('#btn_agregar_opcion_mobile').click(function () {
      agregarOpcion_mobile();
   });

   $('#nombre').keyup(function () {
      var nombre = $('#nombre').val().replace(/ /g, "_");
      $('#etiqueta').val(nombre);
   });

   $('#general').change(function () {
      if ($(this).val() == '0') {
         $('#modulo_id').removeAttr('disabled').addClass('required');
      } else {
         $('#modulo_id').attr('disabled', 'disabled').removeClass('required');
         $('#modulo_id').select2('val', '-1');
      }
   });

   $("#lista_maestra").change(function () {
      buscarOpcionesEditorLista();
   });

   triggersOpcion();

   buscarOpcionesEditorLista();
});

function buscarOpcionesEditorLista() {
   $("#load-buscar-opciones-editor-lista").removeClass('hidden');
   $.ajax({
      type: "POST",
      url: 'index.php?modulo=editor_listas&accion=ObtenerOpcionesPorLista',
      data: 'lista_id=' + $("#lista_maestra").val(),
      dataType: "json",
   }).done(function (result) {
      console.log(result);
      $("#div_agregar_opcion").html("");

      $.each(result, function (k, v) {
         console.log(v);
         olm_general = v.lista_maestra_id;
         lectura = " ";
         ocultar = "";
         if (v.id > 40 && v.id < 46) {
            lectura = " readonly='readonly' ";
            ocultar = "hidden";
         }
         var html = '';
         html = '<div  class="col-sm-12 form-group" style="display:flex;">' +
                 '<input type="hidden" class="id" name="opcion_id[]" value="' + v.id + '">' +
                 '<input type="hidden" class="eliminado" name="opcion_eliminado[]" value="0">' +
                 '<input type="hidden" class="lista" name="opcion_lista_id[]" value="' + v.lista_maestra_id + '">' +
                 '<input type="hidden" class="opcion_principal" name="por_defecto[]" value="0">' +
                 '<div class=" col-sm-2"></div>' +
                 '<div class="col-sm-6">' +
                 '<input type="text" class="form-control required" value="' + v.nombre + '" id="opcion" name="opcion[]" ' + lectura + '>' +
                 '</div>' +
                 '<div class="col-sm-4 ' + ocultar + '">' +
                 '<button type="button"  class="btn btn_eliminar_reg_opcion btn-primary"><i class="fa fa-minus"></i></button> ' +
                 '</div>' +
                 '</div>';

         $('#div_agregar_opcion').append(html);
         triggersOpcion();


      });

      $("#load-buscar-opciones-editor-lista").addClass('hidden');

   });
   $.ajax({
      type: "POST",
      url: 'index.php?modulo=editor_listas&accion=ObtenerOpcionesPorLista',
      data: 'lista_id=' + $("#lista_maestra").val(),
      dataType: "json",
   }).done(function (result) {
      console.log(result);
      $("#div_agregar_opcion_mobile").html("");

      $.each(result, function (k, v) {
         console.log(v);
         olm_general = v.lista_maestra_id;
         lectura = " ";
         ocultar = "";
         if (v.id > 40 && v.id < 46) {
            lectura = " readonly='readonly' ";
            ocultar = "hidden";
         }
         var html = '';
         html = '<div  class="col-sm-12 form-group" style="display:flex;">' +
                 '<input type="hidden" class="id" name="opcion_id[]" value="' + v.id + '">' +
                 '<input type="hidden" class="eliminado" name="opcion_eliminado[]" value="0">' +
                 '<input type="hidden" class="lista" name="opcion_lista_id[]" value="' + v.lista_maestra_id + '">' +
                 '<input type="hidden" class="opcion_principal" name="por_defecto[]" value="0">' +
                 '<div class="col-sm-8">' +
                 '<input type="text" class="form-control required" value="' + v.nombre + '" id="opcion" name="opcion[]" ' + lectura + '>' +
                 '</div>' +
                 '<div class="col-sm-4 ' + ocultar + ' no-padding">' +
                 '<button type="button"  class="btn btn_eliminar_reg_opcion btn-primary"><i class="fa fa-minus"></i></button> ' +
                 '</div>' +
                 '</div>';

         $('#div_agregar_opcion_mobile').append(html);
         triggersOpcion();


      });

      $("#load-buscar-opciones-editor-lista").addClass('hidden');

   });
}
