import {Alert, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {useScreenContext} from '../../Contexts/ScreenContext';
import {commonStyles} from '../../CommonStyles/CommonStyles';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {
  updateEmail,
  updateFirstName,
  updateLastName,
  updateMobile,
  updatePreference,
  updateZipcode,
} from '../../Redux/Slices/UserDetailsSlice';
import StaticVariables from '../../Preferences/StaticVariables';
import styles from './style';
import ColorPalette from '../../Assets/Themes/ColorPalette';

const LogoutComponent = () => {
  const dispatch = useAppDispatch();
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(updateZipcode(StaticVariables.EMPTY_STRING));
        dispatch(updatePreference(undefined));
        dispatch(updateFirstName(StaticVariables.EMPTY_STRING));
        dispatch(updateLastName(StaticVariables.EMPTY_STRING));
        dispatch(updateEmail(StaticVariables.EMPTY_STRING));
        dispatch(updateMobile(StaticVariables.EMPTY_STRING));
      })
      .catch(error => Alert.alert(error.code));
  };
  return (
    <TouchableOpacity style={screenStyles.logoutButton} onPress={handleLogout}>
    <MaterialIcons name='logout' size={30} color={ColorPalette.white}/>
    </TouchableOpacity>
  );
};

export default LogoutComponent;
