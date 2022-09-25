'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING, 
    id_departamento: DataTypes.INTEGER
  }, {});

  carrera.associate = function(models) {

    carrera.belongsTo(models.departamento
    ,{
      as : 'Depto_Dependencia',  
      foreignKey: 'id_departamento'     
    })
 
  };


  return carrera;
};