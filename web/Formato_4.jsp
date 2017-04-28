<%-- 
    Document   : Formato_4
    Created on : 13/04/2017, 12:12:29 PM
    Author     : Edwin Rubiano
--%>

<%@page import="java.io.PrintWriter"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
//    PrintWriter outt = response.getWriter();

    HttpSession sesion = request.getSession(false);
    if (sesion != null && sesion.getAttribute("usuario") != null) {
        String usuario = (String) sesion.getAttribute("usuario");

%>


<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>FO-INV-04</title>
        <link href="Imagenes/favicon.ico" rel="Shortcut Icon" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href="materialize/css/materialize.min.css" rel="stylesheet" type="text/css"/>
        <link href="alertifyjs/css/alertify.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/multiple-select.css" rel="stylesheet" type="text/css"/>
        <link href="css/pantalla.css" rel="stylesheet" type="text/css" media="screen"/>
        <link href="css/print4.css" rel="stylesheet" type="text/css" media="print"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body  onload='actualizar_o_Inscribir("<%out.print(usuario);%>");'>
        <input type="hidden" value='<%out.print(usuario);%>' id='user'>
        <!-- inicio barra de navegación -->
        <!-- Dropdown Structure -->
        <ul id="dropdown1" class="dropdown-content">
            <li><a class="black-text" href="Logout">Cerrar Sesión</a></li>
        </ul>
        <nav style="background: #e9e9e9;" class="noprint">
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo"><img class="responsive-img" src="Imagenes/Logo_web.png" alt=""></a>
                <ul class="right hide-on-med-and-down">
                    <li><a class="black-text" href="Formato_4.jsp">Formato 4</a></li>
                    <li><a class="black-text" href="Formato_4.jsp">Formato 4</a></li>
                    <!-- Dropdown Trigger -->
                    <li><a class="dropdown-button black-text" href="#!" data-activates="dropdown1"><%out.print(usuario);%><i class="material-icons right">arrow_drop_down</i></a></li>
                </ul>
            </div>
        </nav>
            <br>
            <div class="container">
                <div class="row">
                    <div class="col s2 l2">
                        <img class="responsive-img" src="Imagenes/unillanos.png" alt="">
                    </div>
                    <div class="col s7 col l8">
                        <h5 class="black-text center-align" style="font-weight: bold;">UNIVERSIDAD DE LOS LLANOS</h5>
                        <h6 class="black-text center-align" style="font-weight: bold;">PROCESO DE INVESTIGACIÓN</h6>
                        <h6 class="black-text center-align" style="font-weight: bold;">FORMATO DE INSCRIPCIÓN O ACTUALIZACIÓN DE GRUPO DE INVESTIGACIÓN</h6>
                    </div>
                    <div class="col s3 l2">
                        <b class="black-text">CÓDIGO: FO-INV-04</b></br>
                        <b class="black-text">VERSIÓN: 02</b></br>
                        <b class="black-text">FECHA: 20/10/2016</b></br>
                        <b class="black-text">VIGENCIA: 2016</b>
                    </div>
                </div>

            </div>
            <br>

            <form method="POST">
                <div class="container">
                    <hr>
                    <p class="black-text flow-text"><strong>1). Información del grupo</strong></p>
                    <br>
                    <div class="row">
                        <div class="input-field col s4 m12 l4">
                            <input type="checkbox" id="inscripcion" value="1" class="cb filled-in"/>
                            <label for="inscripcion">Inscripción</label>
                        </div>
                        <div class="input-field col s4 m12 l4">
                            <input type="checkbox" id="actualizacion" value="2" class="cb filled-in"/>
                            <label for="actualizacion">Actualización</label>
                        </div>
                    </div>
                    <br><br>
                    <div class="row noprint">
                        <div class="input-field col s12 m6 l12">
                            <input type="text" id="namegroup">
                            <label for="namegroup">Nombre del grupo</label>
                        </div>
                    </div>
                    <div class="row noprint">
                        <div class="input-field col s4 m3 l4">
                            <input type="text" id="sigla">
                            <label for="sigla">Sigla</label>
                        </div>
                        <div class="input-field col s4 m3 l4">
                            <input type="text" id="codigo">
                            <label for="codigo">Codigo Institucional</label>
                        </div>
                        <div class="input-field col s4 m2 l4">                        
                            <input type="date" id="fecha" class="datepicker" placeholder=" ">
                            <label for="fecha" class="active">Fecha de formación del grupo</label>
                        </div>                    
                    </div>
                    <div class="row noprint">
                        <div class="input-field col s4 m3 l4">
                            <select id="clasification">
                                <option value="" disabled selected></option>
                                <option value="A">A1</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </select>
                            <label>Categoria</label>
                        </div>
                        <div class="input-field col m4 s4 l4">
                            <select id='categoria'>
                                <option selected disabled></option>
                                <option>Categorizado</option>
                                <option>Institucionalizado</option>
                            </select>
                            <label for="categoria">Clasificación</label>
                        </div>
                        <div class="input-field col s4 m4 l4">
                            <input type="text" id="codigo_colc">
                            <label for="codigo_colc">Codigo colciencias</label>
                        </div>
                    </div>
                    <div class="row noprint">
                        <div class="input-field col s12 m12 l12">
                            <input type="text" id="area_cn" class="validate">
                            <label for="area_cn">Área de Conocimiento</label>
                        </div> 
                    </div>
                    <div class="row noprint">
                        <div class="input-field col s6 m6 l6">
                            <input type="email" id="email_gp" class="validate convert_uppercase">
                            <label for="email_gp">Correo Electrónico del Grupo</label>
                        </div>
                        <div class="input-field col s3 m3 l3">
                            <select id="dptm">
                                <option value="" disabled selected></option>
                                <option>Amazonas</option>
                                <option>Antioquia</option>
                                <option>Arauca</option>
                                <option>Atlántico</option>
                                <option>Bolívar</option>
                                <option>Boyacá</option>
                                <option>Caldas</option>
                                <option>Caquetá</option>
                                <option>Casanare</option>
                                <option>Cauca</option>
                                <option>Cesar</option>
                                <option>Chocó</option>
                                <option>Cundinamarca</option>
                                <option>Córdoba</option>
                                <option>Guainía</option>
                                <option>Guaviare</option>
                                <option>Huila</option>
                                <option>La Guajira</option>
                                <option>Magdalena</option>
                                <option>Meta</option>
                                <option>Nariño</option>
                                <option>Norte de Santander</option>
                                <option>Putumayo</option>
                                <option>Quindío</option>
                                <option>Risaralda</option>
                                <option>San Andrés</option>
                                <option>Santander</option>
                                <option>Sucre</option>
                                <option>Tolima</option>
                                <option>Valle del Cauca</option>
                                <option>Vaupés</option>
                                <option>Vichada</option>                            
                            </select>
                            <label>Departamento</label>
                        </div>
                        <div class="input-field col s3 m3 l3">
                            <select id="ciudad_">
                            </select>
                            <label>Ciudad</label>
                        </div>
                    </div>
                    <div class="row noprint">
                        <div class="input-field col s6 m6 l6">
                            <input type="text" id="namelider" class="convert_uppercase" onkeyup="copia();">
                            <label for="namelider">Nombre del Lider</label>
                        </div>	
                        <div class="input-field col s6 m6 l6"> 
                            <input type="text" id="tituload" class="convert_uppercase">
                            <label for="tituload">Título Académico</label> 
                        </div>
                    </div>
                    <div class="row noprint">
                        <div class="input-field col s3 m4 l4">
                            <input type="number" id="tarjetapf" min="1" class="validate_number">
                            <label for="tarjetapf">Tarjeta Profesional N°</label>
                        </div>	
                        <div class="input-field col s3 m4 l4">
                            <input type="number" id="telefono" title="Solo números" class="validate_number" min="0"
                                   onkeyup="copia();" >
                            <label for="telefono">Teléfono</label>
                        </div>
                        <div class="input-field col s6 m4 l4">
                            <input type="email" id="email" class="convert_uppercase validate" onkeyup="copia();">
                            <label for="email">Correo Electrónico</label>
                        </div>
                    </div>	
                    <div class="row noprint">
                        <div class="input-field col s12 m5 l6">
                            <select id="primary" class="">
                                <option value="" disabled selected></option>
                                <option value="1">Centro de Investigación de Ciencias Agropecuarias Y Recursos Naturales</option>
                                <option value="2">Centro de Investigación de Ciencias Basicas e Ingenierias</option>
                                <option value="3">Centro de Investigación de Ciencias Humanas y de la Educación</option>
                                <option value="4">Centro de Investigación de Ciencias Económicas</option>
                                <option value="5">Centro de Investigación de Ciencias de la Salud</option>
                            </select>
                            <label>Centro de Investigación</label>
                        </div>	
                        <div class="input-field col s12 m5 l6">
                            <select id="secondary" class="">
                                <option value="" disabled selected></option>
                            </select>
                            <label>(Escuela , Departamento o Instituto)</label>
                        </div>
                    </div>
                    <div class="row">
                        <table id="tablag">
                            <tbody>
                                <tr>
                                    <td class="bordeizq">Nombre del Grupo</td>
                                    <td class="bordeizq" id="nmbg"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Sigla</td>
                                    <td class="bordeizq" id="sig"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Fecha formación</td>
                                    <td class="bordeizq" id="fec"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Categoria</td>
                                    <td class="bordeizq" id="cat"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Clasificación</td>
                                    <td class="bordeizq" id="clas"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Área de Conocimiento</td>
                                    <td class="bordeizq" id="are"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Correo Electrónico (Grupo)</td>
                                    <td class="bordeizq" id="corr"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Departamento - Ciudad</td>
                                    <td class="bordeizq" id="ubi"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Lider</td>
                                    <td class="bordeizq" id="lide"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Título Académico</td>
                                    <td class="bordeizq" id="titad"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Tarjeta Profesional N°</td>
                                    <td class="bordeizq" id="tjp"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Telefóno</td>
                                    <td class="bordeizq" id="tel"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Correo Electrónico (Lider)</td>
                                    <td class="bordeizq" id="corr2"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Centro de Investigación</td>
                                    <td class="bordeizq" id="cent"></td>
                                </tr>
                                <tr>
                                    <td class="bordeizq">Escuela, Departamento o Instituto</td>
                                    <td class="bordeizq" id="per"></td>
                                </tr>                            
                            </tbody>
                        </table>                    
                    </div>
                    <div class="row">
                        <div class="col s12 m12 l12">
                            <p class="flow-text black-text">Seleccione el Área de conocimiento a la que pertenece el grupo, La Comisión Nacional Intersectorial de Aseguramiento de la Calidad de la Educación Superior (Conaces) Resolución 6634 DE 2014</p>
                        </div>
                    </div>
                    <div class="row noprint">
                        <p class="col s12 m12 l4">
                            <input name="grupo1"  type="checkbox" id="myCheckbox0" value="Ciencias de la Salud" class="area_Cm" />
                            <label for="myCheckbox0">Ciencias de la Salud</label>
                        </p>
                        <p class="col s12 m12 l4">
                            <input name="grupo1" type="checkbox" id="myCheckbox1" value="Humanidades y Ciencias Sociales" class="area_Cm"/>
                            <label for="myCheckbox1">Humanidades y Ciencias Sociales</label>
                        </p>
                        <p class="col s12 m12 l4">
                            <input name="grupo1" type="checkbox" id="myCheckbox4" value="Agronomía, Veterinaria y afines" class="area_Cm"/>
                            <label for="myCheckbox4">Agronomía, Veterinaria y afines</label>
                        </p>
                    </div>
                    <!--******************************************************************** -->
                    <div class="row noprint">
                        <p class="col s12 m12 l4">
                            <input name="grupo1" type="checkbox" id="myCheckbox5" value="Ciencias Económicas y Administrativas" class="area_Cm"/>
                            <label for="myCheckbox5">Ciencias Económicas y Administrativas</label>
                        </p>
                        <p class="col s12 m12 l4">
                            <input name="grupo1" type="checkbox" id="myCheckbox6"  value="Ciencias Físicas, Naturales y Exactas" class="area_Cm"/>
                            <label for="myCheckbox6">Ciencias Físicas, Naturales y Exactas</label>
                        </p>
                        <p class="col s12 m12 l4">
                            <input name="grupo1" type="checkbox" id="myCheckbox7" value="Artes y Arquitectura" class="area_Cm"/>
                            <label for="myCheckbox7">Artes y Arquitectura</label>
                        </p>

                    </div>

                    <div class="row noprint">
                        <p class="col s12 m12 l4">
                            <input name="grupo1" type="checkbox" id="myCheckbox3" value="Ingeniería" class="area_Cm"/>
                            <label for="myCheckbox3">Ingeniería</label>
                        </p>
                        <p class="col s12 m12 l4">
                            <input name="grupo1" type="checkbox" id="myCheckbox2"  value="Educación" class="area_Cm"/>
                            <label for="myCheckbox2">Educación</label>
                        </p>

                    </div>
                    <blockquote id="conoc"></blockquote>
                    <!--******************************************************************** -->
                    <!--******************************************************************** -->

                    <div class="row input-field">
                        <div class="col s12 m6 l6">
                            <p class="flow-text black-text" >Área principal</p>
                            <select id="slc1" class="browser-default">
                                <option selected disabled></option>
                                <option value="1">Biotecnología</option>
                                <option value="2">Tecnología e innovación en salud</option>
                                <option value="3">Ciencia y tecnología e innovación del mar y de los recursos hidrobiológicos</option>
                                <option value="4">Ciencia, tecnología e innovación agropecuarias</option>
                                <option value="5">Ciencias Básicas</option>
                                <option value="6">Ciencia, tecnología e innovación ambiente, biodiversidad y hábitat</option>
                                <option value="7">Ciencia, tecnología e innovación en las áreas Sociales y Humanas</option>
                                <option value="8">Desarrollo tecnológico e innovación Industrial</option>
                                <option value="9">Electrónica, Telecomunicaciones e Informática</option>
                                <option value="10">Ciencia, tecnología e innovación en Educación</option>
                                <option value="11">Investigaciones en Energía y Minería</option>
                                <option value="12">Programa nacional de formación de Investigadores</option>
                            </select>
                        </div>
                        <div class="col s12 m6 l6">
                            <p class="flow-text black-text">Área secundaria</p>
                            <select id="slc2" class="browser-default">
                                <option selected></option>
                                <option value="1">Biotecnología</option>
                                <option value="2">Tecnología e innovación en salud</option>
                                <option value="3">Ciencia y tecnología e innovación del mar y de los recursos hidrobiológicos</option>
                                <option value="4">Ciencia, tecnología e innovación agropecuarias</option>
                                <option value="5">Ciencias Básicas</option>
                                <option value="6">Ciencia, tecnología e innovación ambiente, biodiversidad y hábitat</option>
                                <option value="7">Ciencia, tecnología e innovación en las áreas Sociales y Humanas</option>
                                <option value="8">Desarrollo tecnológico e innovación Industrial</option>
                                <option value="9">Electrónica, Telecomunicaciones e Informática</option>
                                <option value="10">Ciencia, tecnología e innovación en Educación</option>
                                <option value="11">Investigaciones en Energía y Minería</option>
                                <option value="12">Programa nacional de formación de Investigadores</option>
                            </select>
                        </div>
                    </div>


                    <!-- </div> -->
                    <p class="black-text flow-text"><strong>2). Integrantes</strong></p>
                    <p class="black-text">Esta información debe coincidir con la registrada en el Gruplac de Colciencias.
                        Reseñar si es docente de tiempo completo, medio tiempo, de cátedra, egresado, estudiante, otro.
                    </p>
                    <!--tabla editable... -->
                    <div class="row noprint">
                        <div class="col s12 m12 l12" style="overflow-x: auto;">
                            <table class="" id="tabla1">
                                <thead align="text-center">
                                    <tr>
                                        <th class="">
                                            N°
                                        </th>
                                        <th class="" style="min-width: 80px;">
                                            Lider
                                        </th>
                                        <th class="" style="min-width: 250px;">
                                            Nombre
                                        </th>
                                        <th class="" style="min-width: 130px;">
                                            Cédula
                                        </th>
                                        <th class="" style="min-width: 200px;">
                                            Fecha de Expedición (ID)
                                        </th>
                                        <th class="" style="min-width: 160px;">
                                            Estado Civil
                                        </th>
                                        <th style="min-width: 200px;">
                                            Correspondencia Física
                                        </th>
                                        <th class="" style="min-width: 250px;">
                                            Correo
                                        </th>
                                        <th class="" style="min-width: 130px;">
                                            Teléfono
                                        </th>
                                        <th class="" style="min-width: 200px;">
                                            Maximo Nivel de Estudio
                                        </th>
                                        <th style="min-width: 200px;">
                                            Tipo de Vinculación al Grupo
                                        </th>
                                        <th class="" style="min-width: 300px;">
                                            Tipo de Viculación
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Universidad Externa
                                        </th>
                                        <th class="" style="min-width: 230px;">
                                            Clasificación Investigadores Colciencias
                                        </th>                                
                                        <th class="" style="min-width: 150px;">
                                            Fecha Ingreso
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Fecha de Retiro
                                        </th>
                                        <!--                                    <th class="">
                                                                                Horas Asignadas
                                                                            </th>                                                                        -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id='addr0'>
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            <input type="checkbox" class="c_lider filled-in" value="0" id="c_lider0">
                                            <label for="c_lider0"></label>
                                        </td>
                                        <td>
                                            <input type="text" name='name0' id="name0" class="convert_uppercase"/>
                                        </td>
                                        <td>
                                            <input type="number" name='cedula0' id="cedula0" min="0" class="validate_number"/>
                                        </td>
                                        <td>
                                            <input type="date" id="fecha_exp0" class="datepicker"/>
                                        </td>
                                        <td>
                                            <select id="estado_civil0" class="browser-default">
                                                <option selected disabled></option>
                                                <option>Soltero/a</option>
                                                <option>Comprometido/a</option>
                                                <option>Casado/a</option>
                                                <option>Divorciado/a</option>
                                                <option>Viudo/a</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" name='correspondencia0' id="correspondencia0" class="validate"/>
                                        </td>
                                        <td>
                                            <input type="email" name='correo0' id="correo0" class="validate"/>
                                        </td>
                                        <td>
                                            <input type="number" name='telefono0' disabled id="telefono0" min="0" class="validate_number"/>
                                        </td>
                                        <td>
                                            <select id="formacion0" class="browser-default">
                                                <option value="" disabled selected>Escoja una opción</option>
                                                <option value="">Pregrado</option>
                                                <option value="">Posgrado con Especialización</option>
                                                <option value="">Posgrado con Maestria</option>
                                                <option value="">Doctorado</option>
                                            </select>  
                                        </td>
                                        <td>
                                            <select id='tp_vnc0' class="browser-default">
                                                <option disabled selected></option>
                                                <option>Interno</option>
                                                <option>Externo</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select id="vinculacion0" class="browser-default vcl">
                                                <option value="" disabled selected>Escoja una opción</option>
                                                <option value="">Egresado</option>                          
                                                <option value="">Estudiante de pregrado</option>
                                                <option value="">Estudiante de posgrado</option>
                                                <option value="">Profesor Tiempo Completo</option>
                                                <option value="">Profesor Medio Tiempo</option>
                                                <option value="">Profesor Cátedra</option>
                                                <option value="">Profesor Ocasional Completo</option>
                                                <option value="">Profesor Ocacional Medio Tiempo</option>
                                                <option value="">Auxiliar de Investigación</option>
                                                <option value="">Joven Investigador Gobernación del Meta</option>
                                                <option value="">Joven Investigador Universidad de los Llanos</option>
                                                <option value="">Coinvestigador Externo</option>
                                                <option value="">Otro</option>
                                            </select>                                  
                                        </td>
                                        <td>
                                            <input type="text" name='name0' id="uvd_externa0"/>
                                        </td>
                                        <td>
                                            <select id="clasificacion0" class="browser-default cfc">
                                                <option value="" disabled selected>Escoja una opción</option>
                                                <option value="">Jóvenes Investigadores</option>
                                                <option value="">Junior</option>
                                                <option value="">Asociados</option>
                                                <option value="">Seniors</option>                                     
                                            </select>                                  
                                        </td>                                
                                        <td>
                                            <input type="date" name='' id="fechaing0" class="datepicker fecha_ingreso"/>
                                        </td>
                                        <td>
                                            <input type="date" name='' id="fechartr0" class="datepicker fecha_retiro"/>
                                        </td>
                                    </tr>
                                    <tr id='addr1'></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">		
                        <table id="tablaintegrantes" class="">		
                            <thead>		
                                <tr>		
                                    <th class="borderth">Nombre</th>		
                                    <th class="borderth">Cédula</th>		
                                    <th class="borderth">Correo</th>		
                                    <th class="borderth">Teléfono</th>		
                                    <th class="borderth">Formación Académica</th>		
                                    <th class="borderth">Tipo Vinculación<sup>1</sup></th>		
                                    <th class="borderth">Fecha Ingreso</th>		
                                </tr>		
                            </thead>		
                            <tbody>				
                            </tbody>		
                        </table>                    		
                    </div>		
                    <br>

                    <div class="row">
                        <b class="red-text"><sup>1</sup> Reseñar si es docente de tiempo completo, medio tiempo, de cátedra, egresado, estudiante, otro.
                        </b>
                    </div>

                    <div class="row">
                        <a id="add_row" class="btn-floating  waves-effect waves-light noprint">
                            <i class="material-icons">add</i>
                        </a>
                        <a id='delete_row' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>

                    <!--******************************************************************** -->
                    <div class="row noprint">
                        <div class="input-field col s12 m3 l3">
                            <input placeholder=" " type="text" id="totalpregrado" disabled >
                            <label for="totalpregrado">Total de Estudiantes pregrado</label>
                        </div>
                        <div class="input-field col s12 m3 l3">
                            <input placeholder=" " type="text" id="totalposgrado" disabled>
                            <label for="totalposgrado">Total de Estudiantes posgrado</label> 
                        </div>	
                        <div class="input-field col s12 m3 l3">
                            <input placeholder=" " type="text" id="auxiliares" disabled>
                            <label for="auxiliares">Auxiliares de Investigación</label>
                        </div>
                        <div class="input-field col s12 m3 l3">
                            <input placeholder=" " type="text" id="externos" disabled>
                            <label for="externos">Coinvestigadores externos</label>
                        </div>		
                    </div>
                    <div class="row">              
                        <table id="tablatotal1" class="">		
                            <thead>		
                                <tr>		
                                    <th class="borderth">Total de Estudiantes pregrado</th>		
                                    <th class="borderth">Total de Estudiantes posgrado</th>		
                                    <th class="borderth">Auxiliares de Investigación</th>		
                                    <th class="borderth">Coinvestigadores externos</th>		
                                </tr>		
                            </thead>		
                            <tbody>		
                                <tr>		
                                    <td class="bordertd"><p id="t1"></p></td>		
                                    <td class="bordertd"><p id="t2"></p></td>		
                                    <td class="bordertd"><p id="t3"></p></td>		
                                    <td class="bordertd"><p id="t4"></p></td>		
                                </tr>		
                            </tbody>		
                        </table>                    		
                    </div>		

                    <br>
                    <!--******************************************************************** -->

                    <div class="row noprint">
                        <div class="input-field col s12 m3 l3">
                            <input placeholder=" " type="text" id="totaljovenes" disabled>
                            <label for="totaljovenes">Total de Jóvenes investigadores </label>
                        </div>
                        <div class="input-field col s12 m3 l3">
                            <input placeholder=" " type="text" id="totaljunior" disabled>
                            <label for="totaljunior">Total de Investigadores Junior </label>
                        </div>	
                        <div class="input-field col s12 m3 l3">
                            <input placeholder=" " type="text" id="totalasociados" disabled>
                            <label for="totalasociados">Total de Investigadores Asociados</label>
                        </div>
                        <div class="input-field col s12 m3 l3">
                            <input placeholder=" " type="text" id="totalseniors" disabled>
                            <label for="totalseniors">Total de Investigadores Seniors</label>
                        </div>		
                    </div>
                    <div class="row">		
                        <table id="tablatotal2" class="">		
                            <thead>		
                                <tr>		
                                    <th class="borderth">Total Jóvenes investigadores</th>		
                                    <th class="borderth">Total Investigadores Junior</th>		
                                    <th class="borderth">Total Investigadores Asociados</th>		
                                    <th class="borderth">Total Investigadores Seniors</th>		
                                </tr>		
                            </thead>		
                            <tbody>		
                                <tr>		
                                    <td class="bordertd"><p id="t5"></p></td>		
                                    <td class="bordertd"><p id="t6"></p></td>		
                                    <td class="bordertd"><p id="t7"></p></td>		
                                    <td class="bordertd"><p id="t8"></p></td>		
                                </tr>		
                            </tbody>		
                        </table>                    		
                    </div>

                    <!--******************************************************************** -->

                    <p class="black-text flow-text"><strong>3). Planeación estratégica</strong></p>
                    <br>


                    <div class="row">
                        <p class="flow-text">Misión</p>
                        <p>Razón de ser del grupo. el planteamiento debe ser capaz de dar respuesta a las pregunta ¿qué somos?, ¿qué hacemos?, ¿por qué lo hacemos? y ¿para que lo hacemos?</p>
                        <div class="input-field col s12 m12 l12 noprint">
                            <textarea id="textarea1" class="materialize-textarea"></textarea>
                            <label for="textarea1">Misión</label>
                        </div>
                    </div>
                    <blockquote id="text1"></blockquote>
                    <!--******************************************************************** -->

                    <div class="row">
                        <p class="flow-text">Visión</p>
                        <p>Estado deseado y necesario a largo plazo del grupo. indica cual es el grupo que se quiere construir a largo plazo</p>
                        <div class="input-field col s12 m12 l12 noprint">
                            <textarea id="textarea2" class="materialize-textarea"></textarea>
                            <label for="textarea2">Visión</label>
                        </div>
                    </div>
                    <blockquote id="text2"></blockquote>  
                    <!--******************************************************************** -->

                    <div class="row">
                        <p class="flow-text">Objetivos</p>
                        <p>Logros que se espera llegar para cumplir con la misión y la visión del grupo</p>
                        <div class="input-field col s12 m12 l12 noprint">
                            <textarea id="textarea3" class="materialize-textarea"></textarea>
                            <label for="textarea3">Objetivos</label>
                        </div>
                    </div>
                    <blockquote id="text3"></blockquote> 
                    <!--******************************************************************** -->

                    <div class="row">
                        <p class="flow-text">Prospectiva</p>
                        <p>Visión de largo plazo que oriente el desarrollo futuro del grupo en pro del cumplimiento de sus funciones misionales</p>
                        <div class="input-field col s12 m12 l12 noprint">
                            <textarea id="textarea4" class="materialize-textarea"></textarea>
                            <label for="textarea4">Prospectiva</label>
                        </div>
                    </div>
                    <blockquote id="text4"></blockquote>
                    <!--******************************************************************** -->

                    <div class="row">
                        <div class="input-field col s12 m12 l6">
                            <input type="text" id="tematica">
                            <label for="tematica">Áreas Temáticas *</label>
                        </div>
                        <div class="input-field col s12 m12 l6">
                            <input type="text" id="lineasinv">
                            <label for="lineasinv">Lineas de Investigación</label>                        
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12 m12 l12 noprint">
                            <select id="lineasinv_ins" multiple class="">
                                <option selected disabled></option>
                                <option>Fisiopatología de la Reproducción</option>
                                <option>Biotecnología animal</option>
                                <option>Sistemas de Nutrición Animal Tropical Sostenible</option>
                                <option>Salud y Bienestar Animal</option>
                                <option>Agroforestería</option>
                                <option>Sistemas de producción en fauna  Silvestre de Interés zootécnico</option>
                                <option>Estudios sociales, económicos y culturales de los sistemas de producción agraria</option>
                                <option>Diseño y evaluación de sistemas de producción agrícola con principios de Sostenibilidad</option>
                                <option>Alternativas de manejo sostenible de los sistemas de producción en recursos fitogenéticos, suelos, agua, nutrición vegetal, fitoprotección, poscosecha y agroindustria</option>
                                <option>Innovación, Desarrollo Tecnológico y Competitividad en cadenas y sistemas de Producción Agroindustrial</option>
                                <option>Especies Hidrobiológicas de la Cuenca del Orinoco</option>
                                <option>Mercadeo en las Mipymes</option>
                                <option>Innovación Organizacional</option>
                                <option>Crecimiento y desarrollo socioeconómico Orinoquence</option>
                                <option>Finanzas Empresariales</option>
                                <option>Educación y Comunidad</option>
                                <option>Convivencia Ciudadana</option>
                                <option>Didáctica</option>
                                <option>Motricidad y Desarrollo Humano</option>
                                <option>Salud Pública</option>
                                <option>Cuidado de la salud</option>
                                <option>Bioingeniería</option>
                                <option>Automatización</option>
                                <option>Teleinformática</option>
                                <option>Ingeniería del Software</option>
                                <option>Matemática y Física</option>
                                <option>Caracterización de la biodiversidad en la Orinoquia</option>
                                <option>Conservación de la biodiversidad en la Orinoquia</option>
                                <option>Uso de la biodiversidad en la Orinoquia</option>
                                <option>Biodiversidad y gestión de recursos naturales</option>
                                <option>Producción sostenible y gestión local</option>
                            </select>
                            <label class="noprint">Lineas de Investigación Institucionales</label>
                        </div>                
                    </div>
                    <p id="oculto">Líneas de Investigación</p>		                
                    <blockquote id="lineasinv"></blockquote>
                    <p id="oculto2">Líneas de Investigación Institucionales</p>
                    <blockquote id="lineasinv2"></blockquote>
                    <!--******************************************************************** -->

                    <div class="row">
                        <div class="input-field col s12 m12 l6">
                            <input type="text" id="lineapro">
                            <label for="lineapro">Lineas de Profundización *</label>
                        </div>
                        <div class="input-field col s12 m12 l6">
                            <select class="" id="servicioext">
                                <option disabled selected> </option>
                                <option>Consultorias</option>
                                <option>Asesorias</option>
                                <option>Desarrollos tecnológicos</option>
                                <option>Procesos</option>
                                <option>Otros</option>
                            </select>
                            <label>Servicios de Extensión</label>
                        </div>
                    </div>

                    <div class="row">
                        <b class='red-text'>* Obligatorio</b>
                    </div>
                    <div class="row">
                        <b class='red-text'>** 	Estos servicios hacen referencia a cómo los resultados y proyectos de investigación pueden ofrecerse como servicios para clientes internos y externos (consultorías, asesorías, desarrollos tecnológicos, procesos, etc).</b>
                    </div>


                    <p class="flow-text black-text"><strong>4). Proyectos de Investigación (En Curso y Terminados)</strong></p>
                    <!--tabla editable... -->
                    <div class="row noprint">
                        <div class="col s12 m12 l12" style="overflow-x: auto;">
                            <table class="responsive-table" id="tabla2">
                                <thead>
                                    <tr>
                                        <th class="">
                                            N°
                                        </th>
                                        <th class="" style="min-width: 300px;">
                                            Proyecto
                                        </th>
                                        <th class="" style="min-width: 200px;">
                                            Fuentes de Financiación
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Fecha Inicio
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Fecha Terminación
                                        </th>
                                        <th class="" style="min-width: 270px;">
                                            Investigador Principal
                                        </th>
                                        <th class="" style="min-width: 250px;">
                                            Productos Esperados
                                        </th>
                                        <th class="" style="min-width: 130px;">
                                            Estado Actual del Proyecto <sup>2</sup>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id='num0'>
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            <input type="text" name='proyecto0' id="proyecto0"/>
                                        </td>
                                        <td>
                                            <input type="text" name='fuentes0' id="fuentes0"/>
                                        </td>
                                        <td>
                                            <input type="date" name='finicio0' id="finicio0" class="datepicker"/>
                                        </td>
                                        <td>
                                            <input type="date" name='ftermina0' id="ftermina0" class="datepicker"/>
                                        </td>
                                        <td>
                                            <select id="invprin0" class="browser-default inv_princ">
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" name='pesperados0' id="pesperados0"/>
                                        </td>
                                        <td>
                                            <select id="estado0" class="browser-default">
                                                <option>Ejecución</option>
                                                <option>Terminado</option>
                                                <option>Finalizado</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr id='num1'></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">		
                        <table id="tablaproyecto" class="">		
                            <thead>		
                                <tr>		
                                    <th class="borderth">Proyecto</th>		
                                    <th class="borderth">Inv. Prin.</th>		
                                    <th class="borderth">F Inicio</th>		
                                    <th class="borderth">F Termina</th>		
                                    <th class="borderth">Productos Esperados</th>		
                                    <th class="borderth">Estado<sup>2</sup></th>		
                                    <th class="borderth">Fuente Financiación</th>		
                                </tr>		
                            </thead>		
                            <tbody>			
                            </tbody>		
                        </table>                    		
                    </div>		


                    <!-- Termina tabla 2-->
                    <div class="row">
                        <b class='red-text'><sup>2</sup> Terminado: La fecha de terminación de acuerdo al acta de inicio, Finalizado: Productos esperados entregados y publicados</b>
                    </div>
                    <!-- Botones-->

                    <div class="row">
                        <a id="add_row1" class="btn-floating  waves-effect waves-light noprint">
                            <i class="material-icons">add</i>
                        </a>
                        <a id='delete_row1' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                    <!-- Fin Botones-->
                    <br>
                    <p class="flow-text black-text"><strong>5). Productos de Generación de Nuevo Conocimiento</strong></p>
                    <p class="flow-text black-text">Producción Bibliografica</p>
                    <!-- Comienza tabla 6-->
                    <!--                <p id="demo"></p>-->
                    <div class="row noprint capa2" id="">
                        <div class="col s12 m12 l12" style="overflow-x: auto; overflow-y: hidden;"  onscroll="myFunction();" id="contenedor">
                            <table class="" id="tabla6">
                                <thead>
                                    <tr>
                                        <th class="">
                                            N°
                                        </th>
                                        <th class="" style="min-width: 200px; text-align: center;" >
                                            Tipo de producto <sup>5</sup>
                                        </th>
                                        <th style="min-width: 150px">
                                            Categoria Publindex
                                        </th>
                                        <th class="" style="min-width: 50px;">
                                            Cuartil
                                        </th>
                                        <th class="" style="min-width: 300px;">
                                            Nombre del producto <sup>4</sup>
                                        </th>
                                        <th class="" style="min-width: 340px;">
                                            Autor (es)
                                        </th>
                                        <th style="min-width: 200px;">
                                            Nombre Revista
                                        </th>
                                        <th style="min-width: 200px;">
                                            Nombre Libro
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Volumen
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Número/Fascículo
                                        </th>
                                        <th style="min-width: 150px;">
                                            Pagina Inicial
                                        </th>
                                        <th style="min-width: 150px;">
                                            Pagina Final
                                        </th>
                                        <th style="min-width: 200px;">
                                            URRL/DOI
                                        </th>
                                        <th style="min-width: 150px;">
                                            Serie
                                        </th>
                                        <th style="min-width: 150px;">
                                            Año
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Editorial
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            ISBN/ISNN
                                        </th>
                                        <th style="min-width: 150px;">
                                            Pais
                                        </th>
                                        <th style="min-width: 150px;">
                                            Ciudad
                                        </th>
                                        <th style="min-width: 200px;">
                                            Estado del producto
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id='numeros0'>
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            <select id="tipoproducto0" class="browser-default producto">
                                                <option value="" disabled selected>Escoja una opción</option>
                                                <option>Artículo</option>
                                                <option>Libro</option>
                                                <option>Capítulo de Libro</option>
                                                <option>Patentes</option>
                                                <option>Variedades Vegetales</option>
                                                <option>Variedades Animales</option>
                                                <option>Otro</option>
                                            </select>                                         
                                        </td>
                                        <td>
                                            <select id="producto_clasf0" class="browser-default" style="min-width: 130px;">                                           
                                            </select>
                                        </td>
                                        <td>
                                            <select id="clasificacionn0" class="browser-default" style="min-width: 50px;">
                                                <option selected></option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" name='nproducto0' id="nproducto0"/> 
                                        </td>
                                        <td class="capa1" id="" style="min-width: 340px;">
                                            <select id="autores0" class="flow-text" multiple></select>
                                        </td>
                                        <td>
                                            <input type="text" id="nb_revista0">
                                        </td>
                                        <td>
                                            <input type="text" id="nb_libro0">
                                        </td>
                                        <td>
                                            <input type="text" name='serievolumen0' id="volumen0"/>
                                        </td>
                                        <td>
                                            <input type="text" id="num_fas0">
                                        </td>
                                        <td>
                                            <input type="number" id="pag_ini0">
                                        </td>
                                        <td>
                                            <input type="number" id="pag_fin0">
                                        </td>
                                        <td>
                                            <input type="text" id="urrl0">
                                        </td>
                                        <td>
                                            <input type="text" name='isbn0' id="serie0"/>
                                        </td>
                                        <td>
                                            <input type="text" id="anno0">
                                        </td>
                                        <td>
                                            <input type="text" name='editorial0' id="editorial0"/>
                                        </td>  
                                        <td>
                                            <input type="text" id="isbn0">
                                        </td>
                                        <td>
                                            <input type="text" id="pais0">
                                        </td>
                                        <td>
                                            <input type="text" id="ciudad_p0">
                                        </td>
                                        <td>
                                            <select id="estado_producto0" class="browser-default">
                                                <option>Publicado</option>
                                                <option>Sometido</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr id='numeros1'></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">		
                        <table id="tablaconocimiento" class="">		
                            <thead>		
                                <tr>		
                                    <th class="borderth">Nombre Producto</th>		
                                    <th class="borderth">Tipo Producto</th>		
                                    <th class="borderth">Autor (es)</th>		
                                    <th class="borderth">Año/Serie/Volumen</th>		
                                    <th class="borderth">ISBN/ISNN</th>		
                                    <th class="borderth">Cla. Quartil</th>		
                                    <th class="borderth">Editorial y Ciudad</th>		
                                    <th class="borderth">Estado</th>		
                                </tr>		
                            </thead>		
                            <tbody>				
                            </tbody>		
                        </table>                    		
                    </div>		
                    <br>
                    <!-- fin tabla 6 -->
                    <!-- Botones tabla 6-->

                    <div class="row">
                        <a id="add_row5" class="btn-floating  waves-effect waves-light noprint" style="overflow: visible;">
                            <i class="material-icons">add</i>
                        </a>
                        <a id='delete_row5' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>

                    <br>
                    <p class="flow-text black-text"><strong>6). Desarrollo Tecnológico e Innovación</strong></p>
                    <div class="row noprint">
                        <div class="input-field col s12 l12 m12" style="overflow-x: auto;" >
                            <table id="tabla6_1"> 
                                <thead>
                                    <tr>
                                        <th>
                                            N°
                                        </th>
                                        <th style="min-width: 500px; text-align: center;" colspan="2">
                                            Tipo de Producto
                                        </th>
                                        <th style="min-width: 200px;">
                                            Nombre del Producto
                                        </th>
                                        <th style="min-width: 350px;">
                                            Autor(Es)
                                        </th>
                                        <th style="min-width: 150px;">
                                            Número de Registro (Aprobado)
                                        </th>
                                        <th style="min-width: 130px;">
                                            Año de Obtención
                                        </th>
                                        <th style="min-width: 150px;">
                                            País de Obtención
                                        </th>
                                        <th style="min-width: 150px;">
                                            Gaceta Industrial de Publicación
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id="fil_0">
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            <select class="browser-default productot" id="tp_productot0">
                                                <option selected disabled></option>
                                                <option>Diseño Industrial</option>
                                                <option>Esquema de circuito integrado</option>
                                                <option>Software</option>
                                                <option>Planta piloto</option>
                                                <option>Prototipo industrial</option>
                                                <option>Signos distintivos</option>
                                                <option>Consultoría científicotecnológica e Informe Técnico</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select id="categoria_pdt0" class="browser-default" style="min-width: 170px;">
                                            </select>
                                        </td>
                                        <td>
                                            <input id="nb_productot0" type="text">
                                        </td>
                                        <td>
                                            <!--<input id="autores_pdt0" type="text">-->
                                            <select id="autores_pdt0" multiple class="autores flow-text"></select>
                                        </td>
                                        <td>
                                            <input id="nm_aprobado0" type="number">
                                        </td>
                                        <td>
                                            <input id="yearGet0" class="validate_number" type="number">
                                        </td>
                                        <td>
                                            <input id="paisGet0" type="text">
                                        </td>
                                        <td>
                                            <input id="gact_ind0" type="text">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <br>

                    <div class="row">
                        <a id="add_row_5" class="btn-floating  waves-effect waves-light noprint">
                            <i class="material-icons">add</i>
                        </a>
                        <a id='delete_row_5' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>

                    <br>
                    <!--                Fin tabla 3-->

                    <p class="flow-text black-text"><strong>7). Productos de Apropiación Social y Circulación del Conocimiento</strong></p>
                    <div class="row noprint">
                        <div class="col s12 m12 l12" style="overflow-x: auto;">
                            <table class="input-field" id="tabla5">
                                <thead>
                                    <tr >
                                        <th class="">
                                            N°
                                        </th>
                                        <th style="min-width: 150px;">
                                            Tipo de Evento
                                        </th>
                                        <th class="" style="min-width: 200px;">
                                            Nombre del Evento
                                        </th>
                                        <th class="" style="min-width: 350px;">
                                            Nombre de Participante(Es)
                                        </th>
                                        <th class="" style="min-width: 170px;">
                                            Participación
                                        </th>
                                        <th style="min-width: 160px;">
                                            Productos
                                        </th>
                                        <th style="min-width: 200px;">
                                            Nombre de la Ponencia
                                        </th>
                                        <th class="" style="min-width: 200px;">
                                            Entidad organizadora
                                        </th>
                                        <th style="min-width: 200px;">
                                            Entidad Financiadora
                                        </th>
                                        <th style="min-width: 150px;">
                                            Ambito
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            País
                                        </th>
                                        <th style="min-width: 150px;">
                                            Ciudad
                                        </th>
                                        <th style="min-width: 150px;">
                                            Fecha de Inicio 
                                        </th>
                                        <th style="min-width: 170px;">
                                            Fecha de Finalización 
                                        </th>
                                        <th class="" style="min-width: 120px;">
                                            Año
                                        </th>                                                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id='numer0'>
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            <select id="tpB_evento0" class="browser-default">
                                                <option selected disabled></option>
                                                <option>Congreso</option>
                                                <option>Encuentro</option>
                                                <option>Seminario</option>
                                                <option>Simposio</option>
                                                <option>Diplomado</option>
                                                <option>Taller</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" name='nevento0' id="nevento_0"/> 
                                        </td>
                                        <td>
                                            <select id="nparticipante_0" class="flow-text participante" multiple></select>
                                            <!--<input type="text" id="nparticipante_0">-->                 
                                        </td>
                                        <td>
                                            <select id="participacion_0" class="browser-default">
                                                <option selected disabled></option>
                                                <option>Asistente</option>
                                                <option>Conferencista</option>
                                                <option>Organizador</option>
                                                <option>Moderador</option>
                                                <option>Ponente</option>
                                                <option>Compilador Memorias</option>
                                                <option>Poster</option>
                                                <option>Traductor</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select id="producto_ev0" class="browser-default">
                                                <option selected disabled></option>
                                                <option>Ponencia Oral</option>
                                                <option>Ponencia Magistral</option>
                                                <option>Trabajo</option>
                                                <option>Poster</option>
                                                <option>Conferencia</option>
                                                <option>Conferencia Magistral</option>
                                                <option>Conversatorio</option>
                                                <option>Capitulo de Memoria</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" id="nb_ponencia0">
                                        </td>
                                        <td>
                                            <input type="text" name='entidadorg0' id='entidadorg_0'/>
                                        </td>
                                        <td>
                                            <input type="text" id="ent_fin_0">
                                        </td>
                                        <td>
                                            <select class="browser-default" id="ambito0">
                                                <option disabled selected></option>
                                                <option>Nacional</option>
                                                <option>Internacional</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" id="paiss_0"> 
                                        </td>
                                        <td>
                                            <input type="text" name='ciudad0' id="ciudadd_0"/>
                                        </td>
                                        <td>
                                            <input type="date" id="ffecha_ini0" class="datepicker">
                                        </td>
                                        <td>
                                            <input type="date" id="ffecha_fin0" class="datepicker">
                                        </td>
                                        <td>
                                            <input type="text" name='yeartwo0' id="yeartwo_0"/>
                                        </td>                                    
                                    </tr>
                                    <tr id='numero1'></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="row">		
                        <table id="tablaponente" class="">		
                            <thead>		
                                <tr>		
                                    <th class="borderth">Nombre Evento</th>		
                                    <th class="borderth">Nombre Ponente</th>		
                                    <th class="borderth">Nombre Ponencia</th>		
                                    <th class="borderth">Tipo Ponencia<sup>3</sup></th>		
                                    <th class="borderth">Entidad Organizadora</th>		
                                    <th class="borderth">Ciudad</th>		
                                    <th class="borderth">País</th>		
                                    <th class="borderth">Año</th>		
                                </tr>		
                            </thead>		
                            <tbody>				
                            </tbody>		
                        </table>                    		
                    </div>                 		
                    <br>
                    <!-- fin tabla 5 -->
                    <!-- Botones tabla 5-->

                    <div class="row">
                        <a id="add_row4" class="btn-floating  waves-effect waves-light noprint">
                            <i class="material-icons">add</i>
                        </a>
                        <a id='delete_row4' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>

                    <br>
                    <p class="flow-text black-text"><strong>8). Productos de Actividades Relacionadas con la Formación de Recurso Humano para la CTeI</strong></p>
                    <p class="flow-text black-text">Trabajos dirigidos / tutorias</p>

                    <!-- Comienza tabla 3-->

                    <div class="row noprint">
                        <div class="col s12 m12 l12" style="overflow-x: auto;">
                            <table class="" id="tabla3">
                                <thead>
                                    <tr >
                                        <th class="">
                                            N°
                                        </th>
                                        <th class="" style="min-width: 250px;">
                                            Tipo de producto **
                                        </th>
                                        <th class="" style="min-width: 250px;">
                                            Nombre del producto
                                        </th>
                                        <th class="" style="min-width: 250px;">
                                            Orientador
                                        </th>
                                        <th class="" style="min-width: 250px;">
                                            Nombre del estudiante orientado
                                        </th>
                                        <th class="" style="min-width: 350px;">
                                            Categoria
                                        </th>
                                        <th style="min-width: 250px;">
                                            Institución (Donde el Estudiante desarrollo el trabajo)
                                        </th>
                                        <th style="min-width: 200px;">
                                            Entidad Financiadora
                                        </th>
                                        <th style="min-width: 150px;">
                                            Estado <sup>2</sup>
                                        </th>
                                        <th style="min-width: 140px;">
                                            Fecha de Inicio
                                        </th>
                                        <th style="min-width: 170px;">
                                            Fecha de Finalización
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            <select id="tp_producto0" class="browser-default">
                                                <option selected disabled></option>
                                                <option>Tesis de Pregrado</option>
                                                <option>Tesis de Grado de Especialización</option>
                                                <option>Tesis de Grado de Maestría</option>
                                                <option>Tesis de Doctorado</option>
                                                <option>Monografía</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" id="nb_producto0">
                                        </td>
                                        <td>
                                            <select id='norientado0' class="browser-default orientado" style='min-width: 250px;'>                                           
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" id="norientador0">
                                        </td>
                                        <td>
                                            <select id="categoria_o0" class="browser-default" >
                                                <option>Tesis de Doctorado con Calidad A (TD_A)</option>
                                                <option>Tesis de Doctorado con Calidad B (TD_B)</option>
                                                <option>Apoyos a Creación de Programas de Doctorado Registrados en el Grupo (AP_A)</option>
                                                <option>Apoyos a Creación de Cursos de Programas de Doctorado Registrados en el Grupo (AP_C)</option>
                                                <option>Trabajo de Grado de Maestría Vinculados en el Grupo con Calidad A (TM_A)</option>
                                                <option>Trabajo de Grado de Maestría Vinculados en el Grupo con Calidad B (TM_B)</option>
                                                <option>Trabajo de Grado Pregrado Vinculados en el Grupo con Calidad A (TP_A)</option>
                                                <option>Trabajo de Grado Pregrado Vinculados en el Grupo con Calidad B (TP_B)</option>
                                                <option>Proyecto de Investigación y Desarrollo Vinculados en el Grupo con Calidad A (PID_A)</option>
                                                <option>Proyecto de Investigación y Desarrollo Vinculados en el Grupo con Calidad B (PID_B)</option>
                                                <option>Proyecto de Investigación y Desarrollo Desarrollo Vinculados en el Grupo con Calidad C (PID_C)</option>
                                                <option>Proyectos de Investigación - Creación vinculados en el grupo con Calidad A (PIC_A)</option>
                                                <option>Proyectos de Investigación - Creación vinculados en el grupo con Calidad B (PIC_B)</option>
                                                <option>Proyectos de Investigación - Creación vinculados en el grupo con Calidad C (PIC_C)</option>
                                                <option>Proyectos ID+I con Formación Vinculados en el Grupo con Calidad A (PF_A)</option>
                                                <option>Proyectos ID+I con Formación Vinculados en el Grupo con Calidad B (PF_B)</option>
                                                <option>Proyectos de Extensión y Responsabilidad Social en CTeI Vinculados en el Grupo (PE)</option>                                            
                                                <option>Creación de Programas de Maestría Registrados en el Grupo (AP_B)</option>                                            
                                                <option>Creación de Cursos de Programas de Maestría Registrados en el Grupo (AP_D)</option>
                                                <option>Acompañamientos y Asesorías de líneas temáticas del Programa Ondas (APO)</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" id="ins_or0">
                                        </td>
                                        <td>
                                            <input type="text" id="entidad_fin0">
                                        </td>
                                        <td>
                                            <select class="browser-default" id="estado_t0">
                                                <option>Ejecución</option>
                                                <option>Terminado</option>
                                                <option>Finalizado</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="date" id="fecha_ini0" class="datepicker"/>
                                        </td>
                                        <td>
                                            <input type="date" id="fecha_fin0" class="datepicker">
                                        </td>
                                    </tr>                                
                                    <tr id='nume1'></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <table id="tablatrabajo" class="">
                            <thead>
                                <tr>
                                    <th class="borderth">Nombre del Trabajo</th>
                                    <th class="borderth">Nombre del Orientado</th>
                                    <th class="borderth">Nombre Orientador</th>
                                    <th class="borderth">Tipo de Trabajo <sup>**</sup></th>
                                    <th class="borderth">Estado</th>
                                    <th class="borderth">Año</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>                    
                    </div>

                    <div class="row">
                        <b class='red-text'><sup>2</sup> Terminado: La fecha de terminación de acuerdo al acta de inicio, Finalizado: Productos esperados entregados y publicados</b>
                    </div>
                    <!-- Botones tabla 3-->

                    <div class="row">
                        <b class="red-text">** Tipo de trabajo: pregrado, especialización, maestría o doctorado.
                        </b>
                    </div>

                    <div class="row">
                        <a id="add_row2" class="btn-floating  waves-effect waves-light noprint">
                            <i class="material-icons">add</i>
                        </a>
                        <a id='delete_row2' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                    <!-- fin Botones tabla 3-->
                    <!--                <p class="flow-text black-text">Participación en eventos académicos en calidad de asistente</p>
                    
                    <!-- fin Botones tabla 5-->
                    <br>
                    <p class="flow-text black-text">Colciencias</p>
                    <p class="flow-text black-text">Participación en convocatorias internas y externas</p>
                    <!-- Comienza tabla 7-->

                    <div class="row noprint">
                        <div class="col s12 m12 l12" style="overflow-x: auto;">
                            <table class="" id="tabla7">
                                <thead>
                                    <tr >
                                        <th class="">
                                            N°
                                        </th>
                                        <th class="" style="min-width: 200px;">
                                            Nombre de la convocatoria
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Entidad financiadora
                                        </th>
                                        <th class="" style="min-width: 200px;">
                                            Producto con el que participó
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Ciudad
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Año de finalización
                                        </th>
                                        <th class="" style="min-width: 150px;">
                                            Resultado obtenido
                                        </th>
                                        <th class="" style="min-width: 180px;">
                                            Valor total del proyecto
                                        </th>                                                                      
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr id='numeross0'>
                                        <td>
                                            1
                                        </td>
                                        <td>
                                            <input type="text" name='nconvocatoria0' id='nconvocatoria0'/> 
                                        </td>
                                        <td>
                                            <input type="text" name='entidadfin0' id="entidadfin0"/>
                                        </td>
                                        <td>
                                            <input type="text" name='productopar0' id="productopar0" />
                                        </td>
                                        <td>
                                            <input type="text" name='ciudadthree0' id="ciudadthree0"/>
                                        </td>
                                        <td>
                                            <input type="text" name='yearfour0' id="yearfour0"/>
                                        </td>
                                        <td>
                                            <input type="text" name='resultado0' id="resultado0"/>
                                        </td>
                                        <td>
                                            <input type="text" name='valortotal0' id="valortotal0"/>
                                        </td>                        
                                        <td>
                                    </tr>
                                    <tr id='numeross1'></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- fin tabla 7 -->

                    <div class="row">		
                        <table id="tablacolciencias" class="">		
                            <thead>		
                                <tr>		
                                    <th class="borderth">Nombre Convocatoria</th>		
                                    <th class="borderth">Entidad Financiadora</th>		
                                    <th class="borderth">Producto Participo</th>		
                                    <th class="borderth">Ciudad</th>		
                                    <th class="borderth">Año Finaliza</th>		
                                    <th class="borderth">Resultado Obtenido</th>		
                                    <th class="borderth">V. Total Proyecto</th>		
                                </tr>		
                            </thead>		
                            <tbody>			
                            </tbody>		
                        </table>                    		
                    </div> 
                    <!-- Botones tabla 7-->

                    <div class="row noprint">
                        <a id="add_row6" class="btn-floating  waves-effect waves-light noprint">
                            <i class="material-icons">add</i>
                        </a>
                        <a id='delete_row6' style="float: right;" class="btn-floating  waves-effect waves-light red noprint">
                            <i class="material-icons">delete</i>
                        </a>
                    </div>
                    <!-- Fin botones tabla 7 -->	
                    <br><br>
                    <!-- Boton enviar -->
                    <!-- Si presenta problema cambiar a input type button en lugar de button type submit -->
                    <div class="row noprint">
                        <button style="float: left;" class="btn waves-effect waves-light noprint" onclick="return imprime();">Imprimir
                            <i class="material-icons right">print</i> 
                        </button>                    
                        <button style="float: right;" class="btn waves-effect waves-light noprint" type="submit" 
                                name="action" onclick="return enviar_o_actualizar();" id="enviar">
                            Inscribir <i class="material-icons right">send</i>
                        </button>
                    </div>

                    <!-- fin boton enviar -->
                </div>

            </form>	
            <a style="float: right;" href="#" title="Ir arriba" class="btn-floating  waves-effect waves-light grey noprint" id='subir'>
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
            <script src="js/jquery-3.1.1.min.js" type="text/javascript"></script>
            <script type="text/javascript" src="materialize/js/materialize.min.js"></script> 
            <script type="text/javascript" src="js/ConstructorXMLHttpRequest.js"></script>
            <script src="alertifyjs/alertify.min.js" type="text/javascript"></script>
            <script src="js/multiple-select.js" type="text/javascript"></script>
            <script src="js/Formato_4.js" type="text/javascript"></script>
    </body>
</html>

<%} else {
        out.print("<div class='container' style='text-align: center; color: black;'>"
                + "Primero Ingrese</div>");
        response.sendRedirect("index.jsp");
    }
%>

