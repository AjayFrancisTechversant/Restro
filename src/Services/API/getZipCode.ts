import axios from 'axios';
import {Alert, Linking} from 'react-native';
import GetLocation, {LocationError} from 'react-native-get-location';

const OPEN_CAGE_API_KEY = 'dea3c45cdb0e4a4ea8c1ee183cbe55d6';

export const getLocationDetails = async () => {
  try {
    const loc = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });

    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${loc.latitude}%2C${loc.longitude}&key=${OPEN_CAGE_API_KEY}`,
    );
    const locationDetails = {
      fetchedZipcode: response.data.results[0]?.components.postcode,
      fetchedRegion: response.data.results[0]?.components.city,
      fetchedCountry: response.data.results[0]?.components.country,
    };
    return locationDetails;
  } catch (error) {
    switch ((error as LocationError).code) {
      case 'UNAVAILABLE':
        Alert.alert('Location service is disabled or unavailable', undefined, [
          {
            text: 'Cancel',
          },
          {
            text: 'Enable Location',
            onPress: () =>
              Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS'),
          },
        ]);
        break;
      case 'CANCELLED':
        Alert.alert('Location cancelled by user or by another request');
        break;
      case 'TIMEOUT':
        Alert.alert('	Location request timed out');
        break;
      case 'UNAUTHORIZED':
        Alert.alert('Please enable Precise Location Permission in settings',undefined,[{
          text:'Cancel'
        },{text:'Open settings',onPress:()=>Linking.openSettings()}]);
        break;
      default:
        Alert.alert((error as LocationError).message);
        break;
    }
  }
};
