import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './user.models.js'; 

const Product = db.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  tag: {
    type: DataTypes.STRING,
    defaultValue: 'JEWELRY',
    trim: true,
  },
  price: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  discount: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING(555),
    allowNull: false,
  },
  category: {
  type: DataTypes.STRING,
  allowNull: false
}
}, {
  timestamps: true,
});


User.hasMany(Product, { foreignKey: 'userId', onDelete: 'CASCADE' });

Product.belongsTo(User, { foreignKey: 'userId' });

export default Product;