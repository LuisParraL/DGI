<%-- 
    Document   : formato6
    Created on : 13/04/2017, 11:37:23 AM
    Author     : Luis Parra
--%>

<%@page import="java.util.ArrayList"%>
<%@page import="dao.GrupoDAO"%>
<%@page import="java.io.PrintWriter"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<%
    PrintWriter outt = response.getWriter();

    HttpSession sesion = request.getSession(false);
    if (sesion != null && sesion.getAttribute("usuario") != null) {
        String usuario = (String) sesion.getAttribute("usuario");
        GrupoDAO gd;
        gd = new GrupoDAO();
        ArrayList<String> gr = new ArrayList<String>();
        gr = gd.listarGrupoBasicos(usuario);
        String id = gd.obtenerId(usuario);
        int cant = gd.cantidadIntegrantes(id);
        ArrayList<String> doc = new ArrayList<String>();
        doc = gd.listarDocentes(id);
        ArrayList<String> est = new ArrayList<String>();
        est = gd.listarEstudiantes(id);
        String nmbLider = gd.listarNombreLider(id);
%>


<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>FO-INV-06</title>

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="materialize/css/materialize.min.css">
        <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>        
        <script type="text/javascript" src="materialize/js/materialize.min.js"></script>
        <link href="http://investigaciones.unillanos.edu.co/images/favicon.ico" rel="Shortcut Icon" />
        <link rel="stylesheet" href="css/pantalla6.css" media="screen">
        <link rel="stylesheet" href="css/print6.css" media="print">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
    </head>
    <body>

        <!-- inicio barra de navegación -->
        <!-- Dropdown Structure -->
        <ul id="dropdown1" class="dropdown-content">
            <li><a class="black-text" href="#!">uno</a></li>
            <li><a class="black-text" href="#!">dos</a></li>
            <li class="divider"></li>
            <li><a class="black-text" href="#!">tres</a></li>
        </ul>
        <nav style="background: #e9e9e9;" class="noprint">
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo"><img class="responsive-img" src="http://investigaciones.unillanos.edu.co/images/Logo_web.png"></a>
                <ul class="right hide-on-med-and-down">
                    <li><a class="black-text" href="Formato_4.jsp">Opción 1</a></li>
                    <li><a class="black-text" href="Formato_4.jsp">Opción 2</a></li>
                    <!-- Dropdown Trigger -->
                    <li><a class="dropdown-button black-text" href="#!" data-activates="dropdown1">Desplegar<i class="material-icons right">arrow_drop_down</i></a></li>
                </ul>
            </div>
        </nav>
        <input type="hidden" id="idgrupo" value="<%out.print(id);%>">
        <br>
        <div class="container">
            <div class="row">
                <div class="col s2 l2">
                    <img class="responsive-img" src="http://www.ame-macarena.org/imagenes/logos/unillanos.png">
                </div>
                <div class="col s7 col l8">
                    <h5 class="black-text center-align" style="font-weight: bold;">UNIVERSIDAD DE LOS LLANOS</h5>
                    <h6 class="black-text center-align" style="font-weight: bold;">PROCESO DE INVESTIGACIÓN</h6>
                    <h6 class="black-text center-align" style="font-weight: bold;">FORMATO DE INFORME SEMESTRAL Y PLAN
                        DE ACCIÓN GRUPOS DE INVESTIGACIÓN</h6>
                </div>
                <div class="col s3 l2">
                    <b class="black-text">CÓDIGO: FO-INV-06</b></br>
                    <b class="black-text">VERSIÓN: 01</b></br>
                    <b class="black-text">FECHA: 03/03/2014</b></br>
                    <b class="black-text">VIGENCIA: 2014</b>
                </div>
            </div>
            <hr>
            <p class="black-text center-align" style="font-weight: bold;">SISTEMA DE INVESTIGACIONES - SIU</p>
            <form method="POST">
                <div class="row">
                    <table class="centered">
                        <thead>
                            <tr>
                                <th style="border: 1px solid black; padding: 0;">Nombre del Grupo</th>
                                <th style="border: 1px solid black; padding: 0;">Sigla</th>
                                <th style="border: 1px solid black; padding: 0;">N° Integrantes</th>
                                <th style="border: 1px solid black; padding: 0;">Lider</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td style="border: 1px solid black; padding: 0;"><%out.print(gr.get(0));%></td>
                                <td style="border: 1px solid black; padding: 0;"><%out.print(gr.get(1));%></td>
                                <td style="border: 1px solid black; padding: 0;"><%out.print(cant);%></td>
                                <td style="border: 1px solid black; padding: 0;"><%out.print(nmbLider);%></td>  
                            </tr>
                        </tbody>
                    </table>                    
                </div>
                <br>
                <div class="row">
                    <table class="centered">
                        <thead>
                            <tr>
                                <th style="border: 1px solid black; padding: 0;">Centro de Investigación</th>
                                <th style="border: 1px solid black; padding: 0;">Escuela, Departamento o Instituto</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td style="border: 1px solid black; padding: 0;"><%out.print(gr.get(2));%></td>
                                <td style="border: 1px solid black; padding: 0;"><%out.print(gr.get(3));%></td>                                
                            </tr>
                        </tbody>
                    </table>                    
                </div>

                <b class="flow-text black-text">Integrantes</b><br>
                <p class="flow-text">Docentes</p>


                <!--tabla editable... -->
                <div class="row">
                    <div class="col s12 m12 l12">
                        <table class="centered" id="tabla1">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid black; padding: 0;">N°</th>
                                    <th style="border: 1px solid black; padding: 0;"> Nombre</th>                                                                    
                                </tr>
                            </thead>
                            <tbody>
                                <%
                                    for (int i = 0; i < doc.size(); i++) {
                                        out.print("<tr><td style='border: 1px solid black; padding: 0;'>" + (i + 1) + "</td>"
                                                + "<td style='border: 1px solid black; padding: 0;'>" + doc.get(i) + "</td></tr>");
                                    }
                                %>
                            </tbody>
                        </table>
                    </div>
                </div>  
                <!-- fin tabla 1 -->


                <p class="flow-text">Estudiantes</p>

                <!--tabla editable 2 -->
                <div class="row">
                    <div class="col s12 m12 l12">
                        <table class="centered" id="tabla1">
                            <thead>
                                <tr>
                                    <th style="border: 1px solid black; padding: 0;">N°</th>
                                    <th style="border: 1px solid black; padding: 0;"> Nombre</th>                                                                    
                                </tr>
                            </thead>
                            <tbody>
                                <%
                                    for (int j = 0; j < est.size(); j++) {
                                        out.print("<tr><td style='border: 1px solid black; padding: 0;'>" + (j + 1) + "</td>"
                                                + "<td style='border: 1px solid black; padding: 0;'>" + est.get(j) + "</td></tr>");
                                    }
                                %>
                            </tbody>
                        </table>
                    </div>
                </div>  
                <!-- fin tabla 1 -->

                <!-- comienza botones tabla 1 -->

                <!-- fin botones tabla 1 -->

                <p class="flow-text black-text">Reuniones realizadas</p>

                <!-- Comienza tabla 3-->

                <div class="row">
                    <div class="col s12 m12 l12 noprint">
                        <table class="responsive-table" id="tabla3">
                            <thead>
                                <tr>
                                    <th class="">
                                        N°
                                    </th>
                                    <th class="" style="width: 100px;">
                                        Fecha
                                    </th>
                                    <th class="">
                                        Tema
                                    </th>                                                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr id='numer0'>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input type="date" name='fecha0' id="fecha0" class="datepicker"/>
                                    </td>
                                    <td>
                                        <input type="text" name='tema0' id="tema0" placeholder="Tema"/>
                                    </td>
                                    <td>
                                </tr>
<!--                                <tr id='numer1'></tr>-->
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="row">
                    <table class="centered" id="tb1">
                        <thead>
                            <tr>
                                <th class="borde">Fecha</th>
                                <th class="borde">Tema</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>                    
                </div>
                <!-- Botones tabla 3-->

                <div class="row">
                    <a id="add_row2" class="btn-floating  waves-effect waves-light noprint">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_row2' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
                <!-- fin Botones tabla 3-->


                <p class="flow-text black-text">Descripción de actividades</p>

                <!-- Comienza tabla 4-->

                <div class="row">
                    <div class="col s12 m12 l12 noprint">
                        <table class="responsive-table" id="tabla4">
                            <thead>
                                <tr >
                                    <th class="">
                                        N°
                                    </th>
                                    <th class="">
                                        Descripción
                                    </th>                                                                 
                                </tr>
                            </thead>
                            <tbody>
                                <tr id='numero0'>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input type="text" name='descripcion0' id="descripcion0" placeholder="Descripción"/>
                                    </td>                              
                                    <td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <table class="centered" id="tb2">
                        <thead>
                            <tr>
                                <th class="borde">N°</th>
                                <th class="borde">Descripción</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>                    
                </div>
                <!-- Botones tabla 4-->

                <div class="row">
                    <a id="add_row3" class="btn-floating  waves-effect waves-light noprint">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_row3' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
                <!-- fin Botones tabla 4-->


                <p class="flow-text black-text">Productos (Anexar copia)</p>
                <!-- Comienza tabla 5-->

                <div class="row">
                    <div class="col s12 m12 l12 noprint">
                        <table class="responsive-table" id="tabla5">
                            <thead>
                                <tr >
                                    <th class="">
                                        N°
                                    </th>
                                    <th class="">
                                        Producto
                                    </th>                                                                                                 
                                </tr>
                            </thead>
                            <tbody>
                                <tr id='numeros0'>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input type="text" name='producto' id="producto0" placeholder="Producto"/>
                                    </td>                                                
                                    <td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- fin tabla 5 -->
                <div class="row">
                    <table class="centered" id="tb3">
                        <thead>
                            <tr>
                                <th class="borde">N°</th>
                                <th class="borde">Producto</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>                    
                </div>
                <!-- Botones tabla 5-->                       

                <div class="row">
                    <a id="add_row4" class="btn-floating  waves-effect waves-light noprint">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_row4' style="float: right;" class="btn-floating waves-effect waves-light red noprint">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
                <!-- fin Botones tabla 5-->

                <div class="row">
                    <p class="flow-text">Informe evaluativo</p>
                    <div class="input-field col s12 m12 l12 noprint">
                        <textarea id="textarea1" class="materialize-textarea"></textarea>
                        <label for="textarea1">Informe</label>
                    </div>                    
                </div>
                <blockquote id="text1"></blockquote> 
                <p class="flow-text black-text center-align">Plan de Acción Grupo de Investigación</p>

                <div class="row">
                    <div class="input-field col s12 l12">
                        <input type="text" name="periodo" id="periodo" pattern="[0-9]{4}-(1|2)"/>
                        <label for="periodo">Periodo Académico</label>
                    </div>                
                </div>
                <!-- Comienza tabla 6-->

                <div class="row">
                    <div class="col s12 m12 l12 noprint">
                        <table class="responsive-table" id="tabla6">
                            <thead>
                                <tr>
                                    <th class="">
                                        N°
                                    </th>
                                    <th class="">
                                        Actividad
                                    </th>
                                    <th class="">
                                        Producto esperado
                                    </th>
                                    <th class="">
                                        Recursos necesarios
                                    </th>
                                    <th class="">
                                        Fecha entrega
                                    </th>
                                    <th class="">
                                        Responsable
                                    </th>                                                                     
                                </tr>
                            </thead>
                            <tbody>
                                <tr id='numeross0'>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input type="text" name='actividad0' id='actividad0' placeholder="Actividad"/>
                                    </td>
                                    <td>
                                        <input type="text" name='productoesp0' id='productoesp0' placeholder="Producto esperado"/>
                                    </td>
                                    <td>
                                        <input type="text" name='recursos0' id='recursos0' placeholder="Recursos necesarios"/>
                                    </td>
                                    <td>
                                        <input type="date" name='fechaentrega0' id='fechaentrega0' class="datepicker"/>
                                    </td>
                                    <td>
                                        <input type="text" name='responsable0' id='responsable0' placeholder="Responsable"/>
                                    </td>
                                    <!-- falta el jquery y cambiar los nombre en naranja -->
                                    <td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!-- fin tabla 6 -->
                <div class="row">

                    <table class="centered" id="tb4">
                        <thead>
                            <tr>
                                <th class="borde">N°</th>
                                <th class="borde">Actividad</th>
                                <th class="borde">Producto Esperado</th>
                                <th class="borde">Recursos Necesarios</th>
                                <th class="borde">Fecha Entrega</th>
                                <th class="borde">Responsable</th>
                            </tr>
                        </thead>

                        <tbody>
                        </tbody>
                    </table>                    
                </div>


                <!-- Botones tabla 6-->

                <div class="row">
                    <a id="add_row5" class="btn-floating  waves-effect waves-light noprint">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_row5' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
                <!-- Fin botones tabla 6 -->            
                <!-- Boton enviar -->
                <!-- Si presenta problema cambiar a input type button en lugar de button type submit -->
                <div class="row">
                    <button style="float: left;" class="btn waves-effect waves-light noprint" onclick="return llenarTablas();">Imprimir
                        <i class="material-icons right">print</i> 
                    </button>                    
                    <button style="float: right;" class="btn waves-effect waves-light noprint" type="submit" 
                            name="action" onclick="return abc();" id="enviar">
                        Inscribir <i class="material-icons right">send</i>
                    </button>
                </div>
            </form>
        </div>

        <script>

            $(document).ready(function () {

                var i = 1, j = 1, k = 1, m = 1, n = 1, p = 1, q = 1;
                //tabla 1
                $("#add_row").click(function () {
                    $('#num' + i).html("<td>" + (i + 1) + "</td><td><input name='name" + i + "' \n\                     type='text'placeholder='Nombre'/></td>");

                    $('#tabla1').append('<tr id="num' + (i + 1) + '"></tr>');
                    i++;
                });
                $("#delete_row").click(function () {
                    if (i > 1) {
                        $("#num" + (i - 1)).html('');
                        i--;
                    }
                });

                //tabla 2

                $("#add_row1").click(function () {
                    $('#nume' + j).html("<td>" + (j + 1) + "</td><td><input name='names" + j + "' \n\
                type='text' placeholder='Nombre'/></td><td><input  name='codigo" + j + "' \n\
                type='number' min='0' placeholder='Código'></td>");

                    $('#tabla2').append('<tr id="nume' + (j + 1) + '"></tr>');
                    j++;
                });

                $("#delete_row1").click(function () {
                    if (j > 1) {
                        $("#nume" + (j - 1)).html('');
                        j--;
                    }
                });



                //tabla 3

                $("#add_row2").click(function () {
                    $('#tabla3').append("<tr id='numer"+k+"'><td>" + (k + 1) + "</td><td style='width: 100px;'><input name='fecha" + k + "' \n\
                        type='date' id='fecha" + k + "' class='datepicker'/> </td>\n\
                    <td><input  name='tema" + k + "' id='tema" + k + "' type='text' placeholder='Tema'></td></tr>");

//                    $('#tabla3').append('<tr id="numer' + (k + 1) + '"></tr>');
                    k++;
                    $('.datepicker').pickadate({
                        format: 'dd/mm/yyyy',
                        selectMonths: true, // Creates a dropdown to control month
                        selectYears: true,
                        max: today// Creates a dropdown of 15 years to control year
                    });
                });

                $("#delete_row2").click(function () {
                    if (k > 1) {
                        //$("#tabla3 > tr").last().remove();
                        $("#numer" + (k - 1)).remove();
                        k--;
                    }
                });

                //tabla 4

                $("#add_row3").click(function () {
                    $('#tabla4').append("<tr id='numero"+ m +"'><td>" + (m + 1) + "</td><td><input name='descripcion" + m + "' \n\
                    type='text' id='descripcion" + m + "' placeholder='Descripción'/> </td></tr>");

//                    $('#tabla4').append('<tr id="numero' + (m + 1) + '"></tr>');
                    m++;
                });
                $("#delete_row3").click(function () {
                    if (m > 1) {
                        $("#numero" + (m - 1)).remove();
                        m--;
                    }
                });

                //tabla 5

                $("#add_row4").click(function () {
                    $('#tabla5').append("<tr id='numeros"+n+"'><td>" + (n + 1) + "</td><td>\n\
                    <input name='producto" + n + "' id='producto" + n + "' type='text' placeholder='Producto'/> </td></tr>");

//                    $('#tabla5').append('<tr id="numeros' + (n + 1) + '"></tr>');
                    n++;
                });
                $("#delete_row4").click(function () {
                    if (n > 1) {
                        $("#numeros" + (n - 1)).remove();
                        n--;
                    }
                });

                //tabla 6

                $("#add_row5").click(function () {
                    $('#tabla6').append("<tr id='numeross"+p+"'><td>" + (p + 1) + "</td><td><input name='actividad" + p + "' \n\
            type='text' id='actividad" + p + "' placeholder='Actividad'/> </td>\n\
<td><input  name='productoesp" + p + "' id='productoesp" + p + "' type='text' placeholder='Producto esperado'></td><td><input \n\
                    name='recursos" + p + "' id='recursos" + p + "' type='text' placeholder='Recursos necesarios'></td><td><input  name='fechaentrega" + p + "' \n\
                    type='date' id='fechaentrega" + p + "' class='datepicker'></td>\n\
<td><input  name='responsable" + p + "' id='responsable" + p + "' type='text' placeholder='Responsable'></td></tr>");

//                    $('#tabla6').append('<tr id="numeross' + (p + 1) + '"></tr>');
                    p++;
                    $('.datepicker').pickadate({
                        format: 'dd/mm/yyyy',
                        selectMonths: true, // Creates a dropdown to control month
                        selectYears: 15,
                        max: today// Creates a dropdown of 15 years to control year
                    });
                });
                $("#delete_row5").click(function () {
                    if (p > 1) {
                        $("#numeross" + (p - 1)).remove();
                        p--;
                    }
                });
                $("#textarea1").blur(function () {
                    $("#text1").text($("#textarea1").val());
                });
            });
            var date = new Date();
            var today = '12/31/' + date.getFullYear();
            $('.datepicker').pickadate({
                format: 'dd/mm/yyyy',
                selectMonths: true, // Creates a dropdown to control month
                selectYears: 15,
                max: today// Creates a dropdown of 15 years to control year
            });
            function extraerDatosTb1() {
                var tabla = document.getElementById('tabla3');
                var datos = "";
                for (var i = 1; i < tabla.rows.length - 1; i++)
                {
                    if (i > 1) {
                        datos += ">>";
                    }
                    datos += $("#fecha" + (i - 1)).val() + ";;" + $("#tema" + (i - 1)).val();
                }
                return datos;
            }
            function extraerDatosTb2() {
                var tabla = document.getElementById('tabla4');
                var datos = "";
                for (var i = 1; i < tabla.rows.length - 1; i++)
                {
                    if (i > 1) {
                        datos += ">>";
                    }
                    datos += $("#descripcion" + (i - 1)).val();
                }
                return datos;
            }
            function extraerDatosTb3() {
                var tabla = document.getElementById('tabla5');
                var datos = "";
                for (var i = 1; i < tabla.rows.length - 1; i++)
                {
                    if (i > 1) {
                        datos += ">>";
                    }
                    datos += $("#producto" + (i - 1)).val();
                }
                return datos;
            }
            function extraerDatosTb4() {
                var tabla = document.getElementById('tabla6');
                var datos = "";
                for (var i = 1; i < tabla.rows.length - 1; i++)
                {
                    if (i > 1) {
                        datos += ">>";
                    }
                    datos += $("#actividad" + (i - 1)).val() + ";;" + $("#productoesp" + (i - 1)).val() + ";;" + $("#recursos" + (i - 1)).val() + ";;" + $("#fechaentrega" + (i - 1)).val() + ";;" + $("#responsable" + (i - 1)).val();
                }
                return datos;
            }
            function imprime() {
                $("#tb1 tbody").empty();
                $("#tb2 tbody").empty();
                $("#tb3 tbody").empty();
                $("#tb4 tbody").empty();
                var todo = extraerDatosTb1();
                var filas = todo.split(">>");
                for (var t = 0; t < filas.length; t++) {
                    var datos = filas[t].split(";;");
                    $("#tb1 tbody").append("<tr><td class='borde'>" + datos[0] + "</td>\n\
                        <td class='borde'>" + datos[1] + "</td></tr>");
                }


                var todo2 = extraerDatosTb2();
                var filas2 = todo2.split(">>");
                for (var k = 0; k < filas2.length; k++) {
                    var datos2 = filas2[k].split(";;");
                    $("#tb2 tbody").append("<tr><td class='borde'>" + (k + 1) + "</td><td class='borde'>" + datos2[0] + "</td></tr>");
                }

                var todo3 = extraerDatosTb3();
                var filas3 = todo3.split(">>");
                for (var m = 0; m < filas3.length; m++) {
                    var datos3 = filas3[m].split(";;");
                    $("#tb3 tbody").append("<tr><td class='borde'>" + (m + 1) + "</td><td class='borde'>" + datos3[0] + "</td></tr>");
                }

                var todo4 = extraerDatosTb4();
                var filas4 = todo4.split(">>");
                for (var n = 0; n < filas4.length; n++) {
                    var datos4 = filas4[n].split(";;");
                    $("#tb4 tbody").append("<tr>\n\
                    <td class='borde'>" + (n + 1) + "</td>\n\
                    <td class='borde'>" + datos4[0] + "</td>\n\
                    <td class='borde'>" + datos4[1] + "</td>\n\
                    <td class='borde'>" + datos4[2] + "</td>\n\
                    <td class='borde'>" + datos4[3] + "</td>\n\
                    <td class='borde'>" + datos4[4] + "</td></tr>");
                }
                window.print();
                return false;
            }

            function llenarTablas() {
                var tabla = document.getElementById("tabla3");
                var tabla2 = document.getElementById("tabla4");
                var tabla3 = document.getElementById("tabla5");
                var tabla4 = document.getElementById("tabla6");
                var datos = "", datos1="",datos2="",datos3="";

                $("#tb1 tbody").empty();
                $("#tb2 tbody").empty();
                $("#tb3 tbody").empty();
                $("#tb4 tbody").empty();

                for (var i = 1; i < tabla.rows.length; i++) {
                    $("#tb1>tbody>tr").last().remove();
                    datos += "<tr><td class='borde'>" + $("#fecha" + (i - 1)).val() + "</td>\n\
                    <td class='borde'>" + $("#tema" + (i - 1)).val() + "</td><tr>";
                }
                for (var j = 1; j < tabla2.rows.length; j++) {
                    $("#tb1>tbody>tr").last().remove();
                    datos1 += "<tr><td class='borde'>" + (j) + "</td>\n\
                    <td class='borde'>" + $("#descripcion" + (j - 1)).val() + "</td><tr>";
                }
                for (var k = 1; k < tabla3.rows.length; k++) {
                    $("#tb1>tbody>tr").last().remove();
                    datos2 += "<tr><td class='borde'>" + (k) + "</td>\n\
                    <td class='borde'>" + $("#producto" + (k - 1)).val() + "</td><tr>";
                }
                for (var p = 1; p < tabla4.rows.length; p++) {
                    $("#tb1>tbody>tr").last().remove();
                    datos3 += "<tr><td class='borde'>" + (p) + "</td>\n\
                    <td class='borde'>" + $("#actividad" + (p - 1)).val() + "</td>\n\
                    <td class='borde'>" + $("#productoesp" + (p - 1)).val() + "</td>\n\
                    <td class='borde'>" + $("#recursos" + (p - 1)).val() + "</td>\n\
                    <td class='borde'>" + $("#fechaentrega" + (p - 1)).val() + "</td>\n\
                    <td class='borde'>" + $("#responsable" + (p - 1)).val() + "</td><tr>";
                }                

                $("#tb1 tbody").append(datos);
                $("#tb2 tbody").append(datos1);
                $("#tb3 tbody").append(datos2);
                $("#tb4 tbody").append(datos3);
                window.print();
                return false;
            }


        </script>
        <a style="float: right;" href="#" title="Ir arriba" class="btn-floating  waves-effect 
           waves-light grey noprint">
            <i class="material-icons">navigation</i>
        </a></br>
        <footer class="page-footer noprint" style="background: #222a36">
            <div class="container">
                <div class="row">
                    <div class="col l6 s12">
                        <p class="grey-text text-lighten-4">Universidad de los Llanos. Institución de educación superior sujeta a inspección y vigilancia por el Ministerio de Educación Nacional</p>
                        <p class="white-text">Barcelona: Km. 12 Vía Puerto López - PBX. 6616800</p>
                        <p class="white-text">San Antonio: Calle 37 No. 41-02 Barzal - PBX. 6616900</p>
                    </div>
                    <div class="col l5 offset-l1 s12">
                        <img class="responsive-img" src="http://investigaciones.unillanos.edu.co/images/iso2.png">
                        <img class="responsive-img" src="http://investigaciones.unillanos.edu.co/images/iqnet2.png">
                        <img class="responsive-img" src="http://investigaciones.unillanos.edu.co/images/ntc.png">
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <div class="container">
                    © 2017 Universidad de los Llanos. Todos los derechos reservados. 
                    <a class="grey-text text-lighten-4 right" href="http:www.unillanos.edu.co">Sitio web</a>
                </div>
            </div>
        </footer> 
        <script>

            function abc() {
                //antes de envair e imprimir se validan los campos
                alert($("#periodo").val());
                $.ajax({
                    type: 'POST',
                    data: {grupo: $("#idgrupo").val(), reuniones: extraerDatosTb1(), actividades: extraerDatosTb2(),
                        productos: extraerDatosTb3(), informe: $("#textarea1").val(), periodo: $("#periodo").val(),
                        infoPlan: extraerDatosTb4()},
                    url: 'Informe',
                    success: function () {
                        alert("Bien");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(jqXHR + "-" + textStatus + "-" + errorThrown);
                    }
                });
                return false;
            }
        </script>
    </body>
</html>
<%} else {
        outt.print("<div class='container' style='text-align: center; color: black;'>"
                + "Primero Ingrese</div>");
        response.sendRedirect("index.jsp");
//        outt.close();
    }
%>