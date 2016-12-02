$(document).ready(function () {

    campos_tipo();
    $("#tipo_id").change(function () {
        campos_tipo();
    });

    try {
        $('#jqxFileUpload').jqxFileUpload({
            theme: 'energyblue',
            width: 300,
            uploadUrl: null,
            fileInputName: 'fileInput'
        });

        $('#jqxButton').jqxButton({
            height: '40px', width: '100px'
        });

        $('#jqxButton').on('click', function () {
            $('#jqxFileUpload').jqxFileUpload('browse');
        });
    } catch (ex) {

    }

    $('#btn_buscar').click(function () {
        buscarRegistros();
    });
    buscarRegistros();

    $("#estado_id").change(function () {
        $(".rechazo").addClass("hidden");
        $(".acepto").addClass("hidden");
        $(".cumplida_cerrada").addClass("hidden");
        if ($("#estado_id").val() == 51) {//RECHAZO
            $(".rechazo").removeClass("hidden");
//      $("#fecha_inicio").val("");
//      $("#fecha_fin").val("");
        } else if ($("#estado_id").val() == 50) { // ACEPTAR
            if (s3vars.registro.categoria_id == 45) {
                $("#fecha_inicio").attr("disabled", "disabled").removeClass("fecha");
                $("#fecha_fin").attr("disabled", "disabled").removeClass("fecha");
                $("#hora_inicio").attr("disabled", "disabled").removeClass("hora");
                $("#hora_fin").attr("disabled", "disabled").removeClass("hora");
            } else {
                var date = new Date();
//date.yyyymmdd()
//        $("#fecha_inicio").val("");
//        $("#fecha_fin").val("");
            }

            $(".acepto").removeClass("hidden");
        } else if ($("#estado_id").val() == 53) { // CUMPLIDO
            $(".cumplida_cerrada").removeClass("hidden");
        }
        isPropia();
    });

    isPropia();
    
    if(s3vars.registro.id > 0){
//        actualizarFechaModificacion(s3vars.registro.id);
        marcarActividadVista(s3vars.registro.id);
    }
});

function campos_tipo() {
    op = $("#tipo_id").val();
    console.log(op);
    if (op == '38' || op == 38) { //SIMPLE

        $(".smpl").css({display: "inline"});
        $(".ctgr").css({display: "none"});

        $(".tarea").show();
        $(".tarea").find('input,select').removeAttr('disabled');
        $(".tarea").find('.addreq').addClass('required');
        $(".llamada").find('.addreq').removeClass('required');
        $(".reunion").find('.addreq').removeClass('required');
        $(".llamada").find('input').val('');
        $(".reunion").find('input').val('');

        $(".llamada").find('.addreq').each(function () {
            $(this).select2("val", "-1");
        });
        $(".reunion").find('.addreq').each(function () {
            $(this).select2("val", "-1");
        });

        $(".llamada").hide();
        $(".reunion").hide();
        $(".llamada").find('input,select').attr('disabled', 'disabled');
        $(".reunion").find('input,select').attr('disabled', 'disabled');
    }
    if (op == '39' || op == 39) { // COMPUESTA

        $(".ctgr").css({display: "inline"});
        $(".smpl").css({display: "none"});


        $(".llamada").show();
        $(".llamada").find('input,select').removeAttr('disabled');
        $(".llamada").find('.addreq').addClass('required');
        $(".tarea").find('.addreq').removeClass('required');
        $(".reunion").find('.addreq').removeClass('required');
        $(".tarea").find('input').val('');
        $(".reunion").find('input').val('');
        $(".tarea").find('.addreq').each(function () {
            $(this).select2("val", "-1");
        });
        $(".reunion").find('.addreq').each(function () {
            $(this).select2("val", "-1");
        });
        $(".tarea").hide();
        $(".reunion").hide();
        $(".tarea").find('input,select').attr('disabled', 'disabled');
        $(".reunion").find('input,select').attr('disabled', 'disabled');
    }
    if (op == '222') {
        $(".reunion").show();
        $(".reunion").find('input,select').removeAttr('disabled');
        $(".reunion").find('.addreq').addClass('required');
        $(".llamada").find('.addreq').removeClass('required');
        $(".tarea").find('.addreq').removeClass('required');
        $(".tarea").find('input').val('');
        $(".llamada").find('input').val('');
        $(".llamada").find('.addreq').each(function () {
            $(this).select2("val", "-1");
        });
        $(".tarea").find('.addreq').each(function () {
            $(this).select2("val", "-1");
        });
        $(".llamada").hide();
        $(".tarea").hide();
        $(".llamada").find('input,select').attr('disabled', 'disabled');
        $(".tarea").find('input,select').attr('disabled', 'disabled');

        var x = $('input[id^=email_actividad]').length;
        if (x < 0) {
            agregarInvitado();
        }

    }
}


function validarFormulario() {

    if (validarUbicacion() && validar_datos('#form_editar')) {


        var x = $('input[id^=email_actividad]').length;

        if ($("#tipo").val() != '222') {
            return true;
        }
        if ($("#tipo").val() == '222') {
            if (x > 0) {
                return true;
            } else {
                alert('Debe Haber almenos un Invitado');
                return false;
            }


        }

    } else {
        alert('Algunos datos no son validos, por favor verifique he intente nuevamente.');
        return false;
    }
}

function buscarRegistros() {
    $("#cargar_busqueda").removeClass("hidden");
    data = {
        codigo: $("#codigo").val(),
        nombre: $("#nombre").val(),
        usuario: $("#usuario").val(),
        categoria: $("#categoria").val(),
        estado: $("#estado").val(),
        respuesta: $("#respuesta").val()
    };

    $.ajax({
        url: 'index.php?modulo=actividades&accion=buscarRegistrosActividadesAsignadas',
        type: "post",
        data: data,
        cache: false,
        dataType: "json",
        async: false

    }).done(function (data) {
        console.log(data);
        tablaDatos = "";
        $("#cargar_busqueda").addClass("hidden");
        if (data.length > 0) {
            tablaDatos = "<table class='table'>";
            tablaDatos += "<tr> <th>Código</th> <th>Asunto</th> <th>Categoria</th> <th>Usuario Asignado</th> <th>Fecha Asignacion</th> <th>Fecha Respuesta</th> <th>Respuesta</th> <th>Fecha Realización</th> <th>Estado</th> <th>&nbsp;</th> </tr>";
            $.each(data, function (k, v) {
                tablaDatos += "<tr> <td>" + v.total + v.id + "</td> <td><b><a target='_blank' href='index.php?modulo=actividades&accion=editar&registro=" + v.id + "' >" + v.nombre + "</a></b></td><td>" + v.categoria + "</td><td>" + v.usuario + "</td><td class='text-center'>" + v.fecha_creacion + "</td><td class='text-center " + v.alerta + "'><div >" + v.f_respuesta + "</div></td><td>" + v.respuesta + "</td><td class='text-center'>" + v.f_realizada + "</td><td>" + v.estado + "</td> <td> ";
                if (v.estado !== "Cumplida y cerrada" && v.estado !== "Socializada") {
                    tablaDatos += "<i id='cancelar_act_" + v.id + "' class='fa fa-check ' aria-hidden='true' onclick='cancelarActividad(" + v.id + ");' ></i> <span id='esperar_cancel_act_" + v.id + "' class='hidden'><i class='fa fa-refresh fa-spin '></i> </span> ";
                }
                tablaDatos += "</td> </tr>";
            });

            tablaDatos += "</table>";
        } else {
            tablaDatos = '<div class="alert alert-danger" style=" font-size:15px; margin-bottom:0px; " ><strong>Información!</strong> No se han encontrado registros.</div>';
        }
        $("#resulta_filtro").html(tablaDatos).parent().parent().removeClass("hidden");

    });
}

function cancelarActividad(actividad) {
    var r = confirm("Realmente desea cambiar esta actividad a Cumplida y cerrada?");
    if (r == true) {
        $("#cancelar_act_" + actividad).addClass("hidden");
        $("#esperar_cancel_act_" + actividad).removeClass("hidden");

        $.ajax({
            url: 'index.php?modulo=actividades&accion=cancelarActividad',
            type: "post",
            data: {actividad: actividad},
            cache: false,
            dataType: "json",
            async: false

        }).done(function (data) {

            $("#esperar_cancel_act_" + actividad).addClass("hidden");
            //javascript:location.reload();
        });

    } else {
        // alert("Rechazar actividad " + actividad);
    }
}

function marcarActividad(id) {
    //console.log(id);
    $("#registroACt").val(id);
    $("#registroACt_r").val(id);
    $(".ocultar_reunion").removeClass("hidden");
    if ($("#isMeeting").val() == 1) {
        $(".ocultar_reunion").addClass("hidden");
    }
}

function isPropia() {
    if (s3vars.registro.responsable_id === s3vars.registro.creado_por && s3vars.registro.responsable_id == $("#usuarioIdSession").val()) {
        $(".propia").removeClass("hidden");
    }
}

Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(), (!mm[1]) ? '0' + mm : mm, (!dd[1]) ? dd : '0' + dd].join('-'); // padding
};

function marcarActividadVista(id){
            $.ajax({
            url: 'index.php?modulo=actividades&accion=marcarActividadVista',
            type: "post",
            data: {actividad: id},
            cache: false,
            dataType: "json",
            async: true

        }).done(function (data) {
            console.log(data);
        });
}
