import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {item} = route.params;

  if (!item) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="chevron-left" size={24} color="#007AFF" />
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.ImageUrl }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          {/* Name */}
          <Text style={styles.title}>{item.name}</Text>
          {/* Price and Category */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{item.price} ₪</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.description}>{item.Discription || 'No description available'}</Text>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 23,
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  imageContainer: {
    width: '100%',
    height: width * 0.6,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '90%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  infoContainer: {
    padding: 16,
  },
  priceContainer: {
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 20,
    fontWeight: 'bold',
  },
  specsContainer: {
    marginTop: 8,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  specKey: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  specValue: {
    fontSize: 16,
    color: '#666',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetails;