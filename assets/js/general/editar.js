function validarFormulario() {

    if (validarUbicacion() && validar_datos('#form_editar')) {
        return true;
    } else {
        alert('Algunos datos no son validos, por favor verifique he intente nuevamente.');
        return false;
    }
}
function validarUbicacion() {
    var ubicacion = $("#view_ubicacion_id").val();

    if (ubicacion === '') {
        alert('Ingrese una ubicación');
        return false;
    } else {
        return true;
    }

}

function selects_dos(form) {
    if (form) {
        $('#' + form + ' select').each(function (i, o) {
            $(o).select2();
        });
    } else {
        $('#form_editar select').each(function (i, o) {
            $(o).select2();
        });
    }

}


function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function soloNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "1234567890";
    especiales = "8-37-39-46";

    tecla_especial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

$(document).ready(function () {
    $('#form_editar').keypress(function (e) {
        if (e.keyCode == 13 || e.keyCode == "13") {
            e.preventDefault();
        }
    });

    $('select').each(function (i, o) {
        $(o).select2();
    });

    $("#ubicacion_captacioni").click(function () {
        var div = $('#view_ubicacion_id');
        $(div).select2("val", "");
    });

    $('#form_editar').validationEngine();
    
    $('#asesor_asignado_id').select2('readonly',true);

});


function autocompletarUbicacion(div) {

    var ubicacion = 0;
    if (typeof s3vars.registro != "undefined" && typeof s3vars.registro.view_ubicacion_id != "undefined") {
        ubicacion = s3vars.registro.view_ubicacion_id + '';
    }
    $(div).select({
        minimumInputLength: 2,
//        tags: [], //hacerlo multiselect
        ajax: {
            url: 'index.php?modulo=ubicaciones&accion=autocompletar',
            dataType: 'json',
            type: "POST",
            data: function (term) {
                return {
                    palabra: term
                };
            },
            results: function (data) {
                return {
                    results: $.map(data, function (item) {
                        return {
                            text: item.ubicacion,
                            id: item.id
                        }
                    })
                };
            },
        },
        initSelection: function (element, callback) {
            var elementText = $('#view_ubicacion_nombre').val();
            callback({id: $(element).val(), text: elementText});
        }
    }).on('change', function (e) {
        ubicacion = e.val;
    });
}