function agregarHorario() {
  var html = '<div  class="col-sm-12 form-group">' +
          '<input type="hidden" class="id" name="horario_id[]" value="">' +
          '<input type="hidden" class="eliminado" name="horario_eliminado[]" value="0">' +
          '<div class=" col-sm-offset-2 col-sm-3">' +
          '<select class="form-control validate[required]" id="hora" name="hora_id[]" > ';
  $.each(s3vars.listasM.dias, function (vd, vd) {
    html += '<option value="' + vd.id + '" >' + vd.nombre + '</option>';
  });
  html += '</select> ' +
          '</div>' +
          '<div class=" col-sm-3">' +
          '<select class="form-control validate[required]" id="dias" name="dia_id[]"  > ';
  $.each(s3vars.listasM.horario, function (vh, vh) {
    html += '<option value="' + vh.id + '" >' + vh.nombre + '</option>';
  });
  html += '</select> ' +
          '</div>' +
          '<div class="col-sm-1">' +
          '<button type="button"  class="btn btn_eliminar_reg_horario btn-primary"><i class="fa fa-minus"></i></button> ' +
          '</div>' +
          '</div>';

  $('#div_agregar_horario').append(html);
  triggersHorario();
  selects_dos();
}
function agregarHorario_mobile() {
  var html = '<div  class="col-sm-12 form-group  no-padding-left" style="display:flex;">' +
          '<input type="hidden" class="id" name="horario_id[]" value="">' +
          '<input type="hidden" class="eliminado" name="horario_eliminado[]" value="0">' +
          '<div class=" col-sm-offset-2 col-sm-3 no-padding-right margin_left5px">' +
          '<select class="form-control validate[required]" id="hora" name="hora_id[]" > ';
  $.each(s3vars.listasM.dias, function (vd, vd) {
    html += '<option value="' + vd.id + '" >' + vd.nombre + '</option>';
  });
  html += '</select> ' +
          '</div>' +
          '<div class=" col-sm-3 no-padding">' +
          '<select class="form-control validate[required]" id="dias" name="dia_id[]"  > ';
  $.each(s3vars.listasM.horario, function (vh, vh) {
    html += '<option value="' + vh.id + '" >' + vh.nombre + '</option>';
  });
  html += '</select> ' +
          '</div>' +
          '<div class="col-sm-1 no-padding-left margin_left5px">' +
          '<button type="button"  class="btn btn_eliminar_reg_horario btn-primary"><i class="fa fa-minus"></i></button> ' +
          '</div>' +
          '</div>';

  $('#div_agregar_horario').append(html);
  triggersHorario();
//  selects_dos();
}

function agregarFestivo() {
  var html = '<div  class="col-sm-12 form-group">' +
          '<input type="hidden" class="id" name="festivo_id[]" value="">' +
          '<input type="hidden" class="eliminado" name="festivo_eliminado[]" value="0">' +
          '<div class=" col-sm-2"></div>' +
          '<div class="col-sm-3">' +
          
          '<div class="input-group">' +
          '<input type="text" class="form-control fecha validate[required]" name="festivo_festivo[]" >' +
          '<div class="input-group-addon">' +
          ' <img src="assets/img/general/Calendario.png" />'+
          '</div>' +
          '</div>' +
          
          
          '</div>' +
          '<div class="col-sm-1">' +
          
          '<button type="button"  class="btn btn_eliminar_reg_festivo btn-primary"><i class="fa fa-minus"></i></button> ' +
          '</div>' +
          '</div>';

  $('#div_agregar_festivo').append(html);

  $('.fecha').each(function (kf, vf) {
    var dp = $(vf).datepicker({format: 'yyyy-mm-dd'}).on('changeDate', function (ev) {
      dp.hide();
    }).data('datepicker');
  });

  triggersFestivo();
}
function agregarFestivo_mobile() {
  var html = '<div  class="col-sm-12 form-group" style="display: flex; margin-right: 30px;">' +
          '<input type="hidden" class="id" name="festivo_id[]" value="">' +
          '<input type="hidden" class="eliminado" name="festivo_eliminado[]" value="0">' +
          '<div class="col-sm-3 no-padding-right margin_left5px">' +
          '<div class="input-group">' +
          '<input type="text" class="form-control fecha validate[required]" name="festivo_festivo[]" >' +
          '<div class="input-group-addon">' +
          ' <img src="assets/img/general/Calendario.png" />'+
          '</div>' +
          '</div>' +
          
          
          '</div>' +
          '<div class="col-sm-1">' +
          
          '<button type="button"  class="btn btn_eliminar_reg_festivo btn-primary"><i class="fa fa-minus"></i></button> ' +
          '</div>' +
          '</div>';

  $('#div_agregar_festivo').append(html);

  $('.fecha').each(function (kf, vf) {
    var dp = $(vf).datepicker({format: 'yyyy-mm-dd'}).on('changeDate', function (ev) {
      dp.hide();
    }).data('datepicker');
  });

  triggersFestivo();
}

function eliminarCampoRegistroHorario(div) {
  if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
    $(div).find('.eliminado').val(1);
    $(div).addClass('hidden');
  } else {
    $(div).remove();
  }
}

function eliminarCampoRegistroFestivo(div) {
  if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
    $(div).find('.eliminado').val(1);
    $(div).addClass('hidden');
  } else {
    $(div).remove();
  }
}

function triggersFestivo() {
  $('.btn_eliminar_reg_festivo').click(function () {
    eliminarCampoRegistroFestivo($(this).parent().parent());
  });

}

function triggersHorario() {
  $('.btn_eliminar_reg_horario').click(function () {
    eliminarCampoRegistroHorario($(this).parent().parent());
  });

}

$(document).ready(function () {

  $('#btn_agregar_horario').click(function () {
    agregarHorario();
  });
  $('#btn_agregar_horario_mobile').click(function () {
    agregarHorario_mobile();
  });

  $('#btn_agregar_festivo').click(function () {
    agregarFestivo();
  });
  $('#btn_agregar_festivo_mobile').click(function () {
    agregarFestivo_mobile();
  });

  triggersFestivo();
  triggersHorario();
  
  $("#eliminar_informacion").click(function(){
     eliminarInformacion();
  });

});

function eliminarInformacion(){
   var tiempo = $("#meses_limpieza").select2("data");
   var r = confirm("Se va a eliminar toda la información de las actividades y su información relacionada, creadas hace "+tiempo.text+" Meses, ¿Está seguro de hacerlo? ");

   if (r == true) {
      $("#esperar_eliminar_informacion").removeClass("hidden");

      $.ajax({
         url: 'index.php?modulo=configuraciones&accion=limpiarActividades',
         type: "post",
         data: {tiempo: tiempo.text},
         cache: false,
         dataType: "json",
         async: false

      }).done(function (data) {
         
          $("#esperar_eliminar_informacion").addClass("hidden");
         //javascript:location.reload();
      });

   } else {
      // alert("Rechazar actividad " + actividad);
   }
}
