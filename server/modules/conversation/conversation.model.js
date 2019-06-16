import mongoose from 'mongoose';
import moment from 'moment';

const { Schema } = mongoose;

const currentDateUtc = () => moment().utc().format();

const conversationSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
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
    createdAt: {
      type: Date,
      default: currentDateUtc,
    },
  },
  {
    versionKey: false,
    collection: 'conversation',
  },
);

export default mongoose.model('Conversation', conversationSchema);
