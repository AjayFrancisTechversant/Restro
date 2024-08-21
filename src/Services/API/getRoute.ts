import {LatLng} from 'react-native-maps';

export const getRoute = (hotelId: string) => {
  switch (hotelId) {
    case 'HGSupplyCo':
      return [
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
          latitude: 10.010355381836039,
          latitudeDelta: 0.0020837155000918983,
          longitude: 76.36570176109672,
          longitudeDelta: 0.0011349096894264221,
        },
      ];
    case 'Hero':
      return [
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
          latitude: 10.010355381836039,
          latitudeDelta: 0.0020837155000918983,
          longitude: 76.36570176109672,
          longitudeDelta: 0.0011349096894264221,
        },
      ];
    case 'StandardService':
      return [
        {
          latitude: 10.015337970558821,
          latitudeDelta: 0.0009835672901008508,
          longitude: 76.36395899578929,
          longitudeDelta: 0.0006728991866111755,
        },
        {
          latitude: 10.013579486705694,
          latitudeDelta: 0.005191242803205043,
          longitude: 76.36428555473685,
          longitudeDelta: 0.002827383577823639,
        },
        {
          latitude: 10.011585591674276,
          latitudeDelta: 0.005191274698633563,
          longitude: 76.36521024629474,
          longitudeDelta: 0.002827383577823639,
        },
        {
          latitude: 10.010365608461864,
          latitudeDelta: 0.00519129421105724,
          longitude: 76.36575339362025,
          longitudeDelta: 0.002827383577823639,
        },
        {
          latitude: 10.010376512699516,
          latitudeDelta: 0.002171541111072983,
          longitude: 76.36567762121558,
          longitudeDelta: 0.0011831894516944885,
        },
      ];
    default:
      return [
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
          latitude: 10.010355381836039,
          latitudeDelta: 0.0020837155000918983,
          longitude: 76.36570176109672,
          longitudeDelta: 0.0011349096894264221,
        },
      ];
  }
};
export const gethotelLatLng = (hotelId: string): LatLng => {
  switch (hotelId) {
    case 'HGSupplyCo':
      return {
        latitude: 10.011314861360566,
        longitude: 76.36576479300857,
      };
    case 'Hero':
      return {
        latitude: 10.011314861360566,
        longitude: 76.36576479300857,
      };
    case 'StandardService':
      return {
        latitude: 10.015337970558821,
        longitude: 76.36395899578929,
      };
    default:
      return {
        latitude: 10.011314861360566,
        longitude: 76.36576479300857,
      };
  }
};
