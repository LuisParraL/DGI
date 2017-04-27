CREATE TABLE usuarios (usuario varchar2(50) PRIMARY KEY, pass varchar2(50));

CREATE TABLE facultades (id NUMBER(2) PRIMARY KEY, nombre varchar2(300));
	
CREATE TABLE grupos_investigacion(idgrupo varchar2(50) PRIMARY KEY NOT NULL, nombre varchar2(300), sigla varchar2(100),
	codigo_institucional varchar2(100), clasificacion varchar2(10) NOT NULL, categoria varchar2(100), codigo_colciencias varchar2(50), areacono varchar2(1000) NOT NULL, correo varchar2(150) NOT NULL,
	centro_investigacion varchar2(200) NOT NULL, pertenece varchar2(200), fecha_formacion date, 
	areaprin varchar2(500) NOT NULL, areasecun varchar2(500) NOT NULL, testudiantespre NUMBER,
	testudiantespos NUMBER, tauxiliaresinv NUMBER, tcoinvestext NUMBER, tjovenesinv NUMBER,
	tinvjunior NUMBER, tinvasociados NUMBER, tinvseniors NUMBER, mision varchar2(3900) NOT NULL,
	vision varchar2(3900), objetivos varchar2(3000), prospectiva varchar2(3000),
	area_tematica varchar2(500), linea_investigacion varchar2(3500), linea_institucional varchar2(3000), lineapro varchar2(3500),
	servicioext varchar2(500), fecha_inscripcion date, fecha_actualizacion date NULL,  idfacultad NUMBER,
	departamento varchar2(70), informe_semestral1 varchar2(50), informe_semestral2 varchar2(50),
	ciudad varchar2(70) not null, usuario varchar2(50), CONSTRAINT FK_USUARIO FOREIGN KEY(usuario)
	REFERENCES usuarios(usuario) ON DELETE SET NULL, 
	CONSTRAINT FK_FACULTAD FOREIGN KEY(idfacultad)REFERENCES facultades (id) ON DELETE SET NULL);


CREATE TABLE integrantes (cedula varchar2(50) PRIMARY KEY not null, nombre varchar2(100) not null, 
	fecha_expedicion date, estado_civil varchar2(50),
	correspondencia varchar2(200) NULL,	correo varchar2(100) not null, telefono NUMBER not null, formacion varchar2(200) not null,
	titulo_academico varchar2(200) null, tarjeta_profesional varchar2(50) null, 
	tipo_vinculacion varchar2(100) not null,  universidad_externa varchar2(200) NULL,
	clasificacion_col varchar2(100) null, fecha_ingreso date, hasignadas NUMBER,	fecha_retiro date null,
	idgrupo varchar2(50) not null, CONSTRAINT FK_GRUPO FOREIGN KEY(idgrupo) 
	REFERENCES grupos_investigacion(idgrupo) ON DELETE SET NULL);

CREATE TABLE DESARROLLO_TECNOLOGICO (IDTECNOLOGICO NUMBER PRIMARY KEY NOT NULL, TIPO_PRODUCTO VARCHAR2(100), CATEGORIA VARCHAR2(15), 
        NOMBRE_PRODUCTO VARCHAR2(300), NUMERO_REGISTRO NUMBER, YEAR_GET NUMBER, PAIS VARCHAR2(50),
        GACETA VARCHAR2(100));


CREATE TABLE AUTORES_DESARROLLOT (CEDULA VARCHAR2(50) , IDTECNOLOGICO NUMBER, PRIMARY KEY(CEDULA, IDTECNOLOGICO),
        CONSTRAINT FK_AUTOREST_INTEGRANTES FOREIGN KEY(CEDULA) REFERENCES INTEGRANTES(CEDULA) ON DELETE SET NULL,
        CONSTRAINT FK_AUTOREST_TECNOLOGICO FOREING KEY(IDTECNOLOGICO) REFERENCES DESARROLLO_TECNOLOGICO(IDTECNOLOGICO) ON DELETE SET NULL
);

CREATE SEQUENCE SECUENCIA_DES START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE secuencia_pro START WITH 1 INCREMENT BY 1;

CREATE TABLE proyectos (idproyecto NUMBER PRIMARY KEY, nombre_proyecto varchar2(300), linea_investigacion varchar2(100),
		 linea_institucional varchar2(300),  tipo_proyecto varchar2(100),  ciudad_ejecucion varchar2(70), 
		 departamento_ejecucion varchar2(70), lugar_ejecucion varchar2(150), duracion NUMBER,
		 entidades_participantes varchar2(200), valor_total_proyecto NUMBER,  valor_sol_efectivo_u NUMBER, 
		 valor_contra_efectivo NUMBER, valor_especie_u NUMBER, valor_contra_especie NUMBER, 
		 fuentes_financiacion varchar2(200), fecha_inicio date, fecha_termina date, keyword varchar2(200), idgrupo varchar2(30),
		 estado_actual varchar2(30), resumen varchar2(501), descripcion 
		 varchar2(3500), objetivo_general varchar2(2000), objetivosespecif varchar2(3500), cedula NUMBER,
		 metodologiapro varchar2(3500), fecha_informe1 date, fecha_informe2 date, fecha_informe3 date, fecha_informe4 date,
		 prorroga NUMBER, fecha_inicio_prorroga date, fecha_termina_prorroga date,
		 CONSTRAINT FK_GRUPOPROYECTO FOREIGN KEY(idgrupo) 
		 REFERENCES grupos_investigacion(idgrupo) ON DELETE SET NULL);

CREATE TABLE integrantes_proyectos (idproyecto NUMBER NOT NULL, cedula varchar2(50) NOT NULL,
		 cargo_proyecto varchar2(100), estado_civil varchar2(100), telefono_oficina varchar2(50),
		 dedicacion_horas NUMBER,
		 PRIMARY KEY(idproyecto,cedula), CONSTRAINT FK_INTE_PROY_INTEGRANTE FOREIGN KEY(cedula) 
		 REFERENCES integrantes(cedula) ON DELETE SET NULL, 
		 CONSTRAINT FK_INTE_PROY_PROYECTO FOREIGN KEY(idproyecto) 
		 REFERENCES proyectos(idproyecto) ON DELETE SET NULL) ;
--referenciar como debe ser las dos llaves y agregar o no una llave primaria propia


CREATE SEQUENCE secuencia_trabajo START WITH 1 INCREMENT BY 1;
CREATE TABLE trabajos (idtrabajo NUMBER PRIMARY KEY, tipo_producto varchar2(50) NOT NULL, nombre_producto
	varchar2(200) NOT NULL,  estudiante_orientado varchar2(100) not null,
	categoria varchar2(20) not null, institucion varchar2(100) null, entidad_financiadora varchar2(200) null,
	estado varchar2(50) not null, fecha_inicio date, fecha_termina date null, cedula varchar2(50) not null,
	CONSTRAINT FK_TRABAJOS_INTEGRANTES FOREIGN KEY (cedula) REFERENCES integrantes(cedula) ON DELETE SET NULL);

--donde he colocado cedula he quitado el nombre del participante, nombre participante debe coincidi
--exactamente con el registrado en participates para contruir la llave foranea(sacar cedula y colocarla)

CREATE SEQUENCE secuencia_eventos START WITH 1 INCREMENT BY 1;

CREATE TABLE eventos (idevento NUMBER PRIMARY KEY, tipo_evento varchar2(50) NOT NULL,
	ambito varchar2(30) NOT NULL, pais varchar2(100) NOT NULL, ciudad varchar2(100) NOT NULL,
	nombre_ponencia varchar2(500) null, tipo_ponencia varchar2(500) null,
	fecha_inicio date, fecha_termina date, participacion varchar2(50), productos varchar2(100) NULL,
	cedula varchar2(50) NOT NULL, entidad_organizadora varchar2(200) null,
	entidad_financiadora varchar2(200) null);

CREATE TABLE integrantes_eventos (idevento NUMBER, cedula varchar2(50), PRIMARY KEY(idevento,cedula),
	CONSTRAINT FK_INTE_EVENT_INTEGRANTES FOREIGN KEY(cedula)REFERENCES integrantes(cedula),
	CONSTRAINT FK_INTE_EVENT_EVENTOS FOREIGN KEY (idevento) REFERENCES eventos(idevento) 
	ON DELETE SET NULL);

CREATE SEQUENCE secuencia_conocimiento START WITH 1 INCREMENT BY 1;
CREATE TABLE nuevo_conocimiento (idconocimiento NUMBER PRIMARY KEY, tipo_producto varchar2(100) NOT NULL,
	nombre varchar2(500) NOT NULL, volumen varchar2(50) NULL, serie varchar2(50) NULL, year varchar2(10) NULL,
	editorial varchar2(100) NULL, clasificacion varchar2(50) NOT NULL, isbn varchar2(100) NOT NULL,
	nombre_revista varchar2(200) NULL, nombre_libro varchar2(200) NULL, pais varchar2(100) NOT NULL,
	ciudad varchar2(100) NULL, estado_producto varchar2(50) NOT NULL);

--autores tabla generada entre integrantes y nuevo conocimiento

CREATE TABLE autores (cedula varchar2(50), idconocimiento NUMBER, PRIMARY KEY(cedula,idconocimiento),
	CONSTRAINT FK_AUTORES_INTEGRANTES FOREIGN KEY (cedula) REFERENCES integrantes(cedula) ON DELETE SET NULL,
	CONSTRAINT FK_AUTORES_CONOCIMIENTO FOREIGN KEY (idconocimiento) REFERENCES 
	nuevo_conocimiento(idconocimiento) ON DELETE SET NULL);

CREATE SEQUENCE secuencia_convocatoria START WITH 1 INCREMENT BY 1;

CREATE TABLE convocatorias (idconvocatoria NUMBER PRIMARY KEY, nombre varchar2(500), tipo varchar2(100),
	entidad_financiadora varchar2(200), ubicacion varchar2(100), year varchar2(10));

--tabla generada entre convocatorias y proyectos

CREATE TABLE proyecto_convocatoria (idconvocatoria NUMBER, idproyecto NUMBER, producto_participo varchar2(1000),
	resultado_obtenido varchar2(500), valor_total_proyecto varchar2(50), PRIMARY KEY (idconvocatoria,idproyecto),
	CONSTRAINT FK_PROYECT_CONV_CONVOCATORIA FOREIGN KEY (idconvocatoria) REFERENCES convocatorias(idconvocatoria)
	ON DELETE SET NULL,
	CONSTRAINT FK_PROYECT_CONV_PROYECTO FOREIGN KEY (idproyecto) REFERENCES 
	proyectos(idproyecto) ON DELETE SET NULL);

CREATE TABLE investigadores_expertos (cedula varchar2(50) PRIMARY KEY, nombre varchar2(100),
	correo varchar2(100), institucion varchar2(100), telefono NUMBER);

--tabla generada entre investigadores expertos y proyectos m a n
CREATE TABLE expertos_proyectos (idproyecto NUMBER, cedula varchar2(50), PRIMARY KEY(idproyecto,cedula),
	CONSTRAINT FK_EXPERT_PROY_PROYECTO FOREIGN KEY (idproyecto) REFERENCES proyectos(idproyecto)
	ON DELETE SET NULL,
	CONSTRAINT FK_EXPERT_PROY_EXPERTOS FOREIGN KEY (cedula) REFERENCES 
	investigadores_expertos(cedula) ON DELETE SET NULL);

CREATE TABLE consultores (cedula varchar2(50) PRIMARY KEY, nombre varchar2(50), apellido varchar2(50),
		correo varchar2(100), fecha_nacimiento date, nacionalidad varchar2(100), telfax varchar2(30),
		entidad_labora varchar2(100), telfaxlabora varchar2(30), cargo_actual varchar2(100), titulos varchar2 (1000),
		campos_experto varchar2(3000), cargosdesemp varchar2(3000), publicaciones_recientes varchar2(3000), 
		patentes varchar2(2000));

--tabla generada entre consultores y proyectos
CREATE TABLE consultores_proyectos (idproyecto NUMBER, cedula varchar2(50), PRIMARY KEY(idproyecto,cedula),
	CONSTRAINT FK_CONSUL_PROY_PROYECTO FOREIGN KEY (idproyecto) REFERENCES proyectos(idproyecto)
	ON DELETE SET NULL,
	CONSTRAINT FK_CONSUL_PROY_CONSULTORES FOREIGN KEY (cedula) REFERENCES 
	consultores(cedula) ON DELETE SET NULL);

--tabla cronograma
CREATE SEQUENCE secuencia_cronograma START WITH 1 INCREMENT BY 1;

CREATE TABLE cronograma_actividades (idactividad NUMBER PRIMARY KEY, actividad varchar2(200),
	cantidad_meses varchar2(10), idproyecto NUMBER, CONSTRAINT FK_CRONOGRAMA_PROYECTO
	FOREIGN KEY (idproyecto) REFERENCES proyectos(idproyecto) ON DELETE SET NULL);

--resultados esperados
CREATE SEQUENCE secuencia_resultados START WITH 1 INCREMENT BY 1;
CREATE TABLE resultados_esperados (idresultado NUMBER PRIMARY KEY, categoria varchar2(100), resultado_producto varchar2(200),
	indicador varchar2(100), medio_verificacion varchar2(500), idproyecto NUMBER, CONSTRAINT FK_RESULTADOS_PROYECTO
	FOREIGN KEY(idproyecto) REFERENCES proyectos(idproyecto) ON DELETE SET NULL);

--impacto social del proyecto
CREATE SEQUENCE secuencia_impacto START WITH 1 INCREMENT BY 1;
CREATE TABLE impacto_social (idimpacto NUMBER PRIMARY KEY, tipo_impacto varchar2(100), descripcion_impacto varchar2(2000),
	proyeccion_impacto varchar2(50), idproyecto NUMBER, CONSTRAINT FK_IMPACTO_PROYECTO
	FOREIGN KEY(idproyecto) REFERENCES proyectos(idproyecto) ON DELETE SET NULL);

--la secuencia hay que iniciarla con select sequencepro.nextval from dual;
--luego al insertar en la bd solo es secuencepro.nextval