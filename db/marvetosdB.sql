-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: marvetos
-- ------------------------------------------------------
-- Server version	5.7.11-log


-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2020-06-23 16:15:08.687

-- tables
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
    SubTotal decimal
        (6,2) NOT NULL,
    cantProducto int NOT NULL,
    idUbicacion int NOT NULL,
    Orden_idOrden int NOT NULL,
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
    idUser int NOT NULL,
    fechaOrden timestamp NOT NULL,
    fechaEntrega timestamp NOT NULL,
    Comentario varchar
                    (200) NOT NULL,
    Direccion varchar
                    (100) NOT NULL,
    PrecioTotal decimal
                    (6,2) NOT NULL,
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
    descripcion varchar
                        (600) NOT NULL,
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
    name varchar
                                    (50) NOT NULL,
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
    telefono int NOT NULL,
    CONSTRAINT User_pk PRIMARY KEY
                                        (idUser)
);

                                        -- foreign keys
                                        -- Reference: DetalleCarrito_Orden (table: DetalleCarrito)
                                        ALTER TABLE DetalleCarrito ADD CONSTRAINT DetalleCarrito_Orden FOREIGN KEY DetalleCarrito_Orden
                                        (Orden_idOrden)
    REFERENCES Orden
                                        (idOrden);

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

                                        -- Reference: Orden_Estado (table: Orden)
                                        ALTER TABLE Orden ADD CONSTRAINT Orden_Estado FOREIGN KEY Orden_Estado
                                        (idEstado)
    REFERENCES Estado
                                        (idEstado);

                                        -- Reference: Orden_User (table: Orden)
                                        ALTER TABLE Orden ADD CONSTRAINT Orden_User FOREIGN KEY Orden_User
                                        (idUser)
    REFERENCES User
                                        (idUser);

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



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
                                        INSERT INTO `
                                        categoria`
                                        VALUES
                                            (1, 'Verduras'),
                                            (2, 'Frutas'),
                                            (3, 'Cereales'),
                                            (4, 'Abarrotes'),
                                            (5, 'Tubérculos'),
                                            (6, 'Pollo'),
                                            (7, 'Hogar'),
                                            (8, 'Salio,por fin');
                                        /*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
                                        UNLOCK TABLES;

--
-- Dumping data for table `detallecarrito`
--

LOCK TABLES `detallecarrito` WRITE;
/*!40000 ALTER TABLE `detallecarrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `detallecarrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `estado`
--

LOCK TABLES `estado` WRITE;
/*!40000 ALTER TABLE `estado` DISABLE KEYS */;
                                        INSERT INTO `
                                        estado`
                                        VALUES
                                            (1, 'Pendiente'),
                                            (2, 'Confirmado'),
                                            (3, 'En camino'),
                                            (4, 'Entregado');
                                        /*!40000 ALTER TABLE `estado` ENABLE KEYS */;
                                        UNLOCK TABLES;

--
-- Dumping data for table `formapago`
--

LOCK TABLES `formapago` WRITE;
/*!40000 ALTER TABLE `formapago` DISABLE KEYS */;
                                        INSERT INTO `
                                        formapago`
                                        VALUES
                                            (1, 'Transferencia'),
                                            (2, 'Contraentrega');
                                        /*!40000 ALTER TABLE `formapago` ENABLE KEYS */;
                                        UNLOCK TABLES;

--
-- Dumping data for table `orden`
--

LOCK TABLES `orden` WRITE;
/*!40000 ALTER TABLE `orden` DISABLE KEYS */;
/*!40000 ALTER TABLE `orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
                                        INSERT INTO `
                                        producto`
                                        VALUES
                                            (1, 4, 'Aceite Beltrán', 'https://juntozstgsrvproduction.blob.core.windows.net/default-blob-images/200x200_AB000005_413696.jpg?w=200&h=200', 6.00, 30, 1, 'asdasdasdasd'),
                                            (2, 2, 'Manzana de agua', 'https://i2.wp.com/merkadomicilios.com/wp-content/uploads/2020/05/manzana-agua.jpg?fit=770%2C627&ssl=1', 3.50, 70, 1, 'asdasdasdasd'),
                                            (3, 3, 'Chuño', 'https://vivanda.vteximg.com.br/arquivos/ids/167486-1000-1000/915750.jpg?v=636137840882270000', 8.00, 50, 1, 'asdasdasdasd'),
                                            (4, 1, 'Brocoli', 'https://www.thegourmetjournal.com/wp-content/uploads/2018/08/Brocoli.jpg', 5.00, 40, 1, 'asdasdasdasd');
                                        /*!40000 ALTER TABLE `producto` ENABLE KEYS */;
                                        UNLOCK TABLES;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
                                        INSERT INTO `
                                        rol`
                                        VALUES
                                            (1, 'Empresa'),
                                            (2, 'Persona Natura'),
                                            (3, 'Vendedor'),
                                            (4, 'Conductor');
                                        /*!40000 ALTER TABLE `rol` ENABLE KEYS */;
                                        UNLOCK TABLES;

--
-- Dumping data for table `ubicacion`
--

LOCK TABLES `ubicacion` WRITE;
/*!40000 ALTER TABLE `ubicacion` DISABLE KEYS */;
                                        INSERT INTO `
                                        ubicacion`
                                        VALUES
                                            (1, 'San Miguel', 1.00),
                                            (2, 'Magdalena', 1.00);
                                        /*!40000 ALTER TABLE `ubicacion` ENABLE KEYS */;
                                        UNLOCK TABLES;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
                                        INSERT INTO `
                                        unidad`
                                        VALUES
                                            (1, 'Kilogramos');
                                        /*!40000 ALTER TABLE `unidad` ENABLE KEYS */;
                                        UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
                                        INSERT INTO `user`
                                        VALUES
                                            (1, 'pedro.velacc1@hotmail.com', 'asdasd', '', '05291141', 'Cruz', 'Vela', 2, '', 986141854),
                                            (2, 'marvetos@gmail.com', 'asdasd', '123123', '05291141', 'Cruz', 'Vela', 1, 'Marvetos', 986141854);
                                        /*!40000 ALTER TABLE `user` ENABLE KEYS */;
                                        UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-23 14:19:12
