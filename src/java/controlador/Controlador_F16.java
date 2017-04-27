/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import com.google.gson.Gson;
import dao.ProyectoDAO;
import java.io.IOException;
//import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Edwin Rubiano
 */
public class Controlador_F16 extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    ProyectoDAO pyt;

    public Controlador_F16() {
        pyt = new ProyectoDAO();
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String json;
        String coincidencia = request.getParameter("coincidencia_nm_coinv");
        String nombre_completo = request.getParameter("coinv_nm_completo");
        String nombres_coinvestigadores = request.getParameter("nm_coinvestigadores");
        String nombres_convocatorias = request.getParameter("nm_convocatorias");
        
        response.setContentType("aplication/json");
        response.setCharacterEncoding("UTF-8");

        if (coincidencia != null) {            
            ArrayList<String> names = pyt.extraerNombre(coincidencia.toUpperCase());
            json = new Gson().toJson(names);
//            response.setContentType("aplication/json");
//            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
        }
        
        if(nombre_completo != null){
            ArrayList<String> datos = pyt.extraerDatosIntegrantes(nombre_completo);
            json = new Gson().toJson(datos);
            System.out.println(json+" >>>>>>>>>>>>>>>");
            response.getWriter().write(json);
        }
        
        if("Nombres".equals(nombres_coinvestigadores)){            
            ArrayList<String> datos = pyt.extraerNombresIntegrantes();
            json = new Gson().toJson(datos);
            System.out.println(json+" >>>>>>>>>>>>>>>>");
            response.getWriter().write(json);
        }
        
        if("Nombres".equals(nombres_convocatorias)){            
            ArrayList<String> convocatoria = pyt.mostrarConvocatoria();
            json = new Gson().toJson(convocatoria);
            System.out.println(json+" >>>>>>>>>>>>>>>>");
            response.getWriter().write(json);
        }
        //String infoProyecto = request.getParameter("infoProyecto");
        //System.out.println(infoProyecto);
        //pyt.registrarProyecto(infoProyecto);

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
