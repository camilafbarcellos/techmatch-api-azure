import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

export interface IQuestion extends Document {
  id: ObjectId,
  category: string,
  question: string
}

const QuestionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
}, { versionKey: false });

export default mongoose.model<IQuestion>('Questions', QuestionSchema);