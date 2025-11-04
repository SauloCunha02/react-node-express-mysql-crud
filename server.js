import express from "express";
import cors from "cors";
import db from "./app/models/index.js";
import tutorialRoutes from "./app/routes/tutorial.routes.js";
 
const app = express();
 
const corsOptions = {
    origin: "http://localhost:5173",
};
 
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Rota simples
app.get("/", (req, res) => {
    res.json({ message: "Bem-vindo à Aplicação de Tutoriais." });
});
 
// Rotas
tutorialRoutes(app);
 
// Sincroniza o banco de dados
db.sequelize.sync().then(() => {
    console.log("Banco de dados sincronizado.");
});
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}.`);
});