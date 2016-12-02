function validarFormulario() {
  if (validar_datos('#form_editar', '#contrasenia', '#contrasenia2')) {
    return true;
  } else {
    alert('Algunos datos no son validos, por favor verifique he intente nuevamente.');
    return false;
  }
}

$(document).ready(function () {
  $('#contrasenia').keyup(function () {
    if ($(this).val() != '') {
      $('#contrasenia2').removeAttr('readonly');
      if (!$('#contrasenia2').hasClass('required')) {
        $('#contrasenia2').addClass('required');
      }
    } else {
      $('#contrasenia2').attr('readonly', 'readonly').removeClass('required');
    }
  });

  $('#perfil_id').change(function () {
    if ($(this).val() == 2) {
      $('#cliente_id').removeAttr('disabled');
      $('#cliente_id').addClass('required');
    } else {
      $('#cliente_id').select2("enable", false);
      $('#cliente_id').removeClass('required');
    }
  });
  $('#form_editar').validationEngine();

  $("#area_id").change(function () {

    buscaCargoXArea($("#area_id").val());
  });

});

function buscaCargoXArea(area) {
  $("#load-buscar-cargo").removeClass('hidden');
  $.ajax({
    type: "POST",
    url: 'index.php?modulo=areas&accion=CargosXArea',
    data: 'area_id=' + area,
    dataType: "json",
  }).done(function (result) {
    console.log(result);
    $("#cargo_id option").remove();
    var html = '';
    $.each(result, function (k, v) {
      html += '<option value="' + v.cargo_id + '" > ' + v.nombre_cargo + ' </option>';

    });

    $("#cargo_id").append(html);
    $("#load-buscar-cargo").addClass('hidden');

  });
}