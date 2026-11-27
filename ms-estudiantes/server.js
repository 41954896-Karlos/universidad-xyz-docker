const express = require('express');
const cors = require('cors');
const estudianteRoutes = require('./routes/estudianteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas del microservicio
app.use('/api/estudiantes', estudianteRoutes);

// Solo levanta el servidor si se ejecuta directamente (evita conflicto de puertos en Jest)
if (require.main === module) {
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Microservicio Estudiantes corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;