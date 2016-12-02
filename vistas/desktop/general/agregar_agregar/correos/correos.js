function agregarCorreo() {
    var html = '<div  class="col-lg-12 form-group div_correo">' +
            '<input type="hidden" class="id" name="correo_id[]" value="">' +
            '<input type="hidden" class="eliminado" name="correo_eliminado[]" value="0">' +
            '<input type="hidden" class="correo_principal" name="correo_principal[]" value="0">' +
            '<div class=" col-lg-1"></div>' +
            '<div class="col-lg-6">' +
            
            '<input type="text" class="form-control validate[custom[email]] e_mail"   name="e_mail[]" >' +
            '</div>' +
            '<div class=" col-lg-1 text-center">' +
            
            '<input type="radio" class=" chk_correo_principal" name="principal">' +
            '</div>' +
            '<div class="col-lg-1">' +
            
            '<button type="button"  class="btn btn_eliminar_reg_correo btn-default btn-sm center-block"><i class="fa fa-minus"></i></button> ' +
            '</div>' +
            '</div>';

    $('#div_agregar_correo').append(html);
    triggersCorreo();
}

function eliminarCampoRegistroCorreo(div) {
    if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
        $(div).find('.eliminado').val(1);
        $(div).addClass('hidden');
    } else {
        $(div).remove();
    }
}
function correoPrincipal() {
    $.each($('.correo_principal'), function(k, v) {
        $(v).val('0');
    });
}

function triggersCorreo() {
    $('.btn_eliminar_reg_correo').click(function() {
        eliminarCampoRegistroCorreo($(this).parent().parent());
    });

    $('.chk_correo_principal').click(function() {
        $.each($('.correo_principal'), function(k, v) {
            $(v).val('0');
        });
        var div = $(this).parent().parent();
        div.find('.correo_principal').val('1');
        console.log($(this));
    });
    selects_dos();

}

$(document).ready(function() {
    $('#btn_agregar_correo').click(function() {
        agregarCorreo();
    });
    triggersCorreo();

});
