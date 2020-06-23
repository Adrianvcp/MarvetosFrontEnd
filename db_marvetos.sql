create database marvetos;
use marvetos;
CREATE TABLE Carrito
(
    idCarrito int NOT NULL
    AUTO_INCREMENT,
    idUser int NOT NULL,
    CONSTRAINT Carrito_pk PRIMARY KEY
    (idCarrito)
);

    -- Table: Categoria
    CREATE TABLE Categoria
    (
        idCategoria int NOT NULL
        AUTO_INCREMENT,
    name varchar
        (15) NOT NULL,
    CONSTRAINT Categoria_pk PRIMARY KEY
        (idCategoria)
);

        -- Table: DetalleCarrito
        CREATE TABLE DetalleCarrito
        (
            idDetalleCarrito int NOT NULL
            AUTO_INCREMENT,
    idProducto int NOT NULL,
    idPago int NOT NULL,
    idCarrito int NOT NULL,
    precioTotal decimal
            (6,2) NOT NULL,
    cantProducto int NOT NULL,
    direccion varchar
            (45) NOT NULL,
    fechaCreada timestamp NOT NULL,
    comentarios varchar
            (100) NOT NULL,
    idUbicacion int NOT NULL,
    CONSTRAINT DetalleCarrito_pk PRIMARY KEY
            (idDetalleCarrito,idProducto)
);

            -- Table: Estado
            CREATE TABLE Estado
            (
                idEstado int NOT NULL
                AUTO_INCREMENT,
    Estado varchar
                (20) NOT NULL,
    CONSTRAINT Estado_pk PRIMARY KEY
                (idEstado)
);

                -- Table: FormaPago
                CREATE TABLE FormaPago
                (
                    idPago int NOT NULL
                    AUTO_INCREMENT,
    name varchar
                    (40) NOT NULL,
    CONSTRAINT FormaPago_pk PRIMARY KEY
                    (idPago)
);

                    -- Table: Orden
                    CREATE TABLE Orden
                    (
                        idOrden int NOT NULL
                        AUTO_INCREMENT,
    idEstado int NOT NULL,
    idConductor int NULL,
    idVendedor int NULL,
    idDetalleCarrito int NOT NULL,
    idProducto int NOT NULL,
    CONSTRAINT Orden_pk PRIMARY KEY
                        (idOrden)
);

                        -- Table: Producto
                        CREATE TABLE Producto
                        (
                            idProducto int NOT NULL
                            AUTO_INCREMENT,
    idCategoria int NOT NULL,
    name varchar
                            (15) NOT NULL,
    image varchar
                            (300) NOT NULL,
    precio double
                            (5,2) NOT NULL,
    stock int NOT NULL,
    idUnidad int NOT NULL,
    CONSTRAINT Producto_pk PRIMARY KEY
                            (idProducto)
);

                            -- Table: Rol
                            CREATE TABLE Rol
                            (
                                idRol int NOT NULL
                                AUTO_INCREMENT,
    nombreRol varchar
                                (40) NOT NULL,
    CONSTRAINT Rol_pk PRIMARY KEY
                                (idRol)
);

                                -- Table: Ubicacion
                                CREATE TABLE Ubicacion
                                (
                                    idUbicacion int NOT NULL
                                    AUTO_INCREMENT,
    Distrito varchar
                                    (25) NOT NULL,
    Precio decimal
                                    (6,2) NOT NULL,
    CONSTRAINT Ubicacion_pk PRIMARY KEY
                                    (idUbicacion)
);

                                    -- Table: Unidad
                                    CREATE TABLE Unidad
                                    (
                                        idUnidad int NOT NULL
                                        AUTO_INCREMENT,
    name int NOT NULL,
    CONSTRAINT Unidad_pk PRIMARY KEY
                                        (idUnidad)
);

                                        -- Table: User
                                        CREATE TABLE User
                                        (
                                            idUser int NOT NULL
                                            AUTO_INCREMENT,
    email varchar
                                            (100) NOT NULL,
    pass varchar
                                            (8) NOT NULL,
    RUC varchar
                                            (11) NULL,
    DNI varchar
                                            (8) NULL,
    Apellidos varchar
                                            (20) NOT NULL,
    Nombres varchar
                                            (20) NOT NULL,
    idRol int NOT NULL,
    NombreEmpresa varchar
                                            (100) NULL,
    CONSTRAINT User_pk PRIMARY KEY
                                            (idUser)
);

                                            -- foreign keys
                                            -- Reference: Carrito_User (table: Carrito)
                                            ALTER TABLE Carrito ADD CONSTRAINT Carrito_User FOREIGN KEY Carrito_User
                                            (idUser)
    REFERENCES User
                                            (idUser);

                                            -- Reference: DetalleCarrito_Carrito (table: DetalleCarrito)
                                            ALTER TABLE DetalleCarrito ADD CONSTRAINT DetalleCarrito_Carrito FOREIGN KEY DetalleCarrito_Carrito
                                            (idCarrito)
    REFERENCES Carrito
                                            (idCarrito);

                                            -- Reference: DetalleCarrito_Pago (table: DetalleCarrito)
                                            ALTER TABLE DetalleCarrito ADD CONSTRAINT DetalleCarrito_Pago FOREIGN KEY DetalleCarrito_Pago
                                            (idPago)
    REFERENCES FormaPago
                                            (idPago);

                                            -- Reference: DetalleCarrito_Producto (table: DetalleCarrito)
                                            ALTER TABLE DetalleCarrito ADD CONSTRAINT DetalleCarrito_Producto FOREIGN KEY DetalleCarrito_Producto
                                            (idProducto)
    REFERENCES Producto
                                            (idProducto);

                                            -- Reference: DetalleCarrito_Ubicacion (table: DetalleCarrito)
                                            ALTER TABLE DetalleCarrito ADD CONSTRAINT DetalleCarrito_Ubicacion FOREIGN KEY DetalleCarrito_Ubicacion
                                            (idUbicacion)
    REFERENCES Ubicacion
                                            (idUbicacion);

                                            -- Reference: Orden_DetalleCarrito (table: Orden)
                                            ALTER TABLE Orden ADD CONSTRAINT Orden_DetalleCarrito FOREIGN KEY Orden_DetalleCarrito
                                            (idDetalleCarrito,idProducto)
    REFERENCES DetalleCarrito
                                            (idDetalleCarrito,idProducto);

                                            -- Reference: Orden_Estado (table: Orden)
                                            ALTER TABLE Orden ADD CONSTRAINT Orden_Estado FOREIGN KEY Orden_Estado
                                            (idEstado)
    REFERENCES Estado
                                            (idEstado);

                                            -- Reference: Producto_Categoria (table: Producto)
                                            ALTER TABLE Producto ADD CONSTRAINT Producto_Categoria FOREIGN KEY Producto_Categoria
                                            (idCategoria)
    REFERENCES Categoria
                                            (idCategoria);

                                            -- Reference: Producto_Unidad (table: Producto)
                                            ALTER TABLE Producto ADD CONSTRAINT Producto_Unidad FOREIGN KEY Producto_Unidad
                                            (idUnidad)
    REFERENCES Unidad
                                            (idUnidad);

                                            -- Reference: User_Table_24 (table: User)
                                            ALTER TABLE User ADD CONSTRAINT User_Table_24 FOREIGN KEY User_Table_24
                                            (idRol)
    REFERENCES Rol
                                            (idRol);

-- End of file.