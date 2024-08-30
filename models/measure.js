import { Model, DataTypes } from 'sequelize'

export class Measure extends Model {
  
  static init(sequelize) {
    super.init({
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      measure_datetime: DataTypes.DATEONLY,
      measure_type: DataTypes.ENUM('WATER', 'GAS'),
      has_confirmed: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
      },
      measure_value: DataTypes.INTEGER,
      image_url: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      CustomerId: DataTypes.STRING
    }, {
      sequelize,
      modelName: 'measure',
      timestamps: false,
    })
  }
}