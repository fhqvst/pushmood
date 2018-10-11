#!/bin/sh

if [ -n "$PM_DISABLED" ]; then exit 0; fi

# Allows us to read user input below, assigns stdin to keyboard
exec < /dev/tty

USER_ID="%USER_ID%"
QUESTION_URL="https://us-central1-pushmood-app.cloudfunctions.net/question"
ANSWER_URL="https://us-central1-pushmood-app.cloudfunctions.net/answer"

# Fetch question
response=$(curl --request POST --fail --header "Content-Type: text/plain" --data "${USER_ID}" --silent ${QUESTION_URL})

if [ -z "$response" ]; then echo "Pushmood: Could not fetch questions."; exit 0; fi

# Parse question
parsed=($response)
question_id=${parsed[0]}
question_type=${parsed[1]}
question_text=${parsed[@]:2}

# Ask question
echo $question_text

# Submit answer
read answer
if [ -z "$answer" ]; then exit 0; fi

curl --request POST --fail --header "Content-Type: text/plain" --data "${USER_ID} ${question_id} ${answer}" --silent ${ANSWER_URL}

if [ -z "$response" ]; then echo "Pushmood: Could not post answer."; exit 0; fi

