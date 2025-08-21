// Sample data script for ElectroStore
// Run this in your Firebase console or use it as a reference

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    price: 999.99,
    originalPrice: 1099.99,
    discount: 9,
    category: "Smartphones",
    description: "The latest iPhone with A17 Pro chip, titanium design, and advanced camera system.",
    rating: 4.8,
    reviewCount: 1247,
    imageUrl: "https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPhone+15+Pro",
    specifications: {
      "Storage": "128GB",
      "Color": "Titanium",
      "Screen": "6.1 inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto"
    }
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    originalPrice: 1299.99,
    discount: 8,
    category: "Smartphones",
    description: "Premium Android flagship with S Pen, advanced AI features, and exceptional camera capabilities.",
    rating: 4.7,
    reviewCount: 892,
    imageUrl: "https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Galaxy+S24+Ultra",
    specifications: {
      "Storage": "256GB",
      "Color": "Titanium Black",
      "Screen": "6.8 inch Dynamic AMOLED 2X",
      "Chip": "Snapdragon 8 Gen 3",
      "Camera": "200MP Main + 12MP Ultra Wide + 50MP Telephoto + 10MP Telephoto"
    }
  },
  {
    name: "MacBook Pro 14-inch",
    price: 1999.99,
    originalPrice: 2199.99,
    discount: 9,
    category: "Laptops",
    description: "Professional laptop with M3 Pro chip, Liquid Retina XDR display, and up to 22 hours battery life.",
    rating: 4.9,
    reviewCount: 567,
    imageUrl: "https://via.placeholder.com/300x300/000000/FFFFFF?text=MacBook+Pro",
    specifications: {
      "Processor": "M3 Pro",
      "Memory": "18GB Unified Memory",
      "Storage": "512GB SSD",
      "Display": "14.2 inch Liquid Retina XDR",
      "Ports": "3x Thunderbolt 4, HDMI, SDXC card slot"
    }
  },
  {
    name: "Dell XPS 13 Plus",
    price: 1299.99,
    originalPrice: 1499.99,
    discount: 13,
    category: "Laptops",
    description: "Ultra-slim Windows laptop with 13th Gen Intel processors and stunning OLED display.",
    rating: 4.6,
    reviewCount: 423,
    imageUrl: "https://via.placeholder.com/300x300/007DB8/FFFFFF?text=Dell+XPS+13",
    specifications: {
      "Processor": "Intel Core i7-1360P",
      "Memory": "16GB LPDDR5",
      "Storage": "512GB PCIe SSD",
      "Display": "13.4 inch 3.5K OLED",
      "Graphics": "Intel Iris Xe Graphics"
    }
  },
  {
    name: "iPad Air (5th generation)",
    price: 599.99,
    originalPrice: 649.99,
    discount: 8,
    category: "Tablets",
    description: "Powerful tablet with M1 chip, 10.9-inch Liquid Retina display, and Apple Pencil support.",
    rating: 4.7,
    reviewCount: 756,
    imageUrl: "https://via.placeholder.com/300x300/007AFF/FFFFFF?text=iPad+Air",
    specifications: {
      "Chip": "M1",
      "Storage": "64GB",
      "Display": "10.9 inch Liquid Retina",
      "Camera": "12MP Wide + 12MP Ultra Wide",
      "Connectivity": "Wi-Fi 6, 5G (cellular models)"
    }
  },
  {
    name: "Samsung Galaxy Tab S9",
    price: 799.99,
    originalPrice: 899.99,
    discount: 11,
    category: "Tablets",
    description: "Premium Android tablet with S Pen, AMOLED display, and Snapdragon 8 Gen 2 processor.",
    rating: 4.6,
    reviewCount: 389,
    imageUrl: "https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Galaxy+Tab+S9",
    specifications: {
      "Processor": "Snapdragon 8 Gen 2",
      "Storage": "128GB",
      "Display": "11 inch Dynamic AMOLED 2X",
      "Camera": "13MP + 8MP",
      "S Pen": "Included"
    }
  },
  {
    name: "AirPods Pro (2nd generation)",
    price: 249.99,
    originalPrice: 279.99,
    discount: 11,
    category: "Audio",
    description: "Premium wireless earbuds with active noise cancellation, spatial audio, and USB-C charging.",
    rating: 4.8,
    reviewCount: 2156,
    imageUrl: "https://via.placeholder.com/300x300/000000/FFFFFF?text=AirPods+Pro",
    specifications: {
      "Chip": "H2",
      "Noise Cancellation": "Active",
      "Spatial Audio": "Yes",
      "Battery Life": "Up to 6 hours",
      "Charging": "USB-C, MagSafe, Qi"
    }
  },
  {
    name: "Sony WH-1000XM5",
    price: 399.99,
    originalPrice: 449.99,
    discount: 11,
    category: "Audio",
    description: "Industry-leading noise-canceling headphones with exceptional sound quality and comfort.",
    rating: 4.9,
    reviewCount: 1243,
    imageUrl: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Sony+WH-1000XM5",
    specifications: {
      "Driver": "30mm",
      "Noise Cancellation": "Industry-leading",
      "Battery Life": "Up to 30 hours",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.2, NFC"
    }
  },
  {
    name: "Apple Watch Series 9",
    price: 399.99,
    originalPrice: 449.99,
    discount: 11,
    category: "Wearables",
    description: "Advanced smartwatch with S9 chip, health monitoring, and always-on Retina display.",
    rating: 4.7,
    reviewCount: 892,
    imageUrl: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Apple+Watch+9",
    specifications: {
      "Chip": "S9",
      "Display": "Always-On Retina",
      "Battery Life": "Up to 18 hours",
      "Water Resistance": "50m",
      "Health Features": "ECG, Blood Oxygen, Temperature"
    }
  },
  {
    name: "Samsung Galaxy Watch 6",
    price: 349.99,
    originalPrice: 399.99,
    discount: 13,
    category: "Wearables",
    description: "Premium Android smartwatch with advanced health tracking and rotating bezel.",
    rating: 4.6,
    reviewCount: 567,
    imageUrl: "https://via.placeholder.com/300x300/1428A0/FFFFFF?text=Galaxy+Watch+6",
    specifications: {
      "Processor": "Exynos W930",
      "Display": "1.3 inch Super AMOLED",
      "Battery Life": "Up to 40 hours",
      "Water Resistance": "5ATM + IP68",
      "Health Features": "Heart Rate, Blood Oxygen, Sleep Tracking"
    }
  }
];

// Function to add products to Firestore (for reference)
async function addSampleProducts() {
  try {
    const { addDoc, collection } = await import('firebase/firestore');
    const { db } = await import('../config/firebase');
    
    const productsCollection = collection(db, 'products');
    
    for (const product of sampleProducts) {
      await addDoc(productsCollection, {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`Added ${product.name}`);
    }
    
    console.log('All sample products added successfully!');
  } catch (error) {
    console.error('Error adding products:', error);
  }
}

// Export for use in other files
export { addSampleProducts, sampleProducts };

// If running directly, add the products
if (typeof window !== 'undefined') {
  addSampleProducts();
}
