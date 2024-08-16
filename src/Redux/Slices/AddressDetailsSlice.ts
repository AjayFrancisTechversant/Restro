import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import StaticVariables from '../../Preferences/StaticVariables';

export type AddressDetailsReduxStateType = {
  address: string;
  city: string;
  state: string;
  zipcode: string;
};
const initialState: AddressDetailsReduxStateType = {
  address: StaticVariables.EMPTY_STRING,
  city: StaticVariables.EMPTY_STRING,
  state: StaticVariables.EMPTY_STRING,
  zipcode: StaticVariables.EMPTY_STRING,
};

const AddressDetailsSlice = createSlice({
  name: 'addressDetails',
  initialState,
  reducers: {
    updateAddress(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    updateCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    updateState(state, action: PayloadAction<string>) {
      state.state = action.payload;
    },
    updateZipCode(state, action: PayloadAction<string>) {
      state.zipcode = action.payload;
    },
    clearAddressDetails() {
      return initialState;
    },
  },
});

export const {
  updateAddress,
  updateCity,
  updateState,
  updateZipCode,
  clearAddressDetails,
} = AddressDetailsSlice.actions;

export default AddressDetailsSlice.reducer;
