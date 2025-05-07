// firebase/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAThPGT19z-qvsgpjhY_BEqMST7ybmbElg',
  authDomain: 'snappie-4ee5b.firebaseapp.com',
  projectId: 'snappie-4ee5b',
  storageBucket: 'snappie-4ee5b.appspot.com',
  messagingSenderId: '350164316616',
  appId: '1:350164316616:web:4bb74f934582488111d0fd',
};

// ✅ ตรวจว่า Firebase ถูก initialize แล้วหรือยัง
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();