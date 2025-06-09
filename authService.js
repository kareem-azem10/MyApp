import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function registerUser(email, password, name) {
  try {
    // تسجيل مستخدم جديد
    await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}
