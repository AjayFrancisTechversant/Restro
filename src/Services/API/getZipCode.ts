import axios from 'axios';
import {Alert} from 'react-native';
import GetLocation from 'react-native-get-location';

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
    Alert.alert('Permission Denied');
  }
};
