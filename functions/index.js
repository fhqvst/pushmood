const path = require('path');
const fs = require('fs');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const firestore = admin.firestore();

firestore.settings({
  timestampsInSnapshots: true
})

const GIST_URL = 'https://api.github.com/gists/19d5c54cd2632c0642375f9ef5ce935b';

exports.question = functions.https.onRequest(async (request, response) => {
  const questions = await admin.firestore().collection('questions').get()
  if (!questions.size) {
    return response.end('');
  }
	const index = Math.floor(Math.random() * questions.docs.length);

	const question = questions.docs[index];
  const data = question.data();

  response.end(`${question.id} ${data.type} ${data.text}`);
});

exports.answer = functions.https.onRequest(async (request, response) => {
  const body = request.body.trim(); 

  if (body === '') {
    return response.end('');
  }

  const parts = body.split(' ');
  const userId = parts[0];
  const questionId = parts[1];

  let text = parts.slice(2).join(' ');

  const question = await admin.firestore().collection('questions').doc(questionId).get();

  const { type } = question.data();
  if (type === 'number') {
    text = isNaN(parseFloat(text)) ? 0 : parseFloat(text);
  } else if (type === 'boolean') {
    if (['true', '1', 'yes', 'y'].indexOf(text.toLowerCase()) > -1) {
      text = true; 
    } else {
      text = false;
    }
  }

  await admin.firestore().collection('answers').add({
    userId,
    questionId,
    text,
    createdAt: new Date()
  })

  response.end(); 
});

exports.install = functions.https.onRequest(async (request, response) => {
  const userId = request.query.userId;
  const isAscii = (s) => /^[\x00-\x7F]*$/.test(s);

  if (!userId || userId.length < 20 || userId.length > 50 || !isAscii(userId)) {
    return response.status(400).send('Invalid user ID');
  }

  const file = fs.readFileSync(path.join(__dirname, 'pushmood.sh'), 'utf-8');
  response.end(file.replace('%USER_ID%', userId));
});
