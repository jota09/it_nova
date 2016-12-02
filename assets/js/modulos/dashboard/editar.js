$(document).ready(function () {
    $('#form_editar').validationEngine();
    consultar();
    limpiar();
});

function consultar() {

    $('#btn_consultar').click(function () {
        limpiar_validates();
        var formulario = $("#form_editar").serialize();
        if ($("#form_editar").validationEngine('validate')) {

            $.ajax({
                dataType: 'json',
                beforeSend: function () {
//                    $('#btn_consultar').attr('disabled', 'disabled');
                    $('#btn_consultar i').removeClass('fa-search');
                    $('#btn_consultar i').addClass('fa-spinner fa-spin');
                },
                url: "index.php",
                data: formulario,
                success: function (data) {
                    
                    $('#btn_consultar').removeAttr('disabled');
                    $('#btn_consultar i').removeClass('fa-spinner fa-spin');
                    $('#btn_consultar i').addClass('fa-search');
                    $('#panel_reporte').css({'display': 'block'});

                    if (data.act_vencidasxusuario.length > 0) {
                        obtenerGraficaActividadesVencidas(data.act_vencidasxusuario);
                    } else {
                        $('#grafica_actividades_vencidas').html('<div class="col-lg-12 text-center"><label>Sin Datos</label></div>')
                    }

                    if (data.inv_time.length > 0) {
                        obtenerGraficaInvitacionesTiempo(data.inv_time);
                    } else {
                        $('#grafica_invitaciones_tiempo').html('<div class="col-lg-12 text-center"><label>Sin Datos</label></div>')
                    }
                    if (data.top_inv.length > 0) {
                        $('#top_inv').html('');
                        $.each(data.top_inv, function (k, v) {
                            $('#top_inv').append('<tr><td>' + v.usuario + '</td><td>' + v.num_actividades + '</td></tr>')
                        });
                    } else {
                        $('#top_inv').html('<div class="col-lg-12 text-center"><label>Sin Datos</label></div>')
                    }
                    if (data.act_cat.length > 0) {
                        $('#act_cat tbody').html('');
                        $('#act_cat tfoot').html('');
                        var aux = 0, aceptadas = 0;
                        $.each(data.act_cat, function (k, v) {
                            aux += parseInt(v.num_actividades);
                            aceptadas += parseInt(v.aceptadas);
                            $('#act_cat tbody').append('<tr><td>' + v.nombre + '</td><td>' + v.num_actividades + '</td><td>' + v.aceptadas + '</td></tr>')
                        });
                        $('#act_cat tfoot').append('<tr><th>Total</th><th>' + aux + '</th><th>' + aceptadas + '</th></tr>')
                    } else {
                        $('#act_cat tfoot').html('');
                        $('#act_cat tbody').html('<div class="col-lg-12 text-center"><label>Sin Datos</label></div>')
                    }

                    $('#total_propias').html(0);
                    $('#pen_propias').html(0);
                    $('#total_asig').html(0);
                    $('#pen_asig').html(0);

                    if (data.info_act.propias > 0) {
                        $('#total_propias').html(data.info_act.propias);
                    }
                    if (data.info_act.pen_propias > 0) {
                        $('#pen_propias').html(data.info_act.pen_propias);
                    }
                    if (data.info_act.asignadas > 0) {
                        $('#total_asig').html(data.info_act.asignadas);
                    }
                    if (data.info_act.pen_asignadas > 0) {
                        $('#pen_asig').html(data.info_act.pen_asignadas);
                    }
                }
            });
        }
    });

    $('#btn_exportar').click(function () {
        limpiar_validates();
        var formulario = $("#form_editar").serialize() + '&accion=listar&reporte=exportar';
        if ($("#form_editar").validationEngine('validate')) {
            window.open('index.php?' + formulario, "_self");
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


function obtenerGraficaActividadesVencidas(chartData) {
    var chart;


    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData;
    chart.categoryField = "user";
    chart.startDuration = 1;

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.labelRotation = 45;
    categoryAxis.gridPosition = "start";

    // value
    // in case you don't want to change default settings of value axis,
    // you don't need to create it, as one value axis is created automatically.

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.valueField = "value";
    graph.balloonText = "[[category]]: <b>[[value]]</b>";
    graph.type = "column";
    graph.fillColors = "#E3303D";
    graph.lineAlpha = 0;
    graph.fillAlphas = 0.8;
    chart.addGraph(graph);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.zoomable = false;
    chartCursor.categoryBalloonEnabled = false;
    chart.addChartCursor(chartCursor);

    chart.creditsPosition = "top-right";
    chart.write("grafica_actividades_vencidas");
}

function obtenerGraficaInvitacionesTiempo(chartData) {
    var chart;
    
    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData;
    chart.categoryField = "month";
    chart.startDuration = 1;

    // AXES
    // category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.labelRotation = 45;
    categoryAxis.gridPosition = "start";

    // value
    // in case you don't want to change default settings of value axis,
    // you don't need to create it, as one value axis is created automatically.

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.valueField = "value";
    graph.balloonText = "[[category]]: <b>[[value]]</b>";
    graph.type = "column";
    graph.lineAlpha = 0;
    graph.fillAlphas = 0.8;
    graph.fillColors = "#253848";
    chart.addGraph(graph);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.zoomable = false;
    chartCursor.categoryBalloonEnabled = false;
    chart.addChartCursor(chartCursor);

    chart.creditsPosition = "top-right";
    chart.write("grafica_invitaciones_tiempo");
}