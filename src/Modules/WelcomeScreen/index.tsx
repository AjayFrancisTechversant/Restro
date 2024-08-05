import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/FullScreenBGImageBlur';
import HeaderComponent from '../../Components/HeaderComponent';
import styles from './Style';
import {TextInput} from 'react-native-paper';
import ThreeLogosComponent from '../../Components/ThreeLogosComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MyTextInput from '../../Components/MyTextInput';
import MyButton from '../../Components/MyButton';

const WelcomeScreen = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <FullScreenBGImageBlur>
      <View style={screenStyles.container}>
        <HeaderComponent />
        <View style={screenStyles.mainTextContainer}>
          <Text style={[screenStyles.whiteText, screenStyles.bigText]}>
            Hungry?
          </Text>
          <Text style={[screenStyles.whiteText, screenStyles.bigText]}>
            We gotcha
          </Text>
          <Text style={[screenStyles.whiteText, screenStyles.bigText]}>
            covered.
          </Text>
        </View>
        <Text style={[screenStyles.whiteText, screenStyles.subText]}>
          Let's find the locations near you.
        </Text>
        <MyTextInput
          label={'ZIPCODE'}
          style={screenStyles.textInput}
          onChangeText={text => {}}
          right={<TextInput.Icon icon="crosshairs-gps" />}
          keyboardType="numeric"
        />
        <ThreeLogosComponent />
        <View style={screenStyles.bottomButtonsContainer}>
          <MyButton  style={screenStyles.button1}>
            <AntDesign name="qrcode" color={ColorPalette.white} size={20} />
            <Text style={screenStyles.whiteText}>I'm At My Table</Text>
          </MyButton>
          {/* bakcground colorconditionally render */}
          <MyButton style={{backgroundColor:ColorPalette.lightRed}}>
            <Text style={screenStyles.whiteText}>Lets Go!</Text>
          </MyButton>
        </View>
      </View>
    </FullScreenBGImageBlur>
  );
};

export default WelcomeScreen;
