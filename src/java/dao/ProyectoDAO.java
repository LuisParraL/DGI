/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import conexion.Conexion;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

/**
 *
 * @author Sandra
 */
public class ProyectoDAO {

    private Connection con;
    private Statement s;
    private ResultSet rs, rs1;

    public ProyectoDAO() {
        try {
            this.con = Conexion.getConexion();
            this.s = con.createStatement();
            rs = null;
        } catch (SQLException e) {
            System.out.println("Problema constructor proyecto: " + e.getMessage());
        }
    }

    public ArrayList<String> mostrarConvocatoria() {
        ArrayList<String> nombres = new ArrayList<>();
        try {
            String sql = "SELECT nombre FROM convocatorias";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                nombres.add(rs.getString("nombre"));
            }
        } catch (Exception e) {
            System.out.println("Problema al mostrar convocatoria: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado");
                }

            } catch (Exception e) {
            }
        }
        return nombres;
    }

    public ArrayList<String> listarIntegrantes() {
        ArrayList<String> integrantes = new ArrayList<>();
        try {
            String sql = "SELECT nombre FROM integrantes";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                integrantes.add(rs.getString("nombre"));
            }
        } catch (Exception e) {
            System.out.println("Problema al mostrar integrantes: " + e.getMessage());
        } finally {
            try {

                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado");
                }

            } catch (Exception e) {
            }
        }
        return integrantes;
    }

    public ArrayList<String> extraerNombre(String coincidencia) {
        ArrayList<String> nombres = new ArrayList<>();
        try {
            String sql = "SELECT nombre FROM integrantes WHERE nombre LIKE '" + coincidencia + "%'";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                nombres.add(rs.getString("nombre"));
            }
        } catch (Exception e) {
            System.out.println("Problema al extraer Nombres: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado");
                }

            } catch (Exception e) {
            }
        }
        return nombres;
    }

    public ArrayList<String> extraerNombresIntegrantes() {
        ArrayList<String> nombres = new ArrayList<>();
        try {
            String sql = "SELECT nombre FROM integrantes";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                nombres.add(rs.getString("nombre"));
            }
        } catch (Exception e) {
            System.out.println("Problema al extraer Nombres: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado");
                }

            } catch (Exception e) {
            }
        }
        return nombres;
    }

    public ArrayList<String> extraerDatosIntegrantes(String nombre) {
        ArrayList<String> nombres = new ArrayList<>();
        try {
            String sql = "SELECT cedula, telefono, fecha_ingreso, formacion, correo, estado_civil, correspondencia  FROM integrantes WHERE nombre='" + nombre + "'";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                nombres.add(rs.getString("cedula"));
                nombres.add(rs.getString("telefono"));
                nombres.add(rs.getString("fecha_ingreso"));
                nombres.add(rs.getString("formacion"));
                nombres.add(rs.getString("correo"));
                nombres.add(rs.getString("estado_civil"));
                nombres.add(rs.getString("correspondencia"));
            }
        } catch (Exception e) {
            System.out.println("Problema al extraer Nombres: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado");
                }

            } catch (Exception e) {
            }
        }
        return nombres;
    }

    public void registrarProyecto(String infoProyecto) {

        int z = 0;
        String pro[] = infoProyecto.split(";;");
        String msg = "Error al registrar el proyecto"; //cedula cambia a tarjea profesional
        try {
            z = s.executeUpdate("INSERT INTO ADMINDGI.proyectos "
                    + "(idproyecto,"
                    + "nombreproyecto,"
                    + "nombreconvocatoria,"
                    + " tipo_convocatoria,"
                    + " lineainv,"
                    + "centroinv,"
                    + "lugar_ejecucion,"
                    + " ciudad,"
                    + " departamento,"
                    + "duracion,"
                    + "financiacionsol,"
                    + "valor_efectivo,"
                    + "valor_especie,"
                    + "valor_total,"
                    + " tipo_proyecto,"
                    + "resumen,"
                    + " descripcion,"
                    + "objetivo_general,"
                    + "metodologiapro,"
                    + "idgrupo) values "
                    + "(secuencia_pro.nextval,"
                    + "'" + pro[0] + "',"
                    + "'" + pro[1] + "',"
                    + "'" + pro[2] + "',"
                    + "'" + pro[3] + "',"
                    + "'" + pro[4] + "',"
                    + "'" + pro[5] + "',"
                    + "'" + pro[6] + "',"
                    + "'" + pro[7] + "',"
                    + "" + Integer.parseInt(pro[8]) + ","
                    + "" + Long.parseLong(pro[9]) + ","
                    + "" + Long.parseLong(pro[10]) + ","
                    + "" + Long.parseLong(pro[11]) + ","
                    + "" + Long.parseLong(pro[12]) + ","
                    + "'" + pro[13] + "',"
                    + "'" + pro[14] + "',"
                    + "'" + pro[15] + "',"
                    + "'" + pro[16] + "',"
                    + "'" + pro[17] + "',"
                    + "'123')"); //cambiar al codigo del grupo
            if (z == 1) {
                System.out.println("Se ha registrado correctamente el pro");
            }
        } catch (Exception e) {
            System.out.println("Error método registrarProyecto\n" + e.getMessage());
        }

    }
//****************************************************************************************************************

    public void procesarProyecto(String infoG) {
        String[] filas = infoG.split(">>");
        for (int i = 0; i < filas.length; i++) {
            String[] proyecto = filas[i].split(";;");
            buscarCedulaId(proyecto);
        }
    }

    public void buscarCedulaId(String[] datos) {
        String[] auxDatos = datos;
        System.out.println("----- " + auxDatos[0]);
        String sql = "SELECT cedula FROM integrantes WHERE nombre='" + auxDatos[1] + "'";
        String sql2 = "SELECT max(idproyecto) FROM proyectos";
        String cedula = "";
        Long id = 0L;
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                cedula = rs.getString("cedula");
                System.out.println("Entro cedula" + cedula + " ///");
            }

        } catch (Exception e) {
            System.out.println("Problema al traer la cédula " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado cedula");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset cedula " + e.getMessage());
            }
        }
        try {
            rs1 = s.executeQuery(sql2);
            while (rs1.next()) {
                id = rs1.getLong(1);
                System.out.println("Entro nextval");
            }
        } catch (Exception e) {
            System.out.println("Problema al traer el nextval " + e.getMessage());
        } finally {
            try {
                if (rs1 != null) {
                    rs1.close();
                    System.out.println("Resulset cerrado id");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset " + e.getMessage());
            }
        }
        registrarProyectoCursoTerminado(cedula, id, auxDatos);
    }

    public void registrarProyectoCursoTerminado(String cedula, Long id, String[] infoG) {
        int z = 0;
        String ced = cedula;
        String prod = infoG[4];
        Long id2 = (id+1);
        System.out.println("Cedula: " + cedula + " id:" + id + " -->" + infoG[2]);
        try {
            //rs=s.executeQuery(sqlId);
            //rs.next();
            //Long id = rs.getLong(1);
            z = s.executeUpdate("INSERT INTO proyectos ("
                    + "idproyecto,"
                    + "nombre_proyecto,"
                    + "fecha_inicio,"
                    + "fecha_termina,"
                    + "estado_actual,"
                    + "fuentes_financiacion,"
                    + "idgrupo) VALUES "
                    + "(" + id2 + ","
                    + "'" + infoG[0] + "',"
                    + "'" + infoG[2] + "',"
                    + "'" + infoG[3] + "',"
                    + "'" + infoG[5] + "',"
                    + "'" + infoG[6] + "',"
                    + "'" + infoG[7] + "')");
            if (z == 1) {
                System.out.println("Proyecto registrado en su tabla");
            }
        } catch (Exception e) {
            System.out.println("Problema registrar Proyecto en Curso " + e.getMessage());
        }
        registrarProyectoIntegrante(id2, ced);
        for (int k=0; k<prod.length(); k++) {
            String [] esp = prod.split("-"); //separar los resultados esperados por -
            registrarResultadoEsperado(id2, esp[k]);
        }
    }

    public void registrarProyectoIntegrante(Long id, String ced) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO integrantes_proyectos "
                    + "(idproyecto,"
                    + "cedula,"
                    + "cargo_proyecto) values "
                    + "(" + id + ","
                    + "'" + ced + "',"
                    + "'Investigador Principal')");
            if (z == 1) {
                System.out.println("Se ha relacionado correctamente el proyecto con el investigador");
            }
        } catch (Exception e) {
            System.out.println("Problema al relacionar proyecto e integrante\n"
                    + "un problema puede ser que no encuentra la cédula o \n"
                    + "el id no coincide con el del proyecto " + e.getMessage());
        }
    }

    public void registrarResultadoEsperado(Long idp, String producto) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO resultados_esperados "
                    + "resultado_producto,"
                    + "idproyecto) values "
                    + "('" + producto + "',"
                    + "" + idp + ")");
            if (z == 1) {
                System.out.println("se ha registrado el resultado esperado");
            }
        } catch (Exception e) {
            System.out.println("Error registrar resultado esperado " + e.getMessage());
        }
    }
//**********************************************************************************************************

    public void procesarEventosAsistente(String infoEvento) {
        String[] filas = infoEvento.split(">>");
        for (int i = 0; i < filas.length; i++) {
            String[] datos = filas[i].split(";;");
            String[] integ = datos[2].split(";");
            Long id = obtenerId();
            registrarEventoAsistente(id, datos);
            for (int j = 0; j < integ.length; j++) {
                buscarCedulas(id, integ[j]);
            }
        }
    }

    public Long obtenerId() {
        Long next = 0L;
        String sql = "SELECT secuencia_eventos.nextval from dual";
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                next = rs.getLong(1);
                System.out.println("Entro nextval");
            }
        } catch (Exception e) {
            System.out.println("Problema al traer el nextval eventos " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado id");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset " + e.getMessage());
            }
        }
        return next;
    }

    public void buscarCedulas(Long id, String integrante) {
        String sql = "SELECT cedula FROM integrantes WHERE nombre='" + integrante + "'";
        String cedula = "";
        Long aux = id;
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                cedula = rs.getString("cedula");
                System.out.println("Entro cédula integrantes eventos-->" + cedula + " Id-->" + aux);
            }
        } catch (Exception e) {
            System.out.println("Problema al obtener cedula " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado cédula evento");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset ced. event. " + e.getMessage());
            }
        }
        registrarEventoIntegrante(aux, cedula);
    }

    public void registrarEventoAsistente(Long next, String[] infoE) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO eventos "
                    + "(idevento," //falta incluir la columna nombre de evento en la bd
                    + "tipo_evento,"
                    + "nombre_evento,"
                    + "participacion,"
                    + "entidad_organizadora,"
                    + "entidad_financiadora,"
                    + "ambito,"
                    + "pais,"
                    + "ciudad,"
                    + "fecha_inicio,"
                    + "fecha_termina) values "
                    + "(" + next + ","
                    + "'" + infoE[0] + "',"
                    + "'" + infoE[1] + "',"
                    + "'" + infoE[3] + "',"
                    + "'" + infoE[4] + "',"
                    + "'" + infoE[5] + "',"
                    + "'" + infoE[6] + "',"
                    + "'" + infoE[7] + "',"
                    + "'" + infoE[8] + "',"
                    + "'" + infoE[9] + "',"
                    + "'" + infoE[10] + "')");
            if (z == 1) {
                System.out.println("Se ha registrado el evento");
            }
        } catch (Exception e) {
            System.out.println("Error al registrar el evento " + e.getMessage());
        }
    }

    public void registrarEventoIntegrante(Long id, String ced) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO integrantes_eventos "
                    + "(idevento,"
                    + "cedula) VALUES "
                    + "(" + id + ","
                    + "'" + ced + "')");
            if (z == 1) {
                System.out.println("Registrado correctamente la relación evento integrante");
            }
        } catch (Exception e) {
            System.out.println("Problema relacionar evento integrante " + e.getMessage());
        }
    }
//************************************************************************************************************

    public void procesarEventosGeneral (String infoEventoG) {
        String[] filas = infoEventoG.split(">>");
        for (int i = 0; i < filas.length; i++) {
            String[] datos = filas[i].split(";;");
            String[] integ = datos[2].split(",");
            Long id = obtenerId2();
            registrarEventoGeneral(id, datos);
            for (int j = 0; j < integ.length; j++) {
                buscarCedulas2(id, integ[j]);
            }
        }
    }

    public Long obtenerId2() {
        Long next = 0L;
        String sql = "SELECT max(idevento) from eventos";
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                next = rs.getLong(1);
                System.out.println("Entro nextval ponenente");
            }
        } catch (Exception e) {
            System.out.println("Problema al traer el serial eventos  " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado id p");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset eventos " + e.getMessage());
            }
        }
        return next;
    }

    public void buscarCedulas2(Long id, String integrante) {
        String sql = "SELECT cedula FROM integrantes WHERE nombre='" + integrante + "'";
        String cedula = "";
        Long aux = (id+1); //sumo 1
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                cedula = rs.getString("cedula");
                System.out.println("Entro cédula integrantes eventos g-->" + cedula);
            }
        } catch (Exception e) {
            System.out.println("Problema al obtener cedula g " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado cédula evento g");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset ced. event. g. " + e.getMessage());
            }
        }
        registrarEventoIntegrante2(aux, cedula);
    }

    public void registrarEventoGeneral (Long next, String[] infoE) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO eventos "
                    + "(idevento," //falta incluir la columna nombre de evento en la bd
                    + "tipo_evento,"
                    + "nombre_evento,"
                    + "participacion,"
                    + "producto,"
                    + "nombre_ponencia,"
                    + "entidad_organizadora,"
                    + "entidad_financiadora,"
                    + "ambito,"
                    + "pais,"
                    + "ciudad,"
                    + "fecha_inicio,"
                    + "fecha_termina,"
                    + "yeare) values "
                    + "(" + next + ","
                    + "'" + infoE[0] + "',"
                    + "'" + infoE[1] + "',"
                    + "'" + infoE[3] + "',"
                    + "'" + infoE[4] + "',"
                    + "'" + infoE[5] + "',"
                    + "'" + infoE[6] + "',"
                    + "'" + infoE[7] + "',"
                    + "'" + infoE[8] + "',"
                    + "'" + infoE[9] + "',"
                    + "'" + infoE[10] + "',"
                    + "'" + infoE[11] + "',"
                    + "'" + infoE[12] + "',"
                    + "'" + infoE[13] + "')");
            if (z == 1) {
                System.out.println("Se ha registrado el evento general");
            }
        } catch (Exception e) {
            System.out.println("Error al registrar el evento general " + e.getMessage());
        }
    }

    public void registrarEventoIntegrante2(Long id, String ced) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO integrantes_eventos "
                    + "(idevento,"
                    + "cedula) VALUES "
                    + "(" + id + ","
                    + "'" + ced + "')");
            if (z == 1) {
                System.out.println("Registrado correctamente la relación evento integrante g");
            }
        } catch (Exception e) {
            System.out.println("Problema relacionar evento integrante g " + e.getMessage());
        }
    }
//******************************************************************************************************************

    public void procesarNuevoConocimiento(String infoCono) {
        String[] filas = infoCono.split(">>");
        for (int i = 0; i < filas.length; i++) {
            String[] datos = filas[i].split(";;");
            String[] integ = datos[3].split(","); //al momento de registrar varios autores deben de separarlos por ,
            System.out.println("Integrantes NC-->" + datos[3]);
            Long id = obtenerId3();                 //y coincider el nombre exactamente con el ingresado anteriormente de un integrante
            registrarNuevoConocimiento(id, datos);
            for (int j = 0; j < integ.length; j++) {
                buscarCedulas3(id, integ[j]);
            }
        }
    }

    public Long obtenerId3() {
        Long next = 0L;
        String sql = "SELECT max(idconocimiento) FROM nuevo_conocimiento";
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                next = rs.getLong(1);
                System.out.println("Entro serial n. conocimiento");
            }
            next+=1; //sumo 1 
        } catch (Exception e) {
            System.out.println("Problema al traer el serial conocimiento " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado id cono");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset cono " + e.getMessage());
            }
        }
        return next;
    }

    public void buscarCedulas3(Long id, String integrante) {
        String sql = "SELECT CEDULA FROM integrantes WHERE nombre='" + integrante + "'";
        String cedula = "";
        Long aux = id;
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                cedula = rs.getString("cedula");
                System.out.println("Entro cédula integrantes conocimiento");
            }
        } catch (Exception e) {
            System.out.println("Problema al obtener cedula cono " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado cédula cono");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset ced. cono. " + e.getMessage());
            }
        }
        registrarNCAutor(aux, cedula);
    }

public void registrarNuevoConocimiento(Long next, String infoC[]) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO nuevo_conocimiento "
                    + "(idconocimiento,"
                    +"tipo_producto,"
                    +"clasificacion2,"
                    +"nombre_producto,"
                    +"autores,"
                    +"nombre_revista,"
                    +"nombre_libro,"
                    +"volumen,"
                    +"serie,"
                    +"year,"
                    +"editorial,"
                    +"clasificacion,"
                    +"isbn,"
                    +"pais,"
                    +"ciudad,"
                    +"estado_producto,"
                    +"num_fasciculo,"
                    +"pagina_inicial,"
                    +"pagina_final,"
                    +"urrl) values "
                    + "(" + next + ","       //idconocimiento
                    + "'" + infoC[0] + "',"  //tipo producto
                    + "'" + infoC[1] + "',"  //publindex (clas2)
                    + "'" + infoC[2] + "',"  //nomb prod
                    + "'" + infoC[4] + "',"  //nmb revista
                    + "'" + infoC[5] + "',"  //nmb libro
                    + "'" + infoC[6] + "',"  //volumen
                    + "'" + infoC[7] + "',"  //serie
                    + "'" + infoC[8] + "',"  //año
                    + "'" + infoC[9] + "',"  //editorial
                    + "'" + infoC[10] + "',"  //cuartil (clasnn)
                    + "'" + infoC[11] + "',"  //isbn
                    + "'" + infoC[12] + "',"  //pais
                    + "'" + infoC[13] + "',"  //ciudad
                    + "'" + infoC[14] + "',"  //estado producto
                    + "'" + infoC[15] + "',"  //n° fascicul
                    + "'" + infoC[16] + "',"  //pag ini
                    + "'" + infoC[17] + "',"  //pag final
                    + "'" + infoC[18] + "')"); //url

            if (z == 1) {
                System.out.println("Se ha registrado el nuevo. cono");
            }
        } catch (Exception e) {
            System.out.println("Error al registrar el nuevo cono " + e.getMessage());
        }
    }

    public void registrarNCAutor(Long id, String ced) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO autores "
                    + "(idconocimiento,"
                    + "cedula) VALUES "
                    + "(" + id + ","
                    + "'" + ced + "')");
            if (z == 1) {
                System.out.println("Registrado correctamente la relación NC y autor");
            }
        } catch (Exception e) {
            System.out.println("Problema relacionar NC y autor " + e.getMessage());
        }
    }
//*******************************************************************************************************    

    public void procesarTrabajos(String infoTrab) {
        String[] filas = infoTrab.split(">>");
        for (int i = 0; i < filas.length; i++) {
            String[] datos = filas[i].split(";;");
            String integ = datos[2];        //obtengo el nombre del orientador
            buscarCedula4(integ, datos);    //busco la cedula
        }
    }

    public void buscarCedula4(String nombre, String[] infoT) {
        String sql = "SELECT cedula FROM integrantes WHERE nombre='" + nombre + "'";
        String[] aux = infoT;
        String cedula = "";
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                cedula = rs.getString("cedula");
                System.out.println("Entro cédula integrantes trabajos ::: " + cedula);
            }
        } catch (Exception e) {
            System.out.println("Problema al obtener cedula trab " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado cédula trab");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset ced. trab. " + e.getMessage());
            }
        }
        registrarTrabajo(cedula, aux); //envio la cedula y datos del trabajo
    }

    public void registrarTrabajo(String ced, String[] tra) {
        int z = 0;
        System.out.println("Cedula-->" + ced + " Trabajo-->" + tra.length);
        try {
            z = s.executeUpdate("INSERT INTO trabajos "
                    + "(tipo_producto,"
                    + "nombre_producto,"
                    + "estudiante_orientado,"
                    + "categoria,"
                    + "institucion,"
                    + "entidad_financiadora,"
                    + "estado,"
                    + "fecha_inicio,"
                    + "fecha_termina,"
                    + "cedula) VALUES "
                    + "('" + tra[0] + "',"
                    + "'" + tra[1] + "',"
                    + "'" + tra[3] + "',"
                    + "'" + tra[4] + "',"
                    + "'" + tra[5] + "',"
                    + "'" + tra[6] + "',"
                    + "'" + tra[7] + "',"
                    + "'" + tra[8] + "',"
                    + "'" + tra[9] + "',"
                    + "'" + ced + "')");
            if (z==1) {
                System.out.println("Se ha registrado correctamente el trabajo ");
            }
        } catch (Exception e) {
            System.out.println("Problema registrar el trabajo con el orientador " + e.getMessage());
        }
    }
//**************************************************************************************************************
    public void procesarDesarrolloTecn(String cadenaDT) {
        String[] filas = cadenaDT.split(">>");
        for (int i = 0; i < filas.length; i++) {
            String[] datos = filas[i].split(";;");
            String[] integ = datos[3].split(","); //al momento de registrar varios autores deben de separarlos por ,
            System.out.println("Integrantes DT-->" + datos[3]);
            Long id = obtenerSerial();  //sumar 1               //y coincider el nombre exactamente con el ingresado anteriormente de un integrante
            registrarDesarrolloTecn(id, datos);
            for (int j = 0; j < integ.length; j++) {
                buscarCedulas4(id, integ[j]);
            }
            //registrarNuevoConocimiento(id, datos);
        }
    }

    public Long obtenerSerial() {
        Long id = 0L;
        String sql = "SELECT max(idtecnologico) from desarrollo_tecnologico"; //sumar 1 a el valor que llega
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                id = rs.getLong(1);
            }
            id+=1; //sumo 1
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Cerrado serial id");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar rs get serial "+e.getMessage());
            }
        } catch (SQLException e) {
            System.out.println("Problema consulta " + e.getMessage());
        }
        return id;
    }

    public void registrarDesarrolloTecn(Long id, String datos[]) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO desarrollo_tecnologico "
                    + "(idtecnologico,"
                    + "tipo_producto,"
                    + "categoria,"
                    + "nombre_producto,"
                    + "numero_registro,"
                    + "year_get,"
                    + "pais,"
                    + "gaceta) values "
                    + "(" +  id  + ","
                    + "'" + datos[0] + "',"
                    + "'" + datos[1] + "',"
                    + "'" + datos[2] + "'," //posicion 3 son autores
                    + "'" + datos[4] + "',"
                    + "'" + datos[5] + "',"
                    + "'" + datos[6] + "',"
                    + "'" + datos[7] + "')");
            if (z == 1) {
                System.out.println("Se ha registrado el desarrollo tecnologico");
            }
        } catch (SQLException e) {
            System.out.println("Error al registrar el desarrollo " + e.getMessage());
        }
    }

    public void buscarCedulas4(Long id, String integrante) {
        String sql = "SELECT cedula FROM integrantes WHERE nombre='" + integrante + "'";
        String cedula = "";
        Long aux = id;
        try {
            rs = s.executeQuery(sql);
            while (rs.next()) {
                cedula = rs.getString("cedula");
                System.out.println("Entro cédula integrantes desarrollo tec");
            }
        } catch (SQLException e) {
            System.out.println("Problema al obtener cedula desarrollo " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado cédula tecn");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrar resulset ced. tecn. " + e.getMessage());
            }
        }
        registrarDesarrolloAutor(aux, cedula);
    }

    public void registrarDesarrolloAutor(Long idt, String ced) {
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO autores_desarrollot "
                    + "(idtecnologico,"
                    + "cedula) VALUES "
                    + "(" + idt + ","
                    + "'" + ced + "')");
            if (z == 1) {
                System.out.println("Registrado correctamente la relación DT y autorDT");
            }
        } catch (SQLException e) {
            System.out.println("Problema relacionar NC y autor " + e.getMessage());
        }
    }
}

//****************************************************************************************************************
//falta convocatorias "doble via"

