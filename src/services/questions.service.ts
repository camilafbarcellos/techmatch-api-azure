import NodeCache from 'node-cache';
import Questions, { IQuestion } from '../models/question.model';

// Cache instance
const cache = new NodeCache();

// Function to manually invalidate the cache for when adding, updating or removing
function invalidateCache() {
  cache.del('questions');
}

// Fetch and store questions in cache
async function findAllAndCache(): Promise<IQuestion[]> {
  const questions = await Questions.find();
  cache.set('questions', questions);
  return questions;
}

async function findAll(): Promise<IQuestion[]> {
  // Check if data is already cached
  const cachedData = cache.get<IQuestion[]>('questions');
  // If not cached, search the database and cache it
  return cachedData || findAllAndCache();
}

async function findOne(id: string): Promise<IQuestion | null> {
  return Questions.findById(id);
}

async function create(data: IQuestion) {
  invalidateCache();
  return new Questions(data).save();
}

async function update(id: string, data: IQuestion) {
  invalidateCache();
  return Questions.findByIdAndUpdate(id, data, { new: true });
}

async function remove(id: string) {
  invalidateCache();
  return Questions.findByIdAndDelete(id);
}

export { findAll, findOne, create, update, remove };