<%-- 
    Document   : Enlaces_Formatos
    Created on : 18/04/2017, 09:51:55 AM
    Author     : Edwin Rubiano
--%>

<%@page import="java.io.PrintWriter"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    PrintWriter outt = response.getWriter();

    HttpSession sesion = request.getSession(false);
    if (sesion != null && sesion.getAttribute("usuario") != null) {
        String usuario = (String) sesion.getAttribute("usuario");

%>

<!DOCTYPE html>
<html>
    <head>
        <link href="Imagenes/favicon.ico" rel="Shortcut Icon" />
        <link href="materialize/css/materialize.min.css" rel="stylesheet" type="text/css"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Enlaces_Formatos</title>
    </head>
    <body>
        <input type="hidden" value='<%out.print(usuario);%>' id='user'>

        <nav style="background: #e9e9e9;" class="noprint">
            <div class="nav-wrapper">
                <a href="#!" class="brand-logo"><img src="Imagenes/Logo_web.png" alt="" class="responsive-img"/></a>
            </div>
        </nav>

        <!-- fin barra de navegación -->
        <br>
        <div class="container">
            <div class="row input-field ">
                <div class="col s12 m12 l12">
                    <a href="/Proyecto_DGII/Formato_4.jsp" target="_blank">Formato 4</a>
                </div>
                <br>
                <div class="col s12 m12 l12">
                    <a href="/Proyecto_DGII/Formato_6.jsp" target="_blank">Formato 6</a>
                </div>
                <br>
                <div class="col s12 m12 l12">
                    <a href="/Proyecto_DGII/Formato_16.jsp" target="_blank">Formato 16</a>
                </div>
                <br>
            </div>
        </div>

        <script src="js/jquery-3.1.1.min.js" type="text/javascript"></script>
        <script src="materialize/js/materialize.min.js" type="text/javascript"></script>
    </body>
</html>
<%} else {
        out.print("<div class='container' style='text-align: center; color: black;'>"
                + "Primero Ingrese</div>");
        response.sendRedirect("index.jsp");
//        out.close();
    }
%>
