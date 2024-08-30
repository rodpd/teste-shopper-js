import { Model, DataTypes } from 'sequelize'

export class Customer extends Model {

  static init(sequelize) {
    super.init({
      customer_code: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      }
    }, {
      sequelize,
      modelName: 'Customer',
      timestamps: false,
    });
    return Customer;
  }
}