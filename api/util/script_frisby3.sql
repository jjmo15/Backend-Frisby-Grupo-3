CREATE TABLE public.usuarios (
	identificacion varchar(20) NOT NULL,
	nombre varchar(100) NOT NULL,
	apellido varchar(100) NOT NULL,
	correo varchar NOT NULL,
	telefono varchar(10) NULL,
	clave varchar(50) NOT NULL,
	ciudad varchar(50) NOT NULL,
	descripcion varchar(500) NOT NULL,
	direccion varchar(50) NOT NULL,
	hoja_de_vida varchar(200),
	
	CONSTRAINT usuario_pk PRIMARY KEY (identificacion)
);

CREATE TABLE public.cargos (
	id serial NOT NULL,
	nombre varchar(40) NOT NULL,
		
	CONSTRAINT cargo_pk PRIMARY KEY (id)
);

CREATE TABLE public.aplicar_ofertas (
	id serial NOT NULL,
	usuario varchar(20) NOT NULL,
	oferta integer NOT NULL,
		
	CONSTRAINT aplicar_oferta_pk PRIMARY KEY (id)
);

CREATE TABLE public.ofertas (
	id serial NOT NULL,
	nombre varchar(100) NOT NULL,
	ciudad varchar(50) NOT NULL,
	requisitos varchar(300) NOT NULL,
	descripcion varchar(500) NOT NULL,
	cargo integer NOT NULL,
		
	CONSTRAINT oferta_pk PRIMARY KEY (id)
);

CREATE TABLE public.empleados (
	id varchar(20) NOT NULL,
	identificacion varchar(20) NOT NULL,
	cargo integer NOT NULL,
	
	CONSTRAINT empleado_pk PRIMARY KEY (id)
);

CREATE TABLE public.capacitaciones (
	id serial NOT NULL,
	nombre varchar(20) NOT NULL,
	estado varchar(20)  NOT NULL,
	cuestionario varchar(20)  NOT NULL,
    calificacion double precision,
	
	CONSTRAINT capacitacion_pk PRIMARY KEY (id)
);

CREATE TABLE public.capacitacion_empleados (
	id serial NOT NULL,
	empleado varchar(20) NOT NULL,
	capacitacion integer NOT NULL,
	
	CONSTRAINT capacitacion_empleado_pk PRIMARY KEY (id)
);

CREATE TABLE public.evaluaciones (
	id serial NOT NULL,
	estado varchar(20) not null,
	calificacion double precision,
	cuestionario varchar(20),
	usuario varchar(20) NOT NULL,
	
	CONSTRAINT evaluacion_pk PRIMARY KEY (id)
);

CREATE TABLE public.evaluacion_usuarios (
	id serial NOT NULL,
	evaluacion integer NOT NULL,
	usuario varchar(20) NOT NULL,
		
	CONSTRAINT evaluacion_usuario_pk PRIMARY KEY (id)
);


ALTER TABLE public.aplicar_ofertas ADD CONSTRAINT aplicar_oferta_usuario_fk FOREIGN KEY (usuario) REFERENCES usuarios(identificacion) ON UPDATE CASCADE;
ALTER TABLE public.aplicar_ofertas ADD CONSTRAINT aplicar_oferta_oferta_fk FOREIGN KEY (oferta) REFERENCES ofertas(id) ON UPDATE CASCADE;
ALTER TABLE public.empleados ADD CONSTRAINT empleado_usuario_fk FOREIGN KEY (identificacion) REFERENCES usuarios(identificacion) ON UPDATE CASCADE;
ALTER TABLE public.ofertas ADD CONSTRAINT oferta_cargo_fk FOREIGN KEY (cargo) REFERENCES cargos(id) ON UPDATE CASCADE;
ALTER TABLE public.empleados ADD CONSTRAINT empleado_cargo_fk FOREIGN KEY (cargo) REFERENCES cargos(id) ON UPDATE CASCADE;
ALTER TABLE public.capacitacion_empleados ADD CONSTRAINT capacitacion_empleado_empleado_fk FOREIGN KEY (empleado) REFERENCES empleados(id) ON UPDATE CASCADE;
ALTER TABLE public.capacitacion_empleados ADD CONSTRAINT capacitacion_empleado_capacitacion_fk FOREIGN KEY (capacitacion) REFERENCES capacitaciones(id) ON UPDATE CASCADE;
ALTER TABLE public.evaluacion_usuarios ADD CONSTRAINT evaluacion_usuario_evaluacion_fk FOREIGN KEY (evaluacion) REFERENCES evaluaciones(id) ON UPDATE CASCADE;
ALTER TABLE public.evaluacion_usuarios ADD CONSTRAINT evaluacion_usuario_usuario_fk FOREIGN KEY (usuario) REFERENCES usuarios(identificacion) ON UPDATE CASCADE;