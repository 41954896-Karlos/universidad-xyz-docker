const request = require('supertest');
const app = require('../server');
const pool = require('../config/db');

describe('Pruebas RESTful - Microservicio Cursos', () => {
    let creadoId;

    test('POST /api/cursos - Debe registrar un curso', async () => {
        const res = await request(app).post('/api/cursos').send({
            codigo: 'CUR-999',
            nombre: 'Ingeniería Web Avanzada',
            creditos: 4,
            docente: 'Ing. Carlos Mendoza'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        creadoId = res.body.id;
    });

    test('GET /api/cursos - Debe listar cursos', async () => {
        const res = await request(app).get('/api/cursos');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /api/cursos/:id - Debe consultar el curso creado', async () => {
        const res = await request(app).get(`/api/cursos/${creadoId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.codigo).toBe('CUR-999');
    });

    test('PUT /api/cursos/:id - Debe actualizar el curso', async () => {
        const res = await request(app).put(`/api/cursos/${creadoId}`).send({
            codigo: 'CUR-999',
            nombre: 'Desarrollo de Aplicaciones Web',
            creditos: 5,
            docente: 'Ing. Carlos Mendoza'
        });
        expect(res.statusCode).toBe(200);
    });

    test('DELETE /api/cursos/:id - Debe eliminar el curso', async () => {
        const res = await request(app).delete(`/api/cursos/${creadoId}`);
        expect(res.statusCode).toBe(200);
    });

    afterAll(async () => {
        await pool.end();
    });
});