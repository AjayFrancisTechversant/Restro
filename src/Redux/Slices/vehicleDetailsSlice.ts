import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import StaticVariables from '../../Preferences/StaticVariables';

export type VehicleDetailsReduxStateType = {
  make: string;
  model: string;
  number: string;
  category: string;
};
const initialState: VehicleDetailsReduxStateType = {
  make: StaticVariables.EMPTY_STRING,
  model: StaticVariables.EMPTY_STRING,
  number: StaticVariables.EMPTY_STRING,
  category: StaticVariables.EMPTY_STRING,
};

const vehicleDetailsSlice = createSlice({
  name: 'vehicleDetails',
  initialState,
  reducers: {
    updateMake(state, action: PayloadAction<string>) {
      state.make = action.payload;
    },
    updateModel(state, action: PayloadAction<string>) {
      state.model = action.payload;
    },
    updateNumber(state, action: PayloadAction<string>) {
      state.number = action.payload;
    },
    updateCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    clearVehicleDetails() {
      return initialState;
    },
  },
});

export const {
  updateMake,
  updateModel,
  updateNumber,
  updateCategory,
  clearVehicleDetails,
} = vehicleDetailsSlice.actions;

export default vehicleDetailsSlice.reducer;
