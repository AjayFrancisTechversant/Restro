export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type NativeEventType = {
  nativeEvent: {
    contentInset?: {bottom: number; left: number; right: number; top: number};
    contentOffset?: {x: number; y: number};
    contentSize?: {height: number; width: number};
    layoutMeasurement?: {height: number; width: number};
    zoomScale?: number;
  };
};
