import axios from 'axios';
import {Alert} from 'react-native';
import GetLocation from 'react-native-get-location';

const OPEN_CAGE_API_KEY='dea3c45cdb0e4a4ea8c1ee183cbe55d6'

export const getZipCode = async () => {
  try {
    const loc = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    });
    
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${loc.latitude}%2C${loc.longitude}&key=${OPEN_CAGE_API_KEY}`,
    )
    return response.data.results[0]?.components.postcode
  } catch (error) {
    Alert.alert((error as Error).message);
  }
};
