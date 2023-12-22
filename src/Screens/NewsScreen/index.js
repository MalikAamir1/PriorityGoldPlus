import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import {useNavigation} from '@react-navigation/native';

const NewsScreen = () => {
  const Navigation = useNavigation();
  return (
    <SafeArea>
      <View style={{marginHorizontal: '5%', marginVertical: '8%'}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#EDCC45',
              borderRadius: 10,
            }}>
            <Pressable
              onPress={() => {
                Navigation.navigate('News');
              }}>
              <Ionicons name="chevron-back" size={27} color={'black'} />
            </Pressable>
          </View>
          <View style={{alignSelf: 'center'}}>
            <Heading
              Heading={'News'}
              Fontsize={20}
              color={COLORS.dark}
              Fontweight={'bold'}
              txtAlign={'center'}
            />
          </View>
          <View style={{alignSelf: 'center'}}>
            <Text> </Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.card}>
            <Image
              source={require('../../Assets/Images/card1.png')}
              style={styles.image}
            />
            <View style={styles.infoContainer}>
              <Text style={styles.time}>03 may . 05 min</Text>
              <Text style={styles.details}>
                you can provide a custom key Extractor prop do you have?
              </Text>
              <Text style={styles.paragraph}>
                In this code, I've added a wrapping View called cardContainer
                around your card. The TouchableOpacity wraps this container,
                allowing you to maintain the card's structure and styles while
                enabling navigation. Please make sure you adjust your styles
                accordingly to fit your design requirements.
              </Text>
              <Text style={styles.paragraph}>
                In this code, I've added a wrapping View called cardContainer
                around your card. The TouchableOpacity wraps this container,
                allowing you to maintain the card's structure and styles while
                enabling navigation. Please make sure you adjust your styles
                accordingly to fit your design requirements.
              </Text>
              <Text style={styles.paragraph}>
                In this code, I've added a wrapping View called cardContainer
                around your card. The TouchableOpacity wraps this container,
                allowing you to maintain the card's structure and styles while
                enabling navigation. Please make sure you adjust your styles
                accordingly to fit your design requirements.
              </Text>
              <Text style={styles.paragraph}>
                In this code, I've added a wrapping View called cardContainer
                around your card. The TouchableOpacity wraps this container,
                allowing you to maintain the card's structure and styles while
                enabling navigation. Please make sure you adjust your styles
                accordingly to fit your design requirements.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
};
export default NewsScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    margin: 4,
    height: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 18,
    marginTop: 18,
  },
  infoContainer: {
    marginHorizontal: 2,
    marginBottom: 8,
    flex: 1,
  },
  time: {
    fontSize: 16,
    color: 'grey',
    marginTop: 14,
    letterSpacing: 0.4,
    marginVertical: 6,
  },
  details: {
    fontSize: 18,
    marginTop: 6,
    color: COLORS.textColor,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  paragraph: {
    Fontsize: 14,
    marginTop: 14,
    color: 'grey',
  },
});
