const getTarefasModel =  (sequelize, { DataTypes }) => {
    const Tarefas = sequelize.define("tarefas", {
        descricao : {
          type: DataTypes.STRING,
          allowNull: false, 
          validate: {
            notEmpty: true,
            },
        },
        finalizada : {
          type : DataTypes.BOOLEAN,
          defaultValue: false,
        }
    })

    return Tarefas;
}

export default getTarefasModel;