import db from "../models/index.js";
 
const Op = db.Sequelize.Op;
const Tutorial = db.tutorials;
 
// Cria e salva um novo Tutorial
export const create = (req, res) => {
    // Valida a requisição
    if (!req.body.title) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!",
        });
        return;
    }
 
    // Cria um Tutorial
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
    };
 
    // Salva o Tutorial no banco de dados
    Tutorial.create(tutorial)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao criar o Tutorial.",
            });
        });
};
 
// Recupera todos os Tutoriais
export const findAll = (req, res) => {
    // Permite uma condição de filtro via parâmetro de consulta
    const title = req.query.title;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
 
    Tutorial.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao recuperar os tutoriais.",
            });
        });
};
 
// Encontra um único Tutorial pelo ID
export const findOne = (req, res) => {
    const id = req.params.id;
 
    // Encontra o Tutorial pela chave primária
    Tutorial.findByPk(id)
        .then((data) => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Não foi possível encontrar o Tutorial com id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao recuperar o Tutorial com id=" + id,
            });
        });
};
 
// Atualiza um Tutorial pelo ID
export const update = (req, res) => {
    const id = req.params.id;
 
    // Atualiza o Tutorial com o ID especificado
    Tutorial.update(req.body, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial foi atualizado com sucesso.",
                });
            } else {
                res.send({
                    message: `Não foi possível atualizar o Tutorial com id=${id}. Talvez o Tutorial não tenha sido encontrado ou req.body esteja vazio!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Erro ao atualizar o Tutorial com id=" + id,
            });
        });
};
 
// Exclui um Tutorial pelo ID
export const deleteOne = (req, res) => {
    const id = req.params.id;
 
    // Exclui o Tutorial com o ID especificado
    Tutorial.destroy({
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Tutorial foi excluído com sucesso!",
                });
            } else {
                res.send({
                    message: `Não foi possível excluir o Tutorial com id=${id}. Talvez o Tutorial não tenha sido encontrado!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Não foi possível excluir o Tutorial com id=" + id,
            });
        });
};
 
// Exclui todos os Tutoriais
export const deleteAll = (req, res) => {
    // Exclui todos os Tutoriais
    Tutorial.destroy({
        where: {},
        truncate: false,
    })
        .then((nums) => {
            res.send({ message: `${nums} Tutoriais foram excluídos com sucesso!` });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao remover todos os tutoriais.",
            });
        });
};
 
// Encontra todos os Tutoriais publicados
export const findAllPublished = (req, res) => {
    // Encontra todos os Tutoriais com published = true
    Tutorial.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao recuperar os tutoriais.",
            });
        });
};