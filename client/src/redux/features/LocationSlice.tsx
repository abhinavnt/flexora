import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  currentLocation: string;
}

const initialState: LocationState = {
  currentLocation: 'Kochi, Kerala', 
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<string>) => {
      state.currentLocation = action.payload;
    },
  },
});

export const { setCurrentLocation } = locationSlice.actions;
export default locationSlice.reducer;