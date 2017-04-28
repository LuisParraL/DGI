/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package conexion;

/**
 *
 * @author Luis Parra
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
public class Conexion {
    
    private static Connection con;
    
    public static Connection getConexion() {
        String url = "jdbc:postgresql://localhost/postgres";
        if (con == null) {
            try {
            Class.forName("org.postgresql.Driver");
            
            con = DriverManager.getConnection(url, "postgres", "dgi2017");
            if (con!=null){
                System.out.println("Conexión Establecida");
            }
            }catch(SQLException | ClassNotFoundException e) {
                System.out.println("Problemas de Conexión \n"+e.getMessage());
            }
        }
        return con;
    }
    public void desconectar () {
        con=null;
    }
}