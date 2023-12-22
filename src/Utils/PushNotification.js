import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let FcmTokenValue = await AsyncStorage.getItem('fcmToken');

  console.log('old Fcm token', FcmTokenValue);

  if (!FcmTokenValue) {
    try {
      const fcmToken = await messaging().getToken();
      console.log('New Fcm token', fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);
    } catch (error) {
      console.log('Error from getting fcm Token: ', error);
    }
  }
};

export const NotificationServices = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigation.navigate(remoteMessage.data.type);
  });

  // Foreground Notification handling

  messaging().onMessage(async remoteMessage => {
    console.log('Notification in Foreground', remoteMessage);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
    });
};
