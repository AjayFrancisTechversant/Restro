import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import FullScreenBGImageBlur from '../../Components/Onboarding/FullScreenBGImageBlur';
import PreferenceRadioCard from '../../Components/Onboarding/PreferenceRadioCard';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {updatePreference} from '../../Redux/Slices/UserDetailsSlice';
import ThreeLogosComponent from '../../Components/Onboarding/ThreeLogosComponent';
import MyButton from '../../Components/MyButton';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';

const PreferenceScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const preferenceFromRedux = useAppSelector(
    state => state.userDetails.preference,
  );
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleSubmit = () => {
    if (preferenceFromRedux) {
      navigation.navigate(StaticVariables.RegisterScreen1 as never);
    } else {
      Alert.alert('Please Select your preference');
    }
  };
  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <FullScreenBGImageBlur>
          <View style={screenStyles.container}>
            <View style={screenStyles.mainTextContainer}>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                What do
              </Text>
              <Text style={[commonStyles.whiteText, screenStyles.bigText]}>
                you prefer?
              </Text>
            </View>
            <Text style={[commonStyles.whiteText, screenStyles.subText]}>
              Choose an option below:
            </Text>
            <Pressable onPress={() => dispatch(updatePreference('dine-in'))}>
              <PreferenceRadioCard
                isSelected={preferenceFromRedux == 'dine-in' ? true : false}
                text={`I'm Dining in`}
              />
            </Pressable>
            <Pressable onPress={() => dispatch(updatePreference('carry-out'))}>
              <PreferenceRadioCard
                isSelected={preferenceFromRedux == 'carry-out' ? true : false}
                text={`Crry-out`}
              />
            </Pressable>
            <Pressable onPress={() => dispatch(updatePreference('delivery'))}>
              <PreferenceRadioCard
                isSelected={preferenceFromRedux == 'delivery' ? true : false}
                text={`Delivery`}
              />
            </Pressable>
            <ThreeLogosComponent />
            <View style={screenStyles.bottomButton}>
              <MyButton
                onPress={handleSubmit}
                disabled={preferenceFromRedux ? false : true}
                style={{
                  backgroundColor: preferenceFromRedux
                    ? ColorPalette.red
                    : ColorPalette.lightRed,
                }}>
                <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
                  Find Great Food!
                </Text>
              </MyButton>
            </View>
          </View>
        </FullScreenBGImageBlur>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PreferenceScreen;
