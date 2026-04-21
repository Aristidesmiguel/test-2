import admin from 'firebase-admin';

let initialized = false;

export function initializeFirebase() {
  if (initialized) return;

  if (!process.env.FIREBASE_PROJECT_ID) {
    console.warn('[SIMAI] Firebase vars ausentes, iniciando em modo mock local.');
    initialized = true;
    return;
  }

  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID
  });

  initialized = true;
}

export function getDb() {
  if (!admin.apps.length) return null;
  return admin.firestore();
}

export function getMessaging() {
  if (!admin.apps.length) return null;
  return admin.messaging();
}
