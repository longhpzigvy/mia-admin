import mongoose from 'mongoose';

const { Schema } = mongoose;

const entitiesSchema = new Schema(
  {
    builtin: {
      type: Boolean,
      default: false,
    },
    doc: String,
    id: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      default: 'en',
    },
    lookups: {
      type: [String],
      default: [],
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    deletedAt: {
      type: Date,
    },
    values: {
      type: [{
        value: {
          type: String,
          required: true,
        },
        expressions: {
          type: [String],
          default: [],
        },
      }],
      default: [],
    },
  },
  {
    versionKey: false,
    collection: 'entities',
  },
);

export default mongoose.model('Entities', entitiesSchema);
