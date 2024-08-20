import {FlatList} from 'react-native';
import React, {FC} from 'react';
import {useScreenContext} from '../../Contexts/ScreenContext';
import HeaderComponent from '../../Components/HeaderComponent';
import ColorPalette from '../../Assets/Themes/ColorPalette';
import MySegmentedButtons from '../../Components/MySegmentedButtons';
import ZipcodeDisplayComponent from '../../Components/ZipcodeDisplayComponent';
import HotelsContainer from '../../Components/HotelsContainer';
import styles from './style';


const HomeScreen: FC = () => {
  const screenContext = useScreenContext();
  const screenStyles = styles(
    screenContext.isPortrait ? screenContext.height : screenContext.width,
    screenContext.isPortrait ? screenContext.width : screenContext.height,
    screenContext.isPortrait,
    screenContext.isTypeTablet,
    screenContext,
  );
  return (
    <FlatList
      style={screenStyles.container}
      ListHeaderComponent={
        <>
          <HeaderComponent color={ColorPalette.gray} />
          <MySegmentedButtons />
          <ZipcodeDisplayComponent />
        </>
      }
      data={['']}
      renderItem={() => <HotelsContainer />}
      contentContainerStyle={screenStyles.contentContainerStyle}
    />
  );
};

export default HomeScreen;
