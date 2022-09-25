'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER
  }, {});
  alumno.associate = function(models) {

    alumno.belongsTo(models.materia
    ,{
      as : 'Materia_Cursa', 
      foreignKey: 'id_materia'
    })

  };



  return alumno;
};

