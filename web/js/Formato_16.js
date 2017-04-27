
var a = 1, b = 1, i = 1, j = 1, k = 1, m = 1, x = 11, ant="" , nombre = "", nombres = new Array(), datoss = new Array();


function agregarColumnas() {
    var meses = "";
    for (var i = 0; i < x; i++) {
        meses += "<td><input type='checkbox' id='" + j + "c" + (i + 1) + "' value='" + (i + 1) + "' /><label for='" + j + "c" + (i + 1) + "'></label></td>";
    }
    return meses;
}


function agregarFilas() {
    var meses = "";
    for (var i = 0; i <= j; i++) {

        $("#fil" + i).append("<td><input type='checkbox' id='" + i + "c" + (x) + "' value='" + (x) + "' /><label for='" + i + "c" + (x) + "'></label></td>");
    }
    return meses;
}

function eliminarColumnas() {
    for (var i = 0; i <= j; i++) {
        $("#fil" + i + " td").last().remove();
    }
}

//AJAX
function extraerNombresConvocatorias() {
    $("#nombreconv").material_select();
    var names = "<option selected disabled></option>";
    $.ajax({
        type: 'POST',
        data: {nm_convocatorias: "Nombres"},
        url: 'Proyectos',
        success: function (result) {
            $.each(result, function (i, item) {
                names += "<option>" + item + "</option>";
            });
            $("#nombreconv").html(names);
            $("#nombreconv").material_select();
        }
    });
}

function extraerNombresIntegrantesComp(integrantes) {
    $("#invprincipal").material_select();
    var names = "<option selected disabled>Investigador principal</option>";
    $.ajax({
        type: 'POST',
        data: {nm_coinvestigadores: integrantes},
        url: 'Proyectos',
        success: function (result) {
            $.each(result, function (i, item) {
                names += "<option>" + item + "</option>";
            });
            $("#invprincipal").html(names);
            $("#invprincipal").material_select();
        }
    });
}

function extraerNombresIntegrantes(coinvestigador) {

    $.ajax({
        type: 'POST',
        data: {coincidencia_nm_coinv: coinvestigador},
        url: 'Proyectos',
        success: function (result) {
            nombres.length = 0;
            $.each(result, function (i, item) {
                nombres[i] = item;
            });
        }
    });
}

function extraerDatosIntegrantes(nombre, fila) {
    //datoss.length = 0;
    var fecha = "" + datoss[2];
    
    $.ajax({
        data: {coinv_nm_completo: nombre},
        type: 'POST',
        dataType: "json",
        url: 'Proyectos',
        success: function (result) {  
            $.each(result, function (x, item) {
                datoss[x] = item;
            });
            
            $("#identificacion_co" + fila).val(datoss[0]);
            $("#celular_co" + fila).val(datoss[1]);
            $("#fechaing_co" + fila).val(modificarFormatoFecha(fecha));
            $("#niveledu_co" + fila).val(datoss[3]);
        }
    });
    
}

function extraerDatosInvPrincipal(nombre){
    var fecha="";
    $.ajax({
        data: {coinv_nm_completo: nombre},
        type: 'POST',
        dataType: "json",
        url: 'Proyectos',
        success: function (result) {
            
            $.each(result, function (x, item) {
                datoss[x] = item;
            });
            console.info(datoss);
            fecha += datoss[2];
            $("#identificacion").val(datoss[0]);
            $("#celular").val(datoss[1]);
            $("#fechaing").val(modificarFormatoFecha(fecha));
            $("#niveledu").val(datoss[3]);
            $("#correo").val(datoss[4]);
            $("#estadocivil option:contains(" + datoss[5] + ")").prop("selected",true);
            $("#estadocivil").material_select();
            $("#direccion").prop("disabled", false);
            $("#direccion").focus();
            $("#direccion").val(datoss[6]);
            $("#direccion").prop("disabled", true);
        }
    });
}

//$.getJSON("Proyectos", {coinv_nm_completo: nombre}, function (result, est, jq) {
//    $.each(result, function (x, item) {
//        datoss[x] = item;
//    });
//});
////////////////////////////////////////////////////////////////////////

function elegirCiudad(dept) {
    var options = "";
    if (dept === "Amazonas") {
        options += "<option>Leticia</option>\n\
                    <option>Puerto Nariño</option>";
    }
    if (dept === "Antioquia") {
        options += "<option>Abejorral</option>\n\
                    <option>Abriaquí</option>\n\
                    <option>Alejandria</option>\n\
                    <option>Amagá</option>\n\
                    <option>Amalfi</option>\n\
                    <option>Andes</option>\n\
                    <option>Angelópolis</option>\n\
                    <option>Angostura</option>\n\
                    <option>Anorí</option>\n\
                    <option>Anzá</option>\n\
                    <option>Apartadó</option>\n\
                    <option>Arboletes</option>\n\
                    <option>Argelia</option>\n\
                    <option>Armenia</option>\n\
                    <option>Barbosa</option>\n\
                    <option>Bello</option>\n\
                    <option>Belmira</option>\n\
                    <option>Betania</option>\n\
                    <option>Betulia</option>\n\
                    <option>Bolívar</option>\n\
                    <option>Briceño</option>\n\
                    <option>Burítica</option>\n\
                    <option>Caicedo</option>\n\
                    <option>Caldas</option>\n\
                    <option>Campamento</option>\n\
                    <option>Caracolí</option>\n\
                    <option>Caramanta</option>\n\
                    <option>Carepa</option>\n\
                    <option>Carmen de Viboral</option>\n\
                    <option>Carolina</option>\n\
                    <option>Caucasia</option>\n\
                    <option>Cañasgordas</option>\n\
                    <option>Chigorodó</option>\n\
                    <option>Cisneros</option>\n\
                    <option>Cocorná</option>\n\
                    <option>Concepción</option>\n\
                    <option>Concordia</option>\n\
                    <option>Copacabana</option>\n\
                    <option>Cáceres</option>\n\
                    <option>Dabeiba</option>\n\
                    <option>Don Matías</option>\n\
                    <option>Ebéjico</option>\n\
                    <option>El Bagre</option>\n\
                    <option>Entrerríos</option>\n\
                    <option>Envigado</option>\n\
                    <option>Fredonia</option>\n\
                    <option>Frontino</option>\n\
                    <option>Giraldo</option>\n\
                    <option>Girardota</option>\n\
                    <option>Granada</option>\n\
                    <option>Guadalupe</option>\n\
                    <option>Guarne</option>\n\
                    <option>Guatapé</option>\n\
                    <option>Gómez Plata</option>\n\
                    <option>Heliconia</option>\n\
                    <option>Hispania</option>\n\
                    <option>Itagüí</option>\n\
                    <option>Ituango</option>\n\
                    <option>Jardín</option>\n\
                    <option>Jericó</option>\n\
                    <option>La Ceja</option>\n\
                    <option>La Estrella</option>\n\
                    <option>La Pintada</option>\n\
                    <option>La Unión</option>\n\
                    <option>Liborina</option>\n\
                    <option>Maceo</option>\n\
                    <option>Marinilla</option>\n\
                    <option>Medellín</option>\n\
                    <option>Montebello</option>\n\
                    <option>Murindó</option>\n\
                    <option>Mutatá</option>\n\
                    <option>Nariño</option>\n\
                    <option>Nechí</option>\n\
                    <option>Necoclí</option>\n\
                    <option>Olaya</option>\n\
                    <option>Peque</option>\n\
                    <option>Peñol</option>\n\
                    <option>Pueblorrico</option>\n\
                    <option>Puerto Berrío</option>\n\
                    <option>Puerto Nare</option>\n\
                    <option>Puerto Triunfo</option>\n\
                    <option>Remedios</option>\n\
                    <option>Retiro</option>\n\
                    <option>Ríonegro</option>\n\
                    <option>Sabanalarga</option>\n\
                    <option>Sabaneta</option>\n\
                    <option>Salgar</option>\n\
                    <option>San Andrés de Cuerquía</option>\n\
                    <option>San Carlos</option>\n\
                    <option>San Francisco</option>\n\
                    <option>San Jerónimo</option>\n\
                    <option>San José de Montaña</option>\n\
                    <option>San Juan de Urabá</option>\n\
                    <option>San Luís</option>\n\
                    <option>San Pedro</option>\n\
                    <option>San Pedro de Urabá</option>\n\
                    <option>San Rafael</option>\n\
                    <option>San Roque</option>\n\
                    <option>San Vicente</option>\n\
                    <option>Santa Bárbara</option>\n\
                    <option>Santa Fé de Antioquia</option>\n\
                    <option>Santa Rosa de Osos</option>\n\
                    <option>Santo Domingo</option>\n\
                    <option>Santuario</option>\n\
                    <option>Segovia</option>\n\
                    <option>Sonsón</option>\n\
                    <option>Sopetrán</option>\n\
                    <option>Tarazá</option>\n\
                    <option>Tarso</option>\n\
                    <option>Titiribí</option>\n\
                    <option>Toledo</option>\n\
                    <option>Turbo</option>\n\
                    <option>Támesis</option>\n\
                    <option>Uramita</option>\n\
                    <option>Urrao</option>\n\
                    <option>Valdivia</option>\n\
                    <option>Valparaiso</option>\n\
                    <option>Vegachí</option>\n\
                    <option>Venecia</option>\n\
                    <option>Vigía del Fuerte</option>\n\
                    <option>Yalí</option>\n\
                    <option>Yarumal</option>\n\
                    <option>Yolombó</option>\n\
                    <option>Yondó (Casabe)</option>\n\
                    <option>Zaragoza</option>";
    }

    if (dept === "Arauca") {
        options += "<option>Arauca</option>\n\
                    <option>Arauquita</option>\n\
                    <option>Cravo Norte</option>\n\
                    <option>Fortúl</option>\n\
                    <option>Puerto Rondón</option>\n\
                    <option>Saravena</option>\n\
                    <option>Tame</option>";
    }
    if (dept === "Atlántico") {
        options += "<option>Baranoa</option>\n\
                    <option>Barranquilla</option>\n\
                    <option>Campo de la Cruz</option>\n\
                    <option>Candelaria</option>\n\
                    <option>Galapa</option>\n\
                    <option>Juan de Acosta</option>\n\
                    <option>Luruaco</option>\n\
                    <option>Malambo</option>\n\
                    <option>Manatí</option>\n\
                    <option>Palmar de Varela</option>\n\
                    <option>Piojo</option>\n\
                    <option>Polonuevo</option>\n\
                    <option>Ponedera</option>\n\
                    <option>Puerto Colombia</option>\n\
                    <option>Repelón</option>\n\
                    <option>Sabanagrande</option>\n\
                    <option>Sabanalarga</option>\n\
                    <option>Santa Lucía</option>\n\
                    <option>Santo Tomás</option>\n\
                    <option>Soledad</option>\n\
                    <option>Suan</option>\n\
                    <option>Tubará</option>\n\
                    <option>Usiacuri</option>";
    }
    if (dept === "Bolívar") {
        options += "<option>Achí</option>\n\
                    <option>Altos del Rosario</option>\n\
                    <option>Arenal</option>\n\
                    <option>Arjona</option>\n\
                    <option>Arroyohondo</option>\n\
                    <option>Barranco de Loba</option>\n\
                    <option>Calamar</option>\n\
                    <option>Cantagallo</option>\n\
                    <option>Cartagena</option>\n\
                    <option>Cicuco</option>\n\
                    <option>Clemencia</option>\n\
                    <option>Córdoba</option>\n\
                    <option>El Carmen de Bolívar</option>\n\
                    <option>El Guamo</option>\n\
                    <option>El Peñon</option>\n\
                    <option>Hatillo de Loba</option>\n\
                    <option>Magangué</option>\n\
                    <option>Mahates</option>\n\
                    <option>Margarita</option>\n\
                    <option>María la Baja</option>\n\
                    <option>Mompós</option>\n\
                    <option>Montecristo</option>\n\
                    <option>Morales</option>\n\
                    <option>Norosí</option>\n\
                    <option>Pinillos</option>\n\
                    <option>Regidor</option>\n\
                    <option>Río Viejo</option>\n\
                    <option>San Cristobal</option>\n\
                    <option>San Estanislao</option>\n\
                    <option>San Fernando</option>\n\
                    <option>San Jacinto</option>\n\
                    <option>San Jacinto del Cauca</option>\n\
                    <option>San Juan de Nepomuceno</option>\n\
                    <option>San Martín de Loba</option>\n\
                    <option>San Pablo</option>\n\
                    <option>Santa Catalina</option>\n\
                    <option>Santa Rosa</option>\n\
                    <option>Santa Rosa del Sur</option>\n\
                    <option>Simití</option>\n\
                    <option>Soplaviento</option>\n\
                    <option>Talaigua Nuevo</option>\n\
                    <option>Tiquisio (Puerto Rico)</option>\n\
                    <option>Turbaco</option>\n\
                    <option>Turbaná</option>\n\
                    <option>Villanueva</option>\n\
                    <option>Zambrano</option>";
    }
    if (dept === "Boyacá") {
        options += "<option>Almeida</option>\n\
                    <option>Aquitania</option>\n\
                    <option>Arcabuco</option>\n\
                    <option>Belén</option>\n\
                    <option>Berbeo</option>\n\
                    <option>Beteitiva</option>\n\
                    <option>Boavita</option>\n\
                    <option>Boyacá</option>\n\
                    <option>Briceño</option>\n\
                    <option>Buenavista</option>\n\
                    <option>Busbanza</option>\n\
                    <option>Caldas</option>\n\
                    <option>Campohermoso</option>\n\
                    <option>Cerinza</option>\n\
                    <option>Chinavita</option>\n\
                    <option>Chiquinquirá</option>\n\
                    <option>Chiscas</option>\n\
                    <option>Chita</option>\n\
                    <option>Chitaraque</option>\n\
                    <option>Chivatá</option>\n\
                    <option>Chíquiza</option>\n\
                    <option>Chívor</option>\n\
                    <option>Ciénaga</option>\n\
                    <option>Coper</option>\n\
                    <option>Corrales</option>\n\
                    <option>Covarachía</option>\n\
                    <option>Cubará</option>\n\
                    <option>Cucaita</option>\n\
                    <option>Cuitiva</option>\n\
                    <option>Cómbita</option>\n\
                    <option>Duitama</option>\n\
                    <option>El Cocuy</option>\n\
                    <option>El Espino</option>\n\
                    <option>Firavitoba</option>\n\
                    <option>Floresta</option>\n\
                    <option>Gachantivá</option>\n\
                    <option>Garagoa</option>\n\
                    <option>Guacamayas</option>\n\
                    <option>Guateque</option>\n\
                    <option>Guayatá</option>\n\
                    <option>Guicán</option>\n\
                    <option>Gámeza</option>\n\
                    <option>Izá</option>\n\
                    <option>Jenesano</option>\n\
                    <option>Jericó</option>\n\
                    <option>La Capilla</option>\n\
                    <option>La Uvita</option>\n\
                    <option>La Victoria</option>\n\
                    <option>Labranzagrande</option>\n\
                    <option>Macanal</option>\n\
                    <option>Maripí</option>\n\
                    <option>Miraflores</option>\n\
                    <option>Mongua</option>\n\
                    <option>Monguí</option>\n\
                    <option>Moniquirá</option>\n\
                    <option>Motavita</option>\n\
                    <option>Muzo</option>\n\
                    <option>Nobsa</option>\n\
                    <option>Nuevo Colón</option>\n\
                    <option>Oicatá</option>\n\
                    <option>Otanche</option>\n\
                    <option>Pachavita</option>\n\
                    <option>Paipa</option>\n\
                    <option>Pajarito</option>\n\
                    <option>Panqueba</option>\n\
                    <option>Pauna</option>\n\
                    <option>Paya</option>\n\
                    <option>Paz de Río</option>\n\
                    <option>Pesca</option>\n\
                    <option>Pisva</option>\n\
                    <option>Puerto Boyacá</option>\n\
                    <option>Páez</option>\n\
                    <option>Quipama</option>\n\
                    <option>Ramiriquí</option>\n\
                    <option>Rondón</option>\n\
                    <option>Ráquira</option>\n\
                    <option>Saboyá</option>\n\
                    <option>Samacá</option>\n\
                    <option>San Eduardo</option>\n\
                    <option>San José de Pare</option>\n\
                    <option>San Luís de Gaceno</option>\n\
                    <option>San Mateo</option>\n\
                    <option>San Miguel de Sema</option>\n\
                    <option>San Pablo de Borbur</option>\n\
                    <option>Santa María</option>\n\
                    <option>Santa Rosa de Viterbo</option>\n\
                    <option>Santa Sofía</option>\n\
                    <option>Santana</option>\n\
                    <option>Sativanorte</option>\n\
                    <option>Sativasur</option>\n\
                    <option>Siachoque</option>\n\
                    <option>Soatá</option>\n\
                    <option>Socha</option>\n\
                    <option>Socotá</option>\n\
                    <option>Sogamoso</option>\n\
                    <option>Somondoco</option>\n\
                    <option>Sora</option>\n\
                    <option>Soracá</option>\n\
                    <option>Sotaquirá</option>\n\
                    <option>Susacón</option>\n\
                    <option>Sutamarchán</option>\n\
                    <option>Sutatenza</option>\n\
                    <option>Sáchica</option>\n\
                    <option>Tasco</option>\n\
                    <option>Tenza</option>\n\
                    <option>Tibaná</option>\n\
                    <option>Tibasosa</option>\n\
                    <option>Tinjacá</option>\n\
                    <option>Tipacoque</option>\n\
                    <option>Toca</option>\n\
                    <option>Toguí</option>\n\
                    <option>Topagá</option>\n\
                    <option>Tota</option>\n\
                    <option>Tunja</option>\n\
                    <option>Tunungua</option>\n\
                    <option>Turmequé</option>\n\
                    <option>Tuta</option>\n\
                    <option>Tutasá</option>\n\
                    <option>Ventaquemada</option>\n\
                    <option>Villa de Leiva</option>\n\
                    <option>Viracachá</option>\n\
                    <option>Zetaquirá</option>\n\
                    <option>Úmbita</option>";
    }

    if (dept === "Caldas") {
        options += "<option>Aguadas</option>\n\
                    <option>Anserma</option>\n\
                    <option>Aranzazu</option>\n\
                    <option>Belalcázar</option>\n\
                    <option>Chinchiná</option>\n\
                    <option>Filadelfia</option>\n\
                    <option>La Dorada</option>\n\
                    <option>La Merced</option>\n\
                    <option>La Victoria</option>\n\
                    <option>Manizales</option>\n\
                    <option>Manzanares</option>\n\
                    <option>Marmato</option>\n\
                    <option>Marquetalia</option>\n\
                    <option>Marulanda</option>\n\
                    <option>Neira</option>\n\
                    <option>Norcasia</option>\n\
                    <option>Palestina</option>\n\
                    <option>Pensilvania</option>\n\
                    <option>Pácora</option>\n\
                    <option>Risaralda</option>\n\
                    <option>Río Sucio</option>\n\
                    <option>Salamina</option>\n\
                    <option>Samaná</option>\n\
                    <option>San José</option>\n\
                    <option>Supía</option>\n\
                    <option>Villamaría</option>\n\
                    <option>Viterbo</option>";
    }

    if (dept === "Caquetá") {
        options += "<option>Albania</option>\n\
                    <option>Belén de los Andaquíes</option>\n\
                    <option>Cartagena del Chairá</option>\n\
                    <option>Curillo</option>\n\
                    <option>El Doncello</option>\n\
                    <option>El Paujil</option>\n\
                    <option>Florencia</option>\n\
                    <option>La Montañita</option>\n\
                    <option>Milán</option>\n\
                    <option>Morelia</option>\n\
                    <option>Puerto Rico</option>\n\
                    <option>San José del Fragua</option>\n\
                    <option>San Vicente del Caguán</option>\n\
                    <option>Solano</option>\n\
                    <option>Solita</option>\n\
                    <option>Valparaiso</option>";
    }
    if (dept === "Casanare") {
        options += "<option>Aguazul</option>\n\
                    <option>Chámeza</option>\n\
                    <option>Hato Corozal</option>\n\
                    <option>La Salina</option>\n\
                    <option>Maní</option>\n\
                    <option>Monterrey</option>\n\
                    <option>Nunchía</option>\n\
                    <option>Orocué</option>\n\
                    <option>Paz de Ariporo</option>\n\
                    <option>Pore</option>\n\
                    <option>Recetor</option>\n\
                    <option>Sabanalarga</option>\n\
                    <option>San Luís de Palenque</option>\n\
                    <option>Sácama</option>\n\
                    <option>Tauramena</option>\n\
                    <option>Trinidad</option>\n\
                    <option>Támara</option>\n\
                    <option>Villanueva</option>\n\
                    <option>Yopal</option>";
    }
    if (dept === "Cauca") {
        options += "<option>Almaguer</option>\n\
                    <option>Argelia</option>\n\
                    <option>Balboa</option>\n\
                    <option>Bolívar</option>\n\
                    <option>Buenos Aires</option>\n\
                    <option>Cajibío</option>\n\
                    <option>Caldono</option>\n\
                    <option>Caloto</option>\n\
                    <option>Corinto</option>\n\
                    <option>El Tambo</option>\n\
                    <option>Florencia</option>\n\
                    <option>Guachené</option>\n\
                    <option>Guapí</option>\n\
                    <option>Inzá</option>\n\
                    <option>Jambaló</option>\n\
                    <option>La Sierra</option>\n\
                    <option>La Vega</option>\n\
                    <option>López (Micay)</option>\n\
                    <option>Mercaderes</option>\n\
                    <option>Miranda</option>\n\
                    <option>Morales</option>\n\
                    <option>Padilla</option>\n\
                    <option>Patía (El Bordo)</option>\n\
                    <option>Piamonte</option>\n\
                    <option>Piendamó</option>\n\
                    <option>Popayán</option>\n\
                    <option>Puerto Tejada</option>\n\
                    <option>Puracé (Coconuco)</option>\n\
                    <option>Páez (Belalcazar)</option>\n\
                    <option>Rosas</option>\n\
                    <option>San Sebastián</option>\n\
                    <option>Santa Rosa</option>\n\
                    <option>Santander de Quilichao</option>\n\
                    <option>Silvia</option>\n\
                    <option>Sotara (Paispamba)</option>\n\
                    <option>Sucre</option>\n\
                    <option>Suárez</option>\n\
                    <option>Timbiquí</option>\n\
                    <option>Timbío</option>\n\
                    <option>Toribío</option>\n\
                    <option>Totoró</option>\n\
                    <option>Villa Rica</option>";
    }
    if (dept === "Cesar") {
        options += "<option>Aguachica</option>\n\
                    <option>Agustín Codazzi</option>\n\
                    <option>Astrea</option>\n\
                    <option>Becerríl</option>\n\
                    <option>Bosconia</option>\n\
                    <option>Chimichagua</option>\n\
                    <option>Chiriguaná</option>\n\
                    <option>Curumaní</option>\n\
                    <option>El Copey</option>\n\
                    <option>El Paso</option>\n\
                    <option>Gamarra</option>\n\
                    <option>Gonzalez</option>\n\
                    <option>La Gloria</option>\n\
                    <option>La Jagua de Ibirico</option>\n\
                    <option>La Paz (Robles)</option>\n\
                    <option>Manaure Balcón del Cesar</option>\n\
                    <option>Pailitas</option>\n\
                    <option>Pelaya</option>\n\
                    <option>Pueblo Bello</option>\n\
                    <option>Río de oro</option>\n\
                    <option>San Alberto</option>\n\
                    <option>San Diego</option>\n\
                    <option>San Martín</option>\n\
                    <option>Tamalameque</option>\n\
                    <option>Valledupar</option>";
    }
    if (dept === "Chocó") {
        options += "<option>Acandí</option>\n\
                    <option>Alto Baudó (Pie de Pato)</option>\n\
                    <option>Atrato (Yuto)</option>\n\
                    <option>Bagadó</option>\n\
                    <option>Bahía Solano (Mútis)</option>\n\
                    <option>Bajo Baudó (Pizarro)</option>\n\
                    <option>Belén de Bajirá</option>\n\
                    <option>Bojayá (Bellavista)</option>\n\
                    <option>Cantón de San Pablo</option>\n\
                    <option>Carmen del Darién (CURBARADÓ)</option>\n\
                    <option>Condoto</option>\n\
                    <option>Cértegui</option>\n\
                    <option>El Carmen de Atrato</option>\n\
                    <option>Istmina</option>\n\
                    <option>Juradó</option>\n\
                    <option>Lloró</option>\n\
                    <option>Medio Atrato</option>\n\
                    <option>Medio Baudó</option>\n\
                    <option>Medio San Juan (ANDAGOYA)</option>\n\
                    <option>Novita</option>\n\
                    <option>Nuquí</option>\n\
                    <option>Quibdó</option>\n\
                    <option>Río Iró</option>\n\
                    <option>Río Quito</option>\n\
                    <option>Ríosucio</option>\n\
                    <option>San José del Palmar</option>\n\
                    <option>Santa Genoveva de Docorodó</option>\n\
                    <option>Sipí</option>\n\
                    <option>Tadó</option>\n\
                    <option>Unguía</option>\n\
                    <option>Unión Panamericana (ÁNIMAS)</option>";
    }
    if (dept === "Córdoba") {
        options += "<option>Ayapel</option>\n\
                    <option>Buenavista</option>\n\
                    <option>Canalete</option>\n\
                    <option>Cereté</option>\n\
                    <option>Chimá</option>\n\
                    <option>Chinú</option>\n\
                    <option>Ciénaga de Oro</option>\n\
                    <option>Cotorra</option>\n\
                    <option>La Apartada y La Frontera</option>\n\
                    <option>Lorica</option>\n\
                    <option>Los Córdobas</option>\n\
                    <option>Momil</option>\n\
                    <option>Montelíbano</option>\n\
                    <option>Monteria</option>\n\
                    <option>Moñitos</option>\n\
                    <option>Planeta Rica</option>\n\
                    <option>Pueblo Nuevo</option>\n\
                    <option>Puerto Escondido</option>\n\
                    <option>Puerto Libertador</option>\n\
                    <option>Purísima</option>\n\
                    <option>Sahagún</option>\n\
                    <option>San Andrés Sotavento</option>\n\
                    <option>San Antero</option>\n\
                    <option>San Bernardo del Viento</option>\n\
                    <option>San Carlos</option>\n\
                    <option>San José de Uré</option>\n\
                    <option>San Pelayo</option>\n\
                    <option>Tierralta</option>\n\
                    <option>Tuchín</option>\n\
                    <option>Valencia</option>";
    }
    if (dept === "Cundinamarca") {
        options += "<option>Agua de Dios</option>\n\
                    <option>Albán</option>\n\
                    <option>Anapoima</option>\n\
                    <option>Anolaima</option>\n\
                    <option>Apulo</option>\n\
                    <option>Arbeláez</option>\n\
                    <option>Beltrán</option>\n\
                    <option>Bituima</option>\n\
                    <option>Bogotá D.C.</option>\n\
                    <option>Bojacá</option>\n\
                    <option>Cabrera</option>\n\
                    <option>Cachipay</option>\n\
                    <option>Cajicá</option>\n\
                    <option>Caparrapí</option>\n\
                    <option>Carmen de Carupa</option>\n\
                    <option>Chaguaní</option>\n\
                    <option>Chipaque</option>\n\
                    <option>Choachí</option>\n\
                    <option>Chocontá</option>\n\
                    <option>Chía</option>\n\
                    <option>Cogua</option>\n\
                    <option>Cota</option>\n\
                    <option>Cucunubá</option>\n\
                    <option>Cáqueza</option>\n\
                    <option>El Colegio</option>\n\
                    <option>El Peñón</option>\n\
                    <option>El Rosal</option>\n\
                    <option>Facatativá</option>\n\
                    <option>Fosca</option>\n\
                    <option>Funza</option>\n\
                    <option>Fusagasugá</option>\n\
                    <option>Fómeque</option>\n\
                    <option>Fúquene</option>\n\
                    <option>Gachalá</option>\n\
                    <option>Gachancipá</option>\n\
                    <option>Gachetá</option>\n\
                    <option>Gama</option>\n\
                    <option>Girardot</option>\n\
                    <option>Granada</option>\n\
                    <option>Guachetá</option>\n\
                    <option>Guaduas</option>\n\
                    <option>Guasca</option>\n\
                    <option>Guataquí</option>\n\
                    <option>Guatavita</option>\n\
                    <option>Guayabal de Siquima</option>\n\
                    <option>Guayabetal</option>\n\
                    <option>Gutiérrez</option>\n\
                    <option>Jerusalén</option>\n\
                    <option>Junín</option>\n\
                    <option>La Calera</option>\n\
                    <option>La Mesa</option>\n\
                    <option>La Palma</option>\n\
                    <option>La Peña</option>\n\
                    <option>La Vega</option>\n\
                    <option>Lenguazaque</option>\n\
                    <option>Machetá</option>\n\
                    <option>Madrid</option>\n\
                    <option>Manta</option>\n\
                    <option>Medina</option>\n\
                    <option>Mosquera</option>\n\
                    <option>Nariño</option>\n\
                    <option>Nemocón</option>\n\
                    <option>Nilo</option>\n\
                    <option>Nimaima</option>\n\
                    <option>Nocaima</option>\n\
                    <option>Pacho</option>\n\
                    <option>Paime</option>\n\
                    <option>Pandi</option>\n\
                    <option>Paratebueno</option>\n\
                    <option>Pasca</option>\n\
                    <option>Puerto Salgar</option>\n\
                    <option>Pulí</option>\n\
                    <option>Quebradanegra</option>\n\
                    <option>Quetame</option>\n\
                    <option>Quipile</option>\n\
                    <option>Ricaurte</option>\n\
                    <option>San Antonio de Tequendama</option>\n\
                    <option>San Bernardo</option>\n\
                    <option>San Cayetano</option>\n\
                    <option>San Francisco</option>\n\
                    <option>San Juan de Río Seco</option>\n\
                    <option>Sasaima</option>\n\
                    <option>Sesquilé</option>\n\
                    <option>Sibaté</option>\n\
                    <option>Silvania</option>\n\
                    <option>Simijaca</option>\n\
                    <option>Soacha</option>\n\
                    <option>Sopó</option>\n\
                    <option>Subachoque</option>\n\
                    <option>Suesca</option>\n\
                    <option>Supatá</option>\n\
                    <option>Susa</option>\n\
                    <option>Sutatausa</option>\n\
                    <option>Tabio</option>\n\
                    <option>Tausa</option>\n\
                    <option>Tena</option>\n\
                    <option>Tenjo</option>\n\
                    <option>Tibacuy</option>\n\
                    <option>Tibirita</option>\n\
                    <option>Tocaima</option>\n\
                    <option>Tocancipá</option>\n\
                    <option>Topaipí</option>\n\
                    <option>Ubalá</option>\n\
                    <option>Ubaque</option>\n\
                    <option>Ubaté</option>\n\
                    <option>Une</option>\n\
                    <option>Venecia (Ospina Pérez)</option>\n\
                    <option>Vergara</option>\n\
                    <option>Viani</option>\n\
                    <option>Villagómez</option>\n\
                    <option>Villapinzón</option>\n\
                    <option>Villeta</option>\n\
                    <option>Viotá</option>\n\
                    <option>Yacopí</option>\n\
                    <option>Zipacón</option>\n\
                    <option>Zipaquirá</option>\n\
                    <option>Útica</option>";
    }
    if (dept === "Guainía") {
        options += "<option>Inírida</option>";
    }
    if (dept === "Guaviare") {
        options += "<option>Calamar</option>\n\
                    <option>El Retorno</option>\n\
                    <option>Miraflores</option>\n\
                    <option>San José del Guaviare</option>";
    }
    if (dept === "Huila") {
        options += "<option>Acevedo</option>\n\
                    <option>Agrado</option>\n\
                    <option>Aipe</option>\n\
                    <option>Algeciras</option>\n\
                    <option>Altamira</option>\n\
                    <option>Baraya</option>\n\
                    <option>Campoalegre</option>\n\
                    <option>Colombia</option>\n\
                    <option>Elías</option>\n\
                    <option>Garzón</option>\n\
                    <option>Gigante</option>\n\
                    <option>Guadalupe</option>\n\
                    <option>Hobo</option>\n\
                    <option>Isnos</option>\n\
                    <option>La Argentina</option>\n\
                    <option>La Plata</option>\n\
                    <option>Neiva</option>\n\
                    <option>Nátaga</option>\n\
                    <option>Oporapa</option>\n\
                    <option>Paicol</option>\n\
                    <option>Palermo</option>\n\
                    <option>Palestina</option>\n\
                    <option>Pital</option>\n\
                    <option>Pitalito</option>\n\
                    <option>Rivera</option>\n\
                    <option>Saladoblanco</option>\n\
                    <option>San Agustín</option>\n\
                    <option>Santa María</option>\n\
                    <option>Suaza</option>\n\
                    <option>Tarqui</option>\n\
                    <option>Tello</option>\n\
                    <option>Teruel</option>\n\
                    <option>Tesalia</option>\n\
                    <option>Timaná</option>\n\
                    <option>Villavieja</option>\n\
                    <option>Yaguará</option>\n\
                    <option>Íquira</option>";
    }
    if (dept === "La Guajira") {
        options += "<option>Albania</option>\n\
                    <option>Barrancas</option>\n\
                    <option>Dibulla</option>\n\
                    <option>Distracción</option>\n\
                    <option>El Molino</option>\n\
                    <option>Fonseca</option>\n\
                    <option>Hatonuevo</option>\n\
                    <option>La Jagua del Pilar</option>\n\
                    <option>Maicao</option>\n\
                    <option>Manaure</option>\n\
                    <option>Riohacha</option>\n\
                    <option>San Juan del Cesar</option>\n\
                    <option>Uribia</option>\n\
                    <option>Urumita</option>\n\
                    <option>Villanueva</option>";
    }
    if (dept === "Magdalena") {
        options += "<option>Algarrobo</option>\n\
                    <option>Aracataca</option>\n\
                    <option>Ariguaní (El Difícil)</option>\n\
                    <option>Cerro San Antonio</option>\n\
                    <option>Chivolo</option>\n\
                    <option>Ciénaga</option>\n\
                    <option>Concordia</option>\n\
                    <option>El Banco</option>\n\
                    <option>El Piñon</option>\n\
                    <option>El Retén</option>\n\
                    <option>Fundación</option>\n\
                    <option>Guamal</option>\n\
                    <option>Nueva Granada</option>\n\
                    <option>Pedraza</option>\n\
                    <option>Pijiño</option>\n\
                    <option>Pivijay</option>\n\
                    <option>Plato</option>\n\
                    <option>Puebloviejo</option>\n\
                    <option>Remolino</option>\n\
                    <option>Sabanas de San Angel (SAN ANGEL)</option>\n\
                    <option>Salamina</option>\n\
                    <option>San Sebastián de Buenavista</option>\n\
                    <option>San Zenón</option>\n\
                    <option>Santa Ana</option>\n\
                    <option>Santa Bárbara de Pinto</option>\n\
                    <option>Santa Marta</option>\n\
                    <option>Sitionuevo</option>\n\
                    <option>Tenerife</option>\n\
                    <option>Zapayán (PUNTA DE PIEDRAS)</option>\n\
                    <option>Zona Bananera (PRADO - SEVILLA)</option>";
    }
    if (dept === "Meta") {
        options += "<option>Acacías</option>\n\
                    <option>Barranca de Upía</option>\n\
                    <option>Cabuyaro</option>\n\
                    <option>Castilla la Nueva</option>\n\
                    <option>Cubarral</option>\n\
                    <option>Cumaral</option>\n\
                    <option>El Calvario</option>\n\
                    <option>El Castillo</option>\n\
                    <option>El Dorado</option>\n\
                    <option>Fuente de Oro</option>\n\
                    <option>Granada</option>\n\
                    <option>Guamal</option>\n\
                    <option>La Macarena</option>\n\
                    <option>Lejanías</option>\n\
                    <option>Mapiripan</option>\n\
                    <option>Mesetas</option>\n\
                    <option>Puerto Concordia</option>\n\
                    <option>Puerto Gaitán</option>\n\
                    <option>Puerto Lleras</option>\n\
                    <option>Puerto López</option>\n\
                    <option>Puerto Rico</option>\n\
                    <option>Restrepo</option>\n\
                    <option>San Carlos de Guaroa</option>\n\
                    <option>San Juan de Arama</option>\n\
                    <option>San Juanito</option>\n\
                    <option>San Martín</option>\n\
                    <option>La Uribe</option>\n\
                    <option>Villavicencio</option>\n\
                    <option>Vista Hermosa</option>\n";
    }
    if (dept === "Nariño") {
        options += "<option>Albán (San José)</option>\n\
                    <option>Aldana</option>\n\
                    <option>Ancuya</option>\n\
                    <option>Arboleda (Berruecos)</option>\n\
                    <option>Barbacoas</option>\n\
                    <option>Belén</option>\n\
                    <option>Buesaco</option>\n\
                    <option>Chachaguí</option>\n\
                    <option>Colón (Génova)</option>\n\
                    <option>Consaca</option>\n\
                    <option>Contadero</option>\n\
                    <option>Cuaspud (Carlosama)</option>\n\
                    <option>Cumbal</option>\n\
                    <option>Cumbitara</option>\n\
                    <option>Córdoba</option>\n\
                    <option>El Charco</option>\n\
                    <option>El Peñol</option>\n\
                    <option>El Rosario</option>\n\
                    <option>El Tablón de Gómez</option>\n\
                    <option>El Tambo</option>\n\
                    <option>Francisco Pizarro</option>\n\
                    <option>Funes</option>\n\
                    <option>Guachavés</option>\n\
                    <option>Guachucal</option>\n\
                    <option>Guaitarilla</option>\n\
                    <option>Gualmatán</option>\n\
                    <option>Iles</option>\n\
                    <option>Imúes</option>\n\
                    <option>Ipiales</option>\n\
                    <option>La Cruz</option>\n\
                    <option>La Florida</option>\n\
                    <option>La Llanada</option>\n\
                    <option>La Tola</option>\n\
                    <option>La Unión</option>\n\
                    <option>Leiva</option>\n\
                    <option>Linares</option>\n\
                    <option>Magüi (Payán)</option>\n\
                    <option>Mallama (Piedrancha)</option>\n\
                    <option>Mosquera</option>\n\
                    <option>Nariño</option>\n\
                    <option>Olaya Herrera</option>\n\
                    <option>Ospina</option>\n\
                    <option>Policarpa</option>\n\
                    <option>Potosí</option>\n\
                    <option>Providencia</option>\n\
                    <option>Puerres</option>\n\
                    <option>Pupiales</option>\n\
                    <option>Ricaurte</option>\n\
                    <option>Roberto Payán (San José)</option>\n\
                    <option>Samaniego</option>\n\
                    <option>San Bernardo</option>\n\
                    <option>San Juan de Pasto</option>\n\
                    <option>San Lorenzo</option>\n\
                    <option>San Pablo</option>\n\
                    <option>San Pedro de Cartago</option>\n\
                    <option>Sandoná</option>\n\
                    <option>Santa Bárbara (Iscuandé)</option>\n\
                    <option>Sapuyes</option>\n\
                    <option>Sotomayor (Los Andes)</option>\n\
                    <option>Taminango</option>\n\
                    <option>Tangua</option>\n\
                    <option>Tumaco</option>\n\
                    <option>Túquerres</option>\n\
                    <option>Yacuanquer</option>";
    }
    if (dept === "Norte de Santander") {
        options += "<option>Arboledas</option>\n\
                    <option>Bochalema</option>\n\
                    <option>Bucarasica</option>\n\
                    <option>Chinácota</option>\n\
                    <option>Chitagá</option>\n\
                    <option>Convención</option>\n\
                    <option>Cucutilla</option>\n\
                    <option>Cáchira</option>\n\
                    <option>Cácota</option>\n\
                    <option>Cúcuta</option>\n\
                    <option>Durania</option>\n\
                    <option>El Carmen</option>\n\
                    <option>El Tarra</option>\n\
                    <option>El Zulia</option>\n\
                    <option>Gramalote</option>\n\
                    <option>Hacarí</option>\n\
                    <option>Herrán</option>\n\
                    <option>La Esperanza</option>\n\
                    <option>La Playa</option>\n\
                    <option>Labateca</option>\n\
                    <option>Los Patios</option>\n\
                    <option>Lourdes</option>\n\
                    <option>Mutiscua</option>\n\
                    <option>Ocaña</option>\n\
                    <option>Pamplona</option>\n\
                    <option>Pamplonita</option>\n\
                    <option>Puerto Santander</option>\n\
                    <option>Ragonvalia</option>\n\
                    <option>Salazar</option>\n\
                    <option>San Calixto</option>\n\
                    <option>San Cayetano</option>\n\
                    <option>Santiago</option>\n\
                    <option>Sardinata</option>\n\
                    <option>Silos</option>\n\
                    <option>Teorama</option>\n\
                    <option>Tibú</option>\n\
                    <option>Toledo</option>\n\
                    <option>Villa Caro</option>\n\
                    <option>Villa del Rosario</option>\n\
                    <option>Ábrego</option>";
    }
    if (dept === "Putumayo") {
        options += "<option>Colón</option>\n\
                    <option>Mocoa</option>\n\
                    <option>Orito</option>\n\
                    <option>Puerto Asís</option>\n\
                    <option>Puerto Caicedo</option>\n\
                    <option>Puerto Guzmán</option>\n\
                    <option>Puerto Leguízamo</option>\n\
                    <option>San Francisco</option>\n\
                    <option>San Miguel</option>\n\
                    <option>Santiago</option>\n\
                    <option>Sibundoy</option>\n\
                    <option>Valle del Guamuez</option>\n\
                    <option>Villagarzón</option>";
    }
    if (dept === "Quindío") {
        options += "<option>Armenia</option>\n\
                    <option>Buenavista</option>\n\
                    <option>Calarcá</option>\n\
                    <option>Circasia</option>\n\
                    <option>Cordobá</option>\n\
                    <option>Filandia</option>\n\
                    <option>Génova</option>\n\
                    <option>La Tebaida</option>\n\
                    <option>Montenegro</option>\n\
                    <option>Pijao</option>\n\
                    <option>Quimbaya</option>\n\
                    <option>Salento</option>";
    }
    if (dept === "Risaralda") {
        options += "<option>Apía</option>\n\
                    <option>Balboa</option>\n\
                    <option>Belén de Umbría</option>\n\
                    <option>Dos Quebradas</option>\n\
                    <option>Guática</option>\n\
                    <option>La Celia</option>\n\
                    <option>La Virginia</option>\n\
                    <option>Marsella</option>\n\
                    <option>Mistrató</option>\n\
                    <option>Pereira</option>\n\
                    <option>Pueblo Rico</option>\n\
                    <option>Quinchía</option>\n\
                    <option>Santa Rosa de Cabal</option>\n\
                    <option>Santuario</option>";
    }
    if (dept === "San Andrés") {
        options += "<option>Providencia</option>";
    }
    if (dept === "Santander") {
        options += "<option>Aguada</option>\n\
                    <option>Albania</option>\n\
                    <option>Aratoca</option>\n\
                    <option>Barbosa</option>\n\
                    <option>Barichara</option>\n\
                    <option>Barrancabermeja</option>\n\
                    <option>Betulia</option>\n\
                    <option>Bolívar</option>\n\
                    <option>Bucaramanga</option>\n\
                    <option>Cabrera</option>\n\
                    <option>California</option>\n\
                    <option>Capitanejo</option>\n\
                    <option>Carcasí</option>\n\
                    <option>Cepita</option>\n\
                    <option>Cerrito</option>\n\
                    <option>Charalá</option>\n\
                    <option>Charta</option>\n\
                    <option>Chima</option>\n\
                    <option>Chipatá</option>\n\
                    <option>Cimitarra</option>\n\
                    <option>Concepción</option>\n\
                    <option>Confines</option>\n\
                    <option>Contratación</option>\n\
                    <option>Coromoro</option>\n\
                    <option>Curití</option>\n\
                    <option>El Carmen</option>\n\
                    <option>El Guacamayo</option>\n\
                    <option>El Peñon</option>\n\
                    <option>El Playón</option>\n\
                    <option>Encino</option>\n\
                    <option>Enciso</option>\n\
                    <option>Floridablanca</option>\n\
                    <option>Florián</option>\n\
                    <option>Galán</option>\n\
                    <option>Girón</option>\n\
                    <option>Guaca</option>\n\
                    <option>Guadalupe</option>\n\
                    <option>Guapota</option>\n\
                    <option>Guavatá</option>\n\
                    <option>Guepsa</option>\n\
                    <option>Gámbita</option>\n\
                    <option>Hato</option>\n\
                    <option>Jesús María</option>\n\
                    <option>Jordán</option>\n\
                    <option>La Belleza</option>\n\
                    <option>La Paz</option>\n\
                    <option>Landázuri</option>\n\
                    <option>Lebrija</option>\n\
                    <option>Los Santos</option>\n\
                    <option>Macaravita</option>\n\
                    <option>Matanza</option>\n\
                    <option>Mogotes</option>\n\
                    <option>Molagavita</option>\n\
                    <option>Málaga</option>\n\
                    <option>Ocamonte</option>\n\
                    <option>Oiba</option>\n\
                    <option>Onzaga</option>\n\
                    <option>Palmar</option>\n\
                    <option>Palmas del Socorro</option>\n\
                    <option>Pie de Cuesta</option>\n\
                    <option>Pinchote</option>\n\
                    <option>Puente Nacional</option>\n\
                    <option>Puerto Parra</option>\n\
                    <option>Puerto Wilches</option>\n\
                    <option>Páramo</option>\n\
                    <option>Rio Negro</option>\n\
                    <option>Sabana de Torres</option>\n\
                    <option>San Andrés</option>\n\
                    <option>San Benito</option>\n\
                    <option>San Gíl</option>\n\
                    <option>San Joaquín</option>\n\
                    <option>San José de Miranda</option>\n\
                    <option>San Miguel</option>\n\
                    <option>San Vicente del Chucurí</option>\n\
                    <option>Santa Bárbara</option>\n\
                    <option>Santa Helena del Opón</option>\n\
                    <option>Simacota</option>\n\
                    <option>Socorro</option>\n\
                    <option>Suaita</option>\n\
                    <option>Sucre</option>\n\
                    <option>Suratá</option>\n\
                    <option>Tona</option>\n\
                    <option>Valle de San José</option>\n\
                    <option>Vetas</option>\n\
                    <option>Villanueva</option>\n\
                    <option>Vélez</option>\n\
                    <option>Zapatoca</option>";
    }
    if (dept === "Sucre") {
        options += "<option>Buenavista</option>\n\
                    <option>Caimito</option>\n\
                    <option>Chalán</option>\n\
                    <option>Colosó (Ricaurte)</option>\n\
                    <option>Corozal</option>\n\
                    <option>Coveñas</option>\n\
                    <option>El Roble</option>\n\
                    <option>Galeras (Nueva Granada)</option>\n\
                    <option>Guaranda</option>\n\
                    <option>La Unión</option>\n\
                    <option>Los Palmitos</option>\n\
                    <option>Majagual</option>\n\
                    <option>Morroa</option>\n\
                    <option>Ovejas</option>\n\
                    <option>Palmito</option>\n\
                    <option>Sampués</option>\n\
                    <option>San Benito Abad</option>\n\
                    <option>San Juan de Betulia</option>\n\
                    <option>San Marcos</option>\n\
                    <option>San Onofre</option>\n\
                    <option>San Pedro</option>\n\
                    <option>Sincelejo</option>\n\
                    <option>Sincé</option>\n\
                    <option>Sucre</option>\n\
                    <option>Tolú</option>\n\
                    <option>Tolú Viejo</option>";
    }
    if (dept === "Tolima") {
        options += "<option>Alpujarra</option>\n\
        <option>Alvarado</option>\n\
        <option>Ambalema</option>\n\
        <option>Anzoátegui</option>\n\
        <option>Armero (Guayabal)</option>\n\
        <option>Ataco</option>\n\
        <option>Cajamarca</option>\n\
        <option>Carmen de Apicalá</option>\n\
        <option>Casabianca</option>\n\
        <option>Chaparral</option>\n\
        <option>Coello</option>\n\
        <option>Coyaima</option>\n\
        <option>Cunday</option>\n\
        <option>Dolores</option>\n\
        <option>Espinal</option>\n\
        <option>Falan</option>\n\
        <option>Flandes</option>\n\
        <option>Fresno</option>\n\
        <option>Guamo</option>\n\
        <option>Herveo</option>\n\
        <option>Honda</option>\n\
        <option>Ibagué</option>\n\
        <option>Icononzo</option>\n\
        <option>Lérida</option>\n\
        <option>Líbano</option>\n\
        <option>Mariquita</option>\n\
        <option>Melgar</option>\n\
        <option>Murillo</option>\n\
        <option>Natagaima</option>\n\
        <option>Ortega</option>\n\
        <option>Palocabildo</option>\n\
        <option>Piedras</option>\n\
        <option>Planadas</option>\n\
        <option>Prado</option>\n\
        <option>Purificación</option>\n\
        <option>Rioblanco</option>\n\
        <option>Roncesvalles</option>\n\
        <option>Rovira</option>\n\
        <option>Saldaña</option>\n\
        <option>San Antonio</option>\n\
        <option>San Luis</option>\n\
        <option>Santa Isabel</option>\n\
        <option>Suárez</option>\n\
        <option>Valle de San Juan</option>\n\
        <option>Venadillo</option>\n\
        <option>Villahermosa</option>\n\
        <option>Villarrica</option>";
    }
    if (dept === "Valle del Cauca") {
        options += "<option>Alcalá</option>\n\
        <option>Andalucía</option>\n\
        <option>Ansermanuevo</option>\n\
        <option>Argelia</option>\n\
        <option>Bolívar</option>\n\
        <option>Buenaventura</option>\n\
        <option>Buga</option>\n\
        <option>Bugalagrande</option>\n\
        <option>Caicedonia</option>\n\
        <option>Calima (Darién)</option>\n\
        <option>Calí</option>\n\
        <option>Candelaria</option>\n\
        <option>Cartago</option>\n\
        <option>Dagua</option>\n\
        <option>El Cairo</option>\n\
        <option>El Cerrito</option>\n\
        <option>El Dovio</option>\n\
        <option>El Águila</option>\n\
        <option>Florida</option>\n\
        <option>Ginebra</option>\n\
        <option>Guacarí</option>\n\
        <option>Jamundí</option>\n\
        <option>La Cumbre</option>\n\
        <option>La Unión</option>\n\
        <option>La Victoria</option>\n\
        <option>Obando</option>\n\
        <option>Palmira</option>\n\
        <option>Pradera</option>\n\
        <option>Restrepo</option>\n\
        <option>Riofrío</option>\n\
        <option>Roldanillo</option>\n\
        <option>San Pedro</option>\n\
        <option>Sevilla</option>\n\
        <option>Toro</option>\n\
        <option>Trujillo</option>\n\
        <option>Tulúa</option>\n\
        <option>Ulloa</option>\n\
        <option>Versalles</option>\n\
        <option>Vijes</option>\n\
        <option>Yotoco</option>\n\
        <option>Yumbo</option>\n\
        <option>Zarzal</option>";
    }
    if (dept === "Vaupés") {
        options += "<option>Carurú</option>\n\
                    <option>Mitú</option>\n\
                    <option>Taraira</option>";
    }
    if (dept === "Vichada") {
        options += "<option>Cumaribo</option>\n\
                    <option>La Primavera</option>\n\
                    <option>Puerto Carreño</option>\n\
                    <option>Santa Rosalía</option>";
    }

    options = "<option disabled>Ciudad</option>" + options;
    $("#ciudad").empty();
    $("#ciudad").append(options);
    $("#ciudad").material_select();
}

function agregarOptionNombres(fila) {
    var cadena = "", nombre = "", nombre_inv = $("#invprincipal option:selected").text();
    var verificar_co = true, verificar_inv = false;
    $("#nombres" + fila).empty();

    for (var y = 0; y < nombres.length; y++) {
        nombre = nombres[y];

        if (nombre.toUpperCase() !== nombre_inv) {
            verificar_inv = true;
        } else {
            verificar_inv = false;
        }

        for (var i = 0; i < fila; i++) {
            if (nombre.toUpperCase() !== $("#nombre_co" + i).val() && nombre !== "") {
                //console.info($("#nombre_co" + i).val() + "<>" + nombre.toUpperCase() +">>>>>"+nombres);
                verificar_co = true;
            } else {
                verificar_co = false;
                i = fila;
            }
        }

        if (verificar_co && verificar_inv) {
            cadena += "<option>" + nombre + "</option>";
        }
    }

    $("#nombres" + fila).append(cadena);
    //$(this).val(nombres[0]);
}

function modificarFormatoFecha(aux){
    
    var fc, auxx = "";
    if(aux.length > 10){
        fc=aux.substring(0,10).split("-");
        auxx = fc[2]+"/"+fc[1]+"/"+fc[0];
    }
    return auxx;
}

$(document).ready(function () {

    $('select').material_select();

    $('.datepicker').pickadate({
        format: 'yyyy-mm-dd',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $("#invprincipal").bind("change", function () {
        $("#invprincipal").material_select();
        nombre = $("option:selected", this).text();
        if (nombre !== "") {
            extraerDatosInvPrincipal(nombre);
        }
    });

    $("#invprincipal").bind("click", function () {
        $("#invprincipal").material_select();
        $("#coinvestigadores > tbody > tr").each(function (i, item) {
            nombre = $("#nombre_co" + i).val();
            if (nombre !== "") {
                console.info(i + " <> " + nombre);
                $("#invprincipal option:contains(" + nombre + ")").prop("disabled", true);
                $("#invprincipal").material_select();
            }
        });
        $("#invprincipal").material_select();
    });

    $("#departamento").bind("change", function () {
        var dpt = $('option:selected', this).text();
        elegirCiudad(dpt);
    });

    $("#coinvestigadores tbody").on("keyup", "input.nombre_coinvestigador", function () {
        if ($(this).val() !== ant) {
            $("#invprincipal option:contains(" + nombre + ")").prop("disabled", false);
        }
        var fila = $(this).attr("id").charAt(9);
        nombre = $(this).val();

        extraerNombresIntegrantes(nombre);
        agregarOptionNombres(fila);

    });

    $("#coinvestigadores tbody").on("focus", "input.nombre_coinvestigador", function () {
        console.info("##");
        ant = $(this).val();
    });

    $("#coinvestigadores tbody").on("input", "input.nombre_coinvestigador", function () {
        nombre = $(this).val();
        var fila = ($(this).attr("id")).charAt(9);
        extraerDatosIntegrantes(nombre, fila);
    });

    //tabla coinvestigadores

    $("#add_rowC").click(function () {
        $('#coinvestigadores tbody').append("<tr>\n\
                    <td>" + (a + 1) + "</td>\n\
                    <td><input id='nombre_co" + a + "' type='text' class='nombre_coinvestigador' list='nombres" + a + "' autocomplete='off'/>\n\
                    <datalist id='nombres" + a + "'></datalist></td>\n\
                    <td><input id='dedicacion_co" + a + "' type='number' min='0'/></td>\n\
                    <td><input id='identificacion_co" + a + "' type='number' min='0' disabled/></td>\n\
                    <td><input id='telefono_co" + a + "' type='number' min='1' /></td>\n\
                    <td><input id='celular_co" + a + "' type='number' min='1' disabled/></td>\n\
                    <td><input id='fechaing_co" + a + "' type='text' disabled/></td>\n\
                    <td><input id='niveledu_co" + a + "' type='text' disabled/></td>\n\
                    </tr>");
        a++;
    });

    $("#delete_rowC").click(function () {
        if (a > 1) {
            $("#coinvestigadores tr").last().remove();
            a--;
        }
    });

    //tabla 1
    $("#add_row").click(function () {
        $('#addr' + i).html("<td>" + (i + 1) + "</td><td><input \n\
                    id='objesp" + i + "' type='text' title='Objetivos específicos'/> </td>");

        $('#tabla1').append('<tr id="addr' + (i + 1) + '"></tr>');
        i++;
    });
    $("#delete_row").click(function () {
        if (i > 1) {
            $("#addr" + (i - 1)).html('');
            i--;
        }
    });

    //tabla 2 cronograma variable j

    $("#add_col").bind("click", function () {
        $("#col_meses").attr("colspan", (x + 1));
        x += 1;
        $("#col_cb").append("<th style='text-align: center;'>" + x + "</th>");
        //$("#cronograma  tbody tr").append("<td><input type='checkbox' id='"+ (aux++) +"c"+(x)+"' value='"+(x)+"' /><label for='"+ (aux++) +"c"+(x)+"'></label></td>");
        agregarFilas();
    });

    $("#delete_col").bind("click", function () {
        if (x > 1) {
            x--;
            $("#col_meses").attr("colspan", (x));
            $("#col_cb th").last().remove();
            eliminarColumnas();
        }
    });

    $("#add_row4").click(function () {
        $("#cronograma tbody").append("<tr id='fil" + j + "'>\n\
                    <td>" + (j + 1) + "</td>\n\
                    <td><input type='text' id='actividades" + (j) + "'/></td>\n\
                    " + agregarColumnas() + "\n\
                    </tr>");
        j++;
    });

    $("#delete_row4").click(function () {
        if (j > 1) {
            $("#fil" + (j - 1)).remove();
            j--;
        }
    });

    //tabla 3
    $("#add_row2").click(function () {
        $('#nume' + k).html("<td>" + (k + 1) + "</td>\n\
                    <td><input id='cat" + k + "' type='text'/> </td>\n\
                    <td><input  id='resul" + k + "' type='text'></td>\n\
                    <td><input  id='indi" + k + "' type='text'></td>\n\
                    <td><input  id='med" + k + "' type='text'></td>");

        $('#tabla3').append('<tr id="nume' + (k + 1) + '"></tr>');
        k++;
    });

    $("#delete_row2").click(function () {
        if (k > 1) {
            $("#nume" + (k - 1)).html('');
            k--;
        }
    });

    //tabla 4

    $("#add_row3").click(function () {
        $('#numer' + m).html("<td>" + (m + 1) + "</td><td><input id='tipo" + m + "' type='text'/> </td>\n\
                    <td><input  id='desc" + m + "' type='text'></td>\n\
                    <td><input  id='proyec" + m + "' type='text'></td>");

        $('#tabla4').append('<tr id="numer' + (m + 1) + '"></tr>');
        m++;
    });

    $("#delete_row3").click(function () {
        if (m > 1) {
            $("#numer" + (m - 1)).html('');
            m--;
        }
    });

    //Consultores
    $("#add_rowCs").click(function () {
        if (b < 2) {
            $('#consultores tbody').append("<tr>\n\
                    <td>" + (b + 1) + "</td>\n\
                    <td><input id='nombre_cons" + b + "' type='text'/></td>\n\
                    <td><input id='apellidos_cons" + b + "' type='text'/></td>\n\
                    <td><input id='identificacion_cons" + b + "' type='number' min='0'/></td>\n\
                    <td><input id='fechanac_cons" + b + "' type='date'/></td>\n\
                    <td><input id='nacionalidad_cons" + b + "' type='text' /></td>\n\
                    <td><input id='correo_cons" + b + "' type='email' class='validate invalid'/></td>\n\
                    <td><input id='tel_cons" + b + "' type='number' min='0' /></td>\n\
                    <td><input id='entidad_cons" + b + "' type='text' /></td>\n\
                    <td><input id='cargo_cons" + b + "' type='text' /></td>\n\
                    <td><input id='telOf_cons" + b + "' type='number' min='0'/></td>\n\
                    <td><input id='titulos_cons" + b + "' type='text' /></td>\n\
                    <td><input id='campoExp_cons" + b + "' type='text' /></td>\n\
                    <td><input id='cargosDs_cons" + b + "' type='text' /></td>\n\
                    <td><input id='publicaciones_cons" + b + "' type='text' /></td>\n\
                    <td><input id='productos_cons" + b + "' type='text' /></td>\n\
                    </tr>");
            b++;
        }
    });
    $("#delete_rowCs").click(function () {
        if (b > 1) {
            $("#consultores tr").last().remove();
            b--;
        }
    });


});

function extraerDatosTb1() {
    var tabla = document.getElementById('tabla1');
    var datos = "";
    for (var i = 1; i < tabla.rows.length - 1; i++)
    {
        if (i > 1) {
            datos += "//";
        }
        datos += $("#objesp" + (i - 1)).val();
    }
    return datos;
}

function extraerDatosTb2() {
    var tabla = document.getElementById('cronograma');
    var datos = "";
    for (var i = 1; i < tabla.rows.length - 1; i++)
    {
        if (i > 1) {
            datos += "//";
        }
        datos += $("#actividades" + (i - 1)).val() + "&&" + extraerDatosMeses(i - 1);
    }
    return datos;
}

function extraerDatosTb3() {
    var tabla = document.getElementById('tabla3');
    var datos = "";
    for (var i = 1; i < tabla.rows.length - 1; i++)
    {
        if (i > 1) {
            datos += "//";
        }
        datos += $("#cat" + (i - 1)).val() + "&&" + $("#resul" + (i - 1)).val() + "&&" + $("#indi" + (i - 1)).val() + "&&" + $("#med" + (i - 1)).val();
    }
    return datos;
}

function extraerDatosTb4() {
    var tabla = document.getElementById('tabla4');
    var datos = "";
    for (var i = 1; i < tabla.rows.length - 1; i++)
    {
        if (i > 1) {
            datos += "//";
        }
        datos += $("#tipo" + (i - 1)).val() + "&&" + $("#desc" + (i - 1)).val() + "&&" + $("#proyec" + (i - 1)).val();
    }
    return datos;
}

function extraerDatosMeses(z) {
    var checked, datos = "";
    for (var i = 1; i <= x; i++) {
        checked = $("#" + z + "c" + i).is(':checked');
        if (checked) {
            datos += $("#" + z + "c" + i).val() + ", ";
        }
    }
    datos = datos.substring(0, datos.length - 2);
    return datos;
}

function extraerDatosProyectos() {
    var datos = $("#titulo").val() + ";;" + $("#nombreconv option:selected").val() + ";;" + $("#tipoconv option:selected").val() + ";;" + $("#lineainv").val() + ";;" + $("#centroinv").val() + ";;" + $("#lugarejecucion").val() + ";;" + $("#ciudad").val() + ";;" + $("#departamento").val() + ";;" + $("#duracion").val() + ";;" + $("#financiacion").val() + ";;" + $("#valorefectivo").val() + ";;" + $("#valorespecie").val() + ";;" + $("#valortotalp").val() + ";;" + $("#tipoproy option:selected").val() + ";;" + $("#resumen").val() + ";;" + $("#descripcion").val() + ";;" + $("#objg").val() + ";;" + $("#metodologia").val();
    alert(datos);
    return datos;
}

function extraerDatosCoinvestigadores() {
    var tabla = document.getElementById('coinvestigadores');
    var datos = "";
    for (var i = 1; i < tabla.rows.length; i++)
    {
        if (i > 1) {
            datos += ">>";
        }

        datos += $("#fechaing_co" + (i - 1)).val() + ";;" + $("#telefono_co" + (i - 1)).val() + ";;" + $("#dedicacion_co" + (i - 1)).val();
    }
    return datos;
}

function extraerDatosInvExp() {
    var datos = $("#nombre5").val() + "&&" + $("#correo1").val() + "&&" + $("#instituciones1").val() + "&&" + $("#telefono5").val() + "//" + $("#nombre6").val() + "&&" + $("#correo2").val() + "&&" + $("#instituciones2").val() + "&&" + $("#telefono6").val() + "//" + $("#nombre7").val() + "&&" + $("#correo3").val() + "&&" + $("#instituciones3").val() + "&&" + $("#telefono7").val();
    return datos;
}

function extraerDatosConsultor() {
    var tabla = document.getElementById('consultores');
    var datos = "";

    for (var i = 1; i < tabla.rows.length; i++)
    {
        if (i > 1) {
            datos += ">>";
        }

        datos = $("#identificacion_cons" + (i - 1)).val() + ";;" + $("#nombre_cons" + (i - 1)).val() + ";;" + $("#apellidos_cons" + (i - 1)).val() + ";;" + $("#correo_cons" + (i - 1)).val() + ";;" + $("#fechanac_cons" + (i - 1)).val() + ";;" + $("#nacionalidad_cons" + (i - 1)).val() + ";;" + $("#tel_cons" + (i - 1)).val() + ";;" + $("#entidad_cons" + (i - 1)).val() + ";;" + $("#cargo_cons" + (i - 1)).val() + ";;" + $("#cargo_cons" + (i - 1)).val() + ";;" + $("#titulos_cons" + (i - 1)).val() + ";;" + $("#camposExp_cons" + (i - 1)).val() + ";;" + $("#cargoDs_cons" + (i - 1)).val() + ";;" + $("#publicaciones_cons" + (i - 1)).val() + ";;" + $("#productos_cons" + (i - 1)).val();
    }
    return datos;
}
          