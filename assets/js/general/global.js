function obtener_nombre_mes(mes) {
    var meses = {
        "01": "Enero",
        "02": "Febrero",
        "03": "Marzo",
        "04": "Abril",
        "05": "Mayo",
        "06": "Junio",
        "07": "Julio",
        "08": "Agosto",
        "09": "Septiembre",
        "10": "Octubre",
        "11": "Noviembre",
        "12": "Diciembre"}
    return meses[mes];
}

function _numeroMes(mes) {
    var mes_n = mes.toUpperCase();
    var numMeses = {
        "ENERO": "01",
        "FEBRERO": "02",
        "MARZO": "03",
        "ABRIL": "04",
        "MAYO": "05",
        "JUNIO": "06",
        "JULIO": "07",
        "AGOSTO": "08",
        "SEPTIEMBRE": "09",
        "OCTUBRE": "10",
        "NOVIEMBRE": "11",
        "DICIEMBRE": "12"}
    return numMeses[mes_n];
}

function isDoubleKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    return true;
}

function validar_datos(form_id, password1, password2) {
    var regex = {"number": /^[0-9]+$/, "email": /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[\.]([\.a-zA-Z]{2,7}){1,}?$/, "date": /^([0-9]{4}\-[0-9]{2}\-[0-9]{2})$/};
    var flag = true;
    $(form_id + ' input').each(function (key, input) {
        $(input).removeAttr('title').parent().removeClass('has-error');
        if ($(input).hasClass('required')) {
            if (($(input).val() == '' || $(input).val() == '-1')) {
                flag = false;
                $(input).attr('title', 'Este campo es requerido.').parent().addClass('has-error');
            } else if (!$(input).hasClass('no-regex') && $(input).attr('type') != 'text') {

                if (!$(input).val().match(regex[$(input).attr('type')])) {
                    flag = false;
                    $(input).attr('title', 'El dato que ingreso no es valido.').parent().addClass('has-error');
                }
            }
        }
    });
    $(form_id + ' select').each(function (key, select) {
        $(select).removeAttr('title').parent().removeClass('has-error');

        if ($(select).hasClass('required')) {
            if (!$(select).attr('multiple')) {
                if (parseInt($(select).val()) < 1 || $(select).val() == null) {
                    flag = false;
                    $(select).attr('title', 'Debe seleccionar un valor.').parent().addClass('has-error');
                }
            } else {
                if ($(select).find('option:selected').length < 1) {
                    flag = false;
                    $(select).attr('title', 'Debe seleccionar un valor.').parent().addClass('has-error');
                }
            }
        }
    });

    $(form_id + ' textarea').each(function (key, textarea) {
        $(textarea).removeAttr('title').parent().removeClass('has-error');
        if ($(textarea).hasClass('required') && $(textarea).val() == '') {
            flag = false;
            $(textarea).attr('title', 'Este campo es requerido.').parent().addClass('has-error');
        }
    });
    /*
     if ($(form_id + ' ' + password1).val() != $(form_id + ' ' + password2).val()) {
     flag = false;
     $(form_id + ' ' + password1).attr('title', 'Las contraseñas no coinciden.').parent().addClass('has-error');
     $(form_id + ' ' + password2).attr('title', 'Las contraseñas no coinciden.').parent().addClass('has-error');
     } else if ($(form_id + ' ' + password1).val() !== '' && $(form_id + ' ' + password1).val().length < 6) {
     flag = false;
     $(password1).attr('title', 'La contraseña debe ser minimo de 6 caracteres.').parent().addClass('has-error');
     } else if ($(form_id + ' ' + password2).val() !== '' && $(form_id + ' ' + password1).val().length < 6) {
     flag = false;
     $(form_id + ' ' + password2).attr('title', 'La contraseña debe ser minimo de 6 caracteres.').parent().addClass('has-error');
     }
     */
    return flag;
}

function validar_datos_clase(form_id, clase, password1, password2) {
    if (typeof clase === "undefined") {
        return validar_datos(form_id, password1, password2);
    }

    var regex = {"number": /^[0-9]+$/, "email": /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/, "date": /^([0-9]{4}\-[0-9]{2}\-[0-9]{2})$/};
    var flag = true;
    $(form_id + ' input').each(function (key, input) {
        $(input).removeAttr('title').parent().removeClass('has-error');
        if ($(input).hasClass(clase)) {
            if (($(input).val() == '' || $(input).val() == '-1')) {
                flag = false;
                $(input).attr('title', 'Este campo es requerido.').parent().addClass('has-error');
            } else if (!$(input).hasClass('no-regex') && $(input).attr('type') != 'text') {
                if (!$(input).val().match(regex[$(input).attr('type')])) {
                    flag = false;
                    $(input).attr('title', 'El dato que ingreso no es valido.').parent().addClass('has-error');
                }
            }
        }
    });
    $(form_id + ' select').each(function (key, select) {
        $(select).removeAttr('title').parent().removeClass('has-error');

        if ($(select).hasClass(clase)) {
            if (!$(select).attr('multiple')) {
                if (parseInt($(select).val()) < 1) {
                    flag = false;
                    $(select).attr('title', 'Debe seleccionar un valor.').parent().addClass('has-error');
                }
            } else {
                if ($(select).find('option:selected').length < 1) {
                    flag = false;
                    $(select).attr('title', 'Debe seleccionar un valor.').parent().addClass('has-error');
                }
            }
        }
    });

    $(form_id + ' textarea').each(function (key, textarea) {
        $(textarea).removeAttr('title').parent().removeClass('has-error');
        if ($(textarea).hasClass(clase) && $(textarea).val() == '') {
            flag = false;
            $(textarea).attr('title', 'Este campo es requerido.').parent().addClass('has-error');
        }
    });

    if (typeof password1 !== "undefined" && typeof password2 !== "undefined" && password2 != '' && password1 != '' && $(form_id + ' ' + password1).hasClass(clase) && $(form_id + ' ' + password2).hasClass(clase)) {
        if ($(form_id + ' ' + password1).val() != $(form_id + ' ' + password2).val()) {
            flag = false;
            $(form_id + ' ' + password1).attr('title', 'Las contraseñas no coinciden.').parent().addClass('has-error');
            $(form_id + ' ' + password2).attr('title', 'Las contraseñas no coinciden.').parent().addClass('has-error');
        } else if ($(form_id + ' ' + password1).val() == '' || $(form_id + ' ' + password1).val().length < 6) {
            flag = false;
            $(password1).attr('title', 'La contraseña debe ser minimo de 6 caracteres.').parent().addClass('has-error');
        } else if ($(form_id + ' ' + password2).val() == '' || $(form_id + ' ' + password1).val().length < 6) {
            flag = false;
            $(form_id + ' ' + password2).attr('title', 'La contraseña debe ser minimo de 6 caracteres.').parent().addClass('has-error');
        }
    }
    return flag;
}

function eliminar_tag(tag) {
    $(tag).remove();
}

function selectChange(element) {
    var sel = $(element);
    var selHijo = sel.attr('data-child');

    $('.' + selHijo).each(function (k, v) {
        $('#' + $(v).attr('id') + ' option').each(function (kS, vS) {
            if ($(vS).attr('data-parent') == sel.val()) {
                $(vS).removeClass('hidden');
            } else {
                if ($(vS).attr('value') == '-1') {
                    $(vS).removeClass('hidden');
                } else if ($(vS).attr('value') == '0') {
                    $(vS).removeClass('hidden');
                } else {
                    if (!$(vS).hasClass('hidden')) {
                        $(vS).addClass('hidden');
                    }
                }
            }

            if ($(v).attr('multiple') != 'multiple') {
                if ($(vS).attr('value') == '-1') {
                    $(v).select2('val', '-1');
                } else if ($(vS).attr('value') == '0') {
                    $(v).select2('val', '0');
                }
            } else {
                $(v).select2('val', null);
            }
        });
    });
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }

    return true;
}

function array_shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

(function ($) {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $.fn.serializeJSON = function () {
        var object = {};
        $.each(this, function (a, b) {
            var name = b.name.replace('[]', '');
            if (object[name]) {
                if (!object[name].push) {
                    object[name] = [object[name]];
                }
                object[name].push(b.value || '');
            } else {
                object[name] = b.value || '';
            }
        });
        return object;
    };
})(jQuery);

function parseDouble(value) {
    if (typeof value == "string") {
        value = value.match(/^-?\d*/)[0];
    }

    return !isNaN(parseInt(value)) ? value * 1 : NaN;
}
function cargaDatePicker() {
    $('.fecha').each(function (kf, vf) {
        var dp = $(vf).datepicker({format: 'yyyy-mm-dd'}).on('changeDate', function (ev) {
            dp.hide();
        }).data('datepicker');
    });

    $('.hora').each(function (kf, vf) {

        var tp = $(vf)
                .timepicker({format: 'H-i A', minTime: '8:00am', maxTime: '6:00pm', 'step': 15})
                .on('changeTime', function (ev) {

                }).data('timepicker');
    });

    $('.icn_fecha').each(function (kf, vf) {
        $(this).click(function () {
            var div = $(this).attr("class");
            var separar = div.split(" ");
            var clase = separar[1].substring(4);
            $("." + clase).focus();
        });
    });

    $('.icn_hora').each(function (kf, vf) {
        $(this).click(function () {
            var div = $(this).attr("class");
            var separar = div.split(" ");
            var clase = separar[1].substring(4);
            $("." + clase).focus();
        });
    });
}

function previsualizarImagen(input, destino, clase) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(destino).attr('src', e.target.result);
        }
        if (clase) {
            $(destino).addClass(clase);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$(document).ready(function () {
    cargaDatePicker();

    $('.sel_parent').each(function (k, v) {
//    if ($(v).val() == 0) {
        selectChange($(v));
//    }
    });

    $('.sel_parent').change(function () {
        selectChange($(this));
    });

    $('.onlynumber').keypress(function (evt) {
        return isNumberKey(evt);
    });

    $('.onlydouble').keypress(function (evt) {
        return isDoubleKey(evt);
    });

    $('#cambiar_usuario_id').keypress(function (e) {
        if (e.keyCode == 13 || e.keyCode == "13") {
            location.href = 'index.php?modulo=usuarios&accion=Cambiarlol&id=' + $(this).val();
        }
    });

    $('.number').number(true, 0, ',', '.');

    $('textarea').keyup(function (event) {
        if (event.keyCode == 13) {
            $(this).val($(this).val() + '\n');
        }
    });

});

function alertas() {
    $.get("index.php", {modulo: 'home', accion: 'alertaCalendario'},
            function (data) {

                if (IsValidJSON(data)) {
                    data = JSON.parse(data);
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {

                        alert("Se informa que la actividad " + data[i].nombre + ", esta apunto de vencerse. ");

                    }
                }

            });
}

function IsValidJSON(test) {
    try {
        var obj = JSON.parse(test);
        if (obj && typeof obj === "object" && obj !== null) {
            return true;
        }
    } catch (e) {

    }
    return false;
}
//function que se ejecuta antes del on blur y on submit del ValidationEngine (jquery.validationEngine.js)
// hacer algunos ajustes antes de que de que se haga la validacion con esta libreria.
function r_dice() {
    // console.log("23432");
    $('.select2-container').removeClass('validate[required]');
    $('.select2-container').each(function (k, v) {
        $('.' + ($(v).attr('id')) + 'formError').remove();
    });
}
//function que se ejecuta antes validate del ValidationEngine (jquery.validationEngine.js)
// hacer algunos ajustes antes de que de que se haga la validacion con esta libreria.
function v_dice() {
}

function alertasComentarios() {
    $.get("index.php", {modulo: 'home', accion: 'alertaComentarios'},
            function (data) {

                var antiguas = parseInt($("#alerta_comentario").html());
                data = JSON.parse(data);
                console.log(data[1][0].total);
                $("#alerta_comentario").html("");
                $("#alerta_comentario_asignadas").html("");
                if (data[0][0].total > 0) {
                    $("#alerta_comentario").html(data[0][0].total);
                }
                if (data[1][0].total > 0) {
                    $("#alerta_comentario_asignadas").html(data[1][0].total);
                }
                if (antiguas !== data[0][0].total && s3vars.modulo == "home") {
                    filtrarPendientes();
                }
            });
}