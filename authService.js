import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebaseConfig';

const registerUser = async (email, password, name) => {
  try {
    // تسجيل مستخدم جديد
    await createUserWithEmailAndPassword(auth, email, password);
    console.log('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export default registerUser;
