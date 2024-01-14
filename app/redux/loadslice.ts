import { createSlice } from "@reduxjs/toolkit";

interface LoadedData {
  changed: boolean;
  loadedData: any[]
}

const initialLoadState = {changed: false, loadedData: []}

const loadSlice = createSlice({
  name: 'load',
  initialState: initialLoadState,
  reducers: {
    setLoad(state, action) {
      state.changed = true;
      state.loadedData = action.payload
    },
    clearLoad(state) {
      state.changed = false;
      state.loadedData = []
    }
  }
})

export const {setLoad, clearLoad} = loadSlice.actions;

export default loadSlice