import Questions, { IQuestion } from './question.model';

async function findAll(): Promise<IQuestion[]> {
  return Questions.find();
}

async function findOne(id: string): Promise<IQuestion | null> {
  return Questions.findById(id);
}

async function create(data: IQuestion) {
  return new Questions(data).save();
}

async function update(id: string, data: IQuestion) {
  return Questions.findByIdAndUpdate(id, data);
}

async function remove(id: string) {
  return Questions.findByIdAndDelete(id);
}

export { findAll, findOne, create, update, remove };