import moment from 'moment';
import { Schema, model } from 'mongoose';
import { TIME_FORMAT } from '../constants/index.js';
import bcrypt from 'bcryptjs';

const authorSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minLength: 5,
        },
        gender: {
            type: String,
            required: true,
            lowercase: true,
            enum: ['male', 'female'],
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            immutable: true,
            unique: true,
            validator: {
                validator: function (v) {
                    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v);
                },
                message: (props) => `${props.value} is not a valid email!`,
            },
        },
        dob: {
            type: Date,
            required: true,
            get: (dob) => {
                return moment(dob).format(TIME_FORMAT);
            },
        },
        password: {
            type: String,
            lowercase: true,
            minLength: 6,
            required: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
        toObject: {
            virtuals: true,
            getters: true,
        },
    }
);

authorSchema.virtual('notes', {
    ref: 'Note',
    localField: '_id',
    foreignField: 'author',
});

authorSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 8);
    return next();
});

const author = model('Author', authorSchema);

export default author;
