function obtenerGrafica(chartData) {

    var chart;

    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData;
    chart.categoryField = s3vars.L_MOD.anio_mes;
    chart.startDuration = 1;
    chart.plotAreaBorderColor = "#DADADA";
    chart.plotAreaBorderAlpha = 1;
    // this single line makes the chart a bar chart
    chart.rotate = false;

    // AXES
    // Category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.gridPosition = "start";
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.axisAlpha = 0;

    // Value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0;
    valueAxis.gridAlpha = 0.1;
    valueAxis.position = "top";
    chart.addValueAxis(valueAxis);

    // GRAPHS
    // first graph
    var graph1 = new AmCharts.AmGraph();
    graph1.type = "column";
    graph1.title = s3vars.L_MOD.lbl_meta;
    graph1.valueField = s3vars.L_MOD.meta;
    graph1.balloonText = s3vars.L_MOD.lbl_meta + ":[[value]]";
    graph1.lineAlpha = 0;
    graph1.fillColors = "#ADD981";
    graph1.fillAlphas = 1;
    chart.addGraph(graph1);

    // second graph
    var graph2 = new AmCharts.AmGraph();
    graph2.type = "column";
    graph2.title = s3vars.L_MOD.lbl_presupuesto;
    graph2.valueField = s3vars.L_MOD.presupuesto;
    graph2.balloonText = s3vars.L_MOD.lbl_presupuesto + ":[[value]]";
    graph2.lineAlpha = 0;
    graph2.fillColors = "#81acd9";
    graph2.fillAlphas = 1;
    chart.addGraph(graph2);

    // TITLE
    chart.addTitle(s3vars.L_MOD.lbl_cumplimiento_metas, 12);
    
    //LEGEND
    var legend = new AmCharts.AmLegend();
    legend.position = "bottom";
    legend.align = "center";

    chart.addLegend(legend);

    // WRITE
    chart.write("grafica");

}
