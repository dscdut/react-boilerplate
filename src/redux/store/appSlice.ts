import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface appState {
  loading: boolean;
  error?: string;
  size?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentThem: string;
  apiState: number;
}

const initialState: appState = {
  loading: false,
  error: undefined,
  size: undefined,
  currentThem: 'dark',
  apiState: 200,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAPIState(state, action: PayloadAction<number>) {
      state.apiState = action.payload;
    },
  },
});

export const appAction = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
