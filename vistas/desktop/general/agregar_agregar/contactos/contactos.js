function agregarContacto() {
    var html = '<div  class="col-lg-12 form-group">' +
            '<input type="hidden" class="id" name="contacto_id[]" value="">' +
            '<input type="hidden" class="eliminado" name="contacto_eliminado[]" value="0">' +
            '<div class=" col-lg-1"></div>' +
            '<div class="col-lg-4">' +
            '<input type="text" class="form-control required"  id="contacto_nombre" name="contacto_nombre[]" >' +
            '</div>' +
            '<div class=" col-lg-3">' +
            '<input type="text" class="form-control required"  id="contacto_apellido" name="contacto_apellido[]" >' +
            '</div>' +
            '<div class="col-lg-2">' +
            '<input type="text" class="form-control required"  id="contacto_cargo" name="contacto_cargo[]" >' +
            '</div>' +
            '<div class="col-lg-1">' +
            '<button type="button"  class="btn btn_eliminar_reg_contacto btn-primary"><i class="fa fa-minus"></i></button> ' +
            '</div>' +
            '</div>';

    $('#div_agregar_contacto').append(html);
    triggersContacto();
}

function eliminarCampoRegistroContacto(div) {
    if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
        $(div).find('.eliminado').val(1);
        $(div).addClass('hidden');
    } else {
        $(div).remove();
    }
}

function triggersContacto() {
    $('.btn_eliminar_reg_contacto').click(function () {
        eliminarCampoRegistroContacto($(this).parent().parent());
    });
    selects_dos();
}

$(document).ready(function () {
    $('#btn_agregar_contacto').click(function () {
        agregarContacto();
    });
    triggersContacto();
});
