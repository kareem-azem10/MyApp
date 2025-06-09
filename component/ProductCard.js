import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { COLOURS } from './database/Database'; // Assuming this is the correct path to COLOURS
import { FontAwesome } from 'react-native-vector-icons'; // Assuming FontAwesome is imported

const ProductCard = ({ data, navigation, isDarkMode }) => {
  const textColor = isDarkMode ? COLOURS.white : COLOURS.black;

  // Calculate the width based on the screen width
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth * 0.48) - 14; // 48% of screen width minus margin

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductInfo', { productID: data._id })} style={[styles.card, { width: cardWidth }]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.productImage }} style={styles.productImage} />
      </View>
      <Text style={[styles.productName, { color: textColor }]}>{data.productName}</Text>
      {data.category === 'accessory' && (
        <View style={styles.availabilityContainer}>
          <FontAwesome name="circle" style={[styles.circleIcon, { color: data.isAvailable ? COLOURS.green : COLOURS.red }]} />
          <Text style={[styles.availabilityText, { color: data.isAvailable ? COLOURS.green : COLOURS.red }]}>
            {data.isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </View>
      )}
      <Text style={[styles.productPrice, { color: textColor }]}>$ {data.productPrice}</Text>
      {data.discount > 0 && (
        <Text style={[styles.productDiscount, { color: COLOURS.green }]}>
          Discount: $ {data.discount}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 14,
  },
  imageContainer: {
    aspectRatio: 1, // This maintains the aspect ratio 1:1
    borderRadius: 10,
    backgroundColor: COLOURS.backgroundLight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleIcon: {
    fontSize: 12,
    marginRight: 6,
  },
  availabilityText: {
    fontSize: 12,
  },
  productPrice: {
    fontSize: 12,
  },
  productDiscount: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});

export default ProductCard;