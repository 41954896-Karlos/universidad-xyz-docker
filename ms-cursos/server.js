const express = require('express');
const cors = require('cors');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas del microservicio
app.use('/api/cursos', cursoRoutes);

// Solo levanta el servidor si se ejecuta directamente (evita conflicto de puertos en Jest)
if (require.main === module) {
    const PORT = 3002;
    app.listen(PORT, () => {
        console.log(`Microservicio Cursos corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;