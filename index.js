const { obtenerJoyas, filtrarJoyas } = require("./consultas");

const express = require("express"); 
const cors = require("cors"); 
const bodyParser = require("body-parser");

const app = express();  
app.use(bodyParser.json());
app.use(cors()); 
const port = 3000; 

// Middleware para registrar actividades
const loggerMiddleware = (req, res, next) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

app.use(loggerMiddleware); 

// Ruta para obtener todo el inventario
app.get("/joyas", async (req, res) => {
  try {
    const resultado = req.query;
    const inventario = await obtenerJoyas(resultado);
    res.json(inventario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el inventario." });
  }
});

// Ruta para filtrar joyas
app.get("/joyas/filtros", async (req, res) => {
  try {
    const joyas = await filtrarJoyas(req.query);
    res.json(joyas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las joyas filtradas." });
  }
});

/* servidor escuchando */
app.listen(port, () => console.log("Servidor escuchando en puerto 3000"));
