import { Document, Schema, model } from 'mongoose';
import { QuestionCategory } from '../utils/questionCategory';

export interface IQuestion extends Document {
  category: string;
  question: string;
}

const QuestionSchema = new Schema<IQuestion>({
  category: {
    type: String,
    enum: Object.values(QuestionCategory),
    required: true
  },
  question: {
    type: String,
    required: true
  }
}, { versionKey: false });

export default model<IQuestion>('Questions', QuestionSchema);
