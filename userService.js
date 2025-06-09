import { db } from './firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export async function getUserData(uid) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
  else return null;
}

export async function updateUserName(uid, newName) {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { name: newName });
}
