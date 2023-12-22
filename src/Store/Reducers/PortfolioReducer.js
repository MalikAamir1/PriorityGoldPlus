import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const PortfolioReducer = createSlice({
  name: 'portfolioReducer',
  // initialState,
  initialState,
  reducers: {
    portfolio: (state, action) => {
      state.data = action.payload;
    },
    removePorfolio: (state, action) => {
      state.data = [];
    },
  },
});

export default PortfolioReducer.reducer;
export const {portfolio, removePorfolio} = PortfolioReducer.actions;