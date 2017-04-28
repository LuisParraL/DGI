/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var anterior = "",
        actual = "",
        tpregrado = 0,
        tposgrado = 0,
        tauxiliares = 0,
        texternos = 0,
        tjovenes = 0,
        tjunior = 0,
        tasociados = 0,
        tsenior = 0,
        actualizacion = false,
        inscripcion = false;

var i = 1,
        j = 1,
        k = 1,
        m = 1,
        n = 1,
        p = 1,
        q = 1;

var ant = "",
        act = "",
        antt = "",
        actt = "",
        nombre = "",
        informacion = new Array(),
        nombres = new Array(),
        names = "",
        orientador = "",
        posicion_cbLider = -1;

var d_grupo = ["#codigo", "#namegroup", "#sigla", "#clasification", "#categoria", "#codigo_colc", ".area_Cm", "#email_gp", "#primary", "#secondary", "#fecha", "#slc1", "#slc2", "#totalpregrado", "#totalposgrado", "#auxiliares", "#externos", "#totaljovenes", "#totaljunior", "#totalasociados", "#totalseniors", "#textarea1", "#textarea2", "#textarea3", "#textarea4", "#tematica", "#lineasinv", "#lineasinv_ins", "#lineapro", "#servicioext", "", "", "#dptm", "#ciudad_", "#area_cn"];
//NOMBRE, SIGLA, CLASIFICACION, CATEGORIA, CODIGO_COLCIENCIAS, AREACONO, CORREO, CENTRO_INVESTIGACION, PERTENECE, FECHA_FORMACION, AREAPRIN, AREASECUN, TESTUDIANTESPRE, TESTUDIANTESPOS, TAUXILIARESINV, TCOINVESTEXT, TJOVENESINV, TINVJUNIOR, TINVASOCIADOS, TINVSENIORS, MISION, VISION, OBJETIVOS, PROSPECTIVA, AREA_TEMATICA, LINEA_INVESTIGACION, LINEA_INSTITUCIONAL, LINEA_PROFUNDIZACION, SERVICIOEXT, FECHA_INSCRIPCION, FECHA_ACTUALIZACION, DEPARTAMENTO, CIUDAD, AREACONO_GN
var d_integrantes = ["#cedula", "#name", "#fecha_exp", "#estado_civil", "#correspondencia", "#correo", "#telefono", "#formacion", "#tituload", "#tarjetapf", "#vinculacion", "#uvd_externa", "#clasificacion", "#fechaing", "#fechartr", "#tp_vnc", "#c_lider"];
var d_proyectos = ["#proyecto", "#fuentes", "#finicio", "#ftermina", "#invprin", "#pesperados", "#estado"];
var d_produccionB = ["", "#tipoproducto", "#producto_clasf", "#clasificacionn", "#nproducto", "#autores", "#nb_revista", "#nb_libro", "#volumen", "#num_fas", "#pag_ini", "#pag_fin", "#urrl", "#serie", "#anno", "#editorial", "#isbn", "#pais", "#ciudad_p", "#estado_producto"];
var d_trabajos = ["#tp_producto", "#nb_producto", "#norientado", "#norientador", "#categoria_o", "#ins_or", "#entidad_fin", "#estado_t", "#fecha_ini", "#fecha_fin"];
var d_eventos = ["", "#tpB_evento", "#nevento_", "#nparticipante_", "#participacion_", "#producto_ev", "#nb_ponencia", "#entidadorg_", "#ent_fin_", "#ambito", "#paiss_", "#ciudadd_", "#ffecha_ini", "#ffecha_fin", "#yeartwo_"];
var date = new Date();
var today = '12/31/' + date.getFullYear();
var usuario = $("#user").val();

var id_grupo = "",
        pos_lider = 0;

function inscribir() {
    //antes de inscribir e imprimir se validan los campos
    $.ajax({
        type: 'POST',
        data: {
            infoGrupo: extraerDatosGrupo(),
            infoLider: extraerDatosLider(),
            infoIntegrantes: extraerDatosTb1(),
            infoProyectos: extraerDatosTb2(),
            infoTrabajos: extraerDatosTb3(),
            infoPonente: extraerDatosTb5(),
            infoCono: extraerDatosTb6(),
            infoConvo: extraerDatosTb7(),
            infoDesarrolloT: extraerDatosTb6_1()
        },
        url: 'Grupos',
        success: function () {
            //alert("bien");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR + "-" + textStatus + "-" + errorThrown);
        }
    });
}

function actualizar_o_Inscribir(usuario) {
    $.ajax({
        type: 'POST',
        data: {
            usuario: usuario
        },
        url: 'Grupos',
        success: function (result) {
            id_grupo = result;
            if (result !== "###") {
                $("#actualizacion").prop("checked", true);
                $("#actualizacion").change();
            } else {
                $("#inscripcion").prop("checked", true);
                $("#inscripcion").change();
            }
        }
    });
}

function actualizarInformacion() {

    $.ajax({
        type: 'POST',
        data: {
            actualizar_Gp: actualizarInformacionGrupo(),
            actualizarIntegrantes: actulizarInformacionIntegrantes(),
            insertarIntegrantes: insertarNuevasFilasIntegrantes(),
            insertar_Py: actualizarInformacionProyectos(),
            insertar_Nc: actualizarInformacionNuevoCn(),
            insertar_Dt: actualizarInformacionDesarrolloT(),
            insertar_PAS: actualizarInformacionProductosAS(),
            insertar_PRH: actualizarInformacionProductosFormacionRH()
        },
        url: 'Grupos',
        success: function (result) {
            //alert(result);
        }
    });
}

function enviar_o_actualizar() { /////////////////////////////////////////////////////////////////////////Boton

    if (inscripcion) {
        inscribir();
    }

    if (actualizacion) {
        actualizarInformacion();
        //inscribir();
    }
    return false;
}

function extraerNombresIntegrantesComp() {
    $.ajax({
        type: 'POST',
        data: {
            nm_integrantes: 'Nombres'
        },
        url: 'Grupos',
        success: function (result) {
            names = "<option selected disabled></option>";
            $.each(result, function (i, item) {
                names += "<option>" + item + "</option>";
            });
            $("#invprin0").append(names);
            $("#autores0").append(names);
            $("#autores_pdt0").append(names);
            $("#nparticipante_0").append(names);
            $("#invprin0,#autores0,#autores_pdt0,#nparticipante_0").material_select();
        }
    });
}

function actualizarInformacionGrupo() {
    var sentencias = "UPDATE GRUPOS_INVESTIGACION SET ";
    var columnas = "",
            aux = "",
            auxx = "";
    for (var i = 0; i < informacion[0].length; i++) {

        if (informacion[0][i] === null) {
            auxx = "";
        } else {
            auxx = informacion[0][i];
        }

        switch (i) {
            case 1:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "NOMBRE = '" + aux + "', ";
                }
                break;
            case 2:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "SIGLA = '" + aux + "', ";
                }
                break;
            case 3:
                aux = $(d_grupo[i] + " option:selected").text();
                if (auxx !== aux && aux !== "") {
                    columnas += "CATEGORIA = '" + aux + "', ";
                }
                break;
            case 4:
                aux = $(d_grupo[i] + " option:selected").text();
                if (auxx !== aux) {
                    columnas += "CLASIFICACION = '" + aux + "', ";
                }
                break;
            case 5:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "CODIGO_COLCIENCIAS = '" + aux + "', ";
                }
                break;
            case 6:
                aux = extraerDatosAccmto_CB();
                if (auxx !== aux && aux !== "") {
                    columnas += "AREACONO = '" + aux + "', ";
                }
                break;
            case 7:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux && aux !== "") {
                    columnas += "CORREO = '" + aux + "', ";
                }
                break;
            case 8:
                aux = $(d_grupo[i] + " option:selected").text();
                if (auxx !== aux && aux !== "") {
                    columnas += "CENTRO_INVESTIGACION = '" + aux + "', IDFACULTAD = " + $(d_grupo[i] + " option:selected").val() + ", ";
                }
                break;
            case 9:
                aux = $(d_grupo[i] + " option:selected").text();
                if (auxx !== aux) {
                    columnas += "PERTENECE = '" + aux + "', ";
                }
                break;
            case 10:
                aux = $(d_grupo[i]).val();
                if (modificarFormatoFecha(auxx) !== aux) {
                    columnas += "FECHA_FORMACION = '" + aux + "', ";
                }
                break;
            case 11:
                aux = $(d_grupo[i] + " option:selected").text();
                if (auxx !== aux && aux !== "") {
                    columnas += "AREAPRIN = '" + aux + "', ";
                }
                break;
            case 12:
                aux = $(d_grupo[i] + " option:selected").text();
                if (auxx !== aux) {
                    columnas += "AREASECUN = '" + aux + "', ";
                }
                break;
            case 13:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "TESTUDIANTESPRE = " + parseInt(aux) + ", ";
                }
                break;
            case 14:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "TESTUDIANTESPOS = " + parseInt(aux) + ", ";
                }
                break;
            case 15:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "TAUXILIARESINV = " + parseInt(aux) + ", ";
                }
                break;
            case 16:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "TCOINVESTEXT = " + parseInt(aux) + ", ";
                }
                break;
            case 17:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "TJOVENESINV = " + parseInt(aux) + ", ";
                }
                break;
            case 18:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "TINVJUNIOR = " + parseInt(aux) + ", ";
                }
                break;
            case 19:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "TINVASOCIADOS = " + parseInt(aux) + ", ";
                }
                break;
            case 20:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "TINVSENIORS = " + parseInt(aux) + ", ";
                }
                break;
            case 21:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux && aux !== "") {
                    columnas += "MISION = '" + aux + "', ";
                }
                break;
            case 22:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "VISION = '" + aux + "', ";
                }
                break;
            case 23:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "OBJETIVOS = '" + aux + "', ";
                }
                break;
            case 24:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "PROSPECTIVA = '" + aux + "', ";
                }
                break;
            case 25:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "AREA_TEMATICA = '" + aux + "', ";
                }
                break;
            case 26:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "LINEA_INVESTIGACION = '" + aux + "', ";
                }
                break;
            case 27:
                aux = informacion[0][i].toString();
                auxx = $(d_grupo[i]).val().toString();
                if (aux !== auxx) {
                    columnas += "LINEA_INSTITUCIONAL = '" + auxx + "', ";
                }
                break;
            case 28:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "LINEA_PROFUNDIZACION = '" + aux + "', ";
                }
                break;
            case 29:
                aux = $(d_grupo[i] + " option:selected").text();
                if (auxx !== aux) {
                    columnas += "SERVICIOEXT = '" + aux + "', ";
                }
                break;
            case 32:
                aux = $(d_grupo[i] + " option:selected").text();
                if (auxx !== aux) {
                    columnas += "DEPARTAMENTO = '" + aux + "', ";
                }
                break;
            case 33:
                aux = $(d_grupo[i] + " option:selected").text();
                if (auxx !== aux) {
                    columnas += "CIUDAD = '" + aux + "', ";
                }
                break;
            case 34:
                aux = $(d_grupo[i]).val();
                if (auxx !== aux) {
                    columnas += "AREACONO_GN = '" + aux + "', ";
                }
                break;
        }
    }

    //columnas = columnas.substring(0,columnas.length-2);
    if (columnas !== "") {
        sentencias += columnas + "FECHA_ACTUALIZACION='" + fechaActual() + "' WHERE IDGRUPO='" + informacion[0][0] + "'";
        alert(sentencias);
        return sentencias;
    } else {
        return "";
    }

}

function fechaActual() {
    var fecha = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    return fecha;
}

function actulizarInformacionIntegrantes() {

    var sentencia = "", sentencia1 = "",
            sentencias = "";
    var columnas = "",
            aux = "",
            auxx = "",
            cedula = "";
    var fila = 0,
            aux = 0;

    for (var x = 0; x < informacion[1].length; x++) {
        columnas = "";
        sentencia = "";
        sentencia1 = "";

        if (x === pos_lider) {
            fila = 0;
        } else {
            fila = x;
            if (pos_lider !== -1 && x+1<informacion[1].length) {
                fila = x + 1;
            }
        }

        for (var i = 0; i < informacion[1][x].length; i++) {
            if (informacion[1][x][i] === null) {
                aux = "";
            } else {
                aux = informacion[1][x][i];
            }

            switch (i) {
                case 0:
                    cedula = aux;
                    break;
                case 1:
                    auxx = $("#name" + fila).val();
                    //console.info(aux+"<>"+auxx+"-->ID: "+fila);
                    if (auxx !== aux) {
                        columnas += " NOMBRE='" + auxx + "',";
                    }
                    break;
                case 2:
                    auxx = $(d_integrantes[i] + fila).val();
                    aux = modificarFormatoFecha(informacion[1][x][i]);
                    if (auxx !== aux) {
                        columnas += " FECHA_EXPEDICION='" + auxx + "',";
                    }
                    break;
                case 3:
                    auxx = $(d_integrantes[i] + fila + " option:selected").text();
                    if (auxx !== aux) {
                        columnas += " ESTADO_CIVIL='" + auxx + "',";
                    }
                    break;
                case 4:
                    auxx = $(d_integrantes[i] + fila).val();
                    if (auxx !== aux) {
                        columnas += " CORRESPONDENCIA='" + auxx + "',";
                    }
                    break;
                case 5:
                    auxx = $(d_integrantes[i] + fila).val();
                    if (auxx !== aux) {
                        columnas += " CORREO='" + auxx + "',";
                    }
                    break;
                case 6:
                    auxx = $(d_integrantes[i] + fila).val();
                    if (auxx !== aux) {
                        columnas += " TELEFONO='" + auxx + "',";
                    }
                    break;
                case 7:
                    auxx = $(d_integrantes[i] + fila + " option:selected").text();
                    if (auxx !== aux) {
                        columnas += " FORMACION='" + auxx + "',";
                    }
                    break;
                case 8:
                    if (aux !== " " && x === posicion_cbLider) {
                        auxx = $(d_integrantes[i]).val();
                        if (auxx !== aux) {
                            columnas += " TITULO_ACADEMICO='" + auxx + "',";
                        }
                    }
                    break;
                case 9:
                    if (aux !== " " && x === posicion_cbLider) {
                        auxx = $(d_integrantes[i]).val();
                        if (auxx !== aux) {
                            columnas += " TARJETA_PROFESIONAL='" + auxx + "',";
                        }
                    }
                    break;
                case 10:
                    auxx = $(d_integrantes[i] + fila + " option:selected").text();
                    if (auxx !== aux) {
                        columnas += " TIPO_VINCULACION='" + auxx + "',";
                    }
                    break;
                case 11:
                    auxx = $(d_integrantes[i] + fila).val();
                    if (auxx !== aux) {
                        columnas += " UNIVERSIDAD_EXTERNA='" + auxx + "',";
                    }
                    break;
                case 12:
                    auxx = $(d_integrantes[i] + fila + " option:selected").text();
                    if (auxx !== aux) {
                        columnas += " CLASIFICACION_COL='" + auxx + "',";
                    }
                    break;
                case 13:
                    break;
                case 14:
                    aux = modificarFormatoFecha(aux);
                    auxx = $(d_integrantes[i] + fila).val();
                    if (auxx !== "") {
                        //console.info(auxx+"<FC>"+aux+" id:"+d_integrantes[i]+fila);
                        if (auxx !== aux) {
                            columnas += " FECHA_RETIRO='" + auxx + "',";
                        }
                    }
                    break;
                case 15:
                    auxx = $(d_integrantes[i] + fila + " option:selected").text();
                    if (auxx !== aux) {
                        sentencia1 += "UPDATE INTEGRANTES_GRUPO SET TIPO_VINCULACION='" + auxx + "' WHERE CEDULA='" + cedula + "'";
                    }
                    break;
                case 16:

                    //console.log("Lider-->" + pos_lider + "<>" + "Posicion_Ld-->" + posicion_cbLider);
                    if ($(d_integrantes[i] + fila).prop('checked')) {
                        auxx = "1";
                    } else {
                        auxx = "0";
                    }

                    if (auxx !== aux) {
                        columnas += " LIDER=" + auxx + ",";
                    }
                    break;
            }
        }

        if (columnas !== "") {
            columnas = columnas.substring(0, columnas.length - 1);
            sentencia += "UPDATE INTEGRANTES SET " + columnas + " WHERE CEDULA='" + cedula + "'";
        }

        if (sentencia1 !== "") {
            sentencia += "<<" + sentencia1;
        }

        if (sentencia !== "") {
            sentencias += sentencia + ">>";
        }
    }
    if (sentencias !== "") {
        sentencias = sentencias.substring(0, sentencias.length - 2);
    }
    return sentencias;
}

function insertarNuevasFilasIntegrantes() {
    var datos = "", lider = "0";
    var cantidad_sent = document.getElementById("tabla1").rows.length - 2;
    var cantidad_info = informacion[1].length;
    for (var i = cantidad_info + 1; i <= cantidad_sent; i++) {
        if (i === pos_lider) {
            lider = "1";
        }
        if (i > cantidad_info + 1) {
            datos += ">>";
        }
        datos += $("#name" + (i - 1)).val() + ";;" + $("#cedula" + (i - 1)).val() + ";;" + $("#fecha_exp" + (i - 1)).val() + ";;" + $("#estado_civil" + (i - 1) + " option:selected").text() + ";;" + $("#correspondencia" + (i - 1)).val() + ";;" + $("#correo" + (i - 1)).val() + ";;" + $("#telefono" + (i - 1)).val() + ";;" + $("#formacion" + (i - 1) + " option:selected").text() + ";;" + $("#vinculacion" + (i - 1) + " option:selected").text() + ";;" + $("#uvd_externa" + (i - 1)).val() + ";;" + $("#clasificacion" + (i - 1) + " option:selected").text() + ";;" + $("#fechaing" + (i - 1)).val() + ";;" + $("#fechartr" + (i - 1)).val() + ";;" + $("#tp_vnc" + (i - 1) + " option:selected").text() + ";;" + lider;
    }
    datos += "<<" + id_grupo;
    return datos;
}

function actualizarInformacionProyectos() {
    return extraerDatosTb2();
}

function actualizarInformacionNuevoCn() {
    extraerDatosTb6();
}

function actualizarInformacionDesarrolloT() {
    extraerDatosTb6_1();
}

function actualizarInformacionProductosAS() {
    return extraerDatosTb5();
}

function actualizarInformacionProductosFormacionRH() {
    return extraerDatosTb3();
}

function llenarFormato() {

    if (id_grupo !== "") {
        $.ajax({
            type: 'POST',
            data: {
                datos_formato: id_grupo
            },
            url: 'Grupos',
            success: function (result) {
                $.each(result, function (i) {
                    informacion[i] = new Array();
                    $.each(this, function (x, item) {
                        informacion[i][x] = item;
                    });
                });
                console.info(informacion);
                llenarDatosGrupo();
                llenarDatosIntegrantes();
                llenarDatosProyectos();
                llenarDatosProductosB();
                llenarDatosEventos();
                llenarDatosTrabajos();
                $("#namegroup").focus();
            }
        });
    }
}

function modificarFormatoFecha(aux) {
    var fc = "";
    var fecha = "";
    if (aux !== "") {
        //fc = aux.split("-");
        //fecha = fc[2] + "/" + fc[1] + "/" + fc[0];
        fecha = aux;
    }
    return fecha;
}

function llenarDatosGrupo() {
    var aux = "";
    for (var i = 0; i < informacion[0].length; i++) {

        if (informacion[0][i] === null) {
            aux = "";
        } else {
            aux = informacion[0][i];
        }

        switch (i) {

            case 0:
                $(d_grupo[i]).prop("disabled", false);
                $(d_grupo[i]).focus();
                $(d_grupo[i]).val(aux);
                $(d_grupo[i]).prop("disabled", true);
                break;
            case 3:
                if (aux !== "") {
                    //$(d_grupo[i] + " option:contains(' ')").prop("selected", false);
                    $(d_grupo[i] + " option:contains(" + aux + ")").prop("selected", true);
                    $(d_grupo[i]).material_select();
                }
                break;
            case 4:
                if (aux !== "") {
                    //$(d_grupo[i] + " option:contains(' ')").prop("selected", false);
                    $(d_grupo[i] + " option:contains(" + aux + ")").prop("selected", true);
                    $(d_grupo[i]).material_select();
                }
                break;
            case 6:
                var areaCncm = aux.split("-");
                if (aux !== "") {
                    for (var x = 0; x < areaCncm.length; x++) {
                        $(":checkbox[value='" + areaCncm[x] + "']").prop("checked", "true");
                    }
                }
                break;
            case 8:
                if (aux !== "") {
                    $(d_grupo[i] + " option:contains(' ')").prop("selected", false);
                    $(d_grupo[i] + " option:contains(" + aux + ")").prop("selected", true);
                    $(d_grupo[i]).change();
                    $(d_grupo[i]).material_select();
                }
                break;
            case 9:
                if (aux !== "") {
                    $(d_grupo[i] + " option:contains(' ')").prop("selected", false);
                    $(d_grupo[i] + " option:contains(" + aux + ")").prop("selected", true);
                    $(d_grupo[i]).material_select();
                }
                break;
            case 10:
                if (aux !== "") {
                    $(d_grupo[i]).val(modificarFormatoFecha(aux));
                }
                break;
            case 11:
                if (aux !== "") {
                    //$(d_grupo[i] + " option:contains(' ')").prop("selected", false);
                    $(d_grupo[i] + " option:contains(" + aux + ")").prop("selected", true);
                    $(d_grupo[i]).change();
                    $(d_grupo[i]).material_select();
                }
                break;
            case 12:
                if (aux !== "") {
                    //$(d_grupo[i] + " option:contains(' ')").prop("selected", false);
                    $(d_grupo[i] + " option:contains(" + aux + ")").prop("selected", true);
                    $(d_grupo[i]).change();
                    $(d_grupo[i]).material_select();
                }
                break;
            case 27:
                if (aux !== "") {
                    var lineas = aux.split(",");
                    for (var x = 0; x < lineas.length; x++) {
                        $(d_grupo[i] + " option:contains('" + lineas[x] + "')").prop("selected", true);
                        $(d_grupo[i]).material_select();
                    }
                }
                break;
            case 29:
                if (aux !== "") {
                    //$(d_grupo[i] + " option:contains('')").prop("selected", false);
                    $(d_grupo[i] + " option:contains(" + aux + ")").prop("selected", true);
                    $(d_grupo[i]).material_select();
                }
                break;
            case 32:
                if (aux !== "") {
                    $(d_grupo[i] + " option:contains(' ')").prop("selected", false);
                    $(d_grupo[i] + " option:contains(" + aux + ")").prop("selected", true);
                    $(d_grupo[i]).change();
                    $(d_grupo[i]).material_select();
                }
                break;
            case 33:
                if (aux !== "") {
                    $(d_grupo[i] + " option:contains(' ')").prop("selected", false);
                    $(d_grupo[i] + " option:contains(" + aux + ")").prop("selected", true);
                    $(d_grupo[i]).material_select();
                }
                break;
            default:
                $(d_grupo[i]).focus();
                $(d_grupo[i]).val(aux);
        }
    }
    $("#namegroup").focus();
}

function buscarlider() {
    var posicion = -1;
    for (var i = 0; i < informacion[1].length; i++) {
        if (informacion[1][i][16] !== null && informacion[1][i][16] !== "0") {
            posicion = i;
        }
    }
    return posicion;
}

function llenarDatosIntegrantes() {
    var aux = "";
    var fila = 0, excedente = 1;
    pos_lider = buscarlider();

    if (informacion[1].length > 1 && pos_lider !== -1) {
        excedente = 2;
        $("#add_row").click();
    }

    for (var i = 0; i < informacion[1].length; i++) {

        if (i === pos_lider) {
            fila = 0;
        } else {
            fila = i;
            if (pos_lider !== -1 && i+1<informacion[1].length) {
                fila = i + 1;
            }
        }

        for (var x = 0; x < informacion[1][i].length; x++) {

            if (informacion[1][i][x] === null) {
                aux = "";
            } else {
                aux = informacion[1][i][x];
            }

            switch (x) {
                case 2:
                    $(d_integrantes[x] + fila).val(modificarFormatoFecha(aux));
                    break;
                case 3:
                    if (aux !== "") {
                        $(d_integrantes[x] + fila + " option:contains(' ')").prop("selected", false);
                        $(d_integrantes[x] + fila + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_integrantes[x] + fila).material_select();
                    }
                    break;
                case 7:
                    if (aux !== "") {
                        $(d_integrantes[x] + fila + " option:contains(' ')").prop("selected", false);
                        $(d_integrantes[x] + fila + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_integrantes[x] + fila).material_select();
                    }
                    break;
                case 8:
                    if (aux !== "") {
                        $(d_integrantes[x]).focus();
                        $(d_integrantes[x]).val(aux);
                    }
                    break;
                case 9:
                    if (aux !== "") {
                        $(d_integrantes[x]).focus();
                        $(d_integrantes[x]).val(aux);
                    }
                    break;
                case 10:
                    if (aux !== "") {
                        $(d_integrantes[x] + fila + " option:contains(' ')").prop("selected", false);
                        $(d_integrantes[x] + fila + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_integrantes[x] + fila).change();
                        $(d_integrantes[x] + fila).material_select();
                    }
                    break;
                case 12:
                    if (aux !== "") {
                        $(d_integrantes[x] + fila + " option:contains(' ')").prop("selected", false);
                        $(d_integrantes[x] + fila + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_integrantes[x] + fila).change();
                        $(d_integrantes[x] + fila).material_select();
                    }
                    break;
                case 13:
                    $(d_integrantes[x] + fila).val(modificarFormatoFecha(aux));
                    break;
                case 14:
                    break;
                case 15:
                    //console.info(aux+">>>");
                    //$(d_integrantes[x] +(i+1)+ " option:contains(' ')").prop("selected", false);
                    if (aux !== "") {
                        $(d_integrantes[x] + fila + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_integrantes[x] + fila).material_select();
                    }
                    break;
                case 16:
                    if (aux !== "") {
                        if (aux === "1") {
                            $(d_integrantes[x] + fila).prop("checked", true);
                            $(d_integrantes[x] + fila).change();
                            ;
                        }
                    }
                    break;
                default:
                    $(d_integrantes[x] + fila).val(aux);
            }
        }

        if ((i + excedente) < informacion[1].length) {
            $("#add_row").click();
        }

    }
}

function llenarDatosProyectos() {
    //var $options = $("#invprin0 > option").clone();
    for (var i = 0; i < informacion[2].length; i++) {
        //llenarSelectInvPrin("#invprin"+i);

        for (var x = 0; x < informacion[2][i].length; x++) {

            if (informacion[2][i][x] === null) {
                aux = "";
            } else {
                aux = informacion[2][i][x];
            }

            switch (x) {
                case 2:
                    $(d_proyectos[x] + i).val(modificarFormatoFecha(aux));
                    break;
                case 3:
                    $(d_proyectos[x] + i).val(modificarFormatoFecha(aux));
                    break;
                case 4:
                    if (aux !== "") {
                        $(d_proyectos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_proyectos[x]).material_select();
                    }
                    break;
                case 6:
                    if (aux !== "") {
                        $(d_proyectos[x] + i).focus();
                        $(d_proyectos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_proyectos[x]).material_select();
                    }
                    break;
                default:
                    $(d_proyectos[x] + i).val(aux);
            }
        }

        if ((i + 1) < informacion[2].length) {
            $("#add_row1").click();
        }
    }

}

function llenarDatosProductosB() {
    for (var i = 0; i < informacion[3].length; i++) {
        //llenarSelectInvPrin("#invprin"+i);
        for (var x = 0; x < informacion[3][i].length; x++) {

            if (informacion[3][i][x] === null) {
                aux = "";
            } else {
                aux = informacion[3][i][x];
            }

            switch (x) {
                case 0:
                    break;
                case 1:
                    if (aux !== "") {
                        $(d_produccionB[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_produccionB[x] + i).change();
                        $(d_produccionB[x] + i).material_select();
                    }
                    break;
                case 2:
                    break;
                case 3:
                    if (aux !== "") {
                        $(d_produccionB[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_produccionB[x] + i).change();
                        $(d_produccionB[x] + i).material_select();
                    }
                    break;
                case 5:
                    if (aux !== " ") {
                        var nombres = aux.split(",");
                        for (var z = 0; z < nombres.length; z++) {
                            $(d_produccionB[x] + i + " option:contains('" + nombres[z] + "')").prop("selected", true);
                            $(d_produccionB[x] + i).material_select();
                        }
                    }
                    break;
                case 19:
                    if (aux !== "") {
                        $(d_produccionB[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_produccionB[x] + i).material_select();
                    }
                    break;
                default:
                    $(d_produccionB[x] + i).val(aux);
            }
        }

        if ((i + 1) < informacion[3].length) {
            $("#add_row5").click();
        }
    }
}

function llenarDatosEventos() {
    for (var i = 0; i < informacion[5].length; i++) {
        //llenarSelectInvPrin("#invprin"+i);
        for (var x = 0; x < informacion[5][i].length; x++) {

            if (informacion[5][i][x] === null) {
                aux = "";
            } else {
                aux = informacion[5][i][x];
            }

            switch (x) {
                case 0:
                    break;
                case 1:
                    if (aux !== "") {
                        $(d_eventos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_eventos[x] + i).change();
                        $(d_eventos[x] + i).material_select();
                    }
                    break;
                case 3:
                    if (aux !== "") {
                        var nombres = aux.split(",");
                        for (var z = 0; z < nombres.length; z++) {
                            $(d_eventos[x] + i + " option:contains('" + nombres[z] + "')").prop("selected", true);
                            $(d_eventos[x] + i).material_select();
                        }
                    }
                    break;
                case 4:
                    if (aux !== "") {
                        $(d_eventos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_eventos[x] + i).change();
                        $(d_eventos[x] + i).material_select();
                    }
                    break;
                case 5:
                    if (aux !== "") {
                        $(d_eventos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_eventos[x] + i).change();
                        $(d_eventos[x] + i).material_select();
                    }
                    break;
                case 9:
                    if (aux !== "") {
                        $(d_eventos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_eventos[x] + i).change();
                        $(d_eventos[x] + i).material_select();
                    }
                    break;
                case 12:
                    $(d_eventos[x] + i).val(modificarFormatoFecha(aux));
                    break;
                case 13:
                    $(d_eventos[x] + i).val(modificarFormatoFecha(aux));
                    break;
                default:
                    $(d_eventos[x] + i).val(aux);
            }
        }

        if ((i + 1) < informacion[5].length) {
            $("#add_row4").click();
        }
    }
}

function llenarDatosTrabajos() {
    llenarSelectOrientador("#norientado0");
    for (var i = 0; i < informacion[6].length; i++) {

        if (i > 0) {
            $("#norientado" + i).append(orientador);
        }

        for (var x = 0; x < informacion[6][i].length; x++) {

            if (informacion[6][i][x] === null) {
                aux = "";
            } else {
                aux = informacion[6][i][x];
            }

            switch (x) {
                case 0:
                    if (aux !== "") {
                        $(d_trabajos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_trabajos[x] + i).change();
                        $(d_trabajos[x] + i).material_select();
                    }
                    break;
                case 2:
                    if (aux !== "") {
                        $(d_trabajos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_trabajos[x] + i).change();
                        $(d_trabajos[x] + i).material_select();
                    }
                    break;
                case 4:
                    if (aux !== "") {
                        $(d_trabajos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_trabajos[x] + i).change();
                        $(d_trabajos[x] + i).material_select();
                    }
                    break;
                case 7:
                    if (aux !== "") {
                        $(d_trabajos[x] + i + " option:contains(" + aux + ")").prop("selected", true);
                        $(d_trabajos[x] + i).change();
                        $(d_trabajos[x] + i).material_select();
                    }
                    break;
                case 8:
                    $(d_trabajos[x] + i).val(modificarFormatoFecha(aux));
                    break;
                case 9:
                    $(d_trabajos[x] + i).val(modificarFormatoFecha(aux));
                    break;
                default:
                    $(d_trabajos[x] + i).val(aux);
            }
        }

        if ((i + 1) < informacion[6].length) {
            $("#add_row2").click();
        }
    }
}

function copia() {
    document.getElementById('name0').value = document.getElementById('namelider').value;
    document.getElementById('telefono0').value = document.getElementById('telefono').value;
    document.getElementById('correo0').value = document.getElementById('email').value;
}

function extraerNombresTb1() {
    var tabla = document.getElementById("tabla1"),
            options = "";
    var options = "<option selected disabled></option>";
    for (var i = 1; i < tabla.rows.length - 1; i++) {
        if ($("#name" + (i - 1)).val() !== "") {
            options += "<option>" + $("#name" + (i - 1)).val() + "</option>";
        }
    }
    return options;
}

function extraerNombresAdicionalesActTb1() {
    var tabla = document.getElementById("tabla1"),
            options = "";
    var options = "";
    for (var i = informacion[1].length - 1; i < tabla.rows.length - 1; i++) {
        if ($("#name" + (i - 1)).val() !== "") {
            options += "<option>" + $("#name" + (i - 1)).val() + "</option>";
        }
    }
    return options;
}

//    //$(id).material_select();
//    var $options = $("#invprin0 > option").clone();


function llenarSelectOrientador(id) {
    orientador += "<option selected disabled></option>";
    if (actualizacion) {
        for (var i = 0; i < informacion[1].length; i++) {
            orientador += "<option>" + informacion[1][i][1] + "</option>";
        }
    }

    $(id).append(orientador);
    $(id).material_select();
}

function elegirEscuelas(c_inv) {
    $("#secondary").empty();
    var options = "";
    if (c_inv === "Centro de Investigación de Ciencias Agropecuarias Y Recursos Naturales") {
        options += "<option>Escuela de Ciencias Animales</option>\n\
	                             <option>Departamento de Producción Animal</option>\n\
	                             <option>Escuela de Ingeniería en Ciencias Agrícolas</option>\n\
	                             <option>Instituto de Acuicultura de los LLanos (IALL)</option>";
    }
    if (c_inv === "Centro de Investigación de Ciencias Económicas") {
        options += "<option>Escuela de Administración y Negocios</option>\n\
	                             <option>Escuela de Economía y Finanzas</option>";
    }
    if (c_inv === "Centro de Investigación de Ciencias Humanas y de la Educación") {
        options += "<option selected >Escuela de Pedagogía y Bellas Artes</option>";
    }
    if (c_inv === "Centro de Investigación de Ciencias de la Salud") {
        options += "<option>Escuela de Salud Pública</option>\n\
	                             <option>Escuela de Cuidado de la Salud</option>";
    }
    if (c_inv === "Centro de Investigación de Ciencias Basicas e Ingenierias") {
        options += "<option>Escuela de Ingeniería</option>\n\
	                             <option>Departamento de Matemáticas Y Físicas</option>\n\
	                             <option>Departamento de Biología y Química</option>\n\
	                             <option>Instituto de Ciencias Ambientales de la Orinoquia Colombiana</option>";
    }
    options = "<option></option>" + options;
    $("#secondary").append(options);
    $("#secondary").material_select();
}

function elegirTipoProducto(pdt, id) {
    var cad = "";
    if (pdt === "Artículo") {
        cad = "<option>ART_A1</option><option>ART_A2</option><option>ART_B</option><option>ART_C</option><option>ART_D</option>";
    }
    if (pdt === "Libro") {
        cad = "<option>LIB_A1</option><option>LIB_A</option><option>LIB_B</option>";
    }
    if (pdt === "Capítulo de Libro") {
        cad = "<option>CAP_LIB_A1</option><option>CAP_LIB_A</option><option>CAP_LIB_B</option>";
    }
    if (pdt === "Patentes") {
        cad = "<option>PA1-MA1</option><option>PA2-MA2</option><option>PA3-MA3</option><option>PA4-MA4</option><option>PA5-MA5</option><option>PB1–MB1</option><option>PB2-MB2</option><option>PB3-MB3</option><option>PB4-MB4</option><option>PB5-MB5</option>";
    }
    if (pdt === "Variedades Vegetales") {
        cad = "<option>VV_A1</option><option>VV_A2</option><option>VV_A3</option><option>VV_A4</option><option>VV_B1</option><option>VV_B2</option><option>VV_B3</option><option>VV_B4</option>";
    }
    if (pdt === "Variedades Animales") {
        cad = "<option>VA_A</option>";
    }

    $("#producto_clasf" + id).empty();
    $("#producto_clasf" + id).append(cad);
}

function elegir_Tipo_ProductoT(t_producto, fila) {
    var options = "";
    $("#categoria_pdt" + fila).empty();
    if (t_producto === "Diseño Industrial") {
        options += "<option>DI_A</option><option>DI_B</option>";
    }
    if (t_producto === "Esquema de circuito integrado") {
        options += "<option>ECI_A</option>";
    }
    if (t_producto === "Software") {
        options += "<option>SF_A</option><option>SF_B</option>";
    }
    if (t_producto === "Planta piloto") {
        options += "<option>PP_A</option>";
    }
    if (t_producto === "Prototipo industrial") {
        options += "<option>PI_A</option>";
    }
    if (t_producto === "Signos distintivos") {
        options += "<option>SID</option>";
    }
    if (t_producto === "Consultoría científicotecnológica e Informe Técnico") {
        options += "<option>Consultoria (CON)</option><option>Informe Tenico Final (INF)</option>";
    }
    //console.info(options +" -->"+ fila);
    $("#categoria_pdt" + fila).append(options);
}

function elegirCiudad(dept) {
    var options = "";
    if (dept === "Amazonas") {
        options += "<option>Leticia</option>\n\
	                    <option>Puerto Nariño</option>";
    }
    if (dept === "Antioquia") {
        options += "<option>Abejorral</option>\n\
	                    <option>Abriaquí</option>\n\
	                    <option>Alejandria</option>\n\
	                    <option>Amagá</option>\n\
	                    <option>Amalfi</option>\n\
	                    <option>Andes</option>\n\
	                    <option>Angelópolis</option>\n\
	                    <option>Angostura</option>\n\
	                    <option>Anorí</option>\n\
	                    <option>Anzá</option>\n\
	                    <option>Apartadó</option>\n\
	                    <option>Arboletes</option>\n\
	                    <option>Argelia</option>\n\
	                    <option>Armenia</option>\n\
	                    <option>Barbosa</option>\n\
	                    <option>Bello</option>\n\
	                    <option>Belmira</option>\n\
	                    <option>Betania</option>\n\
	                    <option>Betulia</option>\n\
	                    <option>Bolívar</option>\n\
	                    <option>Briceño</option>\n\
	                    <option>Burítica</option>\n\
	                    <option>Caicedo</option>\n\
	                    <option>Caldas</option>\n\
	                    <option>Campamento</option>\n\
	                    <option>Caracolí</option>\n\
	                    <option>Caramanta</option>\n\
	                    <option>Carepa</option>\n\
	                    <option>Carmen de Viboral</option>\n\
	                    <option>Carolina</option>\n\
	                    <option>Caucasia</option>\n\
	                    <option>Cañasgordas</option>\n\
	                    <option>Chigorodó</option>\n\
	                    <option>Cisneros</option>\n\
	                    <option>Cocorná</option>\n\
	                    <option>Concepción</option>\n\
	                    <option>Concordia</option>\n\
	                    <option>Copacabana</option>\n\
	                    <option>Cáceres</option>\n\
	                    <option>Dabeiba</option>\n\
	                    <option>Don Matías</option>\n\
	                    <option>Ebéjico</option>\n\
	                    <option>El Bagre</option>\n\
	                    <option>Entrerríos</option>\n\
	                    <option>Envigado</option>\n\
	                    <option>Fredonia</option>\n\
	                    <option>Frontino</option>\n\
	                    <option>Giraldo</option>\n\
	                    <option>Girardota</option>\n\
	                    <option>Granada</option>\n\
	                    <option>Guadalupe</option>\n\
	                    <option>Guarne</option>\n\
	                    <option>Guatapé</option>\n\
	                    <option>Gómez Plata</option>\n\
	                    <option>Heliconia</option>\n\
	                    <option>Hispania</option>\n\
	                    <option>Itagüí</option>\n\
	                    <option>Ituango</option>\n\
	                    <option>Jardín</option>\n\
	                    <option>Jericó</option>\n\
	                    <option>La Ceja</option>\n\
	                    <option>La Estrella</option>\n\
	                    <option>La Pintada</option>\n\
	                    <option>La Unión</option>\n\
	                    <option>Liborina</option>\n\
	                    <option>Maceo</option>\n\
	                    <option>Marinilla</option>\n\
	                    <option>Medellín</option>\n\
	                    <option>Montebello</option>\n\
	                    <option>Murindó</option>\n\
	                    <option>Mutatá</option>\n\
	                    <option>Nariño</option>\n\
	                    <option>Nechí</option>\n\
	                    <option>Necoclí</option>\n\
	                    <option>Olaya</option>\n\
	                    <option>Peque</option>\n\
	                    <option>Peñol</option>\n\
	                    <option>Pueblorrico</option>\n\
	                    <option>Puerto Berrío</option>\n\
	                    <option>Puerto Nare</option>\n\
	                    <option>Puerto Triunfo</option>\n\
	                    <option>Remedios</option>\n\
	                    <option>Retiro</option>\n\
	                    <option>Ríonegro</option>\n\
	                    <option>Sabanalarga</option>\n\
	                    <option>Sabaneta</option>\n\
	                    <option>Salgar</option>\n\
	                    <option>San Andrés de Cuerquía</option>\n\
	                    <option>San Carlos</option>\n\
	                    <option>San Francisco</option>\n\
	                    <option>San Jerónimo</option>\n\
	                    <option>San José de Montaña</option>\n\
	                    <option>San Juan de Urabá</option>\n\
	                    <option>San Luís</option>\n\
	                    <option>San Pedro</option>\n\
	                    <option>San Pedro de Urabá</option>\n\
	                    <option>San Rafael</option>\n\
	                    <option>San Roque</option>\n\
	                    <option>San Vicente</option>\n\
	                    <option>Santa Bárbara</option>\n\
	                    <option>Santa Fé de Antioquia</option>\n\
	                    <option>Santa Rosa de Osos</option>\n\
	                    <option>Santo Domingo</option>\n\
	                    <option>Santuario</option>\n\
	                    <option>Segovia</option>\n\
	                    <option>Sonsón</option>\n\
	                    <option>Sopetrán</option>\n\
	                    <option>Tarazá</option>\n\
	                    <option>Tarso</option>\n\
	                    <option>Titiribí</option>\n\
	                    <option>Toledo</option>\n\
	                    <option>Turbo</option>\n\
	                    <option>Támesis</option>\n\
	                    <option>Uramita</option>\n\
	                    <option>Urrao</option>\n\
	                    <option>Valdivia</option>\n\
	                    <option>Valparaiso</option>\n\
	                    <option>Vegachí</option>\n\
	                    <option>Venecia</option>\n\
	                    <option>Vigía del Fuerte</option>\n\
	                    <option>Yalí</option>\n\
	                    <option>Yarumal</option>\n\
	                    <option>Yolombó</option>\n\
	                    <option>Yondó (Casabe)</option>\n\
	                    <option>Zaragoza</option>";
    }

    if (dept === "Arauca") {
        options += "<option>Arauca</option>\n\
	                    <option>Arauquita</option>\n\
	                    <option>Cravo Norte</option>\n\
	                    <option>Fortúl</option>\n\
	                    <option>Puerto Rondón</option>\n\
	                    <option>Saravena</option>\n\
	                    <option>Tame</option>";
    }
    if (dept === "Atlántico") {
        options += "<option>Baranoa</option>\n\
	                    <option>Barranquilla</option>\n\
	                    <option>Campo de la Cruz</option>\n\
	                    <option>Candelaria</option>\n\
	                    <option>Galapa</option>\n\
	                    <option>Juan de Acosta</option>\n\
	                    <option>Luruaco</option>\n\
	                    <option>Malambo</option>\n\
	                    <option>Manatí</option>\n\
	                    <option>Palmar de Varela</option>\n\
	                    <option>Piojo</option>\n\
	                    <option>Polonuevo</option>\n\
	                    <option>Ponedera</option>\n\
	                    <option>Puerto Colombia</option>\n\
	                    <option>Repelón</option>\n\
	                    <option>Sabanagrande</option>\n\
	                    <option>Sabanalarga</option>\n\
	                    <option>Santa Lucía</option>\n\
	                    <option>Santo Tomás</option>\n\
	                    <option>Soledad</option>\n\
	                    <option>Suan</option>\n\
	                    <option>Tubará</option>\n\
	                    <option>Usiacuri</option>";
    }
    if (dept === "Bolívar") {
        options += "<option>Achí</option>\n\
	                    <option>Altos del Rosario</option>\n\
	                    <option>Arenal</option>\n\
	                    <option>Arjona</option>\n\
	                    <option>Arroyohondo</option>\n\
	                    <option>Barranco de Loba</option>\n\
	                    <option>Calamar</option>\n\
	                    <option>Cantagallo</option>\n\
	                    <option>Cartagena</option>\n\
	                    <option>Cicuco</option>\n\
	                    <option>Clemencia</option>\n\
	                    <option>Córdoba</option>\n\
	                    <option>El Carmen de Bolívar</option>\n\
	                    <option>El Guamo</option>\n\
	                    <option>El Peñon</option>\n\
	                    <option>Hatillo de Loba</option>\n\
	                    <option>Magangué</option>\n\
	                    <option>Mahates</option>\n\
	                    <option>Margarita</option>\n\
	                    <option>María la Baja</option>\n\
	                    <option>Mompós</option>\n\
	                    <option>Montecristo</option>\n\
	                    <option>Morales</option>\n\
	                    <option>Norosí</option>\n\
	                    <option>Pinillos</option>\n\
	                    <option>Regidor</option>\n\
	                    <option>Río Viejo</option>\n\
	                    <option>San Cristobal</option>\n\
	                    <option>San Estanislao</option>\n\
	                    <option>San Fernando</option>\n\
	                    <option>San Jacinto</option>\n\
	                    <option>San Jacinto del Cauca</option>\n\
	                    <option>San Juan de Nepomuceno</option>\n\
	                    <option>San Martín de Loba</option>\n\
	                    <option>San Pablo</option>\n\
	                    <option>Santa Catalina</option>\n\
	                    <option>Santa Rosa</option>\n\
	                    <option>Santa Rosa del Sur</option>\n\
	                    <option>Simití</option>\n\
	                    <option>Soplaviento</option>\n\
	                    <option>Talaigua Nuevo</option>\n\
	                    <option>Tiquisio (Puerto Rico)</option>\n\
	                    <option>Turbaco</option>\n\
	                    <option>Turbaná</option>\n\
	                    <option>Villanueva</option>\n\
	                    <option>Zambrano</option>";
    }
    if (dept === "Boyacá") {
        options += "<option>Almeida</option>\n\
	                    <option>Aquitania</option>\n\
	                    <option>Arcabuco</option>\n\
	                    <option>Belén</option>\n\
	                    <option>Berbeo</option>\n\
	                    <option>Beteitiva</option>\n\
	                    <option>Boavita</option>\n\
	                    <option>Boyacá</option>\n\
	                    <option>Briceño</option>\n\
	                    <option>Buenavista</option>\n\
	                    <option>Busbanza</option>\n\
	                    <option>Caldas</option>\n\
	                    <option>Campohermoso</option>\n\
	                    <option>Cerinza</option>\n\
	                    <option>Chinavita</option>\n\
	                    <option>Chiquinquirá</option>\n\
	                    <option>Chiscas</option>\n\
	                    <option>Chita</option>\n\
	                    <option>Chitaraque</option>\n\
	                    <option>Chivatá</option>\n\
	                    <option>Chíquiza</option>\n\
	                    <option>Chívor</option>\n\
	                    <option>Ciénaga</option>\n\
	                    <option>Coper</option>\n\
	                    <option>Corrales</option>\n\
	                    <option>Covarachía</option>\n\
	                    <option>Cubará</option>\n\
	                    <option>Cucaita</option>\n\
	                    <option>Cuitiva</option>\n\
	                    <option>Cómbita</option>\n\
	                    <option>Duitama</option>\n\
	                    <option>El Cocuy</option>\n\
	                    <option>El Espino</option>\n\
	                    <option>Firavitoba</option>\n\
	                    <option>Floresta</option>\n\
	                    <option>Gachantivá</option>\n\
	                    <option>Garagoa</option>\n\
	                    <option>Guacamayas</option>\n\
	                    <option>Guateque</option>\n\
	                    <option>Guayatá</option>\n\
	                    <option>Guicán</option>\n\
	                    <option>Gámeza</option>\n\
	                    <option>Izá</option>\n\
	                    <option>Jenesano</option>\n\
	                    <option>Jericó</option>\n\
	                    <option>La Capilla</option>\n\
	                    <option>La Uvita</option>\n\
	                    <option>La Victoria</option>\n\
	                    <option>Labranzagrande</option>\n\
	                    <option>Macanal</option>\n\
	                    <option>Maripí</option>\n\
	                    <option>Miraflores</option>\n\
	                    <option>Mongua</option>\n\
	                    <option>Monguí</option>\n\
	                    <option>Moniquirá</option>\n\
	                    <option>Motavita</option>\n\
	                    <option>Muzo</option>\n\
	                    <option>Nobsa</option>\n\
	                    <option>Nuevo Colón</option>\n\
	                    <option>Oicatá</option>\n\
	                    <option>Otanche</option>\n\
	                    <option>Pachavita</option>\n\
	                    <option>Paipa</option>\n\
	                    <option>Pajarito</option>\n\
	                    <option>Panqueba</option>\n\
	                    <option>Pauna</option>\n\
	                    <option>Paya</option>\n\
	                    <option>Paz de Río</option>\n\
	                    <option>Pesca</option>\n\
	                    <option>Pisva</option>\n\
	                    <option>Puerto Boyacá</option>\n\
	                    <option>Páez</option>\n\
	                    <option>Quipama</option>\n\
	                    <option>Ramiriquí</option>\n\
	                    <option>Rondón</option>\n\
	                    <option>Ráquira</option>\n\
	                    <option>Saboyá</option>\n\
	                    <option>Samacá</option>\n\
	                    <option>San Eduardo</option>\n\
	                    <option>San José de Pare</option>\n\
	                    <option>San Luís de Gaceno</option>\n\
	                    <option>San Mateo</option>\n\
	                    <option>San Miguel de Sema</option>\n\
	                    <option>San Pablo de Borbur</option>\n\
	                    <option>Santa María</option>\n\
	                    <option>Santa Rosa de Viterbo</option>\n\
	                    <option>Santa Sofía</option>\n\
	                    <option>Santana</option>\n\
	                    <option>Sativanorte</option>\n\
	                    <option>Sativasur</option>\n\
	                    <option>Siachoque</option>\n\
	                    <option>Soatá</option>\n\
	                    <option>Socha</option>\n\
	                    <option>Socotá</option>\n\
	                    <option>Sogamoso</option>\n\
	                    <option>Somondoco</option>\n\
	                    <option>Sora</option>\n\
	                    <option>Soracá</option>\n\
	                    <option>Sotaquirá</option>\n\
	                    <option>Susacón</option>\n\
	                    <option>Sutamarchán</option>\n\
	                    <option>Sutatenza</option>\n\
	                    <option>Sáchica</option>\n\
	                    <option>Tasco</option>\n\
	                    <option>Tenza</option>\n\
	                    <option>Tibaná</option>\n\
	                    <option>Tibasosa</option>\n\
	                    <option>Tinjacá</option>\n\
	                    <option>Tipacoque</option>\n\
	                    <option>Toca</option>\n\
	                    <option>Toguí</option>\n\
	                    <option>Topagá</option>\n\
	                    <option>Tota</option>\n\
	                    <option>Tunja</option>\n\
	                    <option>Tunungua</option>\n\
	                    <option>Turmequé</option>\n\
	                    <option>Tuta</option>\n\
	                    <option>Tutasá</option>\n\
	                    <option>Ventaquemada</option>\n\
	                    <option>Villa de Leiva</option>\n\
	                    <option>Viracachá</option>\n\
	                    <option>Zetaquirá</option>\n\
	                    <option>Úmbita</option>";
    }

    if (dept === "Caldas") {
        options += "<option>Aguadas</option>\n\
	                    <option>Anserma</option>\n\
	                    <option>Aranzazu</option>\n\
	                    <option>Belalcázar</option>\n\
	                    <option>Chinchiná</option>\n\
	                    <option>Filadelfia</option>\n\
	                    <option>La Dorada</option>\n\
	                    <option>La Merced</option>\n\
	                    <option>La Victoria</option>\n\
	                    <option>Manizales</option>\n\
	                    <option>Manzanares</option>\n\
	                    <option>Marmato</option>\n\
	                    <option>Marquetalia</option>\n\
	                    <option>Marulanda</option>\n\
	                    <option>Neira</option>\n\
	                    <option>Norcasia</option>\n\
	                    <option>Palestina</option>\n\
	                    <option>Pensilvania</option>\n\
	                    <option>Pácora</option>\n\
	                    <option>Risaralda</option>\n\
	                    <option>Río Sucio</option>\n\
	                    <option>Salamina</option>\n\
	                    <option>Samaná</option>\n\
	                    <option>San José</option>\n\
	                    <option>Supía</option>\n\
	                    <option>Villamaría</option>\n\
	                    <option>Viterbo</option>";
    }

    if (dept === "Caquetá") {
        options += "<option>Albania</option>\n\
	                    <option>Belén de los Andaquíes</option>\n\
	                    <option>Cartagena del Chairá</option>\n\
	                    <option>Curillo</option>\n\
	                    <option>El Doncello</option>\n\
	                    <option>El Paujil</option>\n\
	                    <option>Florencia</option>\n\
	                    <option>La Montañita</option>\n\
	                    <option>Milán</option>\n\
	                    <option>Morelia</option>\n\
	                    <option>Puerto Rico</option>\n\
	                    <option>San José del Fragua</option>\n\
	                    <option>San Vicente del Caguán</option>\n\
	                    <option>Solano</option>\n\
	                    <option>Solita</option>\n\
	                    <option>Valparaiso</option>";
    }
    if (dept === "Casanare") {
        options += "<option>Aguazul</option>\n\
	                    <option>Chámeza</option>\n\
	                    <option>Hato Corozal</option>\n\
	                    <option>La Salina</option>\n\
	                    <option>Maní</option>\n\
	                    <option>Monterrey</option>\n\
	                    <option>Nunchía</option>\n\
	                    <option>Orocué</option>\n\
	                    <option>Paz de Ariporo</option>\n\
	                    <option>Pore</option>\n\
	                    <option>Recetor</option>\n\
	                    <option>Sabanalarga</option>\n\
	                    <option>San Luís de Palenque</option>\n\
	                    <option>Sácama</option>\n\
	                    <option>Tauramena</option>\n\
	                    <option>Trinidad</option>\n\
	                    <option>Támara</option>\n\
	                    <option>Villanueva</option>\n\
	                    <option>Yopal</option>";
    }
    if (dept === "Cauca") {
        options += "<option>Almaguer</option>\n\
	                    <option>Argelia</option>\n\
	                    <option>Balboa</option>\n\
	                    <option>Bolívar</option>\n\
	                    <option>Buenos Aires</option>\n\
	                    <option>Cajibío</option>\n\
	                    <option>Caldono</option>\n\
	                    <option>Caloto</option>\n\
	                    <option>Corinto</option>\n\
	                    <option>El Tambo</option>\n\
	                    <option>Florencia</option>\n\
	                    <option>Guachené</option>\n\
	                    <option>Guapí</option>\n\
	                    <option>Inzá</option>\n\
	                    <option>Jambaló</option>\n\
	                    <option>La Sierra</option>\n\
	                    <option>La Vega</option>\n\
	                    <option>López (Micay)</option>\n\
	                    <option>Mercaderes</option>\n\
	                    <option>Miranda</option>\n\
	                    <option>Morales</option>\n\
	                    <option>Padilla</option>\n\
	                    <option>Patía (El Bordo)</option>\n\
	                    <option>Piamonte</option>\n\
	                    <option>Piendamó</option>\n\
	                    <option>Popayán</option>\n\
	                    <option>Puerto Tejada</option>\n\
	                    <option>Puracé (Coconuco)</option>\n\
	                    <option>Páez (Belalcazar)</option>\n\
	                    <option>Rosas</option>\n\
	                    <option>San Sebastián</option>\n\
	                    <option>Santa Rosa</option>\n\
	                    <option>Santander de Quilichao</option>\n\
	                    <option>Silvia</option>\n\
	                    <option>Sotara (Paispamba)</option>\n\
	                    <option>Sucre</option>\n\
	                    <option>Suárez</option>\n\
	                    <option>Timbiquí</option>\n\
	                    <option>Timbío</option>\n\
	                    <option>Toribío</option>\n\
	                    <option>Totoró</option>\n\
	                    <option>Villa Rica</option>";
    }
    if (dept === "Cesar") {
        options += "<option>Aguachica</option>\n\
	                    <option>Agustín Codazzi</option>\n\
	                    <option>Astrea</option>\n\
	                    <option>Becerríl</option>\n\
	                    <option>Bosconia</option>\n\
	                    <option>Chimichagua</option>\n\
	                    <option>Chiriguaná</option>\n\
	                    <option>Curumaní</option>\n\
	                    <option>El Copey</option>\n\
	                    <option>El Paso</option>\n\
	                    <option>Gamarra</option>\n\
	                    <option>Gonzalez</option>\n\
	                    <option>La Gloria</option>\n\
	                    <option>La Jagua de Ibirico</option>\n\
	                    <option>La Paz (Robles)</option>\n\
	                    <option>Manaure Balcón del Cesar</option>\n\
	                    <option>Pailitas</option>\n\
	                    <option>Pelaya</option>\n\
	                    <option>Pueblo Bello</option>\n\
	                    <option>Río de oro</option>\n\
	                    <option>San Alberto</option>\n\
	                    <option>San Diego</option>\n\
	                    <option>San Martín</option>\n\
	                    <option>Tamalameque</option>\n\
	                    <option>Valledupar</option>";
    }
    if (dept === "Chocó") {
        options += "<option>Acandí</option>\n\
	                    <option>Alto Baudó (Pie de Pato)</option>\n\
	                    <option>Atrato (Yuto)</option>\n\
	                    <option>Bagadó</option>\n\
	                    <option>Bahía Solano (Mútis)</option>\n\
	                    <option>Bajo Baudó (Pizarro)</option>\n\
	                    <option>Belén de Bajirá</option>\n\
	                    <option>Bojayá (Bellavista)</option>\n\
	                    <option>Cantón de San Pablo</option>\n\
	                    <option>Carmen del Darién (CURBARADÓ)</option>\n\
	                    <option>Condoto</option>\n\
	                    <option>Cértegui</option>\n\
	                    <option>El Carmen de Atrato</option>\n\
	                    <option>Istmina</option>\n\
	                    <option>Juradó</option>\n\
	                    <option>Lloró</option>\n\
	                    <option>Medio Atrato</option>\n\
	                    <option>Medio Baudó</option>\n\
	                    <option>Medio San Juan (ANDAGOYA)</option>\n\
	                    <option>Novita</option>\n\
	                    <option>Nuquí</option>\n\
	                    <option>Quibdó</option>\n\
	                    <option>Río Iró</option>\n\
	                    <option>Río Quito</option>\n\
	                    <option>Ríosucio</option>\n\
	                    <option>San José del Palmar</option>\n\
	                    <option>Santa Genoveva de Docorodó</option>\n\
	                    <option>Sipí</option>\n\
	                    <option>Tadó</option>\n\
	                    <option>Unguía</option>\n\
	                    <option>Unión Panamericana (ÁNIMAS)</option>";
    }
    if (dept === "Córdoba") {
        options += "<option>Ayapel</option>\n\
	                    <option>Buenavista</option>\n\
	                    <option>Canalete</option>\n\
	                    <option>Cereté</option>\n\
	                    <option>Chimá</option>\n\
	                    <option>Chinú</option>\n\
	                    <option>Ciénaga de Oro</option>\n\
	                    <option>Cotorra</option>\n\
	                    <option>La Apartada y La Frontera</option>\n\
	                    <option>Lorica</option>\n\
	                    <option>Los Córdobas</option>\n\
	                    <option>Momil</option>\n\
	                    <option>Montelíbano</option>\n\
	                    <option>Monteria</option>\n\
	                    <option>Moñitos</option>\n\
	                    <option>Planeta Rica</option>\n\
	                    <option>Pueblo Nuevo</option>\n\
	                    <option>Puerto Escondido</option>\n\
	                    <option>Puerto Libertador</option>\n\
	                    <option>Purísima</option>\n\
	                    <option>Sahagún</option>\n\
	                    <option>San Andrés Sotavento</option>\n\
	                    <option>San Antero</option>\n\
	                    <option>San Bernardo del Viento</option>\n\
	                    <option>San Carlos</option>\n\
	                    <option>San José de Uré</option>\n\
	                    <option>San Pelayo</option>\n\
	                    <option>Tierralta</option>\n\
	                    <option>Tuchín</option>\n\
	                    <option>Valencia</option>";
    }
    if (dept === "Cundinamarca") {
        options += "<option>Agua de Dios</option>\n\
	                    <option>Albán</option>\n\
	                    <option>Anapoima</option>\n\
	                    <option>Anolaima</option>\n\
	                    <option>Apulo</option>\n\
	                    <option>Arbeláez</option>\n\
	                    <option>Beltrán</option>\n\
	                    <option>Bituima</option>\n\
	                    <option>Bogotá D.C.</option>\n\
	                    <option>Bojacá</option>\n\
	                    <option>Cabrera</option>\n\
	                    <option>Cachipay</option>\n\
	                    <option>Cajicá</option>\n\
	                    <option>Caparrapí</option>\n\
	                    <option>Carmen de Carupa</option>\n\
	                    <option>Chaguaní</option>\n\
	                    <option>Chipaque</option>\n\
	                    <option>Choachí</option>\n\
	                    <option>Chocontá</option>\n\
	                    <option>Chía</option>\n\
	                    <option>Cogua</option>\n\
	                    <option>Cota</option>\n\
	                    <option>Cucunubá</option>\n\
	                    <option>Cáqueza</option>\n\
	                    <option>El Colegio</option>\n\
	                    <option>El Peñón</option>\n\
	                    <option>El Rosal</option>\n\
	                    <option>Facatativá</option>\n\
	                    <option>Fosca</option>\n\
	                    <option>Funza</option>\n\
	                    <option>Fusagasugá</option>\n\
	                    <option>Fómeque</option>\n\
	                    <option>Fúquene</option>\n\
	                    <option>Gachalá</option>\n\
	                    <option>Gachancipá</option>\n\
	                    <option>Gachetá</option>\n\
	                    <option>Gama</option>\n\
	                    <option>Girardot</option>\n\
	                    <option>Granada</option>\n\
	                    <option>Guachetá</option>\n\
	                    <option>Guaduas</option>\n\
	                    <option>Guasca</option>\n\
	                    <option>Guataquí</option>\n\
	                    <option>Guatavita</option>\n\
	                    <option>Guayabal de Siquima</option>\n\
	                    <option>Guayabetal</option>\n\
	                    <option>Gutiérrez</option>\n\
	                    <option>Jerusalén</option>\n\
	                    <option>Junín</option>\n\
	                    <option>La Calera</option>\n\
	                    <option>La Mesa</option>\n\
	                    <option>La Palma</option>\n\
	                    <option>La Peña</option>\n\
	                    <option>La Vega</option>\n\
	                    <option>Lenguazaque</option>\n\
	                    <option>Machetá</option>\n\
	                    <option>Madrid</option>\n\
	                    <option>Manta</option>\n\
	                    <option>Medina</option>\n\
	                    <option>Mosquera</option>\n\
	                    <option>Nariño</option>\n\
	                    <option>Nemocón</option>\n\
	                    <option>Nilo</option>\n\
	                    <option>Nimaima</option>\n\
	                    <option>Nocaima</option>\n\
	                    <option>Pacho</option>\n\
	                    <option>Paime</option>\n\
	                    <option>Pandi</option>\n\
	                    <option>Paratebueno</option>\n\
	                    <option>Pasca</option>\n\
	                    <option>Puerto Salgar</option>\n\
	                    <option>Pulí</option>\n\
	                    <option>Quebradanegra</option>\n\
	                    <option>Quetame</option>\n\
	                    <option>Quipile</option>\n\
	                    <option>Ricaurte</option>\n\
	                    <option>San Antonio de Tequendama</option>\n\
	                    <option>San Bernardo</option>\n\
	                    <option>San Cayetano</option>\n\
	                    <option>San Francisco</option>\n\
	                    <option>San Juan de Río Seco</option>\n\
	                    <option>Sasaima</option>\n\
	                    <option>Sesquilé</option>\n\
	                    <option>Sibaté</option>\n\
	                    <option>Silvania</option>\n\
	                    <option>Simijaca</option>\n\
	                    <option>Soacha</option>\n\
	                    <option>Sopó</option>\n\
	                    <option>Subachoque</option>\n\
	                    <option>Suesca</option>\n\
	                    <option>Supatá</option>\n\
	                    <option>Susa</option>\n\
	                    <option>Sutatausa</option>\n\
	                    <option>Tabio</option>\n\
	                    <option>Tausa</option>\n\
	                    <option>Tena</option>\n\
	                    <option>Tenjo</option>\n\
	                    <option>Tibacuy</option>\n\
	                    <option>Tibirita</option>\n\
	                    <option>Tocaima</option>\n\
	                    <option>Tocancipá</option>\n\
	                    <option>Topaipí</option>\n\
	                    <option>Ubalá</option>\n\
	                    <option>Ubaque</option>\n\
	                    <option>Ubaté</option>\n\
	                    <option>Une</option>\n\
	                    <option>Venecia (Ospina Pérez)</option>\n\
	                    <option>Vergara</option>\n\
	                    <option>Viani</option>\n\
	                    <option>Villagómez</option>\n\
	                    <option>Villapinzón</option>\n\
	                    <option>Villeta</option>\n\
	                    <option>Viotá</option>\n\
	                    <option>Yacopí</option>\n\
	                    <option>Zipacón</option>\n\
	                    <option>Zipaquirá</option>\n\
	                    <option>Útica</option>";
    }
    if (dept === "Guainía") {
        options += "<option>Inírida</option>";
    }
    if (dept === "Guaviare") {
        options += "<option>Calamar</option>\n\
	                    <option>El Retorno</option>\n\
	                    <option>Miraflores</option>\n\
	                    <option>San José del Guaviare</option>";
    }
    if (dept === "Huila") {
        options += "<option>Acevedo</option>\n\
	                    <option>Agrado</option>\n\
	                    <option>Aipe</option>\n\
	                    <option>Algeciras</option>\n\
	                    <option>Altamira</option>\n\
	                    <option>Baraya</option>\n\
	                    <option>Campoalegre</option>\n\
	                    <option>Colombia</option>\n\
	                    <option>Elías</option>\n\
	                    <option>Garzón</option>\n\
	                    <option>Gigante</option>\n\
	                    <option>Guadalupe</option>\n\
	                    <option>Hobo</option>\n\
	                    <option>Isnos</option>\n\
	                    <option>La Argentina</option>\n\
	                    <option>La Plata</option>\n\
	                    <option>Neiva</option>\n\
	                    <option>Nátaga</option>\n\
	                    <option>Oporapa</option>\n\
	                    <option>Paicol</option>\n\
	                    <option>Palermo</option>\n\
	                    <option>Palestina</option>\n\
	                    <option>Pital</option>\n\
	                    <option>Pitalito</option>\n\
	                    <option>Rivera</option>\n\
	                    <option>Saladoblanco</option>\n\
	                    <option>San Agustín</option>\n\
	                    <option>Santa María</option>\n\
	                    <option>Suaza</option>\n\
	                    <option>Tarqui</option>\n\
	                    <option>Tello</option>\n\
	                    <option>Teruel</option>\n\
	                    <option>Tesalia</option>\n\
	                    <option>Timaná</option>\n\
	                    <option>Villavieja</option>\n\
	                    <option>Yaguará</option>\n\
	                    <option>Íquira</option>";
    }
    if (dept === "La Guajira") {
        options += "<option>Albania</option>\n\
	                    <option>Barrancas</option>\n\
	                    <option>Dibulla</option>\n\
	                    <option>Distracción</option>\n\
	                    <option>El Molino</option>\n\
	                    <option>Fonseca</option>\n\
	                    <option>Hatonuevo</option>\n\
	                    <option>La Jagua del Pilar</option>\n\
	                    <option>Maicao</option>\n\
	                    <option>Manaure</option>\n\
	                    <option>Riohacha</option>\n\
	                    <option>San Juan del Cesar</option>\n\
	                    <option>Uribia</option>\n\
	                    <option>Urumita</option>\n\
	                    <option>Villanueva</option>";
    }
    if (dept === "Magdalena") {
        options += "<option>Algarrobo</option>\n\
	                    <option>Aracataca</option>\n\
	                    <option>Ariguaní (El Difícil)</option>\n\
	                    <option>Cerro San Antonio</option>\n\
	                    <option>Chivolo</option>\n\
	                    <option>Ciénaga</option>\n\
	                    <option>Concordia</option>\n\
	                    <option>El Banco</option>\n\
	                    <option>El Piñon</option>\n\
	                    <option>El Retén</option>\n\
	                    <option>Fundación</option>\n\
	                    <option>Guamal</option>\n\
	                    <option>Nueva Granada</option>\n\
	                    <option>Pedraza</option>\n\
	                    <option>Pijiño</option>\n\
	                    <option>Pivijay</option>\n\
	                    <option>Plato</option>\n\
	                    <option>Puebloviejo</option>\n\
	                    <option>Remolino</option>\n\
	                    <option>Sabanas de San Angel (SAN ANGEL)</option>\n\
	                    <option>Salamina</option>\n\
	                    <option>San Sebastián de Buenavista</option>\n\
	                    <option>San Zenón</option>\n\
	                    <option>Santa Ana</option>\n\
	                    <option>Santa Bárbara de Pinto</option>\n\
	                    <option>Santa Marta</option>\n\
	                    <option>Sitionuevo</option>\n\
	                    <option>Tenerife</option>\n\
	                    <option>Zapayán (PUNTA DE PIEDRAS)</option>\n\
	                    <option>Zona Bananera (PRADO - SEVILLA)</option>";
    }
    if (dept === "Meta") {
        options += "<option>Acacías</option>\n\
	                    <option>Barranca de Upía</option>\n\
	                    <option>Cabuyaro</option>\n\
	                    <option>Castilla la Nueva</option>\n\
	                    <option>Cubarral</option>\n\
	                    <option>Cumaral</option>\n\
	                    <option>El Calvario</option>\n\
	                    <option>El Castillo</option>\n\
	                    <option>El Dorado</option>\n\
	                    <option>Fuente de Oro</option>\n\
	                    <option>Granada</option>\n\
	                    <option>Guamal</option>\n\
	                    <option>La Macarena</option>\n\
	                    <option>Lejanías</option>\n\
	                    <option>Mapiripan</option>\n\
	                    <option>Mesetas</option>\n\
	                    <option>Puerto Concordia</option>\n\
	                    <option>Puerto Gaitán</option>\n\
	                    <option>Puerto Lleras</option>\n\
	                    <option>Puerto López</option>\n\
	                    <option>Puerto Rico</option>\n\
	                    <option>Restrepo</option>\n\
	                    <option>San Carlos de Guaroa</option>\n\
	                    <option>San Juan de Arama</option>\n\
	                    <option>San Juanito</option>\n\
	                    <option>San Martín</option>\n\
	                    <option>La Uribe</option>\n\
	                    <option>Villavicencio</option>\n\
	                    <option>Vista Hermosa</option>\n";
    }
    if (dept === "Nariño") {
        options += "<option>Albán (San José)</option>\n\
	                    <option>Aldana</option>\n\
	                    <option>Ancuya</option>\n\
	                    <option>Arboleda (Berruecos)</option>\n\
	                    <option>Barbacoas</option>\n\
	                    <option>Belén</option>\n\
	                    <option>Buesaco</option>\n\
	                    <option>Chachaguí</option>\n\
	                    <option>Colón (Génova)</option>\n\
	                    <option>Consaca</option>\n\
	                    <option>Contadero</option>\n\
	                    <option>Cuaspud (Carlosama)</option>\n\
	                    <option>Cumbal</option>\n\
	                    <option>Cumbitara</option>\n\
	                    <option>Córdoba</option>\n\
	                    <option>El Charco</option>\n\
	                    <option>El Peñol</option>\n\
	                    <option>El Rosario</option>\n\
	                    <option>El Tablón de Gómez</option>\n\
	                    <option>El Tambo</option>\n\
	                    <option>Francisco Pizarro</option>\n\
	                    <option>Funes</option>\n\
	                    <option>Guachavés</option>\n\
	                    <option>Guachucal</option>\n\
	                    <option>Guaitarilla</option>\n\
	                    <option>Gualmatán</option>\n\
	                    <option>Iles</option>\n\
	                    <option>Imúes</option>\n\
	                    <option>Ipiales</option>\n\
	                    <option>La Cruz</option>\n\
	                    <option>La Florida</option>\n\
	                    <option>La Llanada</option>\n\
	                    <option>La Tola</option>\n\
	                    <option>La Unión</option>\n\
	                    <option>Leiva</option>\n\
	                    <option>Linares</option>\n\
	                    <option>Magüi (Payán)</option>\n\
	                    <option>Mallama (Piedrancha)</option>\n\
	                    <option>Mosquera</option>\n\
	                    <option>Nariño</option>\n\
	                    <option>Olaya Herrera</option>\n\
	                    <option>Ospina</option>\n\
	                    <option>Policarpa</option>\n\
	                    <option>Potosí</option>\n\
	                    <option>Providencia</option>\n\
	                    <option>Puerres</option>\n\
	                    <option>Pupiales</option>\n\
	                    <option>Ricaurte</option>\n\
	                    <option>Roberto Payán (San José)</option>\n\
	                    <option>Samaniego</option>\n\
	                    <option>San Bernardo</option>\n\
	                    <option>San Juan de Pasto</option>\n\
	                    <option>San Lorenzo</option>\n\
	                    <option>San Pablo</option>\n\
	                    <option>San Pedro de Cartago</option>\n\
	                    <option>Sandoná</option>\n\
	                    <option>Santa Bárbara (Iscuandé)</option>\n\
	                    <option>Sapuyes</option>\n\
	                    <option>Sotomayor (Los Andes)</option>\n\
	                    <option>Taminango</option>\n\
	                    <option>Tangua</option>\n\
	                    <option>Tumaco</option>\n\
	                    <option>Túquerres</option>\n\
	                    <option>Yacuanquer</option>";
    }
    if (dept === "Norte de Santander") {
        options += "<option>Arboledas</option>\n\
	                    <option>Bochalema</option>\n\
	                    <option>Bucarasica</option>\n\
	                    <option>Chinácota</option>\n\
	                    <option>Chitagá</option>\n\
	                    <option>Convención</option>\n\
	                    <option>Cucutilla</option>\n\
	                    <option>Cáchira</option>\n\
	                    <option>Cácota</option>\n\
	                    <option>Cúcuta</option>\n\
	                    <option>Durania</option>\n\
	                    <option>El Carmen</option>\n\
	                    <option>El Tarra</option>\n\
	                    <option>El Zulia</option>\n\
	                    <option>Gramalote</option>\n\
	                    <option>Hacarí</option>\n\
	                    <option>Herrán</option>\n\
	                    <option>La Esperanza</option>\n\
	                    <option>La Playa</option>\n\
	                    <option>Labateca</option>\n\
	                    <option>Los Patios</option>\n\
	                    <option>Lourdes</option>\n\
	                    <option>Mutiscua</option>\n\
	                    <option>Ocaña</option>\n\
	                    <option>Pamplona</option>\n\
	                    <option>Pamplonita</option>\n\
	                    <option>Puerto Santander</option>\n\
	                    <option>Ragonvalia</option>\n\
	                    <option>Salazar</option>\n\
	                    <option>San Calixto</option>\n\
	                    <option>San Cayetano</option>\n\
	                    <option>Santiago</option>\n\
	                    <option>Sardinata</option>\n\
	                    <option>Silos</option>\n\
	                    <option>Teorama</option>\n\
	                    <option>Tibú</option>\n\
	                    <option>Toledo</option>\n\
	                    <option>Villa Caro</option>\n\
	                    <option>Villa del Rosario</option>\n\
	                    <option>Ábrego</option>";
    }
    if (dept === "Putumayo") {
        options += "<option>Colón</option>\n\
	                    <option>Mocoa</option>\n\
	                    <option>Orito</option>\n\
	                    <option>Puerto Asís</option>\n\
	                    <option>Puerto Caicedo</option>\n\
	                    <option>Puerto Guzmán</option>\n\
	                    <option>Puerto Leguízamo</option>\n\
	                    <option>San Francisco</option>\n\
	                    <option>San Miguel</option>\n\
	                    <option>Santiago</option>\n\
	                    <option>Sibundoy</option>\n\
	                    <option>Valle del Guamuez</option>\n\
	                    <option>Villagarzón</option>";
    }
    if (dept === "Quindío") {
        options += "<option>Armenia</option>\n\
	                    <option>Buenavista</option>\n\
	                    <option>Calarcá</option>\n\
	                    <option>Circasia</option>\n\
	                    <option>Cordobá</option>\n\
	                    <option>Filandia</option>\n\
	                    <option>Génova</option>\n\
	                    <option>La Tebaida</option>\n\
	                    <option>Montenegro</option>\n\
	                    <option>Pijao</option>\n\
	                    <option>Quimbaya</option>\n\
	                    <option>Salento</option>";
    }
    if (dept === "Risaralda") {
        options += "<option>Apía</option>\n\
	                    <option>Balboa</option>\n\
	                    <option>Belén de Umbría</option>\n\
	                    <option>Dos Quebradas</option>\n\
	                    <option>Guática</option>\n\
	                    <option>La Celia</option>\n\
	                    <option>La Virginia</option>\n\
	                    <option>Marsella</option>\n\
	                    <option>Mistrató</option>\n\
	                    <option>Pereira</option>\n\
	                    <option>Pueblo Rico</option>\n\
	                    <option>Quinchía</option>\n\
	                    <option>Santa Rosa de Cabal</option>\n\
	                    <option>Santuario</option>";
    }
    if (dept === "San Andrés") {
        options += "<option>Providencia</option>";
    }
    if (dept === "Santander") {
        options += "<option>Aguada</option>\n\
	                    <option>Albania</option>\n\
	                    <option>Aratoca</option>\n\
	                    <option>Barbosa</option>\n\
	                    <option>Barichara</option>\n\
	                    <option>Barrancabermeja</option>\n\
	                    <option>Betulia</option>\n\
	                    <option>Bolívar</option>\n\
	                    <option>Bucaramanga</option>\n\
	                    <option>Cabrera</option>\n\
	                    <option>California</option>\n\
	                    <option>Capitanejo</option>\n\
	                    <option>Carcasí</option>\n\
	                    <option>Cepita</option>\n\
	                    <option>Cerrito</option>\n\
	                    <option>Charalá</option>\n\
	                    <option>Charta</option>\n\
	                    <option>Chima</option>\n\
	                    <option>Chipatá</option>\n\
	                    <option>Cimitarra</option>\n\
	                    <option>Concepción</option>\n\
	                    <option>Confines</option>\n\
	                    <option>Contratación</option>\n\
	                    <option>Coromoro</option>\n\
	                    <option>Curití</option>\n\
	                    <option>El Carmen</option>\n\
	                    <option>El Guacamayo</option>\n\
	                    <option>El Peñon</option>\n\
	                    <option>El Playón</option>\n\
	                    <option>Encino</option>\n\
	                    <option>Enciso</option>\n\
	                    <option>Floridablanca</option>\n\
	                    <option>Florián</option>\n\
	                    <option>Galán</option>\n\
	                    <option>Girón</option>\n\
	                    <option>Guaca</option>\n\
	                    <option>Guadalupe</option>\n\
	                    <option>Guapota</option>\n\
	                    <option>Guavatá</option>\n\
	                    <option>Guepsa</option>\n\
	                    <option>Gámbita</option>\n\
	                    <option>Hato</option>\n\
	                    <option>Jesús María</option>\n\
	                    <option>Jordán</option>\n\
	                    <option>La Belleza</option>\n\
	                    <option>La Paz</option>\n\
	                    <option>Landázuri</option>\n\
	                    <option>Lebrija</option>\n\
	                    <option>Los Santos</option>\n\
	                    <option>Macaravita</option>\n\
	                    <option>Matanza</option>\n\
	                    <option>Mogotes</option>\n\
	                    <option>Molagavita</option>\n\
	                    <option>Málaga</option>\n\
	                    <option>Ocamonte</option>\n\
	                    <option>Oiba</option>\n\
	                    <option>Onzaga</option>\n\
	                    <option>Palmar</option>\n\
	                    <option>Palmas del Socorro</option>\n\
	                    <option>Pie de Cuesta</option>\n\
	                    <option>Pinchote</option>\n\
	                    <option>Puente Nacional</option>\n\
	                    <option>Puerto Parra</option>\n\
	                    <option>Puerto Wilches</option>\n\
	                    <option>Páramo</option>\n\
	                    <option>Rio Negro</option>\n\
	                    <option>Sabana de Torres</option>\n\
	                    <option>San Andrés</option>\n\
	                    <option>San Benito</option>\n\
	                    <option>San Gíl</option>\n\
	                    <option>San Joaquín</option>\n\
	                    <option>San José de Miranda</option>\n\
	                    <option>San Miguel</option>\n\
	                    <option>San Vicente del Chucurí</option>\n\
	                    <option>Santa Bárbara</option>\n\
	                    <option>Santa Helena del Opón</option>\n\
	                    <option>Simacota</option>\n\
	                    <option>Socorro</option>\n\
	                    <option>Suaita</option>\n\
	                    <option>Sucre</option>\n\
	                    <option>Suratá</option>\n\
	                    <option>Tona</option>\n\
	                    <option>Valle de San José</option>\n\
	                    <option>Vetas</option>\n\
	                    <option>Villanueva</option>\n\
	                    <option>Vélez</option>\n\
	                    <option>Zapatoca</option>";
    }
    if (dept === "Sucre") {
        options += "<option>Buenavista</option>\n\
	                    <option>Caimito</option>\n\
	                    <option>Chalán</option>\n\
	                    <option>Colosó (Ricaurte)</option>\n\
	                    <option>Corozal</option>\n\
	                    <option>Coveñas</option>\n\
	                    <option>El Roble</option>\n\
	                    <option>Galeras (Nueva Granada)</option>\n\
	                    <option>Guaranda</option>\n\
	                    <option>La Unión</option>\n\
	                    <option>Los Palmitos</option>\n\
	                    <option>Majagual</option>\n\
	                    <option>Morroa</option>\n\
	                    <option>Ovejas</option>\n\
	                    <option>Palmito</option>\n\
	                    <option>Sampués</option>\n\
	                    <option>San Benito Abad</option>\n\
	                    <option>San Juan de Betulia</option>\n\
	                    <option>San Marcos</option>\n\
	                    <option>San Onofre</option>\n\
	                    <option>San Pedro</option>\n\
	                    <option>Sincelejo</option>\n\
	                    <option>Sincé</option>\n\
	                    <option>Sucre</option>\n\
	                    <option>Tolú</option>\n\
	                    <option>Tolú Viejo</option>";
    }
    if (dept === "Tolima") {
        options += "<option>Alpujarra</option>\n\
	        <option>Alvarado</option>\n\
	        <option>Ambalema</option>\n\
	        <option>Anzoátegui</option>\n\
	        <option>Armero (Guayabal)</option>\n\
	        <option>Ataco</option>\n\
	        <option>Cajamarca</option>\n\
	        <option>Carmen de Apicalá</option>\n\
	        <option>Casabianca</option>\n\
	        <option>Chaparral</option>\n\
	        <option>Coello</option>\n\
	        <option>Coyaima</option>\n\
	        <option>Cunday</option>\n\
	        <option>Dolores</option>\n\
	        <option>Espinal</option>\n\
	        <option>Falan</option>\n\
	        <option>Flandes</option>\n\
	        <option>Fresno</option>\n\
	        <option>Guamo</option>\n\
	        <option>Herveo</option>\n\
	        <option>Honda</option>\n\
	        <option>Ibagué</option>\n\
	        <option>Icononzo</option>\n\
	        <option>Lérida</option>\n\
	        <option>Líbano</option>\n\
	        <option>Mariquita</option>\n\
	        <option>Melgar</option>\n\
	        <option>Murillo</option>\n\
	        <option>Natagaima</option>\n\
	        <option>Ortega</option>\n\
	        <option>Palocabildo</option>\n\
	        <option>Piedras</option>\n\
	        <option>Planadas</option>\n\
	        <option>Prado</option>\n\
	        <option>Purificación</option>\n\
	        <option>Rioblanco</option>\n\
	        <option>Roncesvalles</option>\n\
	        <option>Rovira</option>\n\
	        <option>Saldaña</option>\n\
	        <option>San Antonio</option>\n\
	        <option>San Luis</option>\n\
	        <option>Santa Isabel</option>\n\
	        <option>Suárez</option>\n\
	        <option>Valle de San Juan</option>\n\
	        <option>Venadillo</option>\n\
	        <option>Villahermosa</option>\n\
	        <option>Villarrica</option>";
    }
    if (dept === "Valle del Cauca") {
        options += "<option>Alcalá</option>\n\
	        <option>Andalucía</option>\n\
	        <option>Ansermanuevo</option>\n\
	        <option>Argelia</option>\n\
	        <option>Bolívar</option>\n\
	        <option>Buenaventura</option>\n\
	        <option>Buga</option>\n\
	        <option>Bugalagrande</option>\n\
	        <option>Caicedonia</option>\n\
	        <option>Calima (Darién)</option>\n\
	        <option>Calí</option>\n\
	        <option>Candelaria</option>\n\
	        <option>Cartago</option>\n\
	        <option>Dagua</option>\n\
	        <option>El Cairo</option>\n\
	        <option>El Cerrito</option>\n\
	        <option>El Dovio</option>\n\
	        <option>El Águila</option>\n\
	        <option>Florida</option>\n\
	        <option>Ginebra</option>\n\
	        <option>Guacarí</option>\n\
	        <option>Jamundí</option>\n\
	        <option>La Cumbre</option>\n\
	        <option>La Unión</option>\n\
	        <option>La Victoria</option>\n\
	        <option>Obando</option>\n\
	        <option>Palmira</option>\n\
	        <option>Pradera</option>\n\
	        <option>Restrepo</option>\n\
	        <option>Riofrío</option>\n\
	        <option>Roldanillo</option>\n\
	        <option>San Pedro</option>\n\
	        <option>Sevilla</option>\n\
	        <option>Toro</option>\n\
	        <option>Trujillo</option>\n\
	        <option>Tulúa</option>\n\
	        <option>Ulloa</option>\n\
	        <option>Versalles</option>\n\
	        <option>Vijes</option>\n\
	        <option>Yotoco</option>\n\
	        <option>Yumbo</option>\n\
	        <option>Zarzal</option>";
    }
    if (dept === "Vaupés") {
        options += "<option>Carurú</option>\n\
	                    <option>Mitú</option>\n\
	                    <option>Taraira</option>";
    }
    if (dept === "Vichada") {
        options += "<option>Cumaribo</option>\n\
	                    <option>La Primavera</option>\n\
	                    <option>Puerto Carreño</option>\n\
	                    <option>Santa Rosalía</option>";
    }

    //options = "<option></option>" + options;
    $("#ciudad_").empty();
    $("#ciudad_").append(options);
    $("#ciudad_").material_select();
}

function suma() {
    if (actual === "Estudiante de pregrado") {
        tpregrado += 1;
        $("#totalpregrado").val(tpregrado);
        $("#t1").text(tpregrado);
    }
    if (tpregrado > 0 && anterior === "Estudiante de pregrado") {
        tpregrado -= 1;
        $("#totalpregrado").val(tpregrado);
        $("#t1").text(tpregrado);
    }
    if (actual === "Estudiante de posgrado") {
        tposgrado += 1;
        $("#totalposgrado").val(tposgrado);
        $("#t2").text(tposgrado);
    }
    if (tposgrado > 0 && anterior === "Estudiante de posgrado") {
        tposgrado -= 1;
        $("#totalposgrado").val(tposgrado);
        $("#t2").text(tposgrado);
    }
    if (actual === "Auxiliar de Investigación") {
        tauxiliares += 1;
        $("#auxiliares").val(tauxiliares);
        $("#t3").text(tauxiliares);
    }
    if (tauxiliares > 0 && anterior === "Auxiliar de Investigación") {
        tauxiliares -= 1;
        $("#auxiliares").val(tauxiliares);
        $("#t3").text(tauxiliares);
    }
    if (actual === "Coinvestigador Externo") {
        texternos += 1;
        $("#externos").val(texternos);
        $("#t4").text(texternos);
    }
    if (texternos > 0 && anterior === "Coinvestigador Externo") {
        texternos -= 1;
        $("#externos").val(texternos);
        $("#t4").text(texternos);
    }
    if (actual === "Jóvenes Investigadores") {
        tjovenes += 1;
        $("#totaljovenes").val(tjovenes);
        $("#t5").text(tjovenes);
    }
    if (tjovenes > 0 && anterior === "Jóvenes Investigadores") {
        tjovenes -= 1;
        $("#totaljovenes").val(tjovenes);
        $("#t5").text(tjovenes);
    }
    if (actual === "Junior") {
        tjunior += 1;
        $("#totaljunior").val(tjunior);
        $("#t6").text(tjunior);
    }
    if (tjunior > 0 && anterior === "Junior") {
        tjunior -= 1;
        $("#totaljunior").val(tjunior);
        $("#t6").text(tjunior);
    }
    if (actual === "Asociados") {
        tasociados += 1;
        $("#totalasociados").val(tasociados);
        $("#t7").text(tasociados);
    }
    if (tasociados > 0 && anterior === "Asociados") {
        tasociados -= 1;
        $("#totalasociados").val(tasociados);
        $("#t7").text(tasociados);
    }
    if (actual === "Seniors") {
        tsenior += 1;
        $("#totalseniors").val(tsenior);
        $("#t8").text(tsenior);
    }
    if (tsenior > 0 && anterior === "Seniors") {
        tsenior -= 1;
        $("#totalseniors").val(tsenior);
        $("#t8").text(tsenior);
    }
}

function resta(valor) {
    if (tpregrado > 0 && valor === "Estudiante de pregrado") {
        tpregrado -= 1;
        $("#totalpregrado").val(tpregrado);
        $("#t1").text(tpregrado);
    }
    if (tposgrado > 0 && valor === "Estudiante de posgrado") {
        tposgrado -= 1;
        $("#totalposgrado").val(tposgrado);
        $("#t2").text(tposgrado);
    }
    if (tauxiliares > 0 && valor === "Auxiliar de Investigación") {
        tauxiliares -= 1;
        $("#auxiliares").val(tauxiliares);
        $("#t3").text(tauxiliares);
    }
    if (texternos > 0 && valor === "Coinvestigador Externo") {
        texternos -= 1;
        $("#externos").val(texternos);
        $("#t4").text(texternos);
    }
    if (tjovenes > 0 && valor === "Jóvenes Investigadores") {
        tjovenes -= 1;
        $("#totaljovenes").val(tjovenes);
        $("#t5").text(tjovenes);
    }
    if (tjunior > 0 && valor === "Junior") {
        tjunior -= 1;
        $("#totaljunior").val(tjunior);
        $("#t6").text(tjunior);
    }
    if (tasociados > 0 && valor === "Asociados") {
        tasociados -= 1;
        $("#totalasociados").val(tjunior);
        $("#t7").text(tasociados);
    }
    if (tsenior > 0 && valor === "Seniors") {
        tsenior -= 1;
        $("#totalseniors").val(tsenior);
        $("#t8").text(tsenior);
    }
}

$(document).ready(function () {

    $("#t1").text("0");
    $("#t2").text("0");
    $("#t3").text("0");
    $("#t4").text("0");
    $("#t5").text("0");
    $("#t6").text("0");
    $("#t7").text("0");
    $("#t8").text("0");
    $("#totalpregrado").val("0");
    $("#totalposgrado").val("0");
    $("#auxiliares").val("0");
    $("#externos").val("0");
    $("#totaljovenes").val("0");
    $("#totaljunior").val("0");
    $("#totalasociados").val("0");
    $("#totalseniors").val("0");
    $('select').material_select();
    extraerNombresIntegrantesComp();
    $('.datepicker').pickadate({
        format: 'dd/mm/yyyy',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15,
        max: today // Creates a dropdown of 15 years to control year
    });
    $(".cb").change(function () {
        checked = $(this).is(':checked');
        $(".cb").prop('checked', false);
        if (checked) {

            $(this).prop('checked', true);
            if ($(this).attr("id") === "inscripcion") {
                $("#codigo").prop("disabled", false);
                $("#cod_grupo").prop("disabled", false);
                $("#enviar").html("Inscribir<i class='material-icons right'>send</i>");
                $("#actualizacion").prop("disabled", true);
                $("#inscripcion").prop("disabled", false);
                $(".fecha_retiro").prop("disabled", true);
                inscripcion = true;
                actualizacion = false;
            } else {
                $("#codigo").prop("disabled", true);
                $("#cod_grupo").prop("disabled", true);
                $("#enviar").html("Actualizar<i class='material-icons right'>send</i>");
                $("#inscripcion").prop("disabled", true);
                $("#actualizacion").prop("disabled", false);
                $("#cedula0").prop("disabled", true);
                llenarFormato();
                actualizacion = true;
                inscripcion = false;
            }
        }
    });

    $("#tabla1 > tbody").on("change", "input.c_lider", function () {
        checked = $(this).is(':checked');
        $(".c_lider").prop('checked', false);
        if (checked) {
            $(this).prop('checked', true);
            posicion_cbLider = $(this).val();
        }
    });

    $("#tabla2 tbody").on("focus", "select.inv_princ", function () {
        if (!actualizacion) {
            var options = extraerNombresTb1();
            $(this).html(names + options);
            $(this).material_select();
        }
    });
    $("#tabla6_1 tbody").on("change", "select.productot", function () {
        var producto_T = $("option:selected", this).text();
        var fila = ($(this).attr("id")).charAt(12);
        elegir_Tipo_ProductoT(producto_T, fila);
    });
    $("#tabla3 tbody").on("focus", "select.orientado", function () {
        if (!actualizacion) {
            var options = extraerNombresTb1();
            $(this).html(options);
            $(this).material_select();
        }
    });
    $("#primary").bind("change", function () {
        var c_inv = $("option:selected", this).text();
        elegirEscuelas(c_inv);
    });
    $("#dptm").bind("change", function () {
        var dpt = $('option:selected', this).text();
        elegirCiudad(dpt);
    });
    $("#tabla6 tbody").on("change", "select.producto", function () {
        var pdt = $("option:selected", this).text();
        elegirTipoProducto(pdt, $(this).attr("id").charAt(12));
    });
    $("#tabla1").on("click keydown", "select.vcl", function () {
        anterior = $('option:selected', this).text();
    }).on("change", "select.vcl", function () {
        actual = $('option:selected', this).text();
        suma();
    });
    $("#tabla1").on("click keydown", "select.cfc", function () {
        anterior = $('option:selected', this).text();
    }).on("change", "select.cfc", function () {
        actual = $('option:selected', this).text();
        suma();
    });
    $("#slc1").bind("change", function () {
        if (ant !== "") {
            $("#slc2 option:contains(" + ant + ")").prop("disabled", false);
        }
        act = $("#slc1 option:selected").text();
        $("#slc2 option:contains(" + act + ")").prop("disabled", true);
    }).bind("click", function () {
        ant = $("#slc1 option:selected").text();
    });
    $("#slc2").bind("change", function () {
        if (antt !== "") {
            $("#slc1 option:contains(" + antt + ")").prop("disabled", false);
        }
        actt = $("#slc2 option:selected").text();
        $("#slc1 option:contains(" + actt + ")").prop("disabled", true);
    }).bind("click", function () {
        antt = $("#slc2 option:selected").text();
    });
    $(".validate_text").bind("keypress", function (tecla) {
        if (!((tecla.charCode >= 65 && tecla.charCode <= 90) || (tecla.charCode >= 97 && tecla.charCode <= 122) || tecla.charCode !== 32))
            return false;
    });
    $(".validate_number").bind("keypress", function (tecla) {
        if (tecla.charCode === 45 || tecla.charCode === 43 || tecla.charCode === 101)
            return false;
    });
    $(".convert_uppercase").bind("blur", function () {
        $(this).val(($(this).val()).toUpperCase());
    });
    //tabla 1
    $("#add_row").click(function () {
        $('#addr' + i).html("<td>" + (i + 1) + "</td>\n\
                            <td><input type='checkbox' class='filled-in c_lider' id='c_lider" + i + "' value='" + i + "'><label for='c_lider" + i + "'></label></td>\n\
                            <td><input id='name" + i + "' type='text'/> </td>\n\
                            <td><input  id='cedula" + i + "' type='number' class='validate_number validate' min='0'/></td>\n\
	                    <td><input type='date' id='fecha_exp" + i + "' class='datepicker' /></td>\n\
	                    <td><select id='estado_civil" + i + "' class='browser-default'>\n\
	                            <option selected disabled></option>\n\
	                            <option>Soltero/a</option>\n\
	                            <option>Comprometido/a</option>\n\
	                            <option>Casado/a</option>\n\
	                            <option>Divorciado/a</option>\n\
	                            <option>Viudo/a</option>\n\
	                    </select></td>\n\
	                    <td><input  id='correspondencia" + i + "' \n\
	                    type='text'></td><td><input  id='correo" + i + "' \n\
	                    type='email' class=''></td><td><input  id='telefono" + i + "' \n\
	                    type='number'></td>\n\
	                    <td><select  class='browser-default' id='formacion" + i + "'>\n\
	                    <option selected disabled>Escoja una opción</option>\n\
	                    <option>Pregrado</option>\n\
	                    <option>Posgrado con Especialización</option>\n\
	                    <option>Posgrado con Maestria</option>\n\
	                    <option>Doctorado</option>\n\
	                    </select></td>\n\
	                    <td><select class='browser-default' id='tp_vnc" + i + "'>\n\
	                        <option selected disabled></option>\n\
	                        <option>Interno</option>\n\
	                        <option>Externo</option></select></td>\n\
	                    <td><select class='browser-default vcl' id='vinculacion" + i + "'><option value='' disabled selected>Escoja una opción</option>\n\
	                    <option value='egre" + i + "'>Egresado</option>\n\
	                    <option value='ptc" + i + "'>Estudiante de pregrado</option>\n\
	                    <option value='pc" + i + "'>Estudiante de posgrado</option>\n\
	                    <option value='poc" + i + "'>Profesor Tiempo Completo</option>\n\
	                    <option value='pomt" + i + "'>Profesor Medio Tiempo</option>\n\
	                    <option value='otr" + i + "'>Profesor Cátedra</option>\n\
	                    <option>Profesor Ocasional Completo</option>\n\
	                    <option>Profesor Ocacional Medio Tiempo</option>\n\
	                    <option>Auxiliar de Investigación</option>\n\
	                    <option>Joven Investigador Gobernación del Meta</option>\n\
	                    <option>Joven Investigador Universidad de los Llanos</option>\n\
	                    <option>Coinvestigador Externo</option>\n\
	                    <option>Otro</option>\n\
	                    </select></td>\n\
	                    <td><input type='text' id='uvd_externa" + i + "'></td>\n\
	                    <td><select class='browser-default cfc' id='clasificacion" + i + "'><option value='' disabled selected>Escoja una opción</option>\n\
	                    <option value='jov" + i + "'>Jóvenes Investigadores</option>\n\
	                    <option value='jun" + i + "'>Junior</option>\n\
	                    <option value='aso" + i + "'>Asociados</option>\n\
	                    <option value='sen0" + i + "'>Seniors</option>\n\
	                    </select></td><td><input  id='fechaing" + i + "' type='date' class='datepicker fecha_ingreso'></td>\n\
	                    <td><input id='fechartr" + i + "' type='date' class='datepicker fecha_retiro'/></td>\n\
	                    ");
        $('#tabla1').append('<tr id="addr' + (i + 1) + '"></tr>');

        if (actualizacion && (i + 1 <= informacion[1].length)) {
            $("#cedula" + i).prop("disabled", true);
        }

        i++;


        $('.datepicker').pickadate({
            format: 'dd/mm/yyyy',
            selectMonths: true, // Creates a dropdown to control month
            selectYears: true,
            max: today // Creates a dropdown of 15 years to control year
        });


    });
    $("#delete_row").click(function () {
        if (i > 1) {
            var valor = $("#vinculacion" + (i - 1) + " option:selected").text();
            resta(valor);
            valor = $("#clasificacion" + (i - 1) + " option:selected").text();
            resta(valor);
            $("#addr" + (i - 1)).html('');
            i--;
        }
    });
    //tabla 2

    $("#add_row1").click(function () {
        $('#num' + j).html("<td>" + (j + 1) + "</td>\n\
	                            <td><input id='proyecto" + j + "' type='text'/></td>\n\
	                            <td><input  id='fuentes" + j + "' type='text'></td>\n\
	                            <td><input  id='finicio" + j + "' type='date' class='datepicker'></td>\n\
	                            <td><input  id='ftermina" + j + "' type='date' class='datepicker'></td>\n\
	                            <td><select  id='invprin" + j + "' class='inv_princ browser-default'>\n\
	                                </select></td>\n\
	                            <td><input  id='pesperados" + j + "' type='text'></td>\n\
	                            <td><select  id='estado" + j + "' class='browser-default'>\n\
	                                <option>Ejecución</option>\n\
	                                <option>Terminado</option>\n\
	                                <option>Finalizado</option>\n\
	                                </select></td>\n\
	                            ");
        $('#tabla2').append('<tr id="num' + (j + 1) + '"></tr>');
        $("#invprin" + j).append(names);
        $("#invprin" + j).material_select();
        j++;
        $('.datepicker').pickadate({
            format: 'dd/mm/yyyy',
            selectMonths: true, // Creates a dropdown to control month
            selectYears: true,
            max: today // Creates a dropdown of 15 years to control year
        });
    });
    $("#delete_row1").click(function () {
        if (j > 1) {
            $("#num" + (j - 1)).html('');
            j--;
        }
    });
    //tabla 3

    $("#add_row2").click(function () {
        $('#nume' + k).html("<td>" + (k + 1) + "</td>\n\
	                            <td>\n\
	                                <select  id='tp_producto" + k + "' class='browser-default'>\n\
	                                <option selected disabled></option>\n\
	                                <option>Tesis de Pregrado</option>\n\
	                                <option>Tesis de Grado de Especialización</option>\n\
	                                <option>Tesis de Grado de Maestría</option>\n\
	                                <option>Tesis de Doctorado</option>\n\
	                                <option>Monografía</option></select>\n\
	                            </td>\n\
	                            <td><input id='nb_producto" + k + "' type='text'/> </td>\n\
	                            <td><select  id='norientado" + k + "' class='orientado browser-default'></select></td>\n\
	                            <td><input id='norientador" + k + "' type='text'></td>\n\
	                            <td><select class='browser-default' id='categoria_o" + k + "'>\n\
	                                <option>Tesis de Doctorado con Calidad A (TD_A)</option>\n\
	                                <option>Tesis de Doctorado con Calidad B (TD_B)</option>\n\
	                                <option>Apoyos a Creación de Programas de Doctorado Registrados en el Grupo (AP_A)</option>\n\
	                                <option>Apoyos a Creación de Cursos de Programas de Doctorado Registrados en el Grupo (AP_C)</option>\n\
	                                <option>Trabajo de Grado de Maestría Vinculados en el Grupo con Calidad A (TM_A)</option>\n\
	                                <option>Trabajo de Grado de Maestría Vinculados en el Grupo con Calidad B (TM_B)</option>\n\
	                                <option>Trabajo de Grado Pregrado Vinculados en el Grupo con Calidad A (TP_A)</option>\n\
	                                <option>Trabajo de Grado Pregrado Vinculados en el Grupo con Calidad B (TP_B)</option>\n\
	                                <option>Proyecto de Investigación y Desarrollo Vinculados en el Grupo con Calidad A (PID_A)</option>\n\
	                                <option>Proyecto de Investigación y Desarrollo Vinculados en el Grupo con Calidad B (PID_B)</option>\n\
	                                <option>Proyecto de Investigación y Desarrollo Desarrollo Vinculados en el Grupo con Calidad C (PID_C)</option>\n\
	                                <option>Proyectos de Investigación - Creación vinculados en el grupo con Calidad A (PIC_A)</option>\n\
	                                <option>Proyectos de Investigación - Creación vinculados en el grupo con Calidad B (PIC_B)</option>\n\
	                                <option>Proyectos de Investigación - Creación vinculados en el grupo con Calidad C (PIC_C)</option>\n\
	                                <option>Proyectos ID+I con Formación Vinculados en el Grupo con Calidad A (PF_A)</option>\n\
	                                <option>Proyectos ID+I con Formación Vinculados en el Grupo con Calidad B (PF_B)</option>\n\
	                                <option>Proyectos de Extensión y Responsabilidad Social en CTeI Vinculados en el Grupo (PE)</option> \n\
	                                <option>Creación de Programas de Maestría Registrados en el Grupo (AP_B)</option>\n\
	                                <option>Creación de Cursos de Programas de Maestría Registrados en el Grupo (AP_D)</option>\n\
	                                <option>Acompañamientos y Asesorías de líneas temáticas del Programa Ondas (APO)</option>\n\
	                                </select></td>\n\
	                            <td><input  id='ins_or" + k + "' type='text'></td>\n\
	                            <td><input  id='entidad_fin" + k + "' type='text'></td>\n\
	                            <td><select class='browser-default' id='estado_t" + k + "'>\n\
	                                <option>Ejecucion</option>\n\
	                                <option>Terminado</option>\n\
	                                <option>Finalizado</option>\n\
	                            </td>\n\
	                            <td><input type='text' id='fecha_ini" + k + "' class='datepicker'></td>\n\
	                            <td><input type='text' id='fecha_fin" + k + "' class='datepicker'></td>\n\
	                            ");
        $('#tabla3').append('<tr id="nume' + (k + 1) + '"></tr>');
        $("#norientado" + k).append(orientador);
        $("#norientado" + k).material_select();
        k++;
        $('.datepicker').pickadate({
            format: 'dd/mm/yyyy',
            selectMonths: true, // Creates a dropdown to control month
            selectYears: true,
            max: today // Creates a dropdown of 15 years to control year
        });
    });
    $("#delete_row2").click(function () {
        if (k > 1) {
            $("#nume" + (k - 1)).html('');
            k--;
        }
    });
    $('select').material_select();
    //tabla 5

    $("#add_row4").click(function () {
        $('#numero' + n).html("<td>" + (n + 1) + "</td>\n\
	                                <td><select id='tpB_evento" + n + "' class='browser-default'>\n\
	                                    <option selected disabled></option>\n\
	                                    <option>Congreso</option>\n\
	                                    <option>Encuentro</option>\n\
	                                    <option>Seminario</option>\n\
	                                    <option>Simposio</option>\n\
	                                    <option>Diplomado</option>\n\
	                                    <option>Taller</option>\n\
	                                    </select></td>\n\
	                                <td><input id='nevento_" + n + "' type='text'/> </td>\n\
	                                <td><select id='nparticipante_" + n + "' class='flow-text participante' multiple></select></td>\n\
	                                <td><select class='browser-default' id='participacion_" + n + "'>\n\
	                                    <option selected disabled></option>\n\
	                                    <option>Asistente</option>\n\
	                                    <option>Conferencista</option>\n\
	                                    <option>Organizador</option>\n\
	                                    <option>Moderador</option>\n\
	                                    <option>Ponente</option>\n\
	                                    <option>Compilador Memorias</option>\n\
	                                    <option>Poster</option>\n\
	                                    <option>Traductor</option>\n\
	                                    </select></td>\n\
	                                <td><select class='browser-default' id='producto_ev" + n + "'>\n\
	                                    <option selected disabled></option>\n\
	                                    <option>Ponencia Oral</option>\n\
	                                    <option>Ponencia Magistral</option>\n\
	                                    <option>Trabajo</option>\n\
	                                    <option>Poster</option>\n\
	                                    <option>Conferencia</option>\n\
	                                    <option>Conferencia Magistral</option>\n\
	                                    <option>Conversatorio</option>\n\
	                                    <option>Capitulo de Memoria</option>\n\
	                                    </select></td>\n\
	                                <td><input type='text' id='nb_ponencia" + n + "'></td>\n\
	                                <td><input  id='entidadorg_" + n + "' type='text'></td>\n\
	                                <td><input id='ent_fin_" + n + "' type='text'></td>\n\
	                                <td><select class='browser-default' id='ambito" + n + "'>\n\
	                                    <option selected disabled></option>\n\
	                                    <option>Nacional</option>\n\
	                                    <option>Internacional</option>\n\
	                                    </select></td>\n\
	                                <td><input type='text' id='paiss_" + n + "'></td>\n\
	                                <td><input  id='ciudadd_" + n + "' type='text'></td>\n\
	                                <td><input type='date' id='ffecha_ini" + n + "' class='datepicker'></td>\n\
	                                <td><input type='date' id='ffecha_fin" + n + "' class='datepicker'></td>\n\
	                                <td><input  id='yeartwo_" + n + "' type='text'></td>");
        $('#tabla5').append('<tr id="numero' + (n + 1) + '"></tr>');
        $("#nparticipante_" + n).append(names);
        $("#nparticipante_" + n).material_select();
        n++;
        $('.datepicker').pickadate({
            format: 'dd/mm/yyyy',
            selectMonths: true, // Creates a dropdown to control month
            selectYears: true,
            max: today // Creates a dropdown of 15 years to control year
        });
    });
    $("#delete_row4").click(function () {
        if (n > 1) {
            $("#numero" + (n - 1)).html('');
            n--;
        }
    });
    //tabla 6

    $("#add_row5").click(function () {
        $('#numeros' + p).html("<td>" + (p + 1) + "</td>\n\
	                    <td><select class='browser-default producto' id='tipoproducto" + p + "'><option value='' disabled selected>Escoja una opción</option>\n\
	                    <option>Artículo</option>\n\
	                    <option>Libro</option>\n\
	                    <option>Capítulo de Libro</option>\n\
	                    <option>Patentes</option>\n\
	                    <option>Variedades Vegetales</option>\n\
	                    <option>Variedades Animales</option>\n\
	                    <option>Otro</option>\n\
	                    </select></td>\n\
	                    <td><select id='producto_clasf" + p + "' class='browser-default'></select></td>\n\
	                    <td><select id='clasificacionn" + p + "' class='browser-default'>\n\
	                        <option selected></option>\n\
	                        <option>1</option>\n\
	                        <option>2</option>\n\
	                        <option>3</option>\n\
	                        </select></td>\n\
	                    <td><input id='nproducto" + p + "' type='text'/> </td>\n\
	                    <td class='capa1' style='min-width:340px;'><select  id='autores" + p + "' class='flow-text' multiple></select></td>\n\
	                    <td><input  id='nb_revista" + p + "' type='text'></td>\n\
	                    <td><input  id='nb_libro" + p + "' type='text'></td>\n\
	                    <td><input  id='volumen" + p + "' type='text'></td>\n\
	                    <td><input id='num_fas" + p + "' type='text'></td>\n\
	                    <td><input id='pag_ini" + p + "' type='number'></td>\n\
	                    <td><input id='pag_fin" + p + "' type='number'></td>\n\
	                    <td><input id='urrl" + p + "' type='text'></td>\n\
	                    <td><input id='serie" + p + "' type='text'></td>\n\
	                    <td><input id='anno" + p + "' type='text'></td>\n\
	                    <td><input id='editorial" + p + "' type='text'></td>\n\
	                    <td><input id='isbn" + p + "' type='text'></td>\n\
	                    <td><input id='pais" + p + "' type='text'></td>\n\
	                    <td><input id='ciudad_p" + p + "' type='text'></td>\n\
	                    <td><select id='estado_producto" + p + "' class='browser-default'>\n\
	                    <option>Publicado</option>\n\
	                    <option>Sometido</option>\n\
	                    </select></td>");
        $('#tabla6').append('<tr id="numeros' + (p + 1) + '"></tr>');
        $("#autores" + p).append(names);
        $("#autores" + p).material_select();
        p++;
    });
    $("#delete_row5").click(function () {
        if (p > 1) {
            $("#numeros" + (p - 1)).html('');
            p--;
        }
    });
    //tabla 6_1

    $("#add_row_5").click(function () {
        $("#tabla6_1").append("<tr id='fil_" + m + "'>\n\
	                                    <td>" + (m + 1) + "</td>\n\
	                                    <td><select class='browser-default productot' id='tp_productot" + m + "'>\n\
	                                            <option selected disabled></option>\n\
	                                            <option>Diseño Industrial</option>\n\
	                                            <option>Esquema de circuito integrado</option>\n\
	                                            <option>Software</option>\n\
	                                            <option>Planta piloto</option>\n\
	                                            <option>Prototipo industrial</option>\n\
	                                            <option>Signos distintivos</option>\n\
	                                            <option>Consultoría científicotecnológica e Informe Técnico</option>\n\
	                                        </select></td>\n\
	                                    <td><select class='browser-default' id='categoria_pdt" + m + "'></select></td>\n\
	                                    <td><input id='nb_productot" + m + "' type='text'></td>\n\
	                                    <td><select id='autores_pdt" + m + "' multiple class='autores flow-text'></select></td>\n\
	                                    <td><input id='nm_aprobado" + m + "' type='number'></td>\n\
	                                    <td><input id='yearGet" + m + "' type='number' class='validate_number'></td>\n\
	                                    <td><input id='paisGet" + m + "' type='text'></td>\n\
	                                    <td><input id='gact_ind" + m + "' type='text'></td>\n\
	                               </tr>");
        $("#autores_pdt" + m).append(names);
        $("#autores_pdt" + m).material_select();
        m++;
    });
    $("#delete_row_5").click(function () {
        if (m > 1) {
            $("#fil_" + (m - 1)).remove();
            m--;
        }
    });
    //tabla 7

    $("#add_row6").click(function () {
        $('#numeross' + q).html("<td>" + (q + 1) + "</td><td><input id='nconvocatoria" + q + "' type='text'/> </td><td><input  id='entidadfin" + q + "' type='text'></td><td><input  id='productopar" + q + "' type='text'></td><td><input  id='ciudadthree" + q + "' type='text'></td><td><input  id='yearfour" + q + "' type='text'></td><td><input  id='resultado" + q + "' type='text'></td><td><input  id='valortotal" + q + "' type='text'></td>");
        $('#tabla7').append('<tr id="numeross' + (q + 1) + '"></tr>');
        q++;
    });
    $("#delete_row6").click(function () {
        if (q > 1) {
            $("#numeross" + (q - 1)).html('');
            q--;
        }
    });
});

function extraerDatosTb1() {
    var tabla = document.getElementById('tabla1');
    var datos = "", lider = "0";
    for (var i = 1; i < tabla.rows.length - 1; i++) {
        if (i === pos_lider) {
            lider = "1";
        }
        if (i > 1) {
            datos += ">>";
        }
        datos += $("#name" + (i - 1)).val() + ";;" + $("#cedula" + (i - 1)).val() + ";;" + $("#fecha_exp" + (i - 1)).val() + ";;" + $("#estado_civil" + (i - 1) + " option:selected").text() + ";;" + $("#correspondencia" + (i - 1)).val() + ";;" + $("#correo" + (i - 1)).val() + ";;" + $("#telefono" + (i - 1)).val() + ";;" + $("#formacion" + (i - 1) + " option:selected").text() + ";;" + $("#vinculacion" + (i - 1) + " option:selected").text() + ";;" + $("#uvd_externa" + (i - 1)).val() + ";;" + $("#clasificacion" + (i - 1) + " option:selected").text() + ";;" + $("#fechaing" + (i - 1)).val() + ";;" + $("#fechartr" + (i - 1)).val() + ";;" + $("#tp_vnc" + (i - 1) + " option:selected").text() + ";;" + lider;
    }
    return datos;
}

function extraerDatosTb2() {
    var tabla = document.getElementById('tabla2');
    var datos = "";
    for (var i = 1; i < tabla.rows.length - 1; i++) {
        if (i > 1) {
            datos += ">>";
        }
        datos += ($("#proyecto" + (i - 1)).val() + ";;" + $("#invprin" + (i - 1) + " option:selected").text() + ";;" + $("#finicio" + (i - 1)).val() + ";;" + $("#ftermina" + (i - 1)).val() + ";;" + $("#pesperados" + (i - 1)).val() + ";;" + $("#estado" + (i - 1) + " option:selected").text() + ";;" + $("#fuentes" + (i - 1)).val()) + ";;" + $("#codigo").val();
    }
    return datos;
}

function extraerDatosTb3() {
    //ntrabajo0 norientado0 ttrabajo0 estadoo0 year0
    var tabla = document.getElementById('tabla3');
    var datos = "";
    for (var i = 1; i < tabla.rows.length - 1; i++) {
        if (i > 1) {
            datos += ">>";
        }
        datos += $("#tp_producto" + (i - 1) + " option:selected").text() + ";;" + $("#nb_producto" + (i - 1)).val() + ";;" + $("#norientador" + (i - 1)).val() + ";;" + $("#norientado" + (i - 1) + " option:selected").text() + ";;" + $("#categoria_o" + (i - 1) + " option:selected").text() + ";;" + $("#ins_or" + (i - 1)).val() + ";;" + $("#entidad_fin" + (i - 1)).val() + ";;" + $("#estado_t" + (i - 1) + " option:selected").text() + ";;" + $("#fecha_ini" + (i - 1)).val() + ";;" + $("#fecha_fin" + (i - 1)).val();
    }
    return datos;
}

function extraerDatosTb5() {
    //neventotwo0 nponente0 nponencia0 tipoponencia0 entidadorgtwo0 ciudadtwo0 yearthree0
    var tabla = document.getElementById('tabla5');
    var datos = "";
    for (var i = 1; i < tabla.rows.length - 1; i++) {
        if (i > 1) {
            datos += ">>";
        }
        datos += ($("#tpB_evento" + (i - 1) + " option:selected").text() + ";;" + $("#nevento_" + (i - 1)).val() + ";;" + $("#nparticipante_" + (i - 1)).val() + ";;" + $("#participacion_" + (i - 1) + " option:selected").text() + ";;" + $("#producto_ev" + (i - 1) + " option:selected").text() + ";;" + $("#nb_ponencia" + (i - 1)).val() + ";;" + $("#entidadorg_" + (i - 1)).val() + ";;" + $("#ent_fin_" + (i - 1)).val() + ";;" + $("#ambito" + (i - 1) + " option:selected").text() + ";;" + $("#paiss_" + (i - 1)).val() + ";;" + $("#ciudadd_" + (i - 1)).val() + ";;" + $("#ffecha_ini" + (i - 1)).val() + ";;" + $("#ffecha_fin" + (i - 1)).val() + ";;" + $("#yeartwo_" + (i - 1)).val());
    }
    return datos;
}

function extraerDatosTb6() {
    //nproducto tipoproducto autores serievolumen isbn clasificacionn editorial
    var tabla = document.getElementById('tabla6');
    var datos = "";
    for (var i = 1; i < tabla.rows.length - 1; i++) {
        if (i > 1) {
            datos += ">>";
        }
        datos += $("#tipoproducto" + (i - 1) + " option:selected").text() + ";;" + $("#producto_clasf" + (i - 1) + " option:selected").text() + ";;" + $("#nproducto" + (i - 1)).val() + ";;" + $("#autores" + (i - 1)).val() + ";;" + $("#nb_revista" + (i - 1)).val() + ";;" + $("#nb_libro" + (i - 1)).val() + ";;" + $("#volumen" + (i - 1)).val() + ";;" + $("#serie" + (i - 1)).val() + ";;" + $("#anno" + (i - 1)).val() + ";;" + $("#editorial" + (i - 1)).val() + ";;" + $("#clasificacionn" + (i - 1) + " option:selected").text() + ";;" + $("#isbn" + (i - 1)).val() + ";;" + $("#pais" + (i - 1)).val() + ";;" + $("#ciudad_p" + (i - 1)).val() + ";;" + $("#estado_producto" + (i - 1) + " option:selected").text() + ";;" + $("#num_fas" + (i - 1)).val() + ";;" + $("#pag_ini" + (i - 1)).val() + ";;" + $("#pag_fin" + (i - 1)).val() + ";;" + $("#urrl" + (i - 1)).val();
    }
    return datos;
}

function extraerDatosTb6_1() {
    var tabla = document.getElementById('tabla6_1');
    var datos = "";
    for (var i = 1; i < tabla.rows.length; i++) {
        if (i > 1) {
            datos += ">>";
        }
        datos += $("#tp_productot" + (i - 1) + " option:selected").text() + ";;" + $("#categoria_pdt" + (i - 1) + " option:selected").text() + ";;" + $("#nb_productot" + (i - 1)).val() + ";;" + $("#autores_pdt" + (i - 1)).val() + ";;" + $("#nm_aprobado" + (i - 1)).val() + ";;" + $("#yearGet" + (i - 1)).val() + ";;" + $("#paisGet" + (i - 1)).val() + ";;" + $("#gact_ind" + (i - 1)).val();
    }
    return datos;
}

function extraerDatosTb7() {
    //nconvocatoria entidadfin productopar ciudadthree yearfour resultado valortotal
    var tabla = document.getElementById('tabla7');
    var datos = "";
    for (var i = 1; i < tabla.rows.length - 1; i++) {
        if (i > 1) {
            datos += ">>";
        }
        datos += ($("#nconvocatoria" + (i - 1)).val() + ";;" + $("#entidadfin" + (i - 1)).val() + ";;" + $("#productopar" + (i - 1)).val() + ";;" + $("#ciudadthree" + (i - 1)).val() + ";;" + $("#yearfour" + (i - 1)).val() + ";;" + $("#resultado" + (i - 1)).val() + ";;" + $("#valortotal" + (i - 1)).val());
    }
    return datos;
}

function extraerDatosGrupo() {
    var datos = $("#codigo").val() + ";;" + $("#namegroup").val() + ";;" + $("#sigla").val() + ";;" + $("#clasification option:selected").text() + ";;" + $("#categoria option:selected").text() + ";;" + $("#codigo_colc").val() + ";;" + extraerDatosAccmto_CB() + ";;" + $("#email_gp").val() + ";;" + $("#primary option:selected").text() + ";;" + $("#secondary option:selected").text() + ";;" + $("#fecha").val() + ";;" + $("#dptm option:selected").text() + ";;" + $("#ciudad_ option:selected").text() + ";;" + $("#slc1 option:selected").text() + ";;" + $("#slc2 option:selected").text() + ";;" + $("#totalpregrado").val() + ";;" + $("#totalposgrado").val() + ";;" + $("#auxiliares").val() + ";;" + $("#externos").val() + ";;" + $("#totaljovenes").val() + ";;" + $("#totaljunior").val() + ";;" + $("#totalasociados").val() + ";;" + $("#totalseniors").val() + ";;" + $("#textarea1").val() + ";;" + $("#textarea2").val() + ";;" + $("#textarea3").val() + ";;" + $("#textarea4").val() + ";;" + $("#tematica").val() + ";;" + $("#lineasinv").val() + ";;" + $("#lineasinv_ins").val() + ";;" + $("#lineapro").val() + ";;" + $("#servicioext option:selected").text() + ";;" + $("#primary option:selected").val() + ";;" + usuario + ";;" + $("#area_cn").val();
    return datos;
}

function extraerDatosLider() {
    var datos = ($("#tarjetapf").val() + ";;" + $("#tituload").val());
    return datos;
}

function extraerDatosAccmto_CB() {
    var checked, datos = "";
    for (var i = 0; i < 8; i++) {
        checked = $("#myCheckbox" + i).is(':checked');
        if (checked) {
            datos += $("#myCheckbox" + i).val() + "-";
        }
    }

    if (datos.charAt(datos.length - 1) === "-") {
        datos = datos.substring(0, datos.length - 1);
    }

    return datos;
}

function imprime() {
    var todo = "",
            filas = 0,
            tama = 0;
    $("#nmbg").html($("#namegroup").val());
    $("#sig").html($("#sigla").val());
    $("#fec").html($("#fecha").val());
    $("#cat").html($("#categoria option:selected").text());
    $("#clas").html($("#clasification option:selected").text());
    $("#are").html($("#area_cn").val());
    $("#corr").html($("#email_gp").val());
    $("#ubi").html($("#dptm option:selected").text() + "-" + $("#ciudad_ option:selected").text());
    $("#lide").html($("#namelider").val());
    $("#titad").html($("#tituload").val());
    $("#tjp").html($("#tarjetapf").val());
    $("#tel").html($("#telefono").val());
    $("#corr2").html($("#email").val());
    $("#cent").html($("#primary option:selected").text());
    $("#per").html($("#secondary option:selected").text());
    document.getElementById("conoc").innerHTML = extraerDatosAccmto_CB();
    document.getElementById("text1").innerHTML = $("#textarea1").val();
    document.getElementById("text2").innerHTML = $("#textarea2").val();
    document.getElementById("text3").innerHTML = $("#textarea3").val();
    document.getElementById("text4").innerHTML = $("#textarea4").val();
    $("#tablaintegrantes tbody").empty();
    todo = extraerDatosTb1();
    filas = todo.split(">>");
    tama = filas.length;
    //alert(tama);
    for (var h = 0; h < tama; h++) {
        var datos = filas[h].split(";;");
        //alert(datos[0]);
        $("#tablaintegrantes tbody").append("<tr><td class='bordertd'>" + datos[0] + "</td>\n\
	                    <td class='bordertd'>" + datos[1] + "</td><td class='bordertd'>" + datos[5] + "</td>\n\
	                    <td class='bordertd'>" + datos[6] + "</td><td class='bordertd'>" + datos[7] + "</td>\n\
	                    <td class='bordertd'>" + datos[8] + "</td><td class='bordertd'>" + datos[11].substring(3) + "</td></tr>");
    }
    window.print();
    return false;
}

function myFunction() {
    var elmnt = document.getElementById("contenedor");
    var x = elmnt.scrollLeft;
    if (x > 0) {
        $(".capa1").css("position", "inherit");
        $(".capa1").css("z-index", "1");
    }
    if (x === 0) {
        $(".capa1").css("position", "absolute");
        $(".capa1").css("z-index", "1");
    }
    var y = elmnt.scrollTop;
    document.getElementById("demo").innerHTML = "Horizontal: " + x + "px<br>Vertical: " + y + "px";
}

//function isEmpty_table(id_tabla){
//    var vacio=false;
//    $(id_tabla+" > tbody > tr").each(function(i){
//        $(this).children('td').each(function(x){
//            console.info($(this).html());
//            if($(this).is('input')){
//                if($(this).val()===""){
//                    vacio=true;
//                }else{
//                    alert($(this).val()+"###");
//                    vacio=false;
//                }
//            }
//        });
//    });
//    alert(vacio);
//    return vacio;
//}