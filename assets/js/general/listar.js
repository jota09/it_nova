var tablaListar = null;

function crearTablaLista() {
    var columnas = [{"data": "checkbox"}];

    $.each(s3vars.campos, function(a, v) {
        if (v != 'eliminado' && v != 'alterdelact') {
            columnas.push({"data": v});
        }
    });

    tablaListar = $('#tabla_listar').dataTable({
        "ordering": false,
        "processing": true,
        "serverSide": true,
        bFilter: false,
        "ajax": {
            "url": "index.php?modulo=" + s3vars.modulo + "&accion=ajaxtabla",
            "type": "POST",
            "data": function(d) {
                d.filtroModulo = $('#filtroModulo').val();
                d.filtroCargo = $('#filtroCargo').val();
                d.filtroPerfil = $('#filtroPerfil').val();
                d.filtroArea = $('#filtroArea').val();
                d.filtroEstado = $('#filtroEstado').val();
                d.filtroCategoria = $('#filtroCategoria').val();
                d.filtroUsuario = $('#filtroUsuario').val();
                d.filtroPermisos = s3vars.permiso;
            }
        },
        "columns": columnas,
        "fnRowCallback": function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            $(nRow).click(function() {
                if (typeof aData.alterdelact === "undefined" || aData.alterdelact == "1") {
                    $.each($(nRow).find('td'), function(a, b) {
                        if (a > 0) {
                            $(b).click(function() {
                                location.href = "index.php?modulo=" + s3vars.modulo + "&accion=editar&registro=" + aData.id;
                            });
                        }
                    });
                }
            });
        }
    });

    //tablaListar.ajax.reload();
}

$(document).ready(function() {
    crearTablaLista();
   
    $('#btn_crear_nuevo').click(function() {
        var modulo = $(this).attr("data-modulo");
        location.href = "index.php?modulo=" + modulo + "&accion=editar";
    });

    $('#form_listar').submit(function() {
        return confirm('Esta seguro que desea continuar con la accion?');
    });

    $('#btn_filtros').click(function() {
        if ($('.filtro').hasClass('hide')) {
            $('.filtro').removeClass('hide');
        } else {
            $('.filtro').addClass('hide');
        }
    });
    $('#btn_clear_filtros').click(function() {
//        $('.input-filtro, .date-range').val('');
//        table.search('').draw();
//        table.columns().search('').draw();
        $("select option:selected").removeAttr("selected");
        $("input").val("");
        $('select').select2("val", "");
        $('#tabla_listar').DataTable().ajax.reload();
    });
     $('select').each(function (i, o) {
        console.log(o);    
        $(o).select2();
        });

});
