import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    lowercase: true,
    trim: true,
    isEmail: true, 
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    minlength: 6
    
  },
}, {
  timestamps: true, 
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});


User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default User;