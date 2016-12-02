function agregarCargo() {
    var html = '<div class="form-group col-md-12"> ' +
            '<input type="hidden" class="id" name="cargo_id[]" value="">' +
            '<input type="hidden" class="eliminado" name="cargo_eliminado[]" value="0">' +
            '<div class="col-md-3"></div> ' +
            '<div class="col-md-3"> ' +
            '<input type="text" class="form-control required " value=""  id="cargo_nombre" name="cargo_nombre[]" maxlength="99"> ' +
            '</div> ' +
            '<div class="col-md-1"> ' +
            '<button type="button"  class="btn btn_eliminar_reg_cargo btn-primary"><i class="fa fa-minus"></i></button> ' +
            '</div> ' +
            '</div>';

    $('#div_agregar_cargo').append(html);
    triggersCargo();
 
}

function eliminarCampoRegistroCargo(div) {
    if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
        $(div).find('.eliminado').val(1);
        $(div).addClass('hidden');
    } else {
        $(div).remove();
    }
}


function triggersCargo() {
    $('.btn_eliminar_reg_cargo').click(function () {
        //console.log($(this).parent().parent());
        eliminarCampoRegistroCargo($(this).parent().parent());
    });
    //selects_dos();

}

function cargarCargoes() {

}

$(document).ready(function () {
    $('#btn_agregar_cargo').click(function () {
        agregarCargo();
    });
    triggersCargo();
    if (parseInt($("#registro_id").val()) > 0) {
        cargarCargo();
    }
});


