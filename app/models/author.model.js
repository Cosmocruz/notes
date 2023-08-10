import { Schema, model } from 'mongoose';

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
                message: (props) => `${props.value} is not a v=valid email!`,
            },
        },
        dob: {
            type: Date,
            required: true,
        },
    },
    {
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

const author = model('Author', authorSchema);

export default author;
