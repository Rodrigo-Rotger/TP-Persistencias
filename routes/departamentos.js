var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res,next) => {

  models.departamento
    .findAll({
      attributes: ["id","nombre"],
    })
    .then(departamentos => res.send(departamentos))
    .catch(error => { return next(error)});
});



router.post("/", (req, res) => {
  models.departamento
    .create({ nombre: req.body.nombre })
    .then(departamento => res.status(201).send({ id: departamento.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otro departamento con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findDepartamento = (id, { onSuccess, onNotFound, onError }) => {
  models.departamento
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(departamento => (departamento ? onSuccess(departamento) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findDepartamento(req.params.id, {
    onSuccess: departamento => res.send(departamento),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = departamento =>
  departamento
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otro departamento con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findDepartamento(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = departamento =>
  departamento
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findmateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
