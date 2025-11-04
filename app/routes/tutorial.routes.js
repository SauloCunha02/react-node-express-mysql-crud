import * as tutorials from "../controllers/tutorial.controller.js";
import express from "express";
 
export default (app) => {
    let router = express.Router();
 
    // Cria um novo Tutorial
    router.post("/", tutorials.create);
 
    // Recupera todos os Tutoriais
    router.get("/", tutorials.findAll);
 
    // Recupera um único Tutorial com id
    router.get("/:id", tutorials.findOne);
 
    // Atualiza um Tutorial com id
    router.put("/:id", tutorials.update);
 
    // Exclui um Tutorial com id
    router.delete("/:id", tutorials.deleteOne);
 
    // Exclui todos os Tutoriais
    router.delete("/", tutorials.deleteAll);
 
    // Encontra todos os Tutoriais publicados
    router.get("/published", tutorials.findAllPublished);
 
    app.use("/api/tutorials", router);
};