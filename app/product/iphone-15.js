import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../contexts/CartContext';

export default function iPhone15Screen() {
  const { addToCart } = useCart();
  const router = useRouter();
  
  // Product data
  const product = {
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
  };

  // State for selected options
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  // Calculate current price based on selections
  const currentPrice = Math.round(
    product.variants[selectedVariant].price * 
    product.capacities[selectedCapacity].priceMultiplier
  );

  const handleAddToCart = () => {
    const selectedProduct = {
      id: `${product.id}-${product.variants[selectedVariant].name.toLowerCase().replace(/\s+/g, '-')}-${product.capacities[selectedCapacity].size.toLowerCase()}-${product.colors[selectedColor].name.toLowerCase()}`,
      name: `${product.variants[selectedVariant].name} ${product.capacities[selectedCapacity].size} ${product.colors[selectedColor].name}`,
      price: currentPrice,
      imageUrl: product.imageUrl,
      quantity: 1
    };

    addToCart(selectedProduct);
    Alert.alert(
      'Added to Cart',
      `${selectedProduct.name} has been added to your cart!`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>iPhone 15</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUrl }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productBrand}>{product.brand}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= product.rating ? "star" : "star-outline"}
                  size={16}
                  color={star <= product.rating ? "#FFD700" : "#ccc"}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>
        </View>

        {/* Variant Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Model</Text>
          <View style={styles.variantContainer}>
            {product.variants.map((variant, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.variantButton,
                  selectedVariant === index && styles.selectedVariant
                ]}
                onPress={() => setSelectedVariant(index)}
              >
                <Text style={[
                  styles.variantName,
                  selectedVariant === index && styles.selectedVariantText
                ]}>
                  {variant.name}
                </Text>
                <Text style={[
                  styles.variantPrice,
                  selectedVariant === index && styles.selectedVariantText
                ]}>
                  From ${variant.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Capacity Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Storage</Text>
          <View style={styles.capacityContainer}>
            {product.capacities.map((capacity, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.capacityButton,
                  selectedCapacity === index && styles.selectedCapacity
                ]}
                onPress={() => setSelectedCapacity(index)}
              >
                <Text style={[
                  styles.capacitySize,
                  selectedCapacity === index && styles.selectedCapacityText
                ]}>
                  {capacity.size}
                </Text>
                <Text style={[
                  styles.capacityPrice,
                  selectedCapacity === index && styles.selectedCapacityText
                ]}>
                  +${Math.round(product.variants[selectedVariant].price * (capacity.priceMultiplier - 1))}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Color</Text>
          <View style={styles.colorContainer}>
            {product.colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  selectedColor === index && styles.selectedColor
                ]}
                onPress={() => setSelectedColor(index)}
              >
                <View
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color.hex }
                  ]}
                />
                <Text style={[
                  styles.colorName,
                  selectedColor === index && styles.selectedColorText
                ]}>
                  {color.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>
            {product.variants[selectedVariant].description}
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {product.variants[selectedVariant].features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Price and Add to Cart */}
        <View style={styles.priceSection}>
          <View style={styles.priceInfo}>
            <Text style={styles.priceLabel}>Total Price:</Text>
            <Text style={styles.price}>${currentPrice}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={24} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Ionicons name="storefront-outline" size={24} color="#007AFF" />
            <Text style={styles.shopNowText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: 300,
    height: 300,
  },
  productInfo: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productBrand: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  variantContainer: {
    gap: 12,
  },
  variantButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e1e5e9',
    backgroundColor: '#f8f9fa',
  },
  selectedVariant: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  variantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  variantPrice: {
    fontSize: 16,
    color: '#666',
  },
  selectedVariantText: {
    color: '#007AFF',
  },
  capacityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  capacityButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e1e5e9',
    backgroundColor: '#f8f9fa',
    minWidth: 100,
    alignItems: 'center',
  },
  selectedCapacity: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  capacitySize: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  capacityPrice: {
    fontSize: 14,
    color: '#666',
  },
  selectedCapacityText: {
    color: '#007AFF',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  colorButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e1e5e9',
    backgroundColor: '#f8f9fa',
    minWidth: 80,
  },
  selectedColor: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  selectedColorText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  priceSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e5e9',
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  shopNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginTop: 12,
    gap: 8,
  },
  shopNowText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
