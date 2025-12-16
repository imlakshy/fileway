"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNEtd7dYpl3Vf6lwiClZqd7WMx8zl2in4",
  authDomain: "fileway-0001.firebaseapp.com",
  projectId: "fileway-0001",
  storageBucket: "fileway-0001.firebasestorage.app",
  messagingSenderId: "29441474832",
  appId: "1:29441474832:web:ea41f57b9fb77fa13ea595"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ THIS EXPORT MUST EXIST
export const storage = getStorage(app);