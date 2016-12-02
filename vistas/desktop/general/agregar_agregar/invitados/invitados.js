$(document).ready(function() {
    aux = 0;
//    cargar_invitados();

    $("#btn_agregar_invitado").click(function() {
        agregarInvitado();
    });
//    cargar_invitados();
});
function agregarInvitado() {


    option_cuenta = '';
// '<label class="col-md-2 control-label">Modulo Invitado</label>'+
//    '<label class="col-md-5 control-label">Nombre</label>'+
//    '<label class="col-md-4 control-label">E-mail Invitado</label>'+
    var html = '<div  class="col-md-12 form-group">' +
            '<div class=" col-md-2"><input class="id" type="hidden" id="id_invitado_"' + aux + ' name="id_invitado[]" >' +
             '<label class=" control-label">Modulo Invitado</label>'+
            '<select class="form-control required" id="modulo_actividad" name="modulo_actividad[]" onchange="t_modulo_actividad(this)">' +
            '<option value="-1">Seleccionar</option>' +
            '<option value="1">Clientes</option>' +
            '<option value="2">Contactos</option>' +
            '</select>' +
            '</div>' +
            '<div class=" col-md-5">' +
            '<label class=" control-label">Nombre</label>'+
            '<select class="form-control required" id="nombre_actividad" name="nombre_actividad[]" onchange="obtener_email_actividad(this)">' +
            '<option value="-1">Seleccionar</option>' +
            '</select>' +
            '</div>' +
            '<div class="col-md-4 ">' +
            '<label  control-label">E-mail Invitado</label>'+
            '<input type="hidden" class="eliminado" name="invitado_eliminado[]" value="0">' +
            '<input class="form-control required" type="email" id="email_actividad"  name="email_actividad[]">' +
            '</div>' +
            '<div class="col-md-1 ">' +
            '<button type="button"  class="btn btn_eliminar_reg_invitado btn-primary btn-md"><i class="fa fa-minus"></i></button> ' +
            '</div>' +
            '</div>';
    aux++;
    $('#invitados').append(html);
    triggersInvitado();
}

function triggersInvitado() {
//    Sselect2();
    $('.btn_eliminar_reg_invitado').click(function() {
        eliminarCampoRegistroInvitado($(this).parent().parent());
    });
}
function eliminarCampoRegistroInvitado(div) {

    if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
        $(div).find('.eliminado').val(1);
        $(div).addClass('hidden');
    } else {
        $(div).remove();
    }
}

function t_modulo_actividad(obj) {
//define la lista de cliente o de usuarios


    option = '';
    option = '<option value="-1">Seleccionar</option>';
    if ($(obj).val() == '1') {
        for (i = 0; i < s3vars.clientes_actividades.length; i++) {
            option += '<option value="' + s3vars.clientes_actividades[i]['id'] + '">' + s3vars.clientes_actividades[i]['nombre'] + '</option>';
        }
    }
    if ($(obj).val() == '2') {
        for (i = 0; i < s3vars.usuarios_actividades.length; i++) {
            option += '<option value="' + s3vars.usuarios_actividades[i]['id'] + '">' + s3vars.usuarios_actividades[i]['nombre'] + '</option>';
        }
    }
    $($($(obj).parent().parent()[0]['children'][1]).children()[1]).empty();
//    console.log($($(obj).parent().parent()[0]['children'][1]));
    $($($(obj).parent().parent()[0]['children'][1]).children()[1]).append(option);
//     $($($(obj).parent().parent()[0]['children'][3]).children()[1]).empty();
//    $($($(obj).parent().parent()[0]['children'][3]).children()[1]).append(option);
}

function obtener_email_actividad(obj) {
    id = $(obj).val();
}



