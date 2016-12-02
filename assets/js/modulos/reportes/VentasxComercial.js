function obtenerGrafica(chartData) {
    var chart;

    // SERIAL CHART
    chart = new AmCharts.AmSerialChart();
    chart.dataProvider = chartData;
    chart.categoryField = s3vars.L_MOD.comercial;
    chart.startDuration = 2;
    // this single line makes the chart a bar chart,
    // try to set it to false - your bars will turn to columns
//    chart.rotate = true;
    // the following two lines makes chart 3D
    chart.depth3D = 35;
    chart.angle = 25;

    // AXES
    // Category
    var categoryAxis = chart.categoryAxis;
    categoryAxis.gridPosition = "start";
    categoryAxis.axisColor = "#DADADA";
    categoryAxis.fillAlpha = 1;
    categoryAxis.gridAlpha = 0;
    categoryAxis.fillColor = "#FAFAFA";

    // value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisColor = "#DADADA";
    valueAxis.title = s3vars.L_MOD.lbl_ventas_valor;
    valueAxis.gridAlpha = 0.5;
    chart.addValueAxis(valueAxis);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.title = "Income";
    graph.valueField = s3vars.L_MOD.ventas;
    graph.type = "column";
    graph.balloonText = s3vars.L_MOD.lbl_ventas + " <b>[[category]]</b> -> <b>[[value]]</b>";
    graph.lineAlpha = 0;
    graph.fillColors = "#bf1c25";
    graph.fillAlphas = 1;
    chart.addGraph(graph);
    
    // TITLE
    chart.addTitle(s3vars.L_MOD.lbl_ventas_comercial, 12);

    // WRITE                                 
    chart.write("grafica");
}