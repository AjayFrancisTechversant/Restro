import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import StaticVariables from '../../Preferences/StaticVariables';

export type PreferenceType = 'dine-in' | 'carry-out' | 'delivery' | undefined;

export type UserDetailsReduxStateType = {
  zipcode: string;
  region: string;
  country: string;
  preference: PreferenceType;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  rememberedEmail: string;
  rememberedPassword: string;
};

const initialState: UserDetailsReduxStateType = {
  zipcode: StaticVariables.EMPTY_STRING,
  region: StaticVariables.EMPTY_STRING,
  country: StaticVariables.EMPTY_STRING,
  preference: undefined,
  firstName: StaticVariables.EMPTY_STRING,
  lastName: StaticVariables.EMPTY_STRING,
  email: StaticVariables.EMPTY_STRING,
  mobile: StaticVariables.EMPTY_STRING,
  rememberedPassword: StaticVariables.EMPTY_STRING,
  rememberedEmail: StaticVariables.EMPTY_STRING,
};

const UserDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateZipcode(state, action: PayloadAction<string>) {
      state.zipcode = action.payload;
    },
    updateRegion(state, action: PayloadAction<string>) {
      state.region = action.payload;
    },
    updateCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    updatePreference(state, action: PayloadAction<PreferenceType>) {
      state.preference = action.payload;
    },
    updateFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    updateLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    updateEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    updateMobile(state, action: PayloadAction<string>) {
      state.mobile = action.payload;
    },
    updateRememberedEmail(state, action: PayloadAction<string>) {
      state.rememberedEmail = action.payload;
    },
    updateRememberedPassword(state, action: PayloadAction<string>) {
      state.rememberedPassword = action.payload;
    },
  },
});

export const {
  updateZipcode,
  updateRegion,
  updateCountry,
  updatePreference,
  updateFirstName,
  updateLastName,
  updateEmail,
  updateMobile,
  updateRememberedEmail,
  updateRememberedPassword,
} = UserDetailsSlice.actions;

export default UserDetailsSlice.reducer;
