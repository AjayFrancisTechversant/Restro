import {View, Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import validate from '../../Validation/Validation';
import {useNavigation} from '@react-navigation/native';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import ThreeBitsComponent from '../../Components/ThreeBitsComponent';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import MyTextInput from '../../Components/MyTextInput';
import styles from './style';
import {
  updateCategory,
  updateMake,
  updateModel,
  updateNumber,
  VehicleDetailsReduxStateType,
} from '../../Redux/Slices/vehicleDetailsSlice';
import MyButton from '../../Components/MyButton';
import StaticVariables from '../../Preferences/StaticVariables';

type ErrorType = {
  makeError: boolean;
  modelError: boolean;
  numberError: boolean;
  categoryError: boolean;
};

const VehicleScreen = () => {
  const dispatch = useAppDispatch();
  const {make, model, number, category} = useAppSelector(
    state => state.vehicleDetails,
  );
  const [error, setError] = useState<ErrorType>({
    makeError: !validate(make),
    modelError: !validate(model),
    numberError: !validate(number),
    categoryError: !validate(category),
  });
  const navigation: any = useNavigation();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  //category dropdown
  const HandleOnChangeText = (
    text: string,
    name: keyof VehicleDetailsReduxStateType,
  ) => {
    switch (name) {
      case 'make':
        dispatch(updateMake(text));
        setError({...error, makeError: !validate(text)});
        break;
      case 'model':
        dispatch(updateModel(text));
        setError({...error, modelError: !validate(text)});
        break;
      case 'number':
        dispatch(updateNumber(text));
        setError({...error, numberError: !validate(text)});
        break;
      default:
        break;
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView>
        <View style={screenStyles.container}>
          <HeaderComponent color={ColorPalette.gray} />
          <Text style={[commonStyles.bigBoldText, screenStyles.heading]}>
            Vehicle Details
          </Text>
          <ThreeBitsComponent step={1} />
          <MySegmentedButtons nonEditable />
          <View style={screenStyles.lineStyle}></View>
          <View style={screenStyles.bigContainer}>
            <MaterialCommunityIcons
              name="steering"
              color={ColorPalette.red}
              size={70}
            />
            <View style={commonStyles.flexShrinkOne}>
              <Text style={commonStyles.redTextBoldXL}>
                What are you driving?
              </Text>
              <Text style={[commonStyles.boldText]}>
                We'll bring your order right out to your vehiclesdsadasd
              </Text>
            </View>
          </View>
          <MyTextInput
            value={make}
            errorText={error.makeError && make ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'make')}
            label="Vehicle Make (eg. Toyota, ford, BMW)"
            style={screenStyles.textInput}
          />
          <MyTextInput
            value={model}
            errorText={error.modelError && model ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'model')}
            label="Model"
            style={screenStyles.textInput}
          />
          <MyTextInput
            value={number}
            errorText={error.numberError && number ? '*Invalid' : undefined}
            onChangeText={text => HandleOnChangeText(text, 'number')}
            label="Vehicle number"
            style={screenStyles.textInput}
          />
          <MyButton
            disabled={
              !error.makeError &&
              !error.modelError &&
              !error.numberError &&
              !error.categoryError
                ? false
                : true
            }
            onPress={() =>
              navigation.navigate(StaticVariables.PaymentInfoScreen)
            }
            style={[
              screenStyles.bottomButton,
              {
                backgroundColor:
                  !error.makeError &&
                  !error.modelError &&
                  !error.numberError &&
                  !error.categoryError
                    ? ColorPalette.red
                    : ColorPalette.lightRed,
              },
            ]}>
            <Text style={[commonStyles.whiteText, commonStyles.boldText]}>
              Next
            </Text>
          </MyButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VehicleScreen;
