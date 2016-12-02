function agregarDireccion() {
    var html = ' <div class="form-group col-lg-12">' +
            '<input type="hidden" class="id" name="direccion_id[]" value="">' +
            '<input type="hidden" class="eliminado" name="direccion_eliminado[]" value="0">' +
            '<div class="col-lg-1"></div>' +
            '<div class="col-lg-3">' +
           
            '<input type="text" class="form-control "  id="direccion" name="direccion[]" >' +
            '</div>' +
           
            '<div class="col-lg-1">' +
          
            '<button type="button"  class="btn btn_eliminar_reg_direccion btn-default btn-sm center-block"><i class="fa fa-minus"></i></button> ' +
            '</div>' +
            '</div>';

    $('#div_agregar_direccion').append(html);
    triggersDireccion();
}

function eliminarCampoRegistroDireccion(div) {
    if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
        $(div).find('.eliminado').val(1);
        $(div).addClass('hidden');
    } else {
        $(div).remove();
    }
}


function triggersDireccion() {
    $('.btn_eliminar_reg_direccion').click(function () {
        eliminarCampoRegistroDireccion($(this).parent().parent());
    });
    selects_dos();

}

$(document).ready(function () {
    $('#btn_agregar_direccion').click(function () {
        agregarDireccion();
    });
    triggersDireccion();
});
