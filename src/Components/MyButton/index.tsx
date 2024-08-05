import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewProps,
} from 'react-native';
import React from 'react';

type MyButtonPropsType = {
  children: any;
} & ViewProps &
  TouchableWithoutFeedback;
//mistake
///////////////////////////////////////////////////////////////
const MyButton: React.FC<MyButtonPropsType> = ({children, style, ...props}) => {
  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: 10,
          padding: 15,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      {...props}>
      {children}
    </TouchableOpacity>
  );
};

export default MyButton;
