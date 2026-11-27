//server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// 1. Enrutamiento hacia Microservicio de Estudiantes (Puerto 3001)
app.use('/api/estudiantes', createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
    pathRewrite: (path) => `/api/estudiantes${path}`
}));

// 2. Enrutamiento hacia Microservicio de Cursos (Puerto 3002)
app.use('/api/cursos', createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: (path) => `/api/cursos${path}`
}));

// 3. Ruta raíz y redirección de index.html hacia estudiantes.html
app.get(['/', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/estudiantes.html'));
});

// 4. Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Gateway y Frontend activos en http://localhost:${PORT}`);
});