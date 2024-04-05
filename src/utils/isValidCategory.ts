import { QuestionCategory } from './questionCategory';

export function isValidCategory(category: string): boolean {
    return Object.values(QuestionCategory).includes(category as QuestionCategory);
}