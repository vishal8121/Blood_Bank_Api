module.exports=(sequelize,DataTypes)=>{
    const Blood_bank = sequelize.define('Blood_bank', {
       name: {
         type: DataTypes.STRING,
         allowNull: false
        
       },
       phone_number:{
        type: DataTypes.STRING,
        allowNull: false
       },
       address:{
        type: DataTypes.STRING,
        allowNull: false
       },
       status:{
        type: DataTypes.STRING,
        allowNull: false
       },
       account_status:{
        type: DataTypes.STRING,
        allowNull:false
       },
       created_by:{
        type: DataTypes.STRING,
        allowNull: false,
       },
       updated_by:{
        type: DataTypes.STRING,
       }
    },  {
      tableName: 'blood_banks',
      paranoid: true,
      timestamps: true
    });
        
    return Blood_bank;
    }