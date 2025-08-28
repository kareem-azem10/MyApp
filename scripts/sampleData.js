// Sample data script for ElectroStore
// Run this manually when you want to seed data

const sampleProducts = [
  {
    id: 'iphone-15',
    name: 'iPhone 15',
    category: 'Smartphones',
    brand: 'Apple',
    basePrice: 799,
    variants: [
      {
        name: 'iPhone 15',
        price: 799,
        description: 'The latest iPhone with A16 Bionic chip, 6.1-inch Super Retina XDR display, and advanced camera system.',
        features: [
          'A16 Bionic chip',
          '6.1-inch Super Retina XDR display',
          'Dual 48MP + 12MP camera system',
          'USB-C connector',
          'Dynamic Island',
          'Ceramic Shield front cover'
        ]
      },
      {
        name: 'iPhone 15 Pro',
        price: 999,
        description: 'Pro-level performance with A17 Pro chip, titanium design, and professional camera capabilities.',
        features: [
          'A17 Pro chip',
          '6.1-inch Super Retina XDR display',
          'Pro 48MP + 12MP + 12MP camera system',
          'USB-C connector',
          'Dynamic Island',
          'Titanium design',
          'Action button'
        ]
      },
      {
        name: 'iPhone 15 Pro Max',
        price: 1199,
        description: 'The most advanced iPhone with A17 Pro chip, 6.7-inch display, and maximum performance.',
        features: [
          'A17 Pro chip',
          '6.7-inch Super Retina XDR display',
          'Pro 48MP + 12MP + 12MP camera system',
          'USB-C connector',
          'Dynamic Island',
          'Titanium design',
          'Action button',
          '5x optical zoom'
        ]
      }
    ],
    capacities: [
      { size: '128GB', priceMultiplier: 1.0 },
      { size: '256GB', priceMultiplier: 1.2 },
      { size: '512GB', priceMultiplier: 1.5 },
      { size: '1TB', priceMultiplier: 1.8 }
    ],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Blue', hex: '#007AFF' },
      { name: 'Green', hex: '#34C759' },
      { name: 'Pink', hex: '#FF2D92' },
      { name: 'Yellow', hex: '#FFD60A' }
    ],
    imageUrl: 'https://via.placeholder.com/400x400.png?text=iPhone+15',
    inStock: true,
    rating: 4.8,
    reviewCount: 1247
  },
  {
    id: 'macbook-air-m2',
    name: 'MacBook Air M2',
    category: 'Laptops',
    brand: 'Apple',
    price: 1199,
    description: 'Powerful laptop with M2 chip, 13.6-inch Liquid Retina display, and all-day battery life.',
    imageUrl: 'https://via.placeholder.com/400x400.png?text=MacBook+Air+M2',
    inStock: true,
    rating: 4.9,
    reviewCount: 892
  },
  {
    id: 'airpods-pro',
    name: 'AirPods Pro',
    category: 'Audio',
    brand: 'Apple',
    price: 249,
    description: 'Active noise cancellation, spatial audio, and sweat and water resistance.',
    imageUrl: 'https://via.placeholder.com/400x400.png?text=AirPods+Pro',
    inStock: true,
    rating: 4.7,
    reviewCount: 1563
  },
  {
    id: 'ipad-air',
    name: 'iPad Air',
    category: 'Tablets',
    brand: 'Apple',
    price: 599,
    description: 'Powerful iPad with M1 chip, 10.9-inch Liquid Retina display, and Apple Pencil support.',
    imageUrl: 'https://via.placeholder.com/400x400.png?text=iPad+Air',
    inStock: true,
    rating: 4.6,
    reviewCount: 734
  }
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

