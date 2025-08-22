// Sample data script for ElectroStore
// Run this manually when you want to seed data

const sampleProducts = [
  // Add sample products here if needed
];

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Function to add products to Firestore (idempotent)
async function addSampleProducts() {
  try {
    const { setDoc, doc, serverTimestamp } = await import('firebase/firestore');
    const { db } = await import('../config/firebase');

    for (const product of sampleProducts) {
      const productId = product.id || slugify(product.name);
      const productRef = doc(db, 'products', productId);
      await setDoc(
        productRef,
        {
          ...product,
          // Keep createdAt if existing; always bump updatedAt
          updatedAt: new Date(),
        },
        { merge: true }
      );
      console.log(`Seeded product: ${product.name}`);
    }

    console.log('Sample products seeded successfully (idempotent).');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}

// Export for manual use elsewhere
export { addSampleProducts, sampleProducts };

