$(document).ready(function () {

  $("#tipo_ubicacion_id").change(function () {
    //console.log($("#tipo_ubicacion_id").val());
    var ubicacion = parseInt($("#tipo_ubicacion_id").val());
    /* AJAX PARA BTENER PADRES OPCIONALES SEGUN TIPO */
//    console.log();
    $.ajax({
      url: 'index.php?modulo=ubicaciones&accion=segmentarUbicacion',
      data: {
        tipo_ubicacion: ubicacion - 1
      },
      type: 'POST',
      dataType: 'json',
      success: function (dato) {
        console.error(dato);
        $("#ubicacion_padre_id option").remove();
        $.each(dato, function(k, l){
          $("#ubicacion_padre_id").append("<option value='"+l.id+"'> "+l.nombre+" </option>")
        });
      },
      error: function (xhr, status) {
        console.log('Disculpe, existió un problema');
      },
      // código a ejecutar sin importar si la petición falló o no
      complete: function (xhr, status) {
        console.info('Petición realizada');
      }
    });
  });

});

