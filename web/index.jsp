<%-- 
    Document   : login
    Created on : 11/04/2017, 07:49:43 AM
    Author     : Sandra
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

    <head>
        <link href="http://investigaciones.unillanos.edu.co/images/favicon.ico" rel="Shortcut Icon" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="materialize/css/materialize.min.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <title>Iniciar Sesión</title>
    </head>

    <body class="grey lighten-2">
        <main>
            <center>

                <div class="section"></div>
                <!--
                      <h5 class="indigo-text">Por favor, entre en su cuenta</h5>
                      <div class="section"></div>
                -->
                <div class="container">
                    <div class="z-depth-4 grey lighten-4 row" style="display: inline-block; padding: 32px 48px 0px 48px; border: 1px solid #EEE;">
                        <div class="row">
                            <div class="input-field col s12 center">
                                <img src="Imagenes/login.png" alt="" class="circle responsive-img valign profile-image-login">
                            </div>
                        </div>
                        <form class="col s12" method="POST" action="sesion">


                            <div class="row">
                                <div class="input-field s12 m12 l12">
                                    <input id="username" type="text" name="username">
                                    <label for="username" >Usuario *</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class='input-field col s12 m12 l12'>
                                    <input type='password' id='password' name="password" placeholder="" autocomplete="off"/>
                                    <label for="password" >Contraseña *</label>
                                </div>
                                <label class="red-text" style="float: left;">*Campos Obligatorios</label>
                            </div>

                            <br />
                            <center>
                                <div class='row'>
                                    <button class="btn waves-effect waves-light s12" type="submit" name="action">Entrar
                                        <i class="material-icons right">input</i>
                                    </button>
                                </div>
                            </center>
                        </form>
                    </div>
                </div>
            </center>
        </main>

        <script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
        <script type="text/javascript" src="materialize/js/materialize.min.js"></script>
    </body>
</html>
