$(document).ready(function() {

    $("#filtroCargo").click(function() {
        $('#tabla_listar').DataTable().ajax.reload();
    });
    $("#filtroPerfil").click(function() {
        $('#tabla_listar').DataTable().ajax.reload();
    });
    $("#filtroArea").click(function() {
        $('#tabla_listar').DataTable().ajax.reload();
    });
    

//    $("#btn_clear_filtros").click(function() {
//
//        $("#filtroModulo option:selected").removeAttr("selected");
//        $('#tabla_listar').DataTable().ajax.reload();
//    });


});
