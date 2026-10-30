import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  Firestore,
} from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

export const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyARmd2gZ3v7rOb2CVSqXVzJa_rOSVoBGeo",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "ramayana-jobs.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ramayana-jobs",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "ramayana-jobs.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "779563543456",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:779563543456:web:c49cdb3c1ed881ef03d2c5",
};

// Initialize Firebase safely for SSR & client
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

if (getApps().length > 0) {
  app = getApp();
} else {
  app = initializeApp(firebaseConfig);
}

db = getFirestore(app);
auth = getAuth(app);

export { app, db, auth };

export interface JobApplicationData {
  jobId: string;
  jobTitle: string;
  department?: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidatePortfolio: string;
  candidateOath?: string;
  university?: string;
  status?: string;
  createdAt?: unknown;
}

/**
 * Submit job application to Cloud Firestore collection "applications"
 */
export async function submitJobApplication(data: JobApplicationData) {
  const colRef = collection(db, "applications");
  const docRef = await addDoc(colRef, {
    ...data,
    status: data.status || "Submitted",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Fetch all job applications from Cloud Firestore
 */
export async function getJobApplications() {
  const colRef = collection(db, "applications");
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

/**
 * Update candidate application status in Cloud Firestore
 */
export async function updateJobApplicationStatus(docId: string, status: string) {
  const docRef = doc(db, "applications", docId);
  await updateDoc(docRef, {
    status,
    updatedAt: serverTimestamp(),
  });
  return true;
}
