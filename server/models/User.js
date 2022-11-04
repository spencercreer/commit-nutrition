const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const mealSchema = require('./Meal');

const userSchema = new Schema(
    {
        name: {
            first: String,
            last: String,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String
        },
        birthdate: {
            type: Date
        },
        gender: {
            type: String
        },
        weight_kg: {
            type: Number
        },
        height_cm: {
            type: Number
        },
        recipes: {
            type: [Schema.Types.ObjectId]
        },
        meals: {
            type: [Schema.Types.ObjectId]
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    next();
  });

userSchema.methods.comparePassword = async function (password) {
    console.log(password)
    return bcrypt.compare(password, this.password);
};

userSchema.virtual("full_name").get(function () {
    return this.name.first + ' ' + this.name.last;
});

userSchema.virtual("age").get(function () {
    const today = new Date();
    const day = today.getDay();
    const month = today.getMonth();
    const year = today.getFullYear();
    const birthdate = new Date(this.birthdate);
    const birthDay = birthdate.getMonth();
    const birthMonth = birthdate.getMonth();
    const birthYear = birthdate.getFullYear();
    if (month > birthMonth || month === birthMonth && day >= birthDay) {
        return year - birthYear;
    } else {
        return year - birthYear - 1;
    }
});

userSchema.virtual("bmr").get(function () {
    if (this.gender === 'male') {
        return Math.round(10 * 0.45359 * this.weight_kg + 6.25 * this.height_cm * 2.54 - 5 * this.age + 5);
    } else if (this.gender === "female") {
        return Math.round(10 * 0.45359 * this.weight_kg + 6.25 * this.height_cm * 2.54 - 5 * this.age - 161);
    } else {
        return null;
    }
});

const User = model('User', userSchema)

module.exports = User
