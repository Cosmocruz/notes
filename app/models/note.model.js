import { Schema, model, SchemaTypes } from 'mongoose';

const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLenght: 3,
        lowercase: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    tags: {
        type: [String],
        default: [],
    },
    author: {
        type: SchemaTypes.ObjectId,
        ref: 'Author',
    },
});

const note = model('Note', noteSchema);

export default note;
