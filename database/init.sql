-- ==========================================
-- 1. BASE DE DATOS: db_estudiantes
-- ==========================================
CREATE DATABASE IF NOT EXISTS db_estudiantes;
USE db_estudiantes;

CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    carrera VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

CREATE PROCEDURE sp_listar_estudiantes()
BEGIN
    SELECT id, codigo, nombres, apellidos, correo, carrera FROM estudiantes ORDER BY id DESC;
END //

CREATE PROCEDURE sp_obtener_estudiante(IN p_id INT)
BEGIN
    SELECT id, codigo, nombres, apellidos, correo, carrera FROM estudiantes WHERE id = p_id;
END //

CREATE PROCEDURE sp_registrar_estudiante(
    IN p_codigo VARCHAR(20),
    IN p_nombres VARCHAR(100),
    IN p_apellidos VARCHAR(100),
    IN p_correo VARCHAR(120),
    IN p_carrera VARCHAR(100)
)
BEGIN
    INSERT INTO estudiantes (codigo, nombres, apellidos, correo, carrera)
    VALUES (p_codigo, p_nombres, p_apellidos, p_correo, p_carrera);
    SELECT LAST_INSERT_ID() AS id;
END //

CREATE PROCEDURE sp_actualizar_estudiante(
    IN p_id INT,
    IN p_codigo VARCHAR(20),
    IN p_nombres VARCHAR(100),
    IN p_apellidos VARCHAR(100),
    IN p_correo VARCHAR(120),
    IN p_carrera VARCHAR(100)
)
BEGIN
    UPDATE estudiantes
    SET codigo = p_codigo,
        nombres = p_nombres,
        apellidos = p_apellidos,
        correo = p_correo,
        carrera = p_carrera
    WHERE id = p_id;
    SELECT ROW_COUNT() AS afectados;
END //

CREATE PROCEDURE sp_eliminar_estudiante(IN p_id INT)
BEGIN
    DELETE FROM estudiantes WHERE id = p_id;
    SELECT ROW_COUNT() AS afectados;
END //

DELIMITER ;

-- ==========================================
-- 2. BASE DE DATOS: db_cursos
-- ==========================================
CREATE DATABASE IF NOT EXISTS db_cursos;
USE db_cursos;

CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(120) NOT NULL,
    creditos INT NOT NULL,
    docente VARCHAR(120) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //

CREATE PROCEDURE sp_listar_cursos()
BEGIN
    SELECT id, codigo, nombre, creditos, docente FROM cursos ORDER BY id DESC;
END //

CREATE PROCEDURE sp_obtener_curso(IN p_id INT)
BEGIN
    SELECT id, codigo, nombre, creditos, docente FROM cursos WHERE id = p_id;
END //

CREATE PROCEDURE sp_registrar_curso(
    IN p_codigo VARCHAR(20),
    IN p_nombre VARCHAR(120),
    IN p_creditos INT,
    IN p_docente VARCHAR(120)
)
BEGIN
    INSERT INTO cursos (codigo, nombre, creditos, docente)
    VALUES (p_codigo, p_nombre, p_creditos, p_docente);
    SELECT LAST_INSERT_ID() AS id;
END //

CREATE PROCEDURE sp_actualizar_curso(
    IN p_id INT,
    IN p_codigo VARCHAR(20),
    IN p_nombre VARCHAR(120),
    IN p_creditos INT,
    IN p_docente VARCHAR(120)
)
BEGIN
    UPDATE cursos
    SET codigo = p_codigo,
        nombre = p_nombre,
        creditos = p_creditos,
        docente = p_docente
    WHERE id = p_id;
    SELECT ROW_COUNT() AS afectados;
END //

CREATE PROCEDURE sp_eliminar_curso(IN p_id INT)
BEGIN
    DELETE FROM cursos WHERE id = p_id;
    SELECT ROW_COUNT() AS afectados;
END //

DELIMITER ;