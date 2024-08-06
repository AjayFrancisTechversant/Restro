import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type PrefenceType = 'dine-in' | 'carry-out' | 'delivery' | undefined;

export type UserDetailsReduxStateType = {
  zipcode: string;
  preference: PrefenceType;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};

const initialState: UserDetailsReduxStateType = {
  zipcode: '',
  preference: undefined,
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
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
  },
});

export const {
  updateZipcode,
  updatePreference,
  updateFirstName,
  updateLastName,
  updateEmail,
  updateMobile,
} = UserDetailsSlice.actions;

export default UserDetailsSlice.reducer;
