function consultar() {

  $('#btn_consultar').click(function () {
    limpiar_validates();
    var formulario = $("#frm_editar").serialize();
    if ($("#frm_editar").validationEngine('validate')) {

      $.ajax({
        type: "POST",
        dataType: 'json',
        beforeSend: function () {
          
          $('#btn_consultar i').removeClass('fa-search');
          $('#btn_consultar i').addClass('fa-spinner fa-spin');
        },
        url: "index.php",
        data: formulario,
        success: function (data) {
          
          $('#btn_consultar i').removeClass('fa-spinner fa-spin');
          $('#btn_consultar i').addClass('fa-search');
          $('#panel_reporte').css({'display': 'block'});
          if (data.length > 0) {
            $('#alerta_reporte').css({'display': 'none'});
            $('#grafica').css({'height': '300px'});
            obtenerGrafica(data);
          } else {
            $('#grafica').css({'height': 'auto'});
            $('#grafica').html('');
            $('#alerta_reporte').css({'display': 'block'});
            $('#alerta_reporte').text('Sin datos!');
          }
        }
      });

    }
  });
}

function limpiar() {
  $('#resultados').css({'display': 'none'});
  $('#panel_reporte').css({'display': 'none'});
  $(".select2-container").select2("val", "");
  $('#btn_limpiar').click(function () {
    limpiar();
  });
}
function limpiar_validates() {
  $("select").each(function (k, v) {
    if ($(v).hasClass('validate[required]')) {
      $('#s2id_' + $(v).attr('id')).removeClass('validate[required]');
    }
  });
}

$(document).ready(function () {
//    $("#frm_editar").validationEngine('validate');
  consultar();
  limpiar();
  $('select').change(function () {
    if ($(this).attr('multiple')) {
      if ($(this).val() != '-99') {
        $(this).find('option[value=-99]').attr('disabled', 'disabled');
        if ($(this).val() == null) {
          $.each($('#' + $(this).attr('id') + ' option'), function (k, v) {
            $(v).removeAttr('disabled');
          });
        }
      } else {
        $.each($('#' + $(this).attr('id') + ' option'), function (k, v) {
          if ($(v).val() > 0) {
            $(v).attr('disabled', 'disabled');
          }
        });
      }
    }
  });
});
  