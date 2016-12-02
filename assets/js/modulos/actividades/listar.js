$(document).ready(function() {

    $("#filtroCategoria").click(function() {
        $('#tabla_listar').DataTable().ajax.reload();
    });
    $("#filtroEstado").click(function() {
        $('#tabla_listar').DataTable().ajax.reload();
    });
    $("#filtroUsuario").click(function() {
        $('#tabla_listar').DataTable().ajax.reload();
    });

//    $("#btn_clear_filtros").click(function() {
//
//        $("#filtroModulo option:selected").removeAttr("selected");
//        $('#tabla_listar').DataTable().ajax.reload();
//    });


});
