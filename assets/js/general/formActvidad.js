var fila_hija = 1;
var aux = 0;
function obtenerFormularioActividad(data) {
    
   console.log(data);
   var horas_fin = '',
           horas_inicio = '',
           minutos_fin = '',
           minutos_inicio = '',
           fecha_inicio_am = '',
           fecha_fin_am = '';
   //    console.log(s3vars);
   op_act = '';
   op_mod_rel = '';
   op_mod_estado = '<option value="-1">Seleccionar</option>';
   op_aviso = '<option value="-1">Seleccionar</option>';

   var invitados = cargar_invitados_cal(data.id);

   var form_test =
           '     <div class="col-sm-12 subtitulo" > ' + s3vars.L_APP.lbl_datos_basicos + ' </div> ' +
           '    <div class="col-sm-6 "> ' +
           '     <div class="form-group"> ' +
           '      <label class="control-label col-sm-3" for="nombre">' + s3vars.L_MOD.lbl_nombre + ' </label> ' +
           '     <div class="col-sm-8 no-padding-right">                     ' +
           '      <input type="text" class="form-control validate[required]" value="' + data.nombre + '" id="nombre" name="nombre" form="form_actividades" ><input type="hidden" class="form-control " value="' + data.id + '" id="id" name="id" form="form_actividades" > ' +
           '   </div> ' +
           '</div> ' +
           '       </div> ' +
           '      <div class="col-sm-6 "> ' +
           '       <div class="form-group"> ' +
           '        <label class="control-label col-sm-3" for="tipo">' + s3vars.L_MOD.lbl_tipo + '</label> ' +
           '       <div class="col-sm-8 no-padding-right">  ' +
           '        <select class="form-control validate[required]" id="tipo_id" name="tipo_id" onchange="cambioTipo();" > ' +
           '         <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.tipo.length; i++) {
      var seleccionado = "";
      if (s3vars.listas_actividades.tipo[i].id == data.tipo_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.tipo[i].id + '" "' + seleccionado + '">' + s3vars.listas_actividades.tipo[i].nombre + ' </option > ';
   }
   form_test += '   </select> ' +
           '</div> ' +
           '         </div> ' +
           '      </div> ' +
           '     <div class="clearfix"></div> ' +
           '     <div class="col-sm-6 "> ' +
           '      <div class="form-group"> ' +
           '       <label class="control-label col-sm-3" for="categoria_id">' + s3vars.L_MOD.lbl_categoria + '</label> ' +
           '      <div class="col-sm-8 no-padding-right">      ' +
           '       <select class="form-control  validate[required]" id="categoria_id" name="categoria_id" onchange="cambioCategoria();"> ' +
           '        <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.categoria.length; i++) {
      var seleccionado = "";
      if (s3vars.listas_actividades.categoria[i].id == data.categoria_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.categoria[i].id + '" "' + seleccionado + '">' + s3vars.listas_actividades.categoria[i].nombre + ' </option > ';
   }

   form_test += '   </select> ' +
           '              </div> ' +
           '           </div> ' +
           '        </div> ' +
           '       <div class="clearfix reunion"></div> ' +
           '      <div class="col-sm-6  reunion"> ' +
           '       <div class="form-group"> ' +
           '        <label class="control-label col-sm-3" for="fecha_inicio">' + s3vars.L_MOD.lbl_fecha_inicio + '</label> ' +
           '       <div class="col-sm-8 no-padding-right">  ' +
           '               <div class="col-sm-6 no-padding-left">  ' +
           '                <div class="input-group">  ' +
           '                 <input type="text" class="form-control  validate[required] fecha" value="' + data.fecha_inicio + '" id="fecha_inicio" name="fecha_inicio" placeholder="AAAA-MM-DD" > ' +
           '                <div class="input-group-addon">  ' +
           '                 <img src="assets/img/general/Calendario.png" /> ' +
           '              </div>  ' +
           '           </div>  ' +
           '               </div> ' +
           '              <div class="col-sm-4 no-padding">    ' +
           '               <div class="input-group">  ' +
           '                <input type="text" class="form-control hora validate[required]" value="' + data.hora_inicio + '" id="hora_inicio" name="hora_inicio" placeholder="HH:MM" > ' +
           '               <div class="input-group-addon">  ' +
           '                <i class="fa fa-clock-o" style="font-size: 28px;"></i> ' +
           '             </div>  ' +
           '          </div> ' +
           '       </div> ' +
           '    </div> ' +
           ' </div> ' +
           '</div> ' +
           '         <div class="col-sm-6 tarea reunion"> ' +
           '          <div class="form-group"> ' +
           '           <label class="control-label col-sm-3" for="fecha_fin">' + s3vars.L_MOD.lbl_fecha_fin + '</label> ' +
           '          <div class="col-sm-8 no-padding-right">  ' +
           '           <div class="col-sm-6 no-padding-left">  ' +
           '            <div class="input-group">  ' +
           '             <input type="text" class="form-control  validate[required] fecha" value="' + data.fecha_fin + '" id="fecha_fin" name="fecha_fin" placeholder="AAAA-MM-DD"> ' +
           '                 <div class="input-group-addon">  ' +
           '                  <img src="assets/img/general/Calendario.png" /> ' +
           '               </div>  ' +
           '            </div>  ' +
           '         </div> ' +
           '             <div class="col-sm-4 no-padding">    ' +
           '              <div class="input-group">  ' +
           '               <input type="text" class="form-control hora validate[required]" value="' + data.hora_fin + '" id="hora_fin" name="hora_fin" placeholder="HH:MM" > ' +
           '              <div class="input-group-addon">  ' +
           '               <i class="fa fa-clock-o" style="font-size: 28px;"></i> ' +
           '            </div>  ' +
           '                </div> ' +
           '             </div> ' +
           '          </div> ' +
           '       </div> ' +
           '    </div> ' +
           '   <div class="clearfix"></div> ' +
           '         <div class="col-sm-6 invitacion "> ' +
           '          <div class="form-group"> ' +
           '           <label class="control-label col-sm-3" for="razon_invitacion_id">' + s3vars.L_MOD.lbl_razon_invitacion + '</label> ' +
           '          <div class="col-sm-8 no-padding-right">      ' +
           '           <select class="form-control  validate[required]" id="razon_invitacion_id" name="razon_invitacion_id" > ' +
           '            <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.razon.length; i++) {
      var seleccionado = "";
      if (s3vars.listas_actividades.razon[i].id == data.razon_id) {
         seleccionado = " selected='delected' ";
      }

      form_test += '<option  value="' + s3vars.listas_actividades.razon[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.razon[i].nombre + ' </option > ';
   }

   form_test += '</select> ' +
           '          </div> ' +
           '       </div> ' +
           '    </div> ' +
           '   <div class="clearfix"></div> ' +
           '        <div class="col-sm-6 "> ' +
           '         <div class="form-group"> ' +
           '          <label class="control-label col-sm-3" for="estado_id">' + s3vars.L_MOD.lbl_estado + '</label> ' +
           '         <div class="col-sm-8 no-padding-right">      ' +
           '          <select class="form-control validate[required]" id="estado_id" name="estado_id" > ' +
           '           <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.estado.length; i++) {

      var seleccionado = "";
      if (s3vars.listas_actividades.estado[i].id == data.estado_id) {
         seleccionado = " selected='delected' ";

         form_test += '<option  value="' + s3vars.listas_actividades.estado[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.estado[i].nombre + ' </option >';

      } else {
         if (data.estado_id == 49) {

            if ($("#usuarioIdSession").val() != data.creado_por && $("#usuarioIdSession").val() == data.responsable_id && (s3vars.listas_actividades.estado[i].id == 50 || s3vars.listas_actividades.estado[i].id == 51)) {
               form_test += '<option  value="' + s3vars.listas_actividades.estado[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.estado[i].nombre + ' </option >';

            } else if ($("#usuarioIdSession").val() == data.creado_por && s3vars.listas_actividades.estado[i].id == 57) {
               form_test += '<option  value="' + s3vars.listas_actividades.estado[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.estado[i].nombre + ' </option >';

            }
         }
         if (data.estado_id == 50) {

            if ($("#usuarioIdSession").val() == data.responsable_id && s3vars.listas_actividades.estado[i].id == 52) {
               form_test += '<option  value="' + s3vars.listas_actividades.estado[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.estado[i].nombre + ' </option >';

            } else if ($("#usuarioIdSession").val() == data.creado_por && s3vars.listas_actividades.estado[i].id == 57) {
               form_test += '<option  value="' + s3vars.listas_actividades.estado[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.estado[i].nombre + ' </option >';

            }
         }

         if (data.estado_id == 52) {

            if ($("#usuarioIdSession").val() == data.creado_por && s3vars.listas_actividades.estado[i].id == 53) {
               form_test += '<option  value="' + s3vars.listas_actividades.estado[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.estado[i].nombre + ' </option >';

            }
         }
      }

   } // END DE FOR ESTADO

   form_test += '</select> ' +
           '  </div> ' +
           '     </div> ' +
           '  </div> ' +
           '        <div class="col-sm-6 tarea reunion"> ' +
           '         <div class="form-group"> ' +
           '          <label class="control-label col-sm-3"> ' + s3vars.L_MOD.lbl_alerta + '</label> ' +
           '         <div class="col-sm-8 no-padding-right">  ' +
           '          <div class="col-sm-2 no-padding-left">  ' +
           '           <input type="text" class="form-control addreq validate[required]" name="alerta" value="' + data.alerta + '" ></div> ' +
           '        <div class="col-sm-5 no-padding-left">  ' +
           '         <select class="form-control addreq validate[required]" id="tiempo_alerta_id" name="tiempo_alerta_id"> ' +
           '          <option value="0">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listasG.tiempo_alerta.length; i++) {

      var seleccionado = "";
      if (s3vars.listasG.tiempo_alerta[i].id == data.tiempo_alerta_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listasG.tiempo_alerta[i].id + '"  "' + seleccionado + '">' + s3vars.listasG.tiempo_alerta[i].nombre + ' </option > ';
   }

   form_test += '</select> ' +
           '           </div> ' +
           '          <div class="col-sm-5 no-padding-left">  ' +
           '           <select class="form-control required validate[required]" id="tipo_alerta_id" name="tipo_alerta_id"> ' +
           '            <option value="0">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listasG.tipo_alerta.length; i++) {

      var seleccionado = "";
      if (s3vars.listasG.tipo_alerta[i].id == data.tipo_alerta_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listasG.tipo_alerta[i].id + '"  "' + seleccionado + '">' + s3vars.listasG.tipo_alerta[i].nombre + ' </option > ';
   }

   form_test += '</select> ' +
           '              </div> ' +
           '           </div> ' +
           '        </div> ' +
           '     </div> ' +
           '    <div class="clearfix"></div> ' +
           '        <div class="col-sm-6 "> ' +
           '         <div class="form-group"> ' +
           '          <label class="control-label col-sm-3" for="responsable_id">' + s3vars.L_MOD.lbl_usuario + '</label> ' +
           '         <div class="col-sm-8 no-padding-right">    ' +
           '          <select class="form-control validate[required]" id="responsable_id" name="responsable_id" > ' +
           '           <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      var seleccionado = "";
      if (s3vars.usuarios_calendario[i].id == data.responsable_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.usuarios_calendario[i].id + '"  "' + seleccionado + '">' + s3vars.usuarios_calendario[i].nombres + ' </option >';
   }

   form_test += '</select> ' +
           '           </div> ' +
           '        </div> ' +
           '     </div>  ' +
           '    <div class="col-sm-6 hidden"> ' +
           '     <div class="form-group"> ' +
           '      <label class="control-label col-sm-3" for="prioridad_id">' + s3vars.L_MOD.lbl_prioridad + '</label> ' +
           '     <div class="col-sm-8 no-padding-right">  ' +
           '      <select class="form-control validate[required]" id="prioridad_id" name="prioridad_id" > ' +
           '       <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.prioridad.length; i++) {

      var seleccionado = "";
      if (s3vars.listas_actividades.prioridad[i].id == data.prioridad_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.prioridad[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.prioridad[i].nombre + ' </option >';
   }

   form_test += '</select> ' +
           '         </div>         ' +
           '      </div> ' +
           '   </div>  ' +
           '  <div class="clearfix"></div> ' +
           // ZONA DE ACTIVIDADES HIJAS
           '         <section class=" cmpst"> ' +
           '          <div class="col-sm-12 subtitulo" > ' + s3vars.L_MOD.lbl_actividades + ' </div> ' +
           '         <div class="col-sm-12">   ' +
           '          <div class="form-group"> ' +
           '           <label class="control-label col-sm-offset-1 col-sm-2" >' + s3vars.L_MOD.lbl_agregar_actividad + '</label> ' +
           '          <div class="col-sm-3 no-padding-left">  ' +
           '           <button type="button" id="btn_agregar_actividad_hija" onclick="agregarActividadHija()" class="btn btn-primary "><i class="fa fa-plus"></i></button> ' +
           '        </div> ' +
           '     </div>   ' +
           '  </div>  ' +
           '        <div class="col-sm-12">  ' +
           '          <label class="control-label col-sm-3"><b>' + s3vars.L_MOD.lbl_nombre_hija + ' </b></label> ' +
           '          <label class="control-label col-sm-3"><b>' + s3vars.L_MOD.lbl_usuario + ' </b></label> ' +
           '          <label class="control-label col-sm-2"><b>' + s3vars.L_MOD.lbl_porcentaje + ' </b></label> ' +
           '          <label class="control-label col-sm-3"><b>' + s3vars.L_MOD.lbl_fecha_vencimiento + ' </b></label> ' +
           '          <label class="control-label col-sm-1"></label> ' +
           '        </div> ' +
           '          <div  id="div_agregar_actividad"> ' +
           '           <div class="col-sm-12"> ' +
           '            <input type="hidden" class="id" name="hija_id[]" value="">' +
           '           <input type="hidden" class="eliminado" name="hija_eliminado[]" value="0">' +
           '          <div class="control-label col-sm-3">' +
           '           <input type="text" class="form-control  validate[required]" value="" id="nombre_hija_0" name="nombre_hija[]" form="form_actividades" >' +
           '              </div>' +
           '             <div class="control-label col-sm-3">' +
           '              <select class="form-control " id="usuario_id_hija_0" name="usuario_id_hija[]" >' +
           '               <option value="">' + s3vars.L_APP.lbl_select + '</option>';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      var seleccionado = "";
      if (s3vars.usuarios_calendario[i].id == data.responsable_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.usuarios_calendario[i].id + '"  "' + seleccionado + '" >' + s3vars.usuarios_calendario[i].nombres + ' </option >';
   }

   form_test += '</select> ' +
           '         </div>' +
           '        <div class="control-label col-sm-2 no-padding" style="width: 70px;">' +
           '         <input type="text" class="form-control numberFloat validate[required]" value="" id="porcentaje_hija_0" name="porcentaje_hija[]" onkeyup="calcular();">' +
           '              </div>' +
           '             <div class="control-label col-sm-2"  style="width: 160px;">' +
           '              <div class="input-group"> ' +
           '               <input type="text" class="form-control fecha validate[required]" value="" id="fecha_hija_0" name="fecha_hija[]" >' +
           '              <div class="input-group-addon"> ' +
           '               <img src="assets/img/general/Calendario.png" />' +
           '            </div> ' +
           '         </div> ' +
           '      </div>' +
           '     <div class="control-label col-sm-1 no-padding" style="width: 105px;">' +
           '      <div class="input-group"> ' +
           '       <input type="text" class="form-control hora validate[required]" value="" id="hora_hija_0" name="hora_hija[]" >' +
           '      <div class="input-group-addon"> ' +
           '       <i class="fa fa-clock-o" style="font-size: 28px;"></i>' +
           '    </div> ' +
           '              </div>' +
           '           </div>' +
           '          <div class="control-label col-sm-1">' +
           '         </div>' +
           '      </div>' +
           '   </div>' +
           '  <div class="clearfix"></div>' +
           '           <div class="col-sm-12"> ' +
           '            <label class="control-label col-sm-3"></label>' +
           '           <div class="control-label  col-sm-3 subtitulo" style="font-size: 15px; text-align: right;">' + s3vars.L_MOD.lbl_total + '</div>' +
           '          <div class="control-label col-sm-2 no-padding subtitulo " style="width: 70px; font-size: 15px; text-align: center;"> ' +
           '           <span id="totalizado"></span> </div>' +
           '        <label class="control-label col-sm-3"></label>' +
           '       <label class="control-label col-sm-1"></label>' +
           '    </div>' +
           ' </section>' +
           '<div class="clearfix"></div>' +
           // FIN DE ACTIVIDADES HIJA
           '         <div class="col-sm-12 subtitulo" > ' + s3vars.L_MOD.lbl_comentarios + ' </div>' +
           '        <div class="col-sm-12 ">' +
           '         <div class="form-group">' +
           '          <label class="control-label col-sm-2" for="comentario">' + s3vars.L_MOD.lbl_comentario + '</label>' +
           '         <div class="col-sm-10 no-padding-right"> ' +
           '          <textarea class="form-control" id="comentario" name="comentario" rows="3"></textarea>' +
           '       </div>        ' +
           '    </div>' +
           ' </div> ' +
           '<div class="clearfix"></div>' +
           '        <div class="col-sm-3 text-center" >' +
           '         <input  class="btn btn-primary" style="margin-top: 20px;" type="button" id="jqxButton" value="Examinar" />' +
           '      </div>' +
           '     <div class="col-sm-9 text-center" >' +
           '      <div id="jqxFileUpload" class="col-sm-6"></div>' +
           '   </div>' +
           '  <div class="clearfix"></div>' +
           '         <section class=" reunion">' +
           '     <div class="clearfix"></div>' +
           // INVITADOS
           '<div class="col-sm-12 subtitulo" > ' + s3vars.L_MOD.lbl_invitados + ' </div>' +
           '<div class="col-sm-12">  ' +
           ' <div class="form-group">' +
           '  <label class="control-label col-sm-offset-1 col-sm-2">' + s3vars.L_MOD.lbl_agregar_invitado + '</label>' +
           ' <div class="col-sm-9 no-padding-left"> ' +
           '  <button type="button" id="btn_agregar_invitado" onclick="agregarInvitado_act();" class="btn btn-primary "><i class="fa fa-plus"></i></button>' +
           '</div>' +
           '</div>  ' +
           '</div> ' +
           '<div class="col-sm-12"> ' +
           '  <label class="control-label col-sm-4"><b>' + s3vars.L_MOD.lbl_nombre_hija + '</b></label>' +
           '  <label class="control-label col-sm-3"><b>' + s3vars.L_MOD.lbl_usuario + '</b></label>' +
           '  <label class="control-label col-sm-4"><b>' + s3vars.L_MOD.lbl_acepta_rechaza + '</b></label>' +
           '  <label class="control-label col-sm-1"></label>' +
           '</div>' +
           '<div class="clearfix"></div>' +
           '<div class="col-sm-12">' +
           '</div>' +
           '<div class="clearfix"></div>' +
           '<div id="div_agregar_invitados">';


   console.log(invitados);
   for (i = 0; i < invitados.length; i++) {

      console.log(invitados[i].id);
      form_test += '<div  class="col-sm-12 form-group">' +
              '<div class=" col-sm-4">';
      for (var j = 0; j < s3vars.usuarios_calendario.length; j++) {
         if (s3vars.usuarios_calendario[j].id == invitados[i].id) {
            form_test += invitados[i].nombres + invitados[i].apellidos;
         }
      }
      form_test += '</select>   ' +
              '</div>' +
              '<div class=" col-sm-3">';
      for (var k = 0; k < s3vars.usuarios_calendario.length; k++) {
         if (s3vars.usuarios_calendario[k].id == invitados[i].id) {
            form_test += invitados[i].nombre_usuario;
         }
      }
      form_test += '</select>   ' +
              '</div>' +
              '<div class=" col-sm-4"> ';

      if (invitados[i].respuesta == 2) {
         form_test += " Rechazado ";
      } else if (invitados[i].respuesta == 1) {
         form_test += " Aceptado ";
      } else {
         form_test += " Sin Respuesta ";
      }

      form_test += '</div>' +
              '<div class="col-sm-1 ">' +
              '</div>' +
              '</div>';
   }


   form_test += '</div>' +
           // FIN INVITADOS
           '<div class="clearfix"></div>' +
           '       </section>' +
           '      </div>  ';
   var form = '<form id="form_actividades" action="index.php" class="form-horizontal" enctype="multipart/form-data" onsubmit="return validarFormulario_calendario();return false;"> ' +
           '<div class="row">  ' +
           '<div class="col-sm-12"> ' + form_test + '</div>' +
           '</form> <script>cargaDatePicker(); selects_dos("form_actividades");</script>';
   actualizarVista();
   return form;

}

function obtenerFormularioActividad_mobile(data) {

   console.log(data);
   var horas_fin = '',
           horas_inicio = '',
           minutos_fin = '',
           minutos_inicio = '',
           fecha_inicio_am = '',
           fecha_fin_am = '';
   //    console.log(s3vars);
   op_act = '';
   op_mod_rel = '';
   op_mod_estado = '<option value="-1">Seleccionar</option>';
   op_aviso = '<option value="-1">Seleccionar</option>';

   var invitados = cargar_invitados_cal(data.id);

   var form_test =
           '     <div class="col-sm-12 subtitulo" > ' + s3vars.L_APP.lbl_datos_basicos + ' </div> ' +
           '    <div class="col-sm-6 "> ' +
           '     <div class="form-group"> ' +
           '      <label class="control-label col-sm-2" for="nombre">' + s3vars.L_MOD.lbl_nombre + ' </label> ' +
           '     <div class="col-sm-10 no-padding-left">                     ' +
           '      <input type="text" class="form-control validate[required]" value="' + data.nombre + '" id="nombre" name="nombre" form="form_actividades" ><input type="hidden" class="form-control " value="' + data.id + '" id="id" name="id" form="form_actividades" > ' +
           '   </div> ' +
           '</div> ' +
           '       </div> ' +
           '      <div class="col-sm-6 "> ' +
           '       <div class="form-group"> ' +
           '        <label class="control-label col-sm-2" for="tipo">' + s3vars.L_MOD.lbl_tipo + '</label> ' +
           '       <div class="col-sm-6 no-padding-right">  ' +
           '        <select class="form-control validate[required]" id="tipo_id" name="tipo_id" onchange="cambioTipo();" > ' +
           '         <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.tipo.length; i++) {
      var seleccionado = "";
      if (s3vars.listas_actividades.tipo[i].id == data.tipo_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.tipo[i].id + '" "' + seleccionado + '">' + s3vars.listas_actividades.tipo[i].nombre + ' </option > ';
   }
   form_test += '   </select> ' +
           '</div> ' +
           '         </div> ' +
           '      </div> ' +
           '     <div class="clearfix"></div> ' +
           '     <div class="col-sm-6 "> ' +
           '      <div class="form-group"> ' +
           '       <label class="control-label col-sm-2" for="categoria_id">' + s3vars.L_MOD.lbl_categoria + '</label> ' +
           '      <div class="col-sm-10 no-padding-right">      ' +
           '       <select class="form-control  validate[required]" id="categoria_id" name="categoria_id" onchange="cambioCategoria();"> ' +
           '        <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.categoria.length; i++) {
      var seleccionado = "";
      if (s3vars.listas_actividades.categoria[i].id == data.categoria_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.categoria[i].id + '" "' + seleccionado + '">' + s3vars.listas_actividades.categoria[i].nombre + ' </option > ';
   }

   form_test += '   </select> ' +
           '              </div> ' +
           '           </div> ' +
           '        </div> ' +
           '       <div class="clearfix reunion"></div> ' +
           '      <div class="col-sm-6  reunion"> ' +
           '       <div class="form-group"> ' +
           '        <label class="control-label col-sm-2" for="fecha_inicio">' + s3vars.L_MOD.lbl_fecha_inicio + '</label> ' +
           '       <div class="col-sm-10 no-padding-right">  ' +
           '               <div class="col-sm-6 no-padding-left">  ' +
           '                <div class="input-group">  ' +
           '                 <input type="text" class="form-control  validate[required] fecha" value="' + data.fecha_inicio + '" id="fecha_inicio" name="fecha_inicio" placeholder="AAAA-MM-DD" > ' +
           '                <div class="input-group-addon">  ' +
           '                 <img src="assets/img/general/Calendario.png" /> ' +
           '              </div>  ' +
           '           </div>  ' +
           '               </div> ' +
           '              <div class="col-sm-4 no-padding">    ' +
           '               <div class="input-group">  ' +
           '                <input type="text" class="form-control hora validate[required]" value="' + data.hora_inicio + '" id="hora_inicio" name="hora_inicio" placeholder="HH:MM" > ' +
           '               <div class="input-group-addon">  ' +
           '                <i class="fa fa-clock-o" style="font-size: 28px;"></i> ' +
           '             </div>  ' +
           '          </div> ' +
           '       </div> ' +
           '    </div> ' +
           ' </div> ' +
           '</div> ' +
           '         <div class="col-sm-6 tarea reunion"> ' +
           '          <div class="form-group"> ' +
           '           <label class="control-label col-sm-2" for="fecha_fin">' + s3vars.L_MOD.lbl_fecha_fin + '</label> ' +
           '          <div class="col-sm-10 no-padding-right">  ' +
           '           <div class="col-sm-6 no-padding-left">  ' +
           '            <div class="input-group">  ' +
           '             <input type="text" class="form-control  validate[required] fecha" value="' + data.fecha_fin + '" id="fecha_fin" name="fecha_fin" placeholder="AAAA-MM-DD"> ' +
           '                 <div class="input-group-addon">  ' +
           '                  <img src="assets/img/general/Calendario.png" /> ' +
           '               </div>  ' +
           '            </div>  ' +
           '         </div> ' +
           '             <div class="col-sm-4 no-padding">    ' +
           '              <div class="input-group">  ' +
           '               <input type="text" class="form-control hora validate[required]" value="' + data.hora_fin + '" id="hora_fin" name="hora_fin" placeholder="HH:MM" > ' +
           '              <div class="input-group-addon">  ' +
           '               <i class="fa fa-clock-o" style="font-size: 28px;"></i> ' +
           '            </div>  ' +
           '                </div> ' +
           '             </div> ' +
           '          </div> ' +
           '       </div> ' +
           '    </div> ' +
           '   <div class="clearfix"></div> ' +
           '         <div class="col-sm-6"> ' +
           '          <div class="form-group"> ' +
           '           <label class="control-label col-sm-2" for="razon_invitacion_id">' + s3vars.L_MOD.lbl_razon_invitacion + '</label> ' +
           '          <div class="col-sm-10 no-padding-right">      ' +
           '           <select class="form-control  validate[required]" id="razon_invitacion_id" name="razon_invitacion_id" > ' +
           '            <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.razon.length; i++) {
      var seleccionado = "";
      if (s3vars.listas_actividades.razon[i].id == data.razon_id) {
         seleccionado = " selected='delected' ";
      }

      form_test += '<option  value="' + s3vars.listas_actividades.razon[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.razon[i].nombre + ' </option > ';
   }

   form_test += '</select> ' +
           '          </div> ' +
           '       </div> ' +
           '    </div> ' +
           '   <div class="clearfix"></div> ' +
           '        <div class="col-sm-6 "> ' +
           '         <div class="form-group"> ' +
           '          <label class="control-label col-sm-2" for="estado_id">' + s3vars.L_MOD.lbl_estado + '</label> ' +
           '         <div class="col-sm-10 no-padding-right">      ' +
           '          <select class="form-control validate[required]" id="estado_id" name="estado_id" > ' +
           '           <option value="">' + s3vars.L_APP.lbl_select + '</option> ';

   for (var i = 0; i < s3vars.listas_actividades.estado.length; i++) {

      var seleccionado = "";
      if (s3vars.listas_actividades.estado[i].id == data.estado_id) {
         seleccionado = " selected='delected' ";
      }

      form_test += '<option  value="' + s3vars.listas_actividades.estado[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.estado[i].nombre + ' </option >';
   }

   form_test += '</select> ' +
           '  </div> ' +
           '     </div> ' +
           '  </div> ' +
           '        <div class="col-sm-6 tarea reunion"> ' +
           '         <div class="form-group"> ' +
           '          <label class="control-label col-sm-2"> ' + s3vars.L_MOD.lbl_alerta + '</label> ' +
           '         <div class="col-sm-10 no-padding-right">  ' +
           '          <div class="col-sm-2 no-padding-left">  ' +
           '           <input type="text" class="form-control addreq validate[required]" name="alerta" value="' + data.alerta + '" ></div> ' +
           '        <div class="col-sm-5 no-padding-left">  ' +
           '         <select class="form-control addreq validate[required]" id="tiempo_alerta_id" name="tiempo_alerta_id"> ' +
           '          <option value="0">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listasG.tiempo_alerta.length; i++) {

      var seleccionado = "";
      if (s3vars.listasG.tiempo_alerta[i].id == data.tiempo_alerta_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listasG.tiempo_alerta[i].id + '"  "' + seleccionado + '">' + s3vars.listasG.tiempo_alerta[i].nombre + ' </option > ';
   }

   form_test += '</select> ' +
           '           </div> ' +
           '          <div class="col-sm-5 no-padding-left">  ' +
           '           <select class="form-control required validate[required]" id="tipo_alerta_id" name="tipo_alerta_id"> ' +
           '            <option value="0">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listasG.tipo_alerta.length; i++) {

      var seleccionado = "";
      if (s3vars.listasG.tipo_alerta[i].id == data.tipo_alerta_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listasG.tipo_alerta[i].id + '"  "' + seleccionado + '">' + s3vars.listasG.tipo_alerta[i].nombre + ' </option > ';
   }

   form_test += '</select> ' +
           '              </div> ' +
           '           </div> ' +
           '        </div> ' +
           '     </div> ' +
           '    <div class="clearfix"></div> ' +
           '        <div class="col-sm-6 "> ' +
           '         <div class="form-group"> ' +
           '          <label class="control-label col-sm-2" for="responsable_id">' + s3vars.L_MOD.lbl_usuario + '</label> ' +
           '         <div class="col-sm-10 no-padding-right">    ' +
           '          <select class="form-control validate[required]" id="responsable_id" name="responsable_id" > ' +
           '           <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      var seleccionado = "";
      if (s3vars.usuarios_calendario[i].id == data.responsable_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.usuarios_calendario[i].id + '"  "' + seleccionado + '">' + s3vars.usuarios_calendario[i].nombres + ' </option >';
   }

   form_test += '</select> ' +
           '           </div> ' +
           '        </div> ' +
           '     </div>  ' +
           '    <div class="col-sm-6 "> ' +
           '     <div class="form-group"> ' +
           '      <label class="control-label col-sm-2" for="prioridad_id">' + s3vars.L_MOD.lbl_prioridad + '</label> ' +
           '     <div class="col-sm-10 no-padding-right">  ' +
           '      <select class="form-control validate[required]" id="prioridad_id" name="prioridad_id" > ' +
           '       <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.prioridad.length; i++) {

      var seleccionado = "";
      if (s3vars.listas_actividades.prioridad[i].id == data.prioridad_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.prioridad[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.prioridad[i].nombre + ' </option >';
   }

   form_test += '</select> ' +
           '         </div>         ' +
           '      </div> ' +
           '   </div>  ' +
           '  <div class="clearfix"></div> ' +
           // ZONA DE ACTIVIDADES HIJAS
           '         <section class=" cmpst"> ' +
           '          <div class="col-sm-12 subtitulo" > ' + s3vars.L_MOD.lbl_actividades + ' </div> ' +
           '         <div class="col-sm-12">   ' +
           '          <div class="form-group"> ' +
           '           <label class="control-label col-sm-offset-1 col-sm-2" >' + s3vars.L_MOD.lbl_agregar_actividad + '</label> ' +
           '          <div class="col-sm-3">  ' +
           '           <button type="button" id="btn_agregar_actividad_hija" onclick="agregarActividadHija()" class="btn btn-primary "><i class="fa fa-plus"></i></button> ' +
           '        </div> ' +
           '     </div>   ' +
           '  </div>  ' +
           '  <div class="table-responsive">  ' +
           '  <table class="table">  ' +
           '        <tr>  ' +
           '          <td><div class="col-sm-12"><label class="control-label col-sm-3" id="nombre"><b>' + s3vars.L_MOD.lbl_nombre_hija + ' </b></label></td> ' +
           '          <td><label class="control-label col-sm-3" id="usuario"><b>' + s3vars.L_MOD.lbl_usuario + ' </b></label></td> ' +
           '          <td><label class="control-label col-sm-2" id="porcentaje"><b>' + s3vars.L_MOD.lbl_porcentaje + ' </b></label></td> ' +
           '          <td><label class="control-label col-sm-3" id="fecha"><b>' + s3vars.L_MOD.lbl_fecha_vencimiento + ' </b></label></td> ' +
           '          <td><label class="control-label col-sm-1"></label></td>' +
           '        </div></td></tr>' +
           '           <tr><td><div  id="div_agregar_actividad"> ' +
           '           <div class="col-sm-12"> ' +
           '            <input type="hidden" class="id" name="hija_id[]" value="">' +
           '           <input type="hidden" class="eliminado" name="hija_eliminado[]" value="0">' +
           '          <div class="control-label col-sm-3 hola">' +
           '           <input type="text" class="form-control  validate[required]" value="" id="nombre_hija_0" name="nombre_hija[]" form="form_actividades" >' +
           '              </div> </td>' +
           '             <td><div class="control-label col-sm-3">' +
           '              <select class="form-control " id="usuario_id_hija_0" name="usuario_id_hija[]" >' +
           '               <option value="">' + s3vars.L_APP.lbl_select + '</option>';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      var seleccionado = "";
      if (s3vars.usuarios_calendario[i].id == data.responsable_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.usuarios_calendario[i].id + '"  "' + seleccionado + '" >' + s3vars.usuarios_calendario[i].nombres + ' </option >';
   }

   form_test += '</select> ' +
           '         </div> </td>' +
           '        <td><div class="control-label col-sm-2 no-padding" style="width: 70px;">' +
           '         <input type="text" class="form-control numberFloat validate[required]" value="" id="porcentaje_hija_0" name="porcentaje_hija[]" onkeyup="calcular();">' +
           '              </div></td>' +
           '             <td><div class="control-label col-sm-2"  style="width: 160px;">' +
           '              <div class="input-group"> ' +
           '               <input type="text" class="form-control fecha validate[required]" value="" id="fecha_hija_0" name="fecha_hija[]" >' +
           '              <div class="input-group-addon"> ' +
           '               <img src="assets/img/general/Calendario.png" />' +
           '            </div> ' +
           '         </div> ' +
           '      </div></td>' +
           '     <td><div class="control-label col-sm-1 no-padding" style="width: 105px;">' +
           '      <div class="input-group"> ' +
           '       <input type="text" class="form-control hora validate[required]" value="" id="hora_hija_0" name="hora_hija[]" >' +
           '      <div class="input-group-addon"> ' +
           '       <i class="fa fa-clock-o" style="font-size: 28px;"></i>' +
           '    </div> ' +
           '              </div>' +
           '           </div>' +
           '          <div class="control-label col-sm-1">' +
           '         </div>' +
           '      </div>' +
           '   </div></td></tr></table></div>' +
           '  <div class="clearfix"></div>' +
           '           <div class="col-sm-12"> ' +
           '            <label class="control-label col-sm-3"></label>' +
           '           <div class="control-label  col-sm-3 subtitulo" style="font-size: 15px; text-align: right;">' + s3vars.L_MOD.lbl_total + '</div>' +
           '          <div class="control-label col-sm-2 no-padding subtitulo " style="width: 70px; font-size: 15px; text-align: center;"> ' +
           '           <span id="totalizado"></span> </div>' +
           '        <label class="control-label col-sm-3"></label>' +
           '       <label class="control-label col-sm-1"></label>' +
           '    </div>' +
           ' </section>' +
           '<div class="clearfix"></div>' +
           // FIN DE ACTIVIDADES HIJA
           '         <div class="col-sm-12 subtitulo" > ' + s3vars.L_MOD.lbl_comentarios + ' </div>' +
           '        <div class="col-sm-12 ">' +
           '         <div class="form-group">' +
           '          <label class="control-label col-sm-2" for="comentario">' + s3vars.L_MOD.lbl_comentario + '</label>' +
           '         <div class="col-sm-10 no-padding-right"> ' +
           '          <textarea class="form-control" id="comentario" name="comentario" rows="3"></textarea>' +
           '       </div>        ' +
           '    </div>' +
           ' </div> ' +
           '<div class="clearfix"></div>' +
           '        <div class="col-sm-3" >' +
           '         <input  class="btn btn-primary" type="button" id="jqxButton" value="Examinar" />' +
           '      </div>' +
           '     <div class="col-sm-9 text-center" >' +
           '      <div id="jqxFileUpload" class="col-sm-6"></div>' +
           '   </div>' +
           '  <div class="clearfix"></div>' +
           '         <section class=" reunion">' +
           '     <div class="clearfix"></div>' +
           // INVITADOS
           '<div class="col-sm-12 subtitulo" > ' + s3vars.L_MOD.lbl_invitados + ' </div>' +
           '<div class="col-sm-12">  ' +
           ' <div class="form-group">' +
           '  <label class="control-label col-sm-offset-1 col-sm-2">' + s3vars.L_MOD.lbl_agregar_invitado + '</label>' +
           ' <div class="col-sm-9 no-padding-left"> ' +
           '  <button type="button" id="btn_agregar_invitado" onclick="agregarInvitado_act();" class="btn btn-primary "><i class="fa fa-plus"></i></button>' +
           '</div>' +
           '</div>  ' +
           '</div> ' +
           '<div class="col-sm-12"> ' +
           '  <label class="control-label col-sm-4"><b>' + s3vars.L_MOD.lbl_nombre_hija + '</b></label>' +
           '  <label class="control-label col-sm-3"><b>' + s3vars.L_MOD.lbl_usuario + '</b></label>' +
           '  <label class="control-label col-sm-4"><b>' + s3vars.L_MOD.lbl_acepta_rechaza + '</b></label>' +
           '  <label class="control-label col-sm-1"></label>' +
           '</div>' +
           '<div class="clearfix"></div>' +
           '<div class="col-sm-12">' +
           '</div>' +
           '<div class="clearfix"></div>' +
           '<div id="div_agregar_invitados">';


   console.log(invitados);
   for (i = 0; i < invitados.length; i++) {

      console.log(invitados[i].id);
      form_test += '<div  class="col-sm-12 form-group">' +
              '<div class=" col-sm-4">';
      for (var j = 0; j < s3vars.usuarios_calendario.length; j++) {
         if (s3vars.usuarios_calendario[j].id == invitados[i].id) {
            form_test += invitados[i].nombres + invitados[i].apellidos;
         }
      }
      form_test += '</select>   ' +
              '</div>' +
              '<div class=" col-sm-3">';
      for (var k = 0; k < s3vars.usuarios_calendario.length; k++) {
         if (s3vars.usuarios_calendario[k].id == invitados[i].id) {
            form_test += invitados[i].nombre_usuario;
         }
      }
      form_test += '</select>   ' +
              '</div>' +
              '<div class=" col-sm-4"> ';

      if (invitados[i].respuesta == 2) {
         form_test += " Rechazado ";
      } else if (invitados[i].respuesta == 1) {
         form_test += " Aceptado ";
      } else {
         form_test += " Sin Respuesta ";
      }

      form_test += '</div>' +
              '<div class="col-sm-1 ">' +
              '</div>' +
              '</div>';
   }


   form_test += '</div>' +
           // FIN INVITADOS
           '<div class="clearfix"></div>' +
           '       </section>' +
           '      </div>  ';
   var form = '<form id="form_actividades" action="index.php" class="form-horizontal" enctype="multipart/form-data" onsubmit="return validarFormulario_calendario();return false;"> ' +
           '<div class="row">  ' +
           '<div class="col-sm-12"> ' + form_test + '</div>' +
           '</form> <script>cargaDatePicker(); selects_dos("form_actividades");</script>';
   actualizarVista();
   return form;

}



function validarFormulario_calendario() {
   if (validar_datos('#form_actividades')) {
      return true;
   } else {
      alert();
      alert('Algunos datos no son validos, por favor verifique he intente nuevamente.');
      return false;
   }
}

function actualizarVista() {

   $(".plan").css({display: 'none'});
   $(".invitacion").css({display: 'none'});
   $(".tarea").css({display: 'none'});
   $(".reunion").css({display: 'none'});


}

function cambioTipo() {

   $(".cmpst").css({display: 'none'});
   $(".smpl").css({display: 'none'});
   console.log($("#tipo_id").val());

   if ($("#tipo_id").val() == 39) { //smpl
      $(".smpl").css({display: 'inline'});
      $(".cmpst").css({display: 'none'});
   }
   if ($("#tipo_id").val() == 40) { //cmpst
      $(".smpl").css({display: 'none'});
      $(".cmpst").css({display: 'inline'});
   }

}

function cambioCategoria() {
   console.log($("#categoria_id").val());
   actualizarVista();
   if ($("#categoria_id").val() == 41) { //plan
      $(".plan").css({display: 'inline'});
   }
   if ($("#categoria_id").val() == 42) { //invitacion
      $(".invitacion").css({display: 'inline'});
   }
   if ($("#categoria_id").val() == 43 || $("#categoria_id").val() == 44) { //solicutud //tarea
      $(".tarea").css({display: 'inline'});
   }
   if ($("#categoria_id").val() == 45) { //reunion
      $(".reunion").css({display: 'inline'});
   }
}


function agregarActividadHija() {

   html = '<div class="col-sm-12">' +
           '<input type="hidden" class="id" id="hija_id_' + fila_hija + '" name="hija_id[]" value="">' +
           '<input type="hidden" class="eliminado" id="hija_eliminado_' + fila_hija + '" name="hija_eliminado[]" value="0">' +
           '<div class="control-label col-sm-3">' +
           '<input type="text" class="form-control  validate[required]" value="" id="nombre_hija_' + fila_hija + '" name="nombre_hija[]"  >' +
           '</div>' +
           '<div class="control-label col-sm-3">' +
           '<select class="form-control " id="usuario_id_hija_' + fila_hija + '" name="usuario_id_hija[]" >' +
           ' <option value="">' + s3vars.L_APP.lbl_select + '</option>';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      html += ' <option value="' + s3vars.usuarios_calendario[i].id + '" >' + s3vars.usuarios_calendario[i].nombres + '</option>';
   }

   html += '</select>   ' +
           '</div>' +
           '<div class="control-label col-sm-2  no-padding" style="width: 70px;">' +
           '<input type="text" class="form-control numberFloat validate[required]" value="" id="porcentaje_hija_' + fila_hija + '" name="porcentaje_hija[]" onkeyup="calcular();">' +
           '</div>' +
           '<div class="control-label col-sm-2"  style="width: 160px;">' +
           '<div class="input-group">  <input type="text" class="form-control fecha validate[required]" value="" id="fecha_hija_' + fila_hija + '" name="fecha_hija[]" ><div class="input-group-addon"> <img src="assets/img/general/Calendario.png" /> </div> </div> </div>' +
           '<div class="control-label col-sm-1 no-padding" style="width: 105px;">' +
           '<div class="input-group">   <input type="text" class="form-control hora validate[required]" value="" id="hora_hija_' + fila_hija + '" name="hora_hija[]" > <div class="input-group-addon"> <i class="fa fa-clock-o" style="font-size: 28px;"></i> </div> </div>' +
           '</div>' +
           '<div class="control-label col-sm-1">' +
           '<button type="button"  class="btn btn_eliminar_reg_actividad btn-primary"><i class="fa fa-minus"></i></button>' +
           '</div>' +
           '</div>';
   $('#div_agregar_actividad').append(html);
   triggersActividad();
   $('.numberFloat').number(true, 2, ',', '.');
   cargaDatePicker();
   fila_hija++;
   $('select').each(function (i, o) {
      $(o).select2();
   });
}

function triggersActividad() {
   $('.btn_eliminar_reg_actividad').click(function () {
      eliminarCampoRegistroActividad($(this).parent().parent());
   });
}

function eliminarCampoRegistroActividad(div) {
   if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
      $(div).find('.eliminado').val(1);
      $(div).addClass('hidden');
   } else {
      $(div).remove();
   }
}

function calcular() {
   var totalizado = 0;
   for (var i = 0; i < fila_hija; i++) {
      if ($('#porcentaje_hija_' + i).val() > 0) {
         totalizado += parseFloat($('#porcentaje_hija_' + i).val(), 2);
      }
   }
   $("#totalizado").html(totalizado);
}

//INVITADOS
function agregarInvitado_act() {
   console.log("agregarInvitado_act");
   option_cuenta = '';
   var html = '<div  class="col-sm-12 form-group">' +
           '<input type="hidden" class="eliminado" id="invitado_eliminado_' + aux + '" name="invitado_eliminado[]" value="0">' +
           '<input class="id" type="hidden" id="invitado_id_' + aux + '" name="invitado_id[]" >' +
           '<div class=" col-sm-4">' +
           '<select class="form-control validate[required]" id="invitado_nombre_' + aux + '" name="nombre_invitado[]" onChange="asignarUsuario(' + aux + ');" >' +
           ' <option value="">' + s3vars.L_APP.lbl_select + '</option>';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      html += ' <option value="' + s3vars.usuarios_calendario[i].id + '" >' + s3vars.usuarios_calendario[i].nombres + '</option>';
   }
   html += '</select>   ' +
           '</div>' +
           '<div class=" col-sm-3">' +
           '<select class="form-control validate[required]" id="invitado_usuario_' + aux + '" name="invitado_usuario[]" onChange="asignarNombre(' + aux + ');" >' +
           ' <option value="">' + s3vars.L_APP.lbl_select + '</option>';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      html += ' <option value="' + s3vars.usuarios_calendario[i].id + '" >' + s3vars.usuarios_calendario[i].usuario + '</option>';
   }
   html += '</select>   ' +
           '</div>' +
           '<div class=" col-sm-4"></div>' +
           '<div class="col-sm-1 ">' +
           '<button type="button"  class="btn btn_eliminar_reg_invitado_act btn-primary  btn-md"><i class="fa fa-minus"></i></button> ' +
           '</div>' +
           '</div>';
   aux++;
   $('#div_agregar_invitados').append(html);
   triggersInvitado_act();
   $('select').each(function (i, o) {
      $(o).select2();
   });
}

function triggersInvitado_act() {
   $('.btn_eliminar_reg_invitado_act').on('click', function () {
      eliminarCampoRegistroInvitado_act($(this).parent().parent());
   });
}

function del_invitado(obj) {
   eliminarCampoRegistroInvitado_act($(obj).parent().parent());
}


function eliminarCampoRegistroInvitado_act(div) {
   if ($(div).find('.id').val() > 0 && $(div).find('.id').val() != "" && $(div).find('.id').val() != "0") {
      $(div).find('.eliminado').val(1);
      $(div).addClass('hidden');
   } else {
      $(div).remove();
   }
}

function asignarUsuario(pos) {
   $("#invitado_usuario_" + pos).select2('val', $("#invitado_nombre_" + pos).val());
}

function asignarNombre(pos) {
   $("#invitado_nombre_" + pos).select2('val', $("#invitado_usuario_" + pos).val());
}


function obtenerFormularioActividad_mobile(data) {


   console.log(data);
   var horas_fin = '',
           horas_inicio = '',
           minutos_fin = '',
           minutos_inicio = '',
           fecha_inicio_am = '',
           fecha_fin_am = '';
   //    console.log(s3vars);
   op_act = '';
   op_mod_rel = '';
   op_mod_estado = '<option value="-1">Seleccionar</option>';
   op_aviso = '<option value="-1">Seleccionar</option>';
   var invitados = cargar_invitados_cal(data.id);
   var form_test =
           '     <div class="col-sm-12 subtitulo" > ' + s3vars.L_APP.lbl_datos_basicos + ' </div> ' +
           '    <div class="col-sm-6 "> ' +
           '     <div class="form-group"> ' +
           '      <label class="control-label col-sm-2" for="nombre">' + s3vars.L_MOD.lbl_nombre + ' </label> ' +
           '     <div class="col-sm-10 no-padding-left">                     ' +
           '      <input type="text" class="form-control validate[required]" value="' + data.nombre + '" id="nombre" name="nombre" form="form_actividades" ><input type="hidden" class="form-control " value="' + data.id + '" id="id" name="id" form="form_actividades" > ' +
           '   </div> ' +
           '</div> ' +
           '       </div> ' +
           '      <div class="col-sm-6 "> ' +
           '       <div class="form-group"> ' +
           '        <label class="control-label col-sm-2" for="tipo">' + s3vars.L_MOD.lbl_tipo + '</label> ' +
           '       <div class="col-sm-6 no-padding-right">  ' +
           '        <select class="form-control validate[required]" id="tipo_id" name="tipo_id" onchange="cambioTipo();" > ' +
           '         <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.tipo.length; i++) {
      var seleccionado = "";
      if (s3vars.listas_actividades.tipo[i].id == data.tipo_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.tipo[i].id + '" "' + seleccionado + '">' + s3vars.listas_actividades.tipo[i].nombre + ' </option > ';
   }
   form_test += '   </select> ' +
           '</div> ' +
           '         </div> ' +
           '      </div> ' +
           '     <div class="clearfix"></div> ' +
           '     <div class="col-sm-6 "> ' +
           '      <div class="form-group"> ' +
           '       <label class="control-label col-sm-2" for="categoria_id">' + s3vars.L_MOD.lbl_categoria + '</label> ' +
           '      <div class="col-sm-10 no-padding-right">      ' +
           '       <select class="form-control  validate[required]" id="categoria_id" name="categoria_id" onchange="cambioCategoria_mobile();"> ' +
           '        <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.categoria.length; i++) {
      var seleccionado = "";
      if (s3vars.listas_actividades.categoria[i].id == data.categoria_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.categoria[i].id + '" "' + seleccionado + '">' + s3vars.listas_actividades.categoria[i].nombre + ' </option > ';
   }

   form_test += '   </select> ' +
           '              </div> ' +
           '           </div> ' +
           '        </div> ' +
           '       <div class="clearfix reunion"></div> ' +
           '      <div class="col-sm-6  reunion"> ' +
           '       <div class="form-group"> ' +
           '        <label class="control-label col-sm-2" for="fecha_inicio">' + s3vars.L_MOD.lbl_fecha_inicio + '</label> ' +
           '       <div class="col-sm-10 no-padding-right">  ' +
           '               <div class="col-sm-6 no-padding">  ' +
           '                <div class="input-group">  ' +
           '                 <input type="text" class="form-control  validate[required] fecha" value="' + data.fecha_inicio + '" id="fecha_inicio" name="fecha_inicio" placeholder="AAAA-MM-DD" > ' +
           '                <div class="input-group-addon">  ' +
           '                 <img src="assets/img/general/Calendario.png" /> ' +
           '              </div>  ' +
           '           </div>  ' +
           '               </div> ' +
           '              <div class="col-sm-4 no-padding">    ' +
           '               <div class="input-group">  ' +
           '                <input type="text" class="form-control hora validate[required]" value="' + data.hora_inicio + '" id="hora_inicio" name="hora_inicio" placeholder="HH:MM" > ' +
           '               <div class="input-group-addon">  ' +
           '                <i class="fa fa-clock-o" style="font-size: 28px;"></i> ' +
           '             </div>  ' +
           '          </div> ' +
           '       </div> ' +
           '    </div> ' +
           ' </div> ' +
           '</div> ' +
           '         <div class="col-sm-6 tarea reunion"> ' +
           '          <div class="form-group"> ' +
           '           <label class="control-label col-sm-2" for="fecha_fin">' + s3vars.L_MOD.lbl_fecha_fin + '</label> ' +
           '          <div class="col-sm-10 no-padding-right">  ' +
           '           <div class="col-sm-6 no-padding">  ' +
           '            <div class="input-group">  ' +
           '             <input type="text" class="form-control  validate[required] fecha" value="' + data.fecha_fin + '" id="fecha_fin" name="fecha_fin" placeholder="AAAA-MM-DD"> ' +
           '                 <div class="input-group-addon">  ' +
           '                  <img src="assets/img/general/Calendario.png" /> ' +
           '               </div>  ' +
           '            </div>  ' +
           '         </div> ' +
           '             <div class="col-sm-4 no-padding">    ' +
           '              <div class="input-group">  ' +
           '               <input type="text" class="form-control hora validate[required]" value="' + data.hora_fin + '" id="hora_fin" name="hora_fin" placeholder="HH:MM" > ' +
           '              <div class="input-group-addon">  ' +
           '               <i class="fa fa-clock-o" style="font-size: 28px;"></i> ' +
           '            </div>  ' +
           '                </div> ' +
           '             </div> ' +
           '          </div> ' +
           '       </div> ' +
           '    </div> ' +
           '   <div class="clearfix"></div> ' +
           '         <div class="col-sm-6"> ' +
           '          <div class="form-group"> ' +
           '           <label class="control-label col-sm-2" for="razon_invitacion_id">' + s3vars.L_MOD.lbl_razon_invitacion + '</label> ' +
           '          <div class="col-sm-10 no-padding-right">      ' +
           '           <select class="form-control  validate[required]" id="razon_invitacion_id" name="razon_invitacion_id" > ' +
           '            <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.razon.length; i++) {
      var seleccionado = "";
      if (s3vars.listas_actividades.razon[i].id == data.razon_id) {
         seleccionado = " selected='delected' ";
      }

      form_test += '<option  value="' + s3vars.listas_actividades.razon[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.razon[i].nombre + ' </option > ';
   }

   form_test += '</select> ' +
           '          </div> ' +
           '       </div> ' +
           '    </div> ' +
           '   <div class="clearfix"></div> ' +
           '        <div class="col-sm-6 "> ' +
           '         <div class="form-group"> ' +
           '          <label class="control-label col-sm-2" for="estado_id">' + s3vars.L_MOD.lbl_estado + '</label> ' +
           '         <div class="col-sm-10 no-padding-right">      ' +
           '          <select class="form-control validate[required]" id="estado_id" name="estado_id" > ' +
           '           <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.estado.length; i++) {

      var seleccionado = "";
      if (s3vars.listas_actividades.estado[i].id == data.estado_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.estado[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.estado[i].nombre + ' </option >';
   }

   form_test += '</select> ' +
           '  </div> ' +
           '     </div> ' +
           '  </div> ' +
           '        <div class="col-sm-6 tarea reunion"> ' +
           '         <div class="form-group"> ' +
           '          <label class="control-label col-sm-2"> ' + s3vars.L_MOD.lbl_alerta + '</label> ' +
           '         <div class="col-sm-10 no-padding-right">  ' +
           '          <div class="col-sm-2 no-padding padding_bottom5px">  ' +
           '           <input type="text" class="form-control addreq validate[required]" name="alerta" value="' + data.alerta + '" ></div> ' +
           '        <div class="col-sm-5 no-padding padding_bottom5px">  ' +
           '         <select class="form-control addreq validate[required]" id="tiempo_alerta_id" name="tiempo_alerta_id"> ' +
           '          <option value="0">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listasG.tiempo_alerta.length; i++) {

      var seleccionado = "";
      if (s3vars.listasG.tiempo_alerta[i].id == data.tiempo_alerta_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listasG.tiempo_alerta[i].id + '"  "' + seleccionado + '">' + s3vars.listasG.tiempo_alerta[i].nombre + ' </option > ';
   }

   form_test += '</select> ' +
           '           </div> ' +
           '          <div class="col-sm-5 no-padding padding_bottom5px">  ' +
           '           <select class="form-control required validate[required]" id="tipo_alerta_id" name="tipo_alerta_id"> ' +
           '            <option value="0">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listasG.tipo_alerta.length; i++) {

      var seleccionado = "";
      if (s3vars.listasG.tipo_alerta[i].id == data.tipo_alerta_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listasG.tipo_alerta[i].id + '"  "' + seleccionado + '">' + s3vars.listasG.tipo_alerta[i].nombre + ' </option > ';
   }

   form_test += '</select> ' +
           '              </div> ' +
           '           </div> ' +
           '        </div> ' +
           '     </div> ' +
           '    <div class="clearfix"></div> ' +
           '        <div class="col-sm-6 "> ' +
           '         <div class="form-group"> ' +
           '          <label class="control-label col-sm-2" for="responsable_id">' + s3vars.L_MOD.lbl_usuario + '</label> ' +
           '         <div class="col-sm-10 no-padding-right">    ' +
           '          <select class="form-control validate[required]" id="responsable_id" name="responsable_id" > ' +
           '           <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      var seleccionado = "";
      if (s3vars.usuarios_calendario[i].id == data.responsable_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.usuarios_calendario[i].id + '"  "' + seleccionado + '">' + s3vars.usuarios_calendario[i].nombres + ' </option >';
   }

   form_test += '</select> ' +
           '           </div> ' +
           '        </div> ' +
           '     </div>  ' +
           '    <div class="col-sm-6 "> ' +
           '     <div class="form-group"> ' +
           '      <label class="control-label col-sm-2" for="prioridad_id">' + s3vars.L_MOD.lbl_prioridad + '</label> ' +
           '     <div class="col-sm-10 no-padding-right">  ' +
           '      <select class="form-control validate[required]" id="prioridad_id" name="prioridad_id" > ' +
           '       <option value="">' + s3vars.L_APP.lbl_select + '</option> ';
   for (var i = 0; i < s3vars.listas_actividades.prioridad.length; i++) {

      var seleccionado = "";
      if (s3vars.listas_actividades.prioridad[i].id == data.prioridad_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.listas_actividades.prioridad[i].id + '"  "' + seleccionado + '">' + s3vars.listas_actividades.prioridad[i].nombre + ' </option >';
   }

   form_test += '</select> ' +
           '         </div>         ' +
           '      </div> ' +
           '   </div>  ' +
           '  <div class="clearfix"></div> ' +
           // ZONA DE ACTIVIDADES HIJAS
           '         <section class=" cmpst"> ' +
           '          <div class="col-sm-12 subtitulo" > ' + s3vars.L_MOD.lbl_actividades + ' </div> ' +
           '         <div class="col-sm-12">   ' +
           '          <div class="form-group"> ' +
           '           <label class="control-label col-sm-offset-1 col-sm-2" >' + s3vars.L_MOD.lbl_agregar_actividad + '</label> ' +
           '          <div class="col-sm-3">  ' +
           '           <button type="button" id="btn_agregar_actividad_hija" onclick="agregarActividadHija()" class="btn btn-primary "><i class="fa fa-plus"></i></button> ' +
           '        </div> ' +
           '     </div>   ' +
           '  </div>  ' +
           '  <div class="table-responsive">  ' +
           '  <table class="table">  ' +
           '        <tr>  ' +
           '          <td><div class="col-sm-12"><label class="control-label col-sm-3" id="nombre"><b>' + s3vars.L_MOD.lbl_nombre_hija + ' </b></label></td> ' +
           '          <td><label class="control-label col-sm-3" id="usuario"><b>' + s3vars.L_MOD.lbl_usuario + ' </b></label></td> ' +
           '          <td><label class="control-label col-sm-2" id="porcentaje"><b>' + s3vars.L_MOD.lbl_porcentaje + ' </b></label></td> ' +
           '          <td><label class="control-label col-sm-3" id="fecha"><b>' + s3vars.L_MOD.lbl_fecha_vencimiento + ' </b></label></td> ' +
           '          <td><label class="control-label col-sm-1"></label></td>' +
           '        </div></td></tr>' +
           '           <tr><td><div  id="div_agregar_actividad"> ' +
           '           <div class="col-sm-12"> ' +
           '            <input type="hidden" class="id" name="hija_id[]" value="">' +
           '           <input type="hidden" class="eliminado" name="hija_eliminado[]" value="0">' +
           '          <div class="control-label col-sm-3">' +
           '           <input type="text" class="form-control  validate[required]" value="" id="nombre_hija_0" name="nombre_hija[]" form="form_actividades" >' +
           '              </div> </td>' +
           '             <td><div class="control-label col-sm-3">' +
           '              <select class="form-control " id="usuario_id_hija_0" name="usuario_id_hija[]" >' +
           '               <option value="">' + s3vars.L_APP.lbl_select + '</option>';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      var seleccionado = "";
      if (s3vars.usuarios_calendario[i].id == data.responsable_id) {
         seleccionado = " selected='delected' ";
      }
      form_test += '<option  value="' + s3vars.usuarios_calendario[i].id + '"  "' + seleccionado + '" >' + s3vars.usuarios_calendario[i].nombres + ' </option >';
   }

   form_test += '</select> ' +
           '         </div> </td>' +
           '        <td><div class="control-label col-sm-2 no-padding" style="width: 70px;">' +
           '         <input type="text" class="form-control numberFloat validate[required]" value="" id="porcentaje_hija_0" name="porcentaje_hija[]" onkeyup="calcular();">' +
           '              </div></td>' +
           '             <td><div class="control-label col-sm-2"  style="width: 160px;">' +
           '              <div class="input-group"> ' +
           '               <input type="text" class="form-control fecha validate[required]" value="" id="fecha_hija_0" name="fecha_hija[]" >' +
           '              <div class="input-group-addon"> ' +
           '               <img src="assets/img/general/Calendario.png" />' +
           '            </div> ' +
           '         </div> ' +
           '      </div></td>' +
           '     <td><div class="control-label col-sm-1 no-padding" style="width: 105px;">' +
           '      <div class="input-group"> ' +
           '       <input type="text" class="form-control hora validate[required]" value="" id="hora_hija_0" name="hora_hija[]" >' +
           '      <div class="input-group-addon"> ' +
           '       <i class="fa fa-clock-o" style="font-size: 28px;"></i>' +
           '    </div> ' +
           '              </div>' +
           '           </div>' +
           '          <div class="control-label col-sm-1">' +
           '         </div>' +
           '      </div>' +
           '   </div></td></tr></table></div>' +
           '  <div class="clearfix"></div>' +
           '           <div class="col-sm-12"> ' +
           '            <label class="control-label col-sm-3"></label>' +
           '           <div class="control-label  col-sm-3 subtitulo" style="font-size: 15px; text-align: right;">' + s3vars.L_MOD.lbl_total + '</div>' +
           '          <div class="control-label col-sm-2 no-padding subtitulo " style="width: 70px; font-size: 15px; text-align: center;"> ' +
           '           <span id="totalizado"></span> </div>' +
           '        <label class="control-label col-sm-3"></label>' +
           '       <label class="control-label col-sm-1"></label>' +
           '    </div>' +
           ' </section>' +
           '<div class="clearfix"></div>' +
           // FIN DE ACTIVIDADES HIJA
           '         <div class="col-sm-12 subtitulo" > ' + s3vars.L_MOD.lbl_comentarios + ' </div>' +
           '        <div class="col-sm-12 ">' +
           '         <div class="form-group">' +
           '          <label class="control-label col-sm-2" for="comentario">' + s3vars.L_MOD.lbl_comentario + '</label>' +
           '         <div class="col-sm-10 no-padding-right"> ' +
           '          <textarea class="form-control" id="comentario" name="comentario" rows="3"></textarea>' +
           '       </div>        ' +
           '    </div>' +
           ' </div> ' +
           '<div class="clearfix"></div>' +
           '        <div class="col-sm-3" >' +
           '         <input  class="btn btn-primary" type="button" id="jqxButton" value="Examinar" />' +
           '      </div>' +
           '     <div class="col-sm-9 text-center" >' +
           '      <div id="jqxFileUpload" class="col-sm-6"></div>' +
           '   </div>' +
           '  <div class="clearfix"></div>' +
           '         <section class=" reunion">' +
           '     <div class="clearfix"></div>' +
           // INVITADOS
           '<div class="col-sm-12 subtitulo" > ' + s3vars.L_MOD.lbl_invitados + ' </div>' +
           '<div class="col-sm-12">  ' +
           ' <div class="form-group">' +
           '  <label class="control-label col-sm-offset-1 col-sm-2">' + s3vars.L_MOD.lbl_agregar_invitado + '</label>' +
           ' <div class="col-sm-9 no-padding-left"> ' +
           '  <button type="button" id="btn_agregar_invitado" onclick="agregarInvitado_act_mobile();" class="btn btn-primary "><i class="fa fa-plus"></i></button>' +
           '</div>' +
           '</div>  ' +
           '</div> ' +
           '<div class="table-responsive"> ' +
           '<table class="table" id="div_agregar_invitados"> ' +
           '  <tr><td><label class="control-label col-sm-4"><b>' + s3vars.L_MOD.lbl_nombre_hija + '</b></label></td>' +
           '  <td><label class="control-label col-sm-3"><b>' + s3vars.L_MOD.lbl_usuario + '</b></label></td>' +
           '  <td><label class="control-label col-sm-4"><b>' + s3vars.L_MOD.lbl_acepta_rechaza + '</b></label></td>';
   '  <td><label class="control-label col-sm-1"></label><td></tr>';
   console.log(invitados);
   for (i = 0; i < invitados.length; i++) {

      console.log(invitados[i].id);
      form_test += '<div  class="col-sm-12 form-group">' +
              '<div class=" col-sm-4">';
      for (var j = 0; j < s3vars.usuarios_calendario.length; j++) {
         if (s3vars.usuarios_calendario[j].id == invitados[i].id) {
            form_test += invitados[i].nombres + invitados[i].apellidos;
         }
      }
      form_test += '</select>   ' +
              '</div>' +
              '<div class=" col-sm-3">';
      for (var k = 0; k < s3vars.usuarios_calendario.length; k++) {
         if (s3vars.usuarios_calendario[k].id == invitados[i].id) {
            form_test += invitados[i].nombre_usuario;
         }
      }
      form_test += '</select>   ' +
              '</div>' +
              '<div class=" col-sm-4"> ';
      if (invitados[i].respuesta == 2) {
         form_test += " Rechazado ";
      }
      else if (invitados[i].respuesta == 1) {
         form_test += " Aceptado ";
      }
      else {
         form_test += " Sin Respuesta ";
      }

      form_test += '</div>' +
              '<div class="col-sm-1 ">' +
              '</div>' +
              '</div>';
   }


   form_test += '</div>' +
           // FIN INVITADOS
           '<div class="clearfix"></div>' +
           '       </section>' +
           '      </div>  ';
   var form = '<form id="form_actividades" action="index.php" class="form-horizontal" enctype="multipart/form-data" onsubmit="return validarFormulario_calendario();return false;"> ' +
           '<div class="row">  ' +
           '<div class="col-sm-12"> ' + form_test + '</div>' +
           '</form> <script>cargaDatePicker(); selects_dos("form_actividades");</script>';
   $('select').select2('destroy');
   actualizarVista_mobile();
   return form;
}

function cambioCategoria_mobile() {
   console.log($("#categoria_id").val());
   actualizarVista_mobile();
   if ($("#categoria_id").val() == 41) { //plan
      $(".plan").css({display: 'block'});
   }
   if ($("#categoria_id").val() == 42) { //invitacion
      $(".invitacion").css({display: 'block'});
   }
   if ($("#categoria_id").val() == 43 || $("#categoria_id").val() == 44) { //solicutud //tarea
      $(".tarea").css({display: 'block'});
   }
   if ($("#categoria_id").val() == 45) { //reunion
      $(".reunion").css({display: 'block'});
   }
}

function agregarInvitado_act_mobile() {
   console.log("agregarInvitado_act");
   option_cuenta = '';
   var html = '<tr>' +
           '<input type="hidden" class="eliminado" id="invitado_eliminado_' + aux + '" name="invitado_eliminado[]" value="0">' +
           '<input class="id" type="hidden" id="invitado_id_' + aux + '" name="invitado_id[]" >' +
           '<td><select class="form-control validate[required]" id="invitado_nombre_' + aux + '" name="nombre_invitado[]" onChange="asignarUsuario_mobile(' + aux + ');" >' +
           ' <option value="">' + s3vars.L_APP.lbl_select + '</option>';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      html += ' <option value="' + s3vars.usuarios_calendario[i].id + '" >' + s3vars.usuarios_calendario[i].nombres + '</option>';
   }
   html += '</select></td>' +
           '<td><select class="form-control validate[required]" id="invitado_usuario_' + aux + '" name="invitado_usuario[]" onChange="asignarNombre_mobile(' + aux + ');" >' +
           ' <option value="">' + s3vars.L_APP.lbl_select + '</option>';
   for (var i = 0; i < s3vars.usuarios_calendario.length; i++) {

      html += ' <option value="' + s3vars.usuarios_calendario[i].id + '" >' + s3vars.usuarios_calendario[i].usuario + '</option>';
   }
   html += '</select></td><td></td>' +
           '<td><button type="button"  class="btn btn_eliminar_reg_invitado_act btn-primary  btn-md"><i class="fa fa-minus"></i></button></td>' +
           '</tr>';
   aux++;
   $('#div_agregar_invitados').append(html);
   triggersInvitado_act();
   $('select').select2('destroy');
   html += ' <option value="' + s3vars.usuarios_calendario[i].id + '" >' + s3vars.usuarios_calendario[i].usuario + '</option>';
}

function actualizarVista_mobile() {
   $('select').select2('destroy');
   $(".plan").css({display: 'none'});
   $(".invitacion").css({display: 'none'});
   $(".tarea").css({display: 'none'});
   $(".reunion").css({display: 'none'});
}

function asignarUsuario_mobile(pos) {
   $("#invitado_usuario_" + pos).select('val', $("#invitado_nombre_" + pos).val());
}

function asignarNombre_mobile(pos) {
   $("#invitado_nombre_" + pos).select('val', $("#invitado_usuario_" + pos).val());
}