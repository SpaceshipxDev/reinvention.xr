import { getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(),   // reads GOOGLE_APPLICATION_CREDENTIALS
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || undefined,
  });
}

export const bucket = getStorage().bucket();