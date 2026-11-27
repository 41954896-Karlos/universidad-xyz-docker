//cursoController.js
const pool = require('../config/db');

exports.listar = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_listar_cursos()');
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al listar cursos', error: error.message });
    }
};

exports.obtenerPorId = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_obtener_curso(?)', [req.params.id]);
        if (rows[0].length === 0) return res.status(404).json({ mensaje: 'Curso no encontrado' });
        res.status(200).json(rows[0][0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar curso', error: error.message });
    }
};

exports.registrar = async (req, res) => {
    const { codigo, nombre, creditos, docente } = req.body;
    if (!codigo || !nombre || !creditos || !docente) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
    try {
        const [rows] = await pool.query('CALL sp_registrar_curso(?, ?, ?, ?)', [
            codigo, nombre, creditos, docente
        ]);
        res.status(201).json({ id: rows[0][0].id, codigo, nombre, creditos, docente });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar curso', error: error.message });
    }
};

exports.actualizar = async (req, res) => {
    const { codigo, nombre, creditos, docente } = req.body;
    try {
        const [rows] = await pool.query('CALL sp_actualizar_curso(?, ?, ?, ?, ?)', [
            req.params.id, codigo, nombre, creditos, docente
        ]);
        if (rows[0][0].afectados === 0) return res.status(404).json({ mensaje: 'Curso no encontrado' });
        res.status(200).json({ mensaje: 'Curso actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar curso', error: error.message });
    }
};

exports.eliminar = async (req, res) => {
    try {
        const [rows] = await pool.query('CALL sp_eliminar_curso(?)', [req.params.id]);
        if (rows[0][0].afectados === 0) return res.status(404).json({ mensaje: 'Curso no encontrado' });
        res.status(200).json({ mensaje: 'Curso eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar curso', error: error.message });
    }
};