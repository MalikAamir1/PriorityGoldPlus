import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const PortfolioReducerByUser = createSlice({
  name: 'portfolioReducerByUser',
  // initialState,
  initialState,
  reducers: {
    portfolioUser: (state, action) => {
        state.data = action.payload;
        console.log('state....', state);
    },
    removePorfolio: (state, action) => {
      state.data = [];
    },
  },
});

export default PortfolioReducerByUser.reducer;
export const {portfolioUser, removePorfolio} = PortfolioReducerByUser.actions;