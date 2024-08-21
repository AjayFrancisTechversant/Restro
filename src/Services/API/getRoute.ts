import {LatLng} from 'react-native-maps';

export const getRoute = (hotelId: string) => {
  switch (hotelId) {
    case 'Hero':
      return [
        {
          latitude: 10.010270857647695,
          latitudeDelta: 0.0021722021620611542,
          longitude: 76.36378867551684,
          longitudeDelta: 0.0011831894516944885,
        },
        {
          latitude: 10.00987597159119,
          latitudeDelta: 0.0021722048045553777,
          longitude: 76.36387987062335,
          longitudeDelta: 0.0011831894516944885,
        },
        {
          latitude: 10.010093885360707,
          latitudeDelta: 0.0021722033463458246,
          longitude: 76.36458663269877,
          longitudeDelta: 0.0011831894516944885,
        },
        {
          latitude: 10.010279111949771,
          latitudeDelta: 0.00217220210683422,
          longitude: 76.36520018801093,
          longitudeDelta: 0.0011831894516944885,
        },
        {
          latitude: 10.010376512699516,
          latitudeDelta: 0.002171541111072983,
          longitude: 76.36567762121558,
          longitudeDelta: 0.0011831894516944885,
        },
        {
          latitude: 10.010339533434578,
          latitudeDelta: 0.002172201702508758,
          longitude: 76.3657114841044,
          longitudeDelta: 0.0011831894516944885,
        },
      ];
    case 'HGSupplyCo':
      return [
        {
          latitude: 10.009506507010657,
          latitudeDelta: 0.0028701927126952853,
          longitude: 76.36660465970635,
          longitudeDelta: 0.0015633925795555115,
        },
        {
          latitude: 10.010158267591116,
          latitudeDelta: 0.002870186949937903,
          longitude: 76.3662308268249,
          longitudeDelta: 0.0015633925795555115,
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
        {
          latitude: 10.010339533434578,
          latitudeDelta: 0.002172201702508758,
          longitude: 76.3657114841044,
          longitudeDelta: 0.0011831894516944885,
        },
      ];
    case 'StandardService':
      return [
        {
          latitude: 10.014999209099896,
          latitudeDelta: 0.005191220088715198,
          longitude: 76.3639653660357,
          longitudeDelta: 0.002828054130077362,
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
        {
          latitude: 10.010339533434578,
          latitudeDelta: 0.002172201702508758,
          longitude: 76.3657114841044,
          longitudeDelta: 0.0011831894516944885,
        },
      ];
    default:
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
  }
};
export const gethotelLatLng = (hotelId: string): LatLng => {
  switch (hotelId) {
    case 'HGSupplyCo':
      return {
        latitude: 10.009506507010657,
        longitude: 76.36660465970635,
      };
    case 'Hero':
      return {
        latitude: 10.010270857647695,
        longitude: 76.36378867551684,
      };
    case 'StandardService':
      return {
        latitude: 10.014999209099896,
        longitude: 76.3639653660357,
      };
    default:
      return {
        latitude: 10.011314861360566,
        longitude: 76.36576479300857,
      };
  }
};
