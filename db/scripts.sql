USE app;

CREATE TABLE rol (
    IdRol VARCHAR(20) NOT NULL PRIMARY KEY,
    NombreRol VARCHAR(50) NOT NULL
);

CREATE TABLE usuario(
	IdUsuario VARCHAR(30) NOT NULL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    password VARCHAR(70) NOT NULL,
	IdRol VARCHAR(20) NOT NULL,
    FOREIGN KEY (IdRol) REFERENCES rol(IdRol)
);

CREATE TABLE permiso(
	IdPermiso Varchar(20) NOT NULL PRIMARY KEY,
    Permiso VARCHAR(100)
);

CREATE TABLE permisodenegadoporol(
	IdRol VARCHAR(20) NOT NULL,
	IdPermiso Varchar(20) NOT NULL,
    denegar BOOLEAN DEFAULT true,
    FOREIGN KEY (IdRol) REFERENCES rol(IdRol),
    FOREIGN KEY (IdPermiso) REFERENCES permiso(IdPermiso)
);