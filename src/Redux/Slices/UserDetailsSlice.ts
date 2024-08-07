import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type PrefenceType = 'dine-in' | 'carry-out' | 'delivery' | undefined;

export type UserDetailsReduxStateType = {
  zipcode: string;
  preference: PrefenceType;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  rememberedEmail: string;
  rememberedPassword: string;
  rememberMe: boolean;
};

const initialState: UserDetailsReduxStateType = {
  zipcode: '',
  preference: undefined,
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  rememberedPassword: '',
  rememberedEmail: '',
};

const UserDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateZipcode(state, action: PayloadAction<string>) {
      state.zipcode = action.payload;
    },
    updatePreference(state, action: PayloadAction<PrefenceType>) {
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
  updatePreference,
  updateFirstName,
  updateLastName,
  updateEmail,
  updateMobile,
  updateRememberedEmail,
  updateRememberedPassword,
} = UserDetailsSlice.actions;

export default UserDetailsSlice.reducer;
