import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const isPending = state => {
  state.isLoading = true;
};
const isRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: {
    [fetchContacts.pending]: isPending,
    [fetchContacts.rejected]: isRejected,
    [addContact.rejected]: isRejected,
    [addContact.pending]: isPending,
    [deleteContact.pending]: isPending,
    [deleteContact.rejected]: isRejected,

    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = state.items.filter(
        element => element.id !== action.payload.id
      );
    },
  },
});

export const contactsReducer = contactsSlice.reducer;
