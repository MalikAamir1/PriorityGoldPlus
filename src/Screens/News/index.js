import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
import {useNavigation} from '@react-navigation/native';

const News = () => {
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
                Navigation.navigate('Home');
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
          <View style={{flexDirection: 'row', marginTop: 18}}>
            <Pressable
              style={styles.card}
              onPress={() => Navigation.navigate('NewsScreen')}>
              <Image
                source={require('../../Assets/Images/card1.png')}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.time}>03 may . 05 min</Text>
                <Text style={styles.details}>
                  you can provide a custom key Extractor prop..
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.card}
              onPress={() => Navigation.navigate('NewsScreen')}>
              <Image
                source={require('../../Assets/Images/card2.png')}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.time}>03 may . 05 min</Text>
                <Text style={styles.details}>
                  you can provide a custom key Extractor prop..
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Pressable
              style={styles.card}
              onPress={() => Navigation.navigate('NewsScreen')}>
              <Image
                source={require('../../Assets/Images/card2.png')}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.time}>03 may . 05 min</Text>
                <Text style={styles.details}>
                  you can provide a custom key Extractor prop..
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.card}
              onPress={() => Navigation.navigate('NewsScreen')}>
              <Image
                source={require('../../Assets/Images/card1.png')}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.time}>03 may . 05 min</Text>
                <Text style={styles.details}>
                  you can provide a custom key Extractor prop..
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Pressable
              style={styles.card}
              onPress={() => Navigation.navigate('NewsScreen')}>
              <Image
                source={require('../../Assets/Images/card1.png')}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.time}>03 may . 05 min</Text>
                <Text style={styles.details}>
                  you can provide a custom key Extractor prop..
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.card}
              onPress={() => Navigation.navigate('NewsScreen')}>
              <Image
                source={require('../../Assets/Images/card2.png')}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.time}>03 may . 05 min</Text>
                <Text style={styles.details}>
                  you can provide a custom key Extractor prop..
                </Text>
              </View>
            </Pressable>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Pressable
              style={styles.card}
              onPress={() => Navigation.navigate('NewsScreen')}>
              <Image
                source={require('../../Assets/Images/card2.png')}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.time}>03 may . 05 min</Text>
                <Text style={styles.details}>
                  you can provide a custom key Extractor prop..
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.card}
              onPress={() => Navigation.navigate('NewsScreen')}>
              <Image
                source={require('../../Assets/Images/card1.png')}
                style={styles.image}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.time}>03 may . 05 min</Text>
                <Text style={styles.details}>
                  you can provide a custom key Extractor prop..
                </Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeArea>
  );
};

export default News;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    margin: 4,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
    width: '48%',
    height: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 18,
  },
  infoContainer: {
    marginHorizontal: 10,
    marginBottom: 8,
    flex: 1,
  },
  time: {
    fontSize: 10,
    color: 'grey',
    marginTop: 10,
    marginVertical: 6,
  },
  details: {
    fontSize: 14,
    marginTop: 6,
    color: COLORS.textColor,
    fontWeight: 'bold',
  },
});
