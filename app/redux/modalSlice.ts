import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ModalState {
  showModal: boolean;
  message: string;
}

const initialModalState: ModalState = { showModal: false, message: '' };

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    toggleModal(state) {
      state.showModal = !state.showModal;
    },
    setMessage(state, action) {
      state.message = action.payload
    }
  },
});

export const { toggleModal, setMessage } = modalSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTheme = (state: RootState) => state.theme.theme;

export default modalSlice;
