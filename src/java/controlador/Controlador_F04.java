/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import com.google.gson.Gson;
import dao.GrupoDAO;
import dao.ProyectoDAO;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Edwin Rubiano
 */
@WebServlet(name = "Controlador_F04", urlPatterns = {"/Grupos"})
public class Controlador_F04 extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    GrupoDAO objGrupo;
    ProyectoDAO objProyecto;

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");

        String infoGrupo = request.getParameter("infoGrupo");
        String infoLider = request.getParameter("infoLider");
        String infoIntegrantes = request.getParameter("infoIntegrantes");
        String infoProyectos = request.getParameter("infoProyectos");
        String infoTrab = request.getParameter("infoTrabajos");
        String infoPonente = request.getParameter("infoPonente");
        String infoConocimiento = request.getParameter("infoCono");
        String infoDT = request.getParameter("infoDesarrolloT");
        String infoConvo = request.getParameter("infoConvo");
        String codigo_grupo = request.getParameter("datos_formato");
        String actualizar_Gp = request.getParameter("actualizar_Gp");
        String actualizar_In = request.getParameter("actualizarIntegrantes");
        String insertarIntegrantes_Ac = request.getParameter("insertarIntegrantes");
        String insertar_NC = request.getParameter("insertar_Nc");
        String insertar_DT = request.getParameter("insertar_Dt");
        String insertar_PAS = request.getParameter("insertar_PAS");
        String insertar_PRH = request.getParameter("insertar_PRH");
        String insertar_Py = request.getParameter("insertar_Py");
        String nombres_integrantes = request.getParameter("nm_integrantes");
        String usuario = request.getParameter("usuario");
        String json, json_1, json_2, json_3, json_4, json_5="[]", json_6 = "[]", d_grupo[], d_lider[], d_integrantes[], codigo;

        objGrupo = new GrupoDAO();
        objProyecto = new ProyectoDAO();

        if (nombres_integrantes != null) {
            if (!"".equals(nombres_integrantes)) {
                response.setContentType("aplication/json");
                ArrayList<String> integrantes = objGrupo.listarIntegrantes();
                json = new Gson().toJson(integrantes);
                response.getWriter().write(json);
            }
        }

        if (actualizar_Gp != null && actualizar_In != null) {
            if (!"".equals(actualizar_Gp)) {
                //System.out.println("Sentencia_Gp-->" + actualizar_Gp);
                objGrupo.actualizarGrupo(actualizar_Gp);
            }
            if (!"".equals(actualizar_In)) {
                System.out.println("Sentencia_Ip-->" + actualizar_In);
                objGrupo.procesarActualizarIntegrantes(actualizar_In);
            }
            if (!"".equals(insertarIntegrantes_Ac)) {
                String[] cadena = insertarIntegrantes_Ac.split("<<");
                if (cadena.length > 1) {
                    objGrupo.setCodGrupo(cadena[1]);
                    if (cadena[0].length() > 0) {
                        objGrupo.procesarIntegrantesActualizacion(cadena[0]);
                        System.out.println("INSCRIPCION-->" + cadena[0]);
                    }
                }
            }
            
            if(!"".equals(insertar_NC)){
                objGrupo.procesarNuevoConocimiento(insertar_NC);
            }
            if(!"".equals(insertar_DT)){
                objGrupo.procesarDesarrolloTecn(insertar_DT);
            }
            if(!"".equals(insertar_PAS)){
                objGrupo.procesarEventosGeneral(insertar_PAS);
            }
            if(!"".equals(insertar_PRH)){
                objGrupo.procesarTrabajos(insertar_PRH);
            }
            if(!"".equals(insertar_Py)){
                objGrupo.procesarProyecto(insertar_Py);
            }
            response.getWriter().write("ACTUALIZADO");
        }

        if (codigo_grupo != null) {
            response.setContentType("aplication/json");
            objGrupo = new GrupoDAO(codigo_grupo);
            ArrayList<ArrayList<String>> datos_integrantes = objGrupo.extraerDatosIntegrantes(codigo_grupo);
            ArrayList<String> datos_grupo = objGrupo.extraerDatosGrupo(codigo_grupo);
            ArrayList<ArrayList<String>> datos_proyectos = objGrupo.extraerDatosProyectos(codigo_grupo);
            ArrayList<ArrayList<String>> datos_trabajos = objGrupo.extraerTrabajos(codigo_grupo);
            ArrayList<ArrayList<String>> datos_productosB = objGrupo.extraerProduccionBb(codigo_grupo);
            //ArrayList<ArrayList<String>> datos_Eventos = objGrupo.extraerDatosEventos(codigo_grupo);
            json = new Gson().toJson(datos_integrantes);
            json_1 = new Gson().toJson(datos_grupo);
            json_2 = new Gson().toJson(datos_proyectos);
            json_3 = new Gson().toJson(datos_trabajos);
            json_4 = new Gson().toJson(datos_productosB);
            //json_5 = new Gson().toJson(datos_Eventos);
            response.getWriter().write("[" + json_1 + "," + json + "," + json_2 + "," + json_4 + "," + json_6 + "," + json_5 + "," + json_3 + "]");
        }

        if (infoGrupo != null && infoLider != null && infoIntegrantes != null && infoProyectos != null && infoTrab != null && infoPonente != null && infoConocimiento != null && infoConvo != null) {
            d_grupo = infoGrupo.split(";;");
            d_lider = infoLider.split(";;");
            d_integrantes = infoIntegrantes.split(">>");
            System.out.println("Grupo-->" + infoGrupo);
            System.out.println("Integrantes-->" + infoIntegrantes);
            System.out.println("Proyectos-->" + infoProyectos);
            System.out.println("Trabajos-->" + infoTrab);
            System.out.println("Eventos-->" + infoPonente);
            System.out.println("Nuevo Conocimiento-->" + infoConocimiento);
            objGrupo = new GrupoDAO(d_grupo[0]);
            objGrupo.registrarGrupo(infoGrupo);
            String [] datos_lider=infoLider.split(";;");
            String [] datos_Integrantes = infoIntegrantes.split(">>");
            objGrupo.registrarLider(datos_lider[0], datos_lider[1],datos_Integrantes[0]);
            objGrupo.procesarIntegrantes(infoIntegrantes);
            objGrupo.procesarProyecto(infoProyectos);
            objGrupo.procesarTrabajos(infoTrab);
            objGrupo.procesarEventosGeneral(infoPonente);
            objGrupo.procesarNuevoConocimiento(infoConocimiento);
            objGrupo.procesarDesarrolloTecn(infoDT);

            response.getWriter().write("[+------------------+]");
        }

        if (usuario != null) {
            String id = objGrupo.obtenerId(usuario);
            if (!"".equals(id)) {
                response.getWriter().write(id);
            } else {
                response.getWriter().write("###");
            }
        }

    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
