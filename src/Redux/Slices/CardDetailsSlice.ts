import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import StaticVariables from '../../Preferences/StaticVariables';

export type CardDetailsReduxStateType = {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
};

const initialState: CardDetailsReduxStateType = {
  number: StaticVariables.EMPTY_STRING,
  expiry: StaticVariables.EMPTY_STRING,
  cvv: StaticVariables.EMPTY_STRING,
  name: StaticVariables.EMPTY_STRING,
};

const CardDetailsSlice = createSlice({
  name: 'cardDetails',
  initialState,
  reducers: {
    updateNumber(state, action: PayloadAction<string>) {
      state.number = action.payload;
    },
    updateExpiry(state, action: PayloadAction<string>) {
      state.expiry = action.payload;
    },
    updateCvv(state, action: PayloadAction<string>) {
      state.cvv = action.payload;
    },
    updateName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const {updateNumber, updateExpiry, updateCvv, updateName} =
  CardDetailsSlice.actions;

export default CardDetailsSlice.reducer;
