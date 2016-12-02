function obtenerGrafica(chartData) {
    var chart;

    // PIE CHART
    chart = new AmCharts.AmPieChart();

    chart.dataProvider = chartData;
    chart.titleField = s3vars.L_MOD.tipo_gestion;
    chart.valueField = s3vars.L_MOD.porcentaje;
    chart.sequencedAnimation = true;
    chart.startEffect = "elastic";
    chart.innerRadius = "60%";
    chart.startDuration = 3;
    chart.labelRadius = 20;
    chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
    // the following two lines makes the chart 3D
    chart.depth3D = 3;
    chart.angle = 7;

    // TITLE
    chart.addTitle(s3vars.L_MOD.lbl_participacion_tipo_gestion, 12);
    var legend = new AmCharts.AmLegend();
    legend.position = "right";
    legend.spacing = "5";

    chart.addLegend(legend);
    // WRITE                                 
    chart.write("grafica");
}