import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatLogSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    messages: {
      type: [
        {
          messageOwner: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
          timestamp: Date,
        },
      ],
      required: true,
    },
  },
  {
    versionKey: false,
    collection: 'chatlog',
  },
);

export default mongoose.model('ChatLog', chatLogSchema);
