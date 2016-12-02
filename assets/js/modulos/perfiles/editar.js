function cambiar_nivel_acesso(op) {
    switch (op.val()) {
        case '1':
            $('#slc_' + op.attr('select_id')).removeAttr('disabled');
            break;
        case '0':
            $('#slc_' + op.attr('select_id')).attr('disabled', 'disabled');
            $('#slc_' + op.attr('select_id')).select2('val', '-1');
            break;
    }
}/*
$(document).ready(function () {
    $('.chk_perfil').change(function () {
        cambiar_nivel_acesso($(this));
    });
});*/
    
    function habilitarPermisos(accion) {

  $('select[id^="permiso_' + accion + '_"]').each(function () {
    console.log(this['id']);
    $("#" + this['id']).removeAttr("disabled", "");
    $("#" + this['id']).addClass("required");
  });
}

function deshabilitarPermisos(accion) {

  $('select[id^="permiso_' + accion + '_"]').each(function () {
    console.log(this['id']);
    $("#" + this['id']).attr("disabled", "disabled");
    $("#" + this['id']).removeClass("required");
  });
}

$(document).ready(function () {
  $.each(s3vars.registro.modulos, function (k, ll) {
    if ($("#check_permiso_" + ll.id).is(':checked')) {
      habilitarPermisos(ll.id);
    } else {
      deshabilitarPermisos(ll.id);
    }
  });
});