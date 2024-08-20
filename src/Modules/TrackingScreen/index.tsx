import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {useScreenContext} from '../../Contexts/ScreenContext';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import scooterImage from '../../Assets/Images/scooterImage.png';
import styles from './style';

const TrackingScreen: FC = () => {
  const navigation = useNavigation();
  const regions: Region[] = [
    {
      latitude: 10.011314861360566,
      latitudeDelta: 0.001211397491797328,
      longitude: 76.36576479300857,
      longitudeDelta: 0.0006601586937904358,
    },
    {
      latitude: 10.010903798173786,
      latitudeDelta: 0.001211399025995874,
      longitude: 76.36594651266932,
      longitudeDelta: 0.0006601586937904358,
    },
    {
      latitude: 10.010559099003807,
      latitudeDelta: 0.0012114003124796824,
      longitude: 76.36551400646567,
      longitudeDelta: 0.0006601586937904358,
    },
    {
      latitude: 10.010340855374562,
      latitudeDelta: 0.001211401126967715,
      longitude: 76.36563705280423,
      longitudeDelta: 0.0006601586937904358,
    },
  ];
  const [markerPosition, setMarkerPosition] = useState(regions[0]);
  const currentLocation = {
    latitude: 10.010402585543062,
    latitudeDelta: 0.029832686481412907,
    longitude: 76.36564845219254,
    longitudeDelta: 0.016250498592853546,
  };
  useEffect(() => {
    changePositions();
  }, []);
  const changePositions = () => {
    var count = 0;
    const inte = setInterval(() => {
      setMarkerPosition(regions[count]);
      count += 1;
      if (count > regions.length-1) {
        clearInterval(inte);
        console.log('cleared');
        
      }
    }, 2000);
  };
  console.log(markerPosition);

  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <View style={screenStyles.container}>
      <TouchableOpacity
        style={screenStyles.backButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="left" color={ColorPalette.gray} size={30} />
      </TouchableOpacity>
      <Text style={screenStyles.heading}>Track Your Order</Text>
      <View style={screenStyles.mapContainer}>
        <MapView
          region={markerPosition}
          style={commonStyles.flexOne}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          onRegionChangeComplete={e => console.log(e)}
          // onRegionChangeComplete={e => console.log(e)}
        >
          
            <Marker
              // icon={smallScooter}
              // image={smallScooter}
              coordinate={markerPosition}
            />
          
        </MapView>
      </View>
    </View>
  );
};

export default TrackingScreen;
