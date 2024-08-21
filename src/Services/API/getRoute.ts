type HotelIdType = 'HGSupplyCo' | 'Hero' | 'StandardService';

export const getRoute = (hotelId: HotelIdType) => {
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
          latitude: 10.010340855374562,
          latitudeDelta: 0.001211401126967715,
          longitude: 76.36563705280423,
          longitudeDelta: 0.0006601586937904358,
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
          latitude: 10.010340855374562,
          latitudeDelta: 0.001211401126967715,
          longitude: 76.36563705280423,
          longitudeDelta: 0.0006601586937904358,
        },
      ];
    case 'StandardService':
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
          latitude: 10.010340855374562,
          latitudeDelta: 0.001211401126967715,
          longitude: 76.36563705280423,
          longitudeDelta: 0.0006601586937904358,
        },
      ];
  }
};
