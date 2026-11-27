//estudianteController.js
const pool = require('../config/db');

exports.listar = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_listar_estudiantes()');
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar estudiantes', error: error.message });
    }
};

exports.obtenerPorId = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_obtener_estudiante(?)', [req.params.id]);
        if (rows[0].length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.status(200).json(rows[0][0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar estudiante', error: error.message });
    }
};

exports.registrar = async (req, res) => {
    const { codigo, nombres, apellidos, correo, carrera } = req.body;
    if (!codigo || !nombres || !apellidos || !correo || !carrera) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const [rows] = await pool.query('CALL sp_registrar_estudiante(?, ?, ?, ?, ?)', [
            codigo, nombres, apellidos, correo, carrera
        ]);
        res.status(201).json({ id: rows[0][0].id, codigo, nombres, apellidos, correo, carrera });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar estudiante', error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    const { codigo, nombres, apellidos, correo, carrera } = req.body;
    try {
        const [rows] = await pool.query('CALL sp_actualizar_estudiante(?, ?, ?, ?, ?, ?)', [
            req.params.id, codigo, nombres, apellidos, correo, carrera
        ]);
        if (rows[0][0].afectados === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.status(200).json({ mensaje: 'Estudiante actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar estudiante', error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_eliminar_estudiante(?)', [req.params.id]);
        if (rows[0][0].afectados === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.status(200).json({ mensaje: 'Estudiante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar estudiante', error: error.message });
    }
};