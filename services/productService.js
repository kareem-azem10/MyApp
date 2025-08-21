import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { sampleProducts } from '../scripts/sampleData';

// Collection reference
const productsCollection = collection(db, 'products');

// Add a new product
export const addProduct = async (productData) => {
  try {
    const docRef = await addDoc(productsCollection, {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef;
  } catch (error) {
    throw new Error('Error adding product: ' + error.message);
  }
};

// Get all products
export const getAllProducts = async () => {
  try {
    const q = query(productsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    throw new Error('Error getting products: ' + error.message);
  }
};

// Seed sample products if collection is empty
export const seedSampleProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    if (!snapshot.empty) return false;

    for (const product of sampleProducts) {
      await addDoc(productsCollection, {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return true;
  } catch (error) {
    throw new Error('Error seeding products: ' + error.message);
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const q = query(
      productsCollection, 
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    throw new Error('Error getting products by category: ' + error.message);
  }
};

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error('Product not found');
    }
  } catch (error) {
    throw new Error('Error getting product: ' + error.message);
  }
};

// Update a product
export const updateProduct = async (productId, updateData) => {
  try {
    const docRef = doc(db, 'products', productId);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date()
    });
    return true;
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const docRef = doc(db, 'products', productId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
};

// Search products
export const searchProducts = async (searchTerm) => {
  try {
    const q = query(
      productsCollection,
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff'),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    throw new Error('Error searching products: ' + error.message);
  }
};
