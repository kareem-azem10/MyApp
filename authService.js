import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export async function registerUser(email, password, name) {
  try {
    // تسجيل مستخدم جديد
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // تخزين بيانات إضافية في Firestore في مجموعة "users"
    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });

    console.log('User registered and data saved successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}
