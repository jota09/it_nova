function agregarOpcion() {
    var html = '<div  class="col-lg-12 form-group">' +
            '<input type="hidden" class="id" name="opcion_id[]" value="">' +
            '<input type="hidden" class="eliminado" name="opcion_eliminado[]" value="0">' +
            '<input type="hidden" class="opcion_principal" name="por_defecto[]" value="0">' +
            '<div class=" col-lg-1"></div>' +
            '<div class="col-lg-6">' +
            '<div class="input-group">' +
            '<input type="text" class="form-control required"  id="opcion" name="opcion[]" >' +
            '<div class="input-group-addon">' +
            '<input type="radio" class="chk_opcion_principal" name="principal">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-lg-1">' +
            '<button type="button"  class="btn btn_eliminar_reg_opcion btn-primary"><i class="fa fa-minus"></i></button> ' +
            '</div>' +
            '</div>';

    $('#div_agregar_opcion').append(html);
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
        $('#modulo_id').select2('val', '-1');
    }

    $('#btn_agregar_opcion').click(function () {
        agregarOpcion();
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
    
    triggersOpcion();
});
