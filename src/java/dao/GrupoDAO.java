/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dao;

import conexion.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 *
 * @author LUISA
 */
public class GrupoDAO {

    private Statement s;
    private ResultSet rs;
    private Connection con;
    private PreparedStatement pre;
    String codGrupo = "";

    public GrupoDAO(String codigo) {
        this.codGrupo = codigo;
        try {
            con = Conexion.getConexion();
            this.s = con.createStatement();
        } catch (SQLException e) {
            System.out.println("No se ha creado el statement");
        }

    }

    public GrupoDAO() {
        try {
            con = Conexion.getConexion();
            this.s = con.createStatement();
        } catch (SQLException e) {
            System.out.println("No se ha creado el statement");
        }
    }

    public void setCodGrupo(String codGrupo) {
        this.codGrupo = codGrupo;
    }

    public int validarSesion(String u, String p) {
        try {
            String sql = "SELECT count(*) FROM usuarios where usuario='" + u + "' and pass='" + p + "'";
            rs = s.executeQuery(sql);
            rs.next();
            if (rs.getInt(1) == 1) {
                return 1;
            }

        } catch (Exception e) {
            System.out.println("Fallo método validarSesion " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset sesión cerrado");
                }
            } catch (Exception e) {
                System.out.println("Fallo cerrar rs sesión");
            }
        }
        return 0;
    }

    public String obtenerId(String u) {
        String idg = "";
        try {
            String sql = "SELECT idgrupo FROM grupos_investigacion WHERE usuario='" + u + "'";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                idg = rs.getString(1);
                System.out.println("Entro while sacar idgrupo");
            }
        } catch (Exception e) {
            System.out.println("Error método sacar idgrupo " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Cerrado resultset obtener id");
                }
            } catch (Exception e) {
                System.out.println("Fallo sacar el id grupo con el usuario " + e.getMessage());
            }
        }
        return idg;
    }

    public void registrarGrupo(String cadenaGrupo) {
        String gr[] = cadenaGrupo.split(";;");
//        for (int j = 0; j < gr.length; j++) {
//            System.out.println("\n" + j + "" + gr[j]);
//        }
        /*String [] arr = gr[8].split("/");
         String fechaf = Integer.parseInt(arr[0])+"/"+Integer.parseInt(arr[1])+"/"+Integer.parseInt(arr[2]);
         System.out.println("fecha formacion construida -> "+fechaf);
         */
        String resul = "Error al registrar el grupo";
        int total = 1;
        int z = 0;
        try {

            GregorianCalendar cal = new GregorianCalendar();
            String fechainsc = cal.get(Calendar.DAY_OF_MONTH) + "/" + (cal.get(Calendar.MONTH) + 1) + "/" + cal.get(Calendar.YEAR);
            System.out.println("fehca de sistema ->" + fechainsc);
//dd/mm/aaaa
            z = s.executeUpdate("INSERT INTO grupos_investigacion"
                    + " (idgrupo,"
                    + "nombre,"
                    + "sigla,"
                    + "clasificacion,"
                    + "categoria,"
                    + "codigo_colciencias,"
                    + "areacono,"
                    + "correo,"
                    + "centro_investigacion,"
                    + "pertenece,"
                    + "fecha_formacion,"
                    + "areaprin,"
                    + "areasecun,"
                    + "testudiantespre,"
                    + "testudiantespos,"
                    + "tauxiliaresinv,"
                    + "tcoinvestext,"
                    + "tjovenesinv,"
                    + "tinvjunior,"
                    + "tinvasociados,"
                    + "tinvseniors,"
                    + "mision,"
                    + "vision,"
                    + "objetivos,"
                    + "prospectiva,"
                    + "area_tematica,"
                    + "linea_investigacion,"
                    + "linea_institucional,"
                    + "linea_profundizacion,"
                    + "servicioext,"
                    + "fecha_inscripcion,"
                    //+"fecha_actualizacion,"
                    + "idfacultad,"
                    + "departamento,"
                    + "ciudad,"
                    + "usuario,"
                    + "areacono_gn) values ("
                    + "'" + codGrupo + "',"
                    + "'" + gr[1] + "',"
                    + "'" + gr[2] + "',"
                    + "'" + gr[3] + "',"
                    + "'" + gr[4] + "',"
                    + "'" + gr[5] + "',"
                    + "'" + gr[6] + "',"
                    + "'" + gr[7] + "',"
                    + "'" + gr[8] + "',"
                    + "'" + gr[9] + "'," //pertenece
                    + "'" + gr[10] + "',"
                    + "'" + gr[13] + "',"
                    + "'" + gr[14] + "',"
                    + "" + Integer.parseInt(gr[15]) + "," //fechaforma,ubicacion,area prin, areasecon
                    + "" + Integer.parseInt(gr[16]) + ","
                    + "" + Integer.parseInt(gr[17]) + ","
                    + "" + Integer.parseInt(gr[18]) + "," //x3 total
                    + "" + Integer.parseInt(gr[19]) + ","
                    + "" + Integer.parseInt(gr[20]) + ","
                    + "" + Integer.parseInt(gr[21]) + ","//x3 total
                    + "" + Integer.parseInt(gr[22]) + ","
                    + "'" + gr[23] + "',"
                    + "'" + gr[24] + "',"
                    + "'" + gr[25] + "',"
                    + "'" + gr[26] + "',"
                    + "'" + gr[27] + "',"//vision,objetivos,prospectiva
                    + "'" + gr[28] + "',"
                    + "'" + gr[29] + "',"
                    + "'" + gr[30] + "',"//area_tematica,lineainv,servicioext
                    + "'" + gr[31] + "',"
                    + "'" + fechainsc + "',"
                    + "" + Integer.parseInt(gr[32]) + "," //idfacultad
                    + "'" + gr[11] + "',"
                    + "'" + gr[12] + "',"
                    + "'" + gr[33] + "',"
                    + "'" + gr[34] + "')");//fechainsc,idfacultad
            //incluir el usuario, el grupo a que usuario pertenece
            if (z == 1) {
                resul = "Se ha registrado el grupo correctamente!\n";
                System.out.println(resul);
            }
            //s.close();
        } catch (NumberFormatException | SQLException e) {
            System.out.println("Error registrarGrupo " + e.getMessage());
            resul += "*" + e.getMessage();
        }

    }

    public void procesarProductosTn() {

    }

    public void registrarLider(String tarjetapf, String titulo, String infoLider) {
        int z = 0;
        String lider[] = infoLider.split(";;");
//        for(int k =0; k<lider.length; k++){
//            //System.out.println("\n"+k+"->"+lider[k]);
//        }
//        String correo = lider[3].replace('@', '$');
        String msg = "Error al registrar el lider"; //cedula cambia a tarjea profesional
        System.out.println("1111111 " + lider[1]);
        try {
            z = s.executeUpdate(""
                    + "INSERT INTO integrantes "
                    + "(cedula,"
                    + "fecha_expedicion,"
                    + "estado_civil,"
                    + "nombre,"
                    + "correspondencia,"
                    + "correo,"
                    + "telefono,"
                    + "formacion,"
                    + "titulo_academico,"
                    + "tarjeta_profesional,"
                    + "tipo_vinculacion,"
                    + "universidad_externa,"
                    + "clasificacion_col,"
                    + "fecha_ingreso)"
                    + " values "
                    + "('" + lider[1] + "'," //cedula
                    + "'" + lider[2] + "'," //fecha expedicion
                    + "'" + lider[3] + "'," //estado civil
                    + "'" + lider[0] + "'," //nombre
                    + "'" + lider[4] + "'," //correspondencia
                    + "'" + lider[5] + "'," //correo
                    + "'" + lider[6] + "'," //telefono cambiar a varchar2 bd
                    + "'" + lider[7] + "'," //formacion
                    + "'" + titulo + "'," //titulo academico
                    + "'" + tarjetapf + "'," //tarjeta profesional
                    + "'" + lider[8] + "'," //tipo vinculacion
                    + "'" + lider[9] + "'," //universidad externa
                    + "'" + lider[10] + "'," //clasificacion colciencias
                    + "'" + lider[11] + "')"); //fecha ingreso
            if (z == 1) {
                System.out.println("Se ha registrado correctamente el lider");
                registrarIntegranteGrupo(lider[1], lider[13]);
            }
        } catch (Exception e) {
            System.out.println("Error método registrarLider\n" + e.getMessage());
        }

    }

    public void registrarIntegranteGrupo(String cedula, String tipov) {
        System.out.println("cedula método registrar integ gr " + cedula);
        int z = 0;
        try {
            z = s.executeUpdate("INSERT INTO integrantes_grupo"
                    + "(idgrupo,"
                    + "cedula,"
                    + "tipo_vinculacion) "
                    + "values "
                    + "('" + codGrupo + "',"
                    + "'" + cedula + "',"
                    + "'" + tipov + "')");
            if (z == 1) {
                System.out.println("Relacionado correctamente integ y grupo tb intermedia");
            }
        } catch (SQLException e) {
            System.out.println("Problema relacionar integ. grupo " + e.getMessage());
        }
    }

///////////////////////////////////////Inscripcion  
    public void procesarIntegrantes(String cadenaI) {
        String filas[] = cadenaI.split(">>");
        for (int i = 1; i < filas.length; i++) {
            String aux[] = filas[i].split(";;");
            registrarIntegrantes(aux);
        }
    }
////////////////////////////////////////Actualizacion inscripcion

    public void procesarIntegrantesActualizacion(String cadenaI) {
        String filas[] = cadenaI.split(">>");
        for (String fila : filas) {
            String[] aux = fila.split(";;");
            registrarIntegrantes(aux);
        }
    }

    public void registrarIntegrantes(String aux[]) {
        int z = 0;
        String msg = "Error al registrar los integrantes";
        try {
            z = s.executeUpdate("INSERT INTO integrantes "
                    + "(cedula,"
                    + "fecha_expedicion,"
                    + "estado_civil,"
                    + "nombre,"
                    + "correspondencia,"
                    + "correo,"
                    + "telefono,"
                    + "formacion,"
                    + "tipo_vinculacion,"
                    + "universidad_externa,"
                    + "clasificacion_col,"
                    + "fecha_ingreso) values "
                    + "('" + aux[1] + "'," //cedula
                    + "'" + aux[2] + "'," //fecha expedición
                    + "'" + aux[3] + "'," //estado civil
                    + "'" + aux[0] + "'," //nombre
                    + "'" + aux[4] + "'," //correspondencia
                    + "'" + aux[5] + "'," //correo
                    + "'" + aux[6] + "'," //telefono
                    + "'" + aux[7] + "'," //formación
                    + "'" + aux[8] + "'," //tipo vinculación
                    + "'" + aux[9] + "'," //universidad externa
                    + "'" + aux[10] + "'," //clasificación colciencias
                    + "'" + aux[11] + "')");  //fecha ingreso

            if (z == 1) {
                System.out.println("Se ha registrado correctamente el integrante\n");
                registrarIntegranteGrupo(aux[1], aux[13]);
            }
        } catch (Exception e) {
            System.out.println("Error método registrarIntegrante\n" + e.getMessage());
        }
    }

    public void actualizarGrupo(String sentencia) {
        int z = 0;
        //sentencia = sentencia.replace('@','$');
        try {
            //pre = con.prepareStatement(sentencia);
            z = s.executeUpdate(sentencia);

            if (z == 1) {
                System.out.println("Se ha actualizdo Correctemente el Grupo\n");
            }
        } catch (SQLException e) {
            System.out.println("Error método Actualizar Grupo\n" + e.getMessage());
        }
    }

    public void procesarActualizarIntegrantes(String sentencias) {
        String[] integrantes = sentencias.split(">>");

        for (String integrante : integrantes) {
            actualizarIntegrante(integrante);
        }
    }

    public void actualizarIntegrante(String sentencia) {
        int z;
        //sentencia = sentencia.replace('@','$');
        try {
            //pre = con.prepareStatement(sentencia);
            z = s.executeUpdate(sentencia);

            if (z == 1) {
                System.out.println("Se ha actualizdo Correctemente el Integrante\n");
            }
        } catch (SQLException e) {
            System.out.println("Error método Actualizar Integrante\n" + e.getMessage());
        }
    }

    public ArrayList<String> extraerDatosGrupo(String codigo_grupo) {
        ArrayList<String> grupo = new ArrayList<>();
        try {
            String sql = "SELECT IDGRUPO, NOMBRE, SIGLA, CLASIFICACION, CATEGORIA, CODIGO_COLCIENCIAS, AREACONO, CORREO, CENTRO_INVESTIGACION, PERTENECE, FECHA_FORMACION, AREAPRIN, AREASECUN, TESTUDIANTESPRE, TESTUDIANTESPOS, TAUXILIARESINV, TCOINVESTEXT, TJOVENESINV, TINVJUNIOR, TINVASOCIADOS, TINVSENIORS, MISION, VISION, OBJETIVOS, PROSPECTIVA, AREA_TEMATICA, LINEA_INVESTIGACION, LINEA_INSTITUCIONAL, LINEA_PROFUNDIZACION, SERVICIOEXT, FECHA_INSCRIPCION, FECHA_ACTUALIZACION, DEPARTAMENTO, CIUDAD, AREACONO_GN FROM grupos_investigacion where idgrupo='" + codigo_grupo + "'";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                for (int i = 1; i <= 35; i++) {
                    grupo.add(rs.getString(i));
                }
            }
        } catch (Exception e) {
            System.out.println("Problema al extraer grupo: " + e.getMessage());
        } finally {
            try {

                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado");
                }

            } catch (Exception e) {
            }
        }
        return grupo;
    }

    public ArrayList<ArrayList<String>> extraerDatosIntegrantes(String codigo_grupo) {
        ArrayList<ArrayList<String>> integrantes = new ArrayList<ArrayList<String>>();
        int fila = 0;
        try {
            String sql = "SELECT i.CEDULA, i.NOMBRE, i.FECHA_EXPEDICION, i.ESTADO_CIVIL, i.CORRESPONDENCIA, i.CORREO, i.TELEFONO, i.FORMACION, i.TITULO_ACADEMICO, i.TARJETA_PROFESIONAL, i.TIPO_VINCULACION, i.UNIVERSIDAD_EXTERNA, i.CLASIFICACION_COL,i.FECHA_INGRESO,i.FECHA_RETIRO,t.TIPO_VINCULACION FROM integrantes i join integrantes_grupo t on t.cedula=i.cedula join grupos_investigacion g on t.idgrupo=g.idgrupo where g.idgrupo='" + codigo_grupo + "'";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                integrantes.add(new ArrayList<String>());
                for (int i = 1; i < 17; i++) {
                    integrantes.get(fila).add(rs.getString(i));
                }
                fila += 1;
            }
        } catch (Exception e) {
            System.out.println("Problema al extraer integrantes <>: " + e.getMessage());
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

    public ArrayList<ArrayList<String>> extraerDatosProyectos(String codigo_grupo) {
        ArrayList<ArrayList<String>> proyectos = new ArrayList<ArrayList<String>>();
        int fila = 0;
        try {
            String sql = "select p.nombre_proyecto, p.fuentes_financiacion, p.fecha_inicio, p.fecha_termina,i.nombre, (SELECT string_agg(r.resultado_producto,',' ORDER BY r.resultado_producto) FROM RESULTADOS_ESPERADOS r join proyectos y on r.idproyecto=y.idproyecto where y.idproyecto=p.idproyecto),p.estado_actual from proyectos p join integrantes_proyectos ip on p.IDPROYECTO=ip.IDPROYECTO join integrantes_grupo ig on ig.CEDULA=ip.CEDULA join integrantes i on i.cedula=ig.cedula  where p.IDGRUPO='" + codigo_grupo + "'";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                proyectos.add(new ArrayList<String>());
                for (int i = 1; i < 8; i++) {
                    proyectos.get(fila).add(rs.getString(i));
                }
                fila += 1;
            }
        } catch (Exception e) {
            System.out.println("Problema al extraer integrantes: " + e.getMessage());
        } finally {
            try {

                if (rs != null) {
                    rs.close();
                    System.out.println("Resulset cerrado");
                }

            } catch (Exception e) {
            }
        }
        return proyectos;
    }

    public ArrayList<String> listarIntegrantes() {
        ArrayList<String> integrantes = new ArrayList<>();
        try {
            String sql = "SELECT nombre FROM integrantes order by nombre";
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

    public ArrayList<String> listarGrupoBasicos(String u) {
        ArrayList<String> infoBasica = new ArrayList<>();
        System.out.println("-> " + u);
        try {
            String sql = "SELECT nombre, sigla, centro_investigacion, pertenece FROM grupos_investigacion "
                    + "where usuario='" + u + "'";
            //System.out.println(sql);
            rs = s.executeQuery(sql);
            rs.next();
            for (int i = 1; i < 5; i++) {
                infoBasica.add(rs.getString(i));
            }
        } catch (Exception e) {
            System.out.println("Error obtener infobasica del grupo " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Cerrado resulset listar info basica del grupo");
                }
            } catch (Exception e) {
                System.out.println("Error cerrar resulset info basica grupo " + e.getMessage());
            }
        }
        return infoBasica;
    }

    public int cantidadIntegrantes(String id) {
        int cant = 0;
        try {
            String sql = "SELECT COUNT(*) FROM integrantes WHERE idgrupo='" + id + "'";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                cant = rs.getInt(1);
            }
        } catch (Exception e) {
            System.out.println("Problema obtener la cantidad integrantes del grupo " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Cerrado resulset cantidad integrantes");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrando resulset cantidad integrantes " + e.getMessage());
            }
        }
        return cant;
    }

    public ArrayList<String> listarDocentes(String id) {
        ArrayList<String> docentes = new ArrayList<>();
        try {
            String sql = "SELECT nombre FROM integrantes WHERE idgrupo='" + id + "' and tipo_vinculacion like 'Profesor%'";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                docentes.add(rs.getString(1));
            }
        } catch (Exception e) {
            System.out.println("Problema listar docentes " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Cerrado resulset listar docentes");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrando resultset doc " + e.getMessage());
            }
        }
        return docentes;
    }

    public ArrayList<String> listarEstudiantes(String id) {
        ArrayList<String> estud = new ArrayList<>();
        try {
            String sql = "SELECT nombre FROM integrantes WHERE idgrupo='" + id + "' and tipo_vinculacion like 'Estudiante%'";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                estud.add(rs.getString(1));
            }
        } catch (Exception e) {
            System.out.println("Problema listar estudiantes " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Cerrado resulset listar estudiante");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrando resultset estud " + e.getMessage());
            }
        }
        return estud;
    }

    public String listarNombreLider(String id) {
        String nmb = "";
        try {
            String sql = "SELECT nombre FROM integrantes WHERE idgrupo='" + id + "' AND tarjeta_profesional IS NOT NULL";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                nmb = rs.getString(1);
            }
        } catch (Exception e) {
            System.out.println("Problema listar nombre lider " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Cerrado resulset listar nmb lider");
                }
            } catch (Exception e) {
                System.out.println("Problema cerrando resultset nmb lid " + e.getMessage());
            }
        }
        return nmb;
    }

    public ArrayList<ArrayList<String>> extraerTrabajos(String id_grupo) {
        ArrayList<ArrayList<String>> integrantes_t = new ArrayList<>();
        int fila = 0;
        try {
            String sql1 = "select t.tipo_producto, t.nombre_producto, i.nombre, t.estudiante_orientado, t.categoria, t.institucion, t.entidad_financiadora, t.estado, t.fecha_inicio, t.fecha_termina from integrantes_grupo ig join integrantes i on ig.cedula=i.cedula join trabajos t on i.cedula=t.cedula where ig.idgrupo='" + id_grupo + "'";
            rs = s.executeQuery(sql1);
            while (rs.next()) {
                integrantes_t.add(new ArrayList<String>());
                for (int i = 0; i < 10; i++) {
                    integrantes_t.get(fila).add(rs.getString(i + 1));
                }
                fila++;
            }
        } catch (Exception e) {
            System.out.println("Fallo listar trabajos por grupo " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resultset trabajos cerrado");
                }
            } catch (Exception e) {
                System.out.println("Fallo cerrar resultset trabajos " + e.getMessage());
            }
        }
        return integrantes_t;
    }

    public ArrayList<ArrayList<String>> extraerProduccionBb(String id_grupo) {
        ArrayList<ArrayList<String>> integrantes_Pb = new ArrayList<>();
        int fila = 0;
        try {
            String sql = "select distinct c.idconocimiento ,c.TIPO_PRODUCTO, c.CLASIFICACION2, c.CLASIFICACION,c.NOMBRE_PRODUCTO, (SELECT string_agg(b.NOMBRE,',' ORDER BY b.NOMBRE) FROM NUEVO_CONOCIMIENTO n JOIN AUTORES e ON n.IDCONOCIMIENTO=e.IDCONOCIMIENTO JOIN INTEGRANTES b ON b.CEDULA=e.CEDULA join integrantes_grupo j on  b.cedula=j.cedula WHERE n.IDCONOCIMIENTO=c.idconocimiento GROUP BY n.IDCONOCIMIENTO) as Autores,c.nombre_revista, c.nombre_libro, c.volumen, c.num_fasciculo, c.pagina_inicial, c.pagina_final, c.urrl,c.serie, c.year,c.editorial, c.isbn, c.pais, c.ciudad, c.estado_producto from nuevo_conocimiento c inner join autores a on c.idconocimiento=a.idconocimiento inner join integrantes i on i.cedula=a.cedula inner join integrantes_grupo ig on i.cedula=ig.cedula where ig.idgrupo='" + id_grupo + "' order by c.IDCONOCIMIENTO";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                integrantes_Pb.add(new ArrayList<String>());
                for (int i = 0; i < 20; i++) {
                    integrantes_Pb.get(fila).add(rs.getString(i + 1));
                }
                fila++;
            }
        } catch (Exception e) {
            System.out.println("Fallo listar ProductosBb por grupo " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resultset ProductosBb cerrado");
                }
            } catch (Exception e) {
                System.out.println("Fallo cerrar resultset trabajos " + e.getMessage());
            }
        }
        return integrantes_Pb;
    }

    public ArrayList<ArrayList<String>> extraerProduccionDt(String id_grupo) {
        ArrayList<ArrayList<String>> integrantes_Pd = new ArrayList<>();
        int fila = 0;
        try {
            String sql = "select distinct c.idconocimiento ,c.TIPO_PRODUCTO, c.CLASIFICACION_PB, c.CUARTIL,c.NOMBRE, (SELECT LISTAGG(b.NOMBRE,',') WITHIN GROUP (ORDER BY b.NOMBRE) FROM NUEVO_CONOCIMIENTO n JOIN AUTORES e ON n.IDCONOCIMIENTO=e.IDCONOCIMIENTO JOIN INTEGRANTES b ON b.CEDULA=e.CEDULA WHERE n.IDCONOCIMIENTO=c.idconocimiento GROUP BY n.IDCONOCIMIENTO) as Autores,c.nombre_revista, c.nombre_libro, c.volumen, c.num_fasciculo, c.pagina_inicial, c.pagina_final, c.urrl,c.serie, c.year,c.editorial, c.isbn, c.pais, c.ciudad, c.estado_producto from nuevo_conocimiento c inner join autores a on c.idconocimiento=a.idconocimiento inner join integrantes i on i.cedula=a.cedula where i.idgrupo='" + id_grupo + "' order by c.IDCONOCIMIENTO";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                integrantes_Pd.add(new ArrayList<String>());
                for (int i = 0; i < 21; i++) {
                    integrantes_Pd.get(fila).add(rs.getString(i + 1));
                }
                fila++;
            }
        } catch (Exception e) {
            System.out.println("Fallo listar ProductosBb por grupo " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resultset ProductosBb cerrado");
                }
            } catch (Exception e) {
                System.out.println("Fallo cerrar resultset trabajos " + e.getMessage());
            }
        }
        return integrantes_Pd;
    }

    public ArrayList<ArrayList<String>> extraerDatosEventos(String id_grupo) {
        ArrayList<ArrayList<String>> integrantes_Ev = new ArrayList<>();
        int fila = 0;
        try {
            String sql = "select distinct e.idevento , e.TIPO_EVENTO, e.NOMBRE_EVENTO, (SELECT LISTAGG(a.NOMBRE,',') WITHIN GROUP (ORDER BY a.NOMBRE) FROM eventos b JOIN INTEGRANTES_EVENTOS c ON b.idevento=c.idevento JOIN INTEGRANTES a ON a.CEDULA=c.CEDULA WHERE b.idevento=e.idevento GROUP BY b.IDEVENTO) as Autores,e.PARTICIPACION, e.PRODUCTOS, e.NOMBRE_PONENCIA, e.ENTIDAD_ORGANIZADORA, e.ENTIDAD_FINANCIADORA, e.AMBITO, e.PAIS, e.CIUDAD, e.FECHA_INICIO, e.FECHA_TERMINA, e.YEAR from eventos e inner join INTEGRANTES_EVENTOS t on e.idevento=t.idevento inner join integrantes i on i.cedula=t.cedula where i.idgrupo='" + id_grupo + "' order by e.idevento";
            rs = s.executeQuery(sql);
            while (rs.next()) {
                integrantes_Ev.add(new ArrayList<String>());
                for (int i = 0; i < 15; i++) {
                    integrantes_Ev.get(fila).add(rs.getString(i + 1));
                }
                fila++;
            }
        } catch (Exception e) {
            System.out.println("Fallo listar ProductosBb por grupo " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                    System.out.println("Resultset ProductosBb cerrado");
                }
            } catch (Exception e) {
                System.out.println("Fallo cerrar resultset trabajos " + e.getMessage());
            }
        }
        return integrantes_Ev;
    }
}
