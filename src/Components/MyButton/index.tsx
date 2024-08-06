import {
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import { useScreenContext } from '../../Contexts/ScreenContext';

type MyButtonPropsType = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
} & TouchableOpacityProps;
const MyButton: React.FC<MyButtonPropsType> = ({children, style, ...props}) => {
  const screenContext = useScreenContext();
  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: 10,
          padding: 15,
          alignItems: 'center',
          justifyContent: 'center',width:screenContext.width*0.9
        },
        style,
      ]}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default MyButton;
