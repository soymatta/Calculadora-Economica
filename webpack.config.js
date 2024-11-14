const path = require('path');

module.exports = {
    entry: './src/index.js', // Ruta del archivo de entrada
    output: {
        path: path.resolve(__dirname, 'dist'), // Ruta donde se generarán los archivos estáticos
        filename: 'bundle.js', // Nombre del archivo de salida
    },
    mode: 'production', // Modo de producción o desarrollo
};
