<%-- 
    Document   : formato16
    Created on : 4/04/2017, 03:02:55 AM
    Author     : Edwin Rubiano
--%>
<%@page import="java.util.ArrayList"%>
<%@page import="dao.ProyectoDAO"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>FO-INV-16</title>

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link href="http://investigaciones.unillanos.edu.co/images/favicon.ico" rel="Shortcut Icon" />
        <link href="materialize/css/materialize.min.css" rel="stylesheet" type="text/css"/>
<!--        <link href="css/jquery-ui.min.css" rel="stylesheet" type="text/css"/>-->
        <!--        <script type="text/javascript" src="js/ConstructorXMLHttpRequest.js"></script>-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body onload="extraerNombresIntegrantesComp('Nombres');">

        <!-- inicio barra de navegación -->
        <!-- Dropdown Structure -->
        <ul id="dropdown1" class="dropdown-content">
            <li><a class="black-text" href="#!">uno</a></li>
            <li><a class="black-text" href="#!">dos</a></li>
            <li class="divider"></li>
            <li><a class="black-text" href="#!">tres</a></li>
        </ul>
        <nav style="background: #e9e9e9;">
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo"><img class="responsive-img" src="http://investigaciones.unillanos.edu.co/images/Logo_web.png"></a>
                <ul class="right hide-on-med-and-down">
                    <li><a class="black-text" href="perfil.html">Opción 1</a></li>
                    <li><a class="black-text" href="perfil.html">Opción 2</a></li>
                    <!-- Dropdown Trigger -->
                    <li><a class="dropdown-button black-text" href="#!" data-activates="dropdown1">Desplegar<i class="material-icons right">arrow_drop_down</i></a></li>
                </ul>
            </div>
        </nav>

        <br>
        <div class="container">
            <div class="row">
                <div class="col s12 l2">
                    <img class="responsive-img" src="http://www.ame-macarena.org/imagenes/logos/unillanos.png">
                </div>
                <div class="col s12 col l8">
                    <h5 class="black-text center-align" style="font-weight: bold;">UNIVERSIDAD DE LOS LLANOS</h5>
                    <h6 class="black-text center-align" style="font-weight: bold;">PROCESO DE INVESTIGACIÓN</h6>
                    <h6 class="black-text center-align" style="font-weight: bold;">FORMATO PARA LA PRESENTACIÓN DE 
                        PROYECTOS DE INVESTIGACIÓN, DESARROLLO TECNOLÓGICO E INNOVACIÓN</h6>
                </div>
                <div class="col s12 l2">
                    <b class="black-text">CÓDIGO: FO-INV-16</b></br>
                    <b class="black-text">VERSIÓN: 03</b></br>
                    <b class="black-text">FECHA: 04/10/2016</b></br>
                    <b class="black-text">VIGENCIA: 2016</b>
                </div>
            </div>
            <hr>

            <p class="black-text flow-text center-align">1) INFORMACIÓN GENERAL DEL PROYECTO</p>

            <form>
                <div class="row">
                    <div class="input-field col s12 l8">
                        <select id="nombreconv">
                        </select>
                        <label>Convocatoria</label> 
                    </div>
                    <div class="input-field col s12 l4">
                        <select id="tipoconv">
                            <option value="" disabled selected>Elija una opción</option>
                            <option value="1">Interna</option>
                            <option value="2">Externa</option>
                        </select>
                        <label>Tipo de Convocatoria</label>
                    </div>                     
                </div>                 
                <div class="row">
                    <div class="input-field col s12 l8">
                        <input type="text" id="titulo"/>
                        <label for="titulo">Título del proyecto</label>
                    </div>
                    <div class="input-field col s12 l4">
                        <select id="tipoproy">
                            <option value="" disabled selected>Elija una opción</option>
                            <option value="1">Tipo 1</option>
                            <option value="2">Tipo 2</option>
                        </select>
                        <label>Tipo de Proyecto <sup>1 2</sup></label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 l4">
                        <select id="invprincipal" class="browser-default">
                        </select>
<!--                        <label>Investigador Principal</label>-->
                    </div>
                    <div class="input-field col s12 l4">
                        <input type="number" id="dedicacion" min="0"/>
                        <label for="dedicacion">Dedicación (h/semana)</label>
                    </div>
                    <div class="input-field col s12 l4">
                        <input type="number" id="identificacion" min="1" class="active" placeholder="" disabled/>
                        <label for="identifiacion">Identificacion (CC):</label>
                    </div>
                </div>

                <div class="row">

                    <div class="input-field col s12 l3">
                        <select id="estadocivil">
                            <option selected disabled></option>
                            <option>Soltero/a</option>
                            <option>Comprometido/a</option>
                            <option>Casado/a</option>
                            <option>Divorciado/a</option>
                            <option>Viudo/a</option>
                        </select>
                        <label>Estado Civil</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="number" id="celular" min="1" class="active" placeholder="" disabled/>
                        <label for="celular">Celular</label>
                    </div>
                    <div class="input-field col s12 l6">
                        <input type="email" id="correo" class="validate active" placeholder="" disabled/>
                        <label for="correo" data-error="Incorrecto" data-success="Correcto">Correo electrónico</label>
                    </div>                    
                </div>

                <div class="row">
                    <div class="input-field col s12 l4">
                        <input type="text" id="niveledu" class="active" placeholder="" disabled/>
                        <label for="niveledu">Máximo nivel educativo</label>
                    </div>
                    <div class="input-field col s12 l4">
                        <input type="date" placeholder="" id="fechaing" class="active datepicker" title="Fecha de ingreso al grupo" disabled/>
                        <label for="fechaing">Fecha de ingreso al grupo</label>
                    </div>
                    <div class="input-field col s12 l4">
                        <input type="text" id="direccion" disabled/>
                        <label for="direccion">Dirección para correspondencia física</label>
                    </div>                   
                </div>                
                <sup class="red-text">Tipo 1</sup><sub class="red-text"> Proyectos que correspondan a investigación básica o aplicada</sub><br>
                <sup class="red-text">Tipo 2</sup><sub class="red-text"> Proyectos relacionados con investigación humanística, social y ambiental.</sub>


                <hr>
                <br>

                <p class="black-text flow-text center-align">Co-investigadores</p>                
                <hr>

                <div class="row">
                    <div class="input-field col s12 l12 m12" style="overflow-x: auto;">
                        <table id="coinvestigadores">
                            <thead>
                                <tr>
                                    <th>
                                        N°
                                    </th>
                                    <th style="min-width: 300px;">
                                        Nombre
                                    </th>
                                    <th style="min-width: 120px;">
                                        Dedicación (h/semana)
                                    </th>
                                    <th style="min-width: 150px;">
                                        Identificacion (CC)
                                    </th>
                                    <th style="min-width: 120px;">
                                        Teléfono oficina
                                    </th>
                                    <th style="min-width: 120px;">
                                        Celular
                                    </th>
                                    <th style="min-width: 150px;">
                                        Fecha de ingreso al Grupo
                                    </th>
                                    <th style="min-width: 200px;">
                                        Máximo nivel educativo
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input id="nombre_co0" class="nombre_coinvestigador"  list="nombres0" autocomplete="off"/>
                                        <datalist id="nombres0">
                                            <option selected disabled></option>
                                        </datalist>
                                    </td>
                                    <td>
                                        <input type="number" id="dedicacion_co0" min="0"/>
                                    </td>
                                    <td>
                                        <input type="number" id="identificacion_co0" min="1" class="id_coinvestigador" disabled/>

                                    </td>
                                    <td>
                                        <input type="number" id="telefono_co0" min="1" class="tel_coinvestigador"/>

                                    </td>
                                    <td>
                                        <input type="number" id="celular_co0" min="1" disabled/>

                                    </td>
                                    <td>
                                        <input type="text" id="fechaing_co0" title="Fecha de ingreso al grupo" class="fechaIng_Co" disabled/> 
                                    </td>
                                    <td>
                                        <input type="text" id="niveledu_co0" class="nv_educativo" disabled=/>

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="row">
                    <a id="add_rowC" class="btn-floating btn-large waves-effect waves-light ">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_rowC' style="float: right;" class="btn-floating btn-large waves-effect waves-light red">
                        <i class="material-icons">delete</i>
                    </a>
                </div>

                <br><br>
                <hr>

                <div class="row">
                    <div class="input-field col s12 l6">
                        <input type="text" id="nombregrupo"/>
                        <label for="nombregrupo">Nombre del grupo de investigación</label>
                    </div>
                    <div class="input-field col s12 l6">
                        <input id="lineainv" type="text">
                        <label for="lineainv">Línea de investigación</label>
                    </div>                    
                </div>
                <div class="row">
                    <div class="input-field col s12 l12 m12">
                        <select id="lineainv_ins" multiple style="height: 300px; overflow-y: scroll;">
                            <option selected disabled> </option>
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
                        <label>Lineas de Investigación Institucionales</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m12 l12">
                        <select id="centroinv" class="">
                            <option value="" disabled selected></option>
                            <option value="1">Centro de Investigación de Ciencias Agropecuarias Y Recursos Naturales</option>
                            <option value="2">Centro de Investigación de Ciencias Basicas e Ingenierias</option>
                            <option value="3">Centro de Investigación de Ciencias Humanas y de la Educación</option>
                            <option value="4">Centro de Investigación de Ciencias Económicas</option>
                            <option value="5">Centro de Investigación de Ciencias de la Salud</option>
                        </select>
                        <label>Centro de Investigación</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field col s12 l3">
                        <input type="text" id="lugarejecucion"/>
                        <label for="lugarejecucion">Lugar de ejecución del proyecto</label>
                    </div>
                    <div class="input-field col s12 m4 l3">
                        <select id="departamento">
                            <option value="" disabled selected>Elija una opción</option>
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
                    <div class="input-field col s12 m3 l3">
                        <select id="ciudad">
                            <option>Elija una opción</option>
                        </select>
                        <label>Ciudad</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="text" id="duracion"/>
                        <label for="duracion">Duración del proyecto (en meses)</label>
                    </div>                     
                </div>                 

                <div class="row">
                    <div class="input-field col s12 l4">
                        <input type="number" id="financiacion" min="0"/>
                        <label for="financiacion">Financiación solicitada</label>
                    </div>
                    <div class="input-field col s12 l4">
                        <input type="number" id="valorefectivo" min="0"/>
                        <label for="valorefectivo">Valor solicitado en efectivo</label>
                    </div> 
                    <div class="input-field col s12 l4">
                        <input type="number" id="valorespecie" min="0"/>
                        <label for="valorespecie">Valor en especie</label>
                    </div>                     
                </div>                


                <div class="row">
                    <div class="input-field col s12 l6">
                        <input type="number" id="valortotalp" min="0"/>
                        <label for="valortotalp">Valor total del proyecto</label>
                    </div>
                    <div class="input-field col s12 l6">
                        <input type="text" id="keywords"/>
                        <label for="keywords">Descriptores / Palabras clave</label>
                    </div>                      
                </div> 

                <p class="black-text" style="text-align: justify;">
                    Nombres completos, direcciones electrónicas, teléfono 
                    e instituciones de tres (3) investigadores expertos  
                    en el  tema  de su  propuesta  y que estén en capacidad  
                    de evaluar  proyectos en esta  temática y que no 
                    pertenezcan a las entidades proponentes (esto no 
                    significa que necesariamente sean los mismos que 
                    evalúen esta propuesta en particular):
                </p>

                <!-- inicio expertos 1 -->
                <div class="row">
                    <div class="input-field col s12 l3">
                        <input type="text" id="nombre5"/>
                        <label for="nombre5">Nombre</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="email" id="correo1" class="validate"/>
                        <label for="correo1" data-error="Incorrecto" data-success="Correcto">Correo electrónico</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="text" id="instituciones1"/>
                        <label for="instituciones1">Instituciones</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="number" id="telefono5" min="1"/>
                        <label for="telefono5">Teléfono</label>
                    </div>                    
                </div>
                <!-- fin expertos 1-->

                <!-- inicio expertos 2 -->
                <div class="row">
                    <div class="input-field col s12 l3">
                        <input type="text" id="nombre6"/>
                        <label for="nombre6">Nombre</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="email" id="correo2" class="validate"/>
                        <label for="correo2" data-error="Incorrecto" data-success="Correcto">Correo electrónico</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="text" id="instituciones2"/>
                        <label for="instituciones2">Instituciones</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="number" id="telefono6" min="1"/>
                        <label for="telefono6">Teléfono</label>
                    </div>                    
                </div>
                <!-- fin expertos 2-->                


                <!-- inicio expertos 3 -->
                <div class="row">
                    <div class="input-field col s12 l3">
                        <input type="text" id="nombre7"/>
                        <label for="nombre7">Nombre</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="email" id="correo3" class="validate"/>
                        <label for="correo3" data-error="Incorrecto" data-success="Correcto">Correo electrónico</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="text" id="instituciones3"/>
                        <label for="instituciones3">Instituciones</label>
                    </div>
                    <div class="input-field col s12 l3">
                        <input type="number" id="telefono7" min="1"/>
                        <label for="telefono7">Teléfono</label>
                    </div>                    
                </div>
                <!-- fin expertos 3-->  
                <p class="black-text flow-text center-align">2) RESUMEN DEL PROYECTO</p>
                <p class="black-text" style="text-align: justify;">Debe tener un máximo de 500 palabras y contener la 
                    información necesaria para darle al lector una 
                    idea precisa de la pertinencia y calidad del 
                    proyecto, éste debe contener una síntesis del 
                    problema a investigar, el marco teórico, objetivos,
                    la metodología a utilizar y los resultados esperados</p>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea id="resumen" class="materialize-textarea" maxlength="500"></textarea>
                        <label for="resumen">Resumen</label>
                    </div>
                </div>            
                <p class="black-text flow-text center-align">3) DESCRIPCIÓN DEL
                    PROYECTO</p>
                <p class="black-text" style="text-align: justify; font-weight: bold;">3.1 Planteamiento de 
                    la pregunta o problema de investigación y su justificación en 
                    términos de necesidades, pertinencia; marco teórico y estado 
                    del arte:</p>
                <p class="black-text" style="text-align: justify;">Formular claramente la pregunta concreta que se quiere 
                    responder, en el contexto del problema a cuya solución
                    o entendimiento se contribuirá con la ejecución del 
                    proyecto. Se recomienda, hacer una descripción precisa
                    y completa de la naturaleza y magnitud del problema, 
                    así como justificar la necesidad de la investigación 
                    en función del desarrollo regional o nacional. Se 
                    deberá identificar cuál será el aporte del proyecto 
                    a la generación de nuevo conocimiento sobre el tema 
                    en el ámbito internacional. Deberá responder a las 
                    siguientes demandas: síntesis del contexto teórico 
                    general en el cual se ubica el tema de la propuesta, 
                    estado actual del conocimiento del problema (nacional 
                    y mundial), brechas que existen y vacío que se quiere 
                    llenar con el proyecto. En síntesis debe responder el 
                    ¿por qué? y ¿cómo? la investigación propuesta, con 
                    fundamento en investigaciones previas, contribuirá 
                    con probabilidad de éxito a la solución o comprensión 
                    del problema planteado o al desarrollo del sector de 
                    aplicación interesado.</p>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea id="descripcion" class="materialize-textarea" length="500"></textarea>
                        <label for="descripcion">Descripción</label>
                    </div>
                </div>                                         

                <p class="black-text" style="text-align: justify;"><b>3.2 Objetivos</b><br>
                    Deben mostrar una 
                    relación clara y consistente con la descripción del problema y 
                    con las preguntas o hipótesis que se quieren resolver. La 
                    formulación de objetivos claros y viables constituye una 
                    base importante para juzgar el resto de la propuesta y, 
                    además, facilita la estructuración de la metodología. Se 
                    recomienda formular <b>un único objetivo general (OG)</b>, 
                    coherente con el problema planteado y los <b>objetivos 
                        específicos (OE)</b> necesarios para lograr el objetivo general.
                    Estos últimos deben ser alcanzables con la metodología propuesta.
                    Con el logro de los objetivos se espera, entre otras, 
                    encontrar respuestas a una o más de las siguientes preguntas:
                    ¿Cuál será el conocimiento generado si el trabajo se realiza?
                    ¿Qué solución tecnológica se espera desarrollar? <b><i><u>No se deben
                                confundir objetivos con actividades o procedimientos 
                                metodológicos.</u></i></b></p>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" id="objg"/>
                        <label for="objg">Objetivo General</label>
                    </div>
                </div>                

                <!-- tabla objetivos especificos -->

                <div class="row">
                    <div class="col s12 m12 l12">
                        <table class="" id="tabla1">
                            <thead>
                                <tr >
                                    <th class="">
                                        N°
                                    </th>
                                    <th class="">
                                        Objetivos específicos 
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr id='addr0'>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input type="text" id='objesp0' title="Objetivos especificos"/>
                                    </td>

                                </tr>
                                <tr id='addr1'></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="row">
                    <a id="add_row" class="btn-floating btn-large waves-effect waves-light ">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_row' style="float: right;" class="btn-floating btn-large waves-effect waves-light red">
                        <i class="material-icons">delete</i>
                    </a>
                </div>

                <!-- fin tabla objetivos especificos -->


                <p class="black-text" style="text-align: justify;"><b>3.3
                        Metodología propuesta</b><br>
                    El diseño metodológico es la base para planificar todas 
                    las actividades que requiere el proyecto y para 
                    determinar los recursos humanos y financieros requeridos.
                    Una metodología vaga o imprecisa no brinda elementos 
                    para evaluar la pertinencia de los recursos solicitados.
                    Por lo tanto debe mostrarse en forma organizada y precisa
                    la forma cómo será alcanzado cada uno de los objetivos 
                    específicos propuestos. La metodología debe reflejar la
                    estructura lógica y el rigor científico del proceso de 
                    investigación, empezando por la elección de un enfoque 
                    metodológico específico y finalizando con la forma como
                    se analizarán, interpretarán y presentarán los resultados
                    . Deben detallarse los procedimientos, técnicas, 
                    actividades y demás estrategias metodológicas 
                    requeridas para la investigación; si éstas no 
                    son originales, debe señalarse la fuente bibliográfica
                    correspondiente. Deberá indicarse el proceso a seguir
                    en la recolección de la información, así como en la 
                    organización, sistematización y el tipo de análisis 
                    estadístico a que se someterán los datos.</p>
                <div class="row">
                    <div class="input-field col s12">
                        <textarea class="materialize-textarea" id="metodologia" maxlength="500"></textarea>
                        <label for="metodologia">Metodología propuesta</label>
                    </div>
                </div>                


                <p class="black-text" style="text-align: justify;"><b>3.4
                        Cronograma de actividades</b><br>
                    Relación de actividades por objetivo a realizar en función del tiempo (meses),
                    en el periodo de ejecución del proyecto.<br> 
                    Tabla 3.1. Cronograma de actividades. En la primera columna OE, 
                    se debe escribir el número del objetivo específico al que correspondan
                    las actividades programadas. En la segunda, las actividades de cada 
                    uno de los objetivos. En las siguientes columnas se marca con X los 
                    meses en los cuales se desarrollara la actividad. Recuerde incluir 
                    la presentación de informes semestrales y del informe final.
                </p><br>
                <div class="row">
                    <div class="col s12 m12 l12 input-field" style="overflow-x: auto;">
                        <table id="cronograma">
                            <thead>
                                <tr>
                                    <th rowspan="2">
                                        OE
                                    </th>
                                    <th rowspan="2" style="min-width: 300px; text-align: center;">
                                        Actividades
                                    </th>
                                    <th colspan="11" style="text-align: center;" id="col_meses">
                                        Meses
                                    </th>
                                </tr>
                                <tr id="col_cb">
                                    <th style="text-align: center;">
                                        1
                                    </th>
                                    <th style="text-align: center;">
                                        2
                                    </th>
                                    <th style="text-align: center;">
                                        3
                                    </th>
                                    <th style="text-align: center;">
                                        4
                                    </th>
                                    <th style="text-align: center;">
                                        5
                                    </th>
                                    <th style="text-align: center;">
                                        6
                                    </th>
                                    <th style="text-align: center;">
                                        7
                                    </th>
                                    <th style="text-align: center;">
                                        8
                                    </th>
                                    <th style="text-align: center;">
                                        9
                                    </th>
                                    <th style="text-align: center;">
                                        10
                                    </th>
                                    <th style="text-align: center;">
                                        11
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="fil0">
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input type="text" id="actividades0">
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c1" value="1" />
                                        <label for="0c1"></label>
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c2" value="2" />
                                        <label for="0c2"></label>                                        
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c3" value="3" />
                                        <label for="0c3"></label>
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c4" value="4" />
                                        <label for="0c4"></label>                                        
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c5" value="5" />
                                        <label for="0c5"></label>
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c6" value="6" />
                                        <label for="0c6"></label>                                        
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c7" value="7" />
                                        <label for="0c7"></label>
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c8" value="8" />
                                        <label for="0c8"></label>                                        
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c9" value="9" />
                                        <label for="0c9"></label>
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c10" value="10" />
                                        <label for="0c10"></label>                                        
                                    </td>
                                    <td>
                                        <input name=""  type="checkbox" id="0c11" value="11" />
                                        <label for="0c11"></label>                                        
                                    </td>                                        
                                </tr>
                                <!--                                <tr id="addr4"></tr>-->
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="row">
                    <a id="add_col" class="btn-floating waves-effect waves-light blue" style="float: right;">
                        <i class="material-icons">add</i>
                    </a>
                    <a id="delete_col" class="btn-floating waves-effect waves-light black" style="float: right;">
                        <i class="material-icons">clear</i>
                    </a>
                </div>

                <div class="row">
                    <a id="add_row4" class="btn-floating btn-large waves-effect waves-light ">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_row4' style="float: right;" class="btn-floating btn-large waves-effect waves-light red">
                        <i class="material-icons">delete</i>
                    </a>
                </div><br>

                <p class="black-text" style="text-align: justify;"><b>3.5 Bibliografía:</b><br>
                    Relacione TODAS las citas bibliográficas referidas en el texto, 
                    siguiendo el estilo y forma adoptado por la <b><i>Revista Orinoquia</i></b>.</p>

                <p class="black-text" style="text-align: justify;"><b>4 RESULTADOS/PRODUCTOS ENTREGABLES,
                        POTENCIALES BENEFICIARIOS E IMPACTO</b><br>
                    Estos deben ser coherentes con los objetivos específicos y con la metodología 
                    planteada. Los resultados/productos pueden clasificarse en cuatro categorías:</p>

                <blockquote style="border-left: 5px solid #9e9e9e;"><p class="black-text" style="text-align: justify;">4.1 Relacionados 
                        con la generación de nuevo conocimiento:</p>
                    <p>
                        &bull;  Artículos de investigación en revistas indexadas. <br>
                        &bull;  Libros resultados de investigación.<br>
                        &bull;  Capítulos en libros resultados de investigación.<br>
                        &bull;  Productos tecnológicos patentados o en proceso de concesión de la patente.<br>
                        &bull;  Variedad vegetal y nueva raza animal.
                    </p></blockquote>

                <blockquote style="border-left: 5px solid #9e9e9e;"><p class="black-text" style="text-align: justify;">4.2
                        Relacionados con los Productos de Desarrollo Tecnológico e Innovación:</p>
                    <p>
                        &bull;  Productos tecnológicos certificados o validados. <br>
                        &bull;  Productos Empresariales.<br>
                        &bull;  Regulaciones, normas, reglamentos o legislaciones.<br>
                        &bull;  Consultorías e informes técnicos finales.<br>
                        &bull;  Acuerdos de licencia para la explotación de obras protegidas por derecho de autor.
                    </p></blockquote>                


                <blockquote style="border-left: 5px solid #9e9e9e;"><p class="black-text" style="text-align: justify;">4.3
                        Relacionados con la Apropiación Social de Conocimiento:</p>
                    <p>
                        &bull;  Participación ciudadana y creación.<br>
                        &bull;  Estrategias pedagógicas.<br>
                        &bull;  Comunicación social del conocimiento.<br>
                        &bull;  Circulación de conocimiento especializado.<br>
                        &bull;  Reconocimientos.
                    </p></blockquote>

                <blockquote style="border-left: 5px solid #9e9e9e;"><p class="black-text" style="text-align: justify;">4.4
                        Relacionados con la Formación de Recurso Humano:</p>
                    <p>
                        &bull;  Tesis de Doctorado.<br>
                        &bull;  Trabajo de grado de Maestría.<br>
                        &bull;  Trabajo de grado de Pregrado.<br>
                        &bull;  Proyectos de Investigación y Desarrollo.<br>
                        &bull;  Proyecto de Investigación – Creación.<br>
                        &bull;  Proyectos de Investigación, Desarrollo e Innovación.<br>
                        &bull;  Proyectos de extensión y responsabilidad social.<br>
                        &bull;  Apoyo a programas de formación.<br>
                        &bull;  Acompañamiento y asesorías de línea temática del programa Ondas.<br>                        
                    </p></blockquote>

                <p class="black-text" style="text-align: justify;"><b>3.5 Bibliografía:</b><br>
                    Relacione TODAS las citas bibliográficas referidas en el texto, 
                    siguiendo el estilo y forma adoptado por la <b><i>Revista Orinoquia</i></b>.</p>
                <div class="row">
                    <div class="col s12 l12">
                        <div class="card-panel">
                            <span class="black-text">Nota: Los resultados o productos entregables se 
                                clasifican según “Modelo de Medición de Grupos de Investigación, 
                                Desarrollo Tecnológico e Innovación 2015” -sección 2.1.3- 
                                disponible en <a href="http://www.colciencias.gov.co/sites/default/files/upload/noticias/mediciondegrupos-actene2015.pdf">Ir
                                    al enlace</a><br>
                                &bull;  En conjunto el proyecto deberá contener al menos un resultado de 
                                generación de nuevo conocimiento o Productos de Desarrollo Tecnológico e 
                                Innovación y al menos un resultado relacionado con Apropiación Social de 
                                Conocimiento o Formación de Recurso Humano.
                            </span>
                        </div>
                    </div>
                </div>                


                <p class="black-text" style="text-align: justify;"><b>Tabla 4.1 Resultados esperados</b><br>
                    Primera columna se escribe el tipo de resultado: GNC/NDT 
                    (Generación de conocimiento y/o nuevos desarrollos tecnológicos), 
                    FCC (Fortalecimiento de la capacidad científica), ASC (apropiación
                    social del conocimiento); en la segunda columna se indican los 
                    resultados que se esperan alcanzar; en la tercera columna se 
                    especifica el indicador con el que cree se puede establecer 
                    que se alcanzó el resultado o se logró el producto; y en la 
                    cuarta columna se indica el medio de verificación (documentos,
                    certificados, cartillas, soportes) que evidencie el logro del
                    resultado.</p>

                <!-- Comienza tabla 3-->

                <div class="row">
                    <div class="col s12 m12 l12">
                        <table class="responsive-table" id="tabla3">
                            <thead>
                                <tr >
                                    <th class="">
                                        N°
                                    </th>
                                    <th class="">
                                        Categoría de resultado
                                    </th>
                                    <th class="">
                                        Resultado/Producto Entregable
                                    </th>
                                    <th class="">
                                        Indicador
                                    </th>
                                    <th class="">
                                        Medio de Verificación
                                    </th>                                                                  
                                </tr>
                            </thead>
                            <tbody>
                                <tr id='nume0'>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input type="text" id='cat0'/>
                                    </td>
                                    <td>
                                        <input type="text" id='resul0'/>
                                    </td>
                                    <td>
                                        <input type="text" id='indi0' />
                                    </td>
                                    <td>
                                        <input type="text" id='med0'/>
                                    </td>
                                    <td>
                                </tr>
                                <tr id='nume1'></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Botones tabla 3-->


                <div class="row">
                    <a id="add_row2" class="btn-floating btn-large waves-effect waves-light ">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_row2' style="float: right;" class="btn-floating btn-large waves-effect waves-light red">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
                <!-- fin Botones tabla 3-->



                <p class="black-text" style="text-align: justify;"><b>4.5 Impacto Social del Proyecto</b><br>
                    En la primera columna se escriben los impactos que pueden ser de tipo: 
                    Científicos, tecnológicos o de innovación o programa estratégico, 
                    económicos (productividad y competitividad), impactos sobre el 
                    medio ambiente y la sociedad, impactos en la economía nacional 
                    y/o regional y otros impactos; en la segunda columna se describe
                    el impacto proyectado de acuerdo a las tipologías establecidas 
                    (primera columna); y en la tercera columna se indican las proyecciones
                    del impacto a futuro, que pueden obtenerse con el desarrollo del 
                    proyecto, de corto plazo (1-3 años), mediano plazo (4-8 años) y 
                    largo plazo, superior a 8 años.</p>

                <!-- Comienza tabla 4-->

                <div class="row">
                    <div class="col s12 m12 l12">
                        <table class="responsive-table" id="tabla4">
                            <thead>
                                <tr >
                                    <th class="">
                                        N°
                                    </th>
                                    <th class="">
                                        Tipo de Impacto
                                    </th>
                                    <th class="">
                                        Descripción del Impacto
                                    </th>
                                    <th class="">
                                        Proyección del Impacto
                                    </th>                                                                   
                                </tr>
                            </thead>
                            <tbody>
                                <tr id='numer0'>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input type="text" id='tipo0'/>
                                    </td>
                                    <td>
                                        <input type="text" id='desc0'/>
                                    </td>
                                    <td>
                                        <input type="text" id='proyec0' />
                                    </td>
                                    <td>
                                </tr>
                                <tr id='numer1'></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Botones tabla 4-->

                <div class="row">
                    <a id="add_row3" class="btn-floating btn-large waves-effect waves-light ">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_row3' style="float: right;" class="btn-floating btn-large waves-effect waves-light red">
                        <i class="material-icons">delete</i>
                    </a>
                </div>
                <!-- fin Botones tabla 4-->

                <p class="black-text" style="text-align: justify;"><b> 5 Conformación y Trayectoria del Grupos de Invsetigación</b><br>
                    En esta sección se debe suministrar la información que refleje la 
                    capacidad del grupo de investigación y de sus integrantes para 
                    realizar el proyecto propuesto. Esto significa informar su importancia
                    estratégica y los logros obtenidos a partir de proyectos de 
                    investigación realizados anteriormente o en curso, incluyendo
                    sus productos más relevantes. Debe indicar el nombre del Grupo
                    como está registrado en GrupLAC.</p>

                <b>Anexo 1: Hoja de vida resumida de Consultores o Asesores</b>

                <p class="black-text"><b>IDENTIFICACIÓN DEL CONSULTOR O ASESOR:</b> favor diligenciar datos de 
                    identificación (nombre completo y cédula de ciudadanía), según
                    constan en documento de identidad.</p>

                <div class="row">
                    <div class="input-field col s12 m12 l12" style="overflow-x: auto;">
                        <table id="consultores">
                            <thead>
                                <tr>
                                    <th>
                                        N°
                                    </th>
                                    <th style="min-width: 150px;">
                                        Nombres
                                    </th>
                                    <th style="min-width: 150px;">
                                        Apellidos
                                    </th>
                                    <th style="min-width: 150px;">
                                        Documento de Identidad
                                    </th>
                                    <th>
                                        Fecha de Nacimiento
                                    </th>
                                    <th style="min-width: 150px;">
                                        Nacionalidad
                                    </th>
                                    <th style="min-width: 250px;">
                                        Correo electrónico
                                    </th>
                                    <th style="min-width: 120px;">
                                        Tel/Fax
                                    </th>
                                    <th style="min-width: 200px;">
                                        Entidad donde labora
                                    </th>
                                    <th style="min-width: 200px;">
                                        Cargo o posición actual
                                    </th>
                                    <th style="min-width: 120px;">
                                        Tel/Fax
                                    </th>
                                    <th style="min-width: 400px;">
                                        TÍTULOS ACADÉMICOS OBTENIDOS (área/disciplina, universidad, año):
                                    </th>
                                    <th style="min-width: 400px;">
                                        CAMPOS DE LA CIENCIA Y LA TECNOLOGÍA EN LOS CUALES ES EXPERTO:
                                    </th>
                                    <th style="min-width: 400px;">
                                        CARGOS DESEMPEÑADOS (tipo de posición, institución, fecha) EN LOS ÚLTIMOS CINCO (5) AÑOS:
                                    </th>
                                    <th style="min-width: 400px;">
                                        PUBLICACIONES RECIENTES (Por lo menos las cinco (5) publicaciones más importantes que haya hecho en los últimos cinco (5) años).
                                    </th>
                                    <th style="min-width: 400px;">
                                        PATENTES, PROTOTIPOS U OTRO TIPO DE PRODUCTOS TECNOLÓGICOS O DE INVESTIGACIÓN OBTENIDOS EN LOS ÚLTIMOS CINCO (5)  AÑOS.
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        1
                                    </td>
                                    <td>
                                        <input type="text" id="nombre_cons0"/>
                                    </td>
                                    <td>
                                        <input type="text" id="apellidos_cons0"/>
                                    </td>
                                    <td>
                                        <input type="number" min="0" id="identificacion_cons0"/>
                                    </td>
                                    <td>
                                        <input type="date" id="fechanac_cons0"/>
                                    </td>
                                    <td>
                                        <input type="text" id="nacionalidad_cons0"/>
                                    </td>
                                    <td>
                                        <input type="email" id="correo_cons0" class="validate"/>
                                    </td>
                                    <td>
                                        <input type="number" min="0" id="tel_cons0"/>
                                    </td>
                                    <td>
                                        <input type="text" id="entidad_cons0"/>
                                    </td>
                                    <td>
                                        <input type="text" id="cargo_cons0">
                                    </td>
                                    <td>
                                        <input type="number" min="0" id="telOf_cons0"/>
                                    </td>
                                    <td>
                                        <input type="text" id="titulos_cons0"/>
                                    </td>
                                    <td>
                                        <input type="text" id="camposExp_cons0"/>
                                    </td>
                                    <td>
                                        <input type="text" id="cargosDs_cons0"/>
                                    </td>
                                    <td>
                                        <input type="text" id="publicaciones_cons0"/>
                                    </td>
                                    <td>
                                        <input type="text" id="productos_cons0"/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>    
                </div>

                <div class="row">
                    <a id="add_rowCs" class="btn-floating btn-large waves-effect waves-light ">
                        <i class="material-icons">add</i>
                    </a>
                    <a id='delete_rowCs' style="float: right;" class="btn-floating btn-large waves-effect waves-light red">
                        <i class="material-icons">delete</i>
                    </a>
                </div>

                <br><br>

                <b>Anexo 2: Honorarios máximos para personal sin vínculo laboral con la 
                    Universidad de los Llanos, participante en proyectos de investigación 
                    financiados por la Dirección General de Investigaciones.</b>

                <table>
                    <thead>
                        <tr>
                            <th data-field="id">Formación y experiencia del investigador - consultor</th>
                            <th data-field="name">Honorarios máximos en salarios mínimos legales 
                                vigentes - Dedicación de tiempo completo (40 h/semana)</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Doctorado + publicaciones internacionales + experiencia reconocida en investigación.</td>
                            <td class="center-align">Hasta 12</td>

                        </tr>
                        <tr>
                            <td>Doctorado, poca experiencia</td>
                            <td class="center-align">Hasta 10</td>
                        </tr>
                        <tr>
                            <td>Maestría + publicaciones internacionales + experiencia reconocida en investigación</td>
                            <td class="center-align">Hasta 8</td>
                        </tr>
                        <tr>
                            <td>Maestría, poca experiencia</td>
                            <td class="center-align">Hasta 7</td>
                        </tr>
                        <tr>
                            <td>Especialización</td>
                            <td class="center-align">Hasta 6</td>
                        </tr>
                        <tr>
                            <td>Título profesional únicamente</td>
                            <td class="center-align">Hasta 4</td>
                        </tr>
                        <tr>
                            <td>Operario o auxiliar de campo</td>
                            <td class="center-align">Hasta 2</td>
                        </tr>                        

                    </tbody>
                </table>                 
                <p><b><i>Nota: No se financiarán honorarios o bonificaciones 
                            especiales a personal de nómina de la Universidad de los Llanos.</i></b></p>
                <!-- Boton enviar -->
                <!-- Si presenta problema cambiar a input type button en lugar de button type submit -->
                <div class="row">
                    <button class="btn btn-large waves-effect waves-light col s2 offset-s5 " type="submit" name="action" onclick="abc()">Enviar
                        <i class="material-icons right">send</i>
                    </button>

                </div>                
            </form>
        </div>


        <a style="float: right;" href="#" title="Ir arriba" class="btn-floating btn-large waves-effect waves-light grey">
            <i class="material-icons">navigation</i>
        </a></br>
        <footer class="page-footer" style="background: #222a36">
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
        <script src="materialize/js/materialize.min.js" type="text/javascript"></script>
        <script src="js/Formato_16.js" type="text/javascript"></script>
    </body>
</html>

