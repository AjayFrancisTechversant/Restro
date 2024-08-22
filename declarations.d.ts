declare module '*.png' {
  const value: any;
  export default value;
}
declare module '*.webp' {
  const value: any;
  export default value;
}
declare module '*.jpeg' {
  const value: any;
  export default value;
}
declare module '*.jpg' {
  const value: any;
  export default value;
}
declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
declare module '@env' {
  export const ADMIN_UID: string;
  export const ADMIN_EMAIL: string;
}
