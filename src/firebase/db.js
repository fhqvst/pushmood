import { db } from './firebase';
import { getCurrentUserId } from './auth';

export const createQuestion = ({ text, type }) => db.collection('questions').add({
  userId: getCurrentUserId(),
  text,
  type,
  createdAt: new Date()
});

export const deleteQuestion = (id) => db.collection('questions').doc(id).delete();

export const getQuestions = () => db.collection('questions')
  .where('userId', '==', getCurrentUserId())
  .orderBy('createdAt')
  .get();

export const updateQuestion = (id, fields) => db.collection('questions').doc(id).update(fields);

export const getAnswers = () => db.collection('answers')
  .where('userId', '==', getCurrentUserId())
  .orderBy('createdAt')
  .get();
