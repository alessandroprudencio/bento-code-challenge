FROM node:23-bullseye

RUN apt-get update && \
  apt-get install -y --no-install-recommends openjdk-11-jre-headless && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  npm install -g firebase-tools

WORKDIR /app/firebase
RUN mkdir -p data

COPY firebase.json firestore.* ./

CMD sh -c "firebase emulators:start --only firestore --project $FIREBASE_PROJECT_ID --import=./data --export-on-exit=./data --non-interactive"