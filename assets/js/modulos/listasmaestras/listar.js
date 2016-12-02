$(document).ready(function() {

    $("#filtroModulo").click(function() {
        $('#tabla_listar').DataTable().ajax.reload();
    });


//    $("#btn_clear_filtros").click(function() {
//
//        $("#filtroModulo option:selected").removeAttr("selected");
//        $('#tabla_listar').DataTable().ajax.reload();
//    });


});
