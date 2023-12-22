import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import AuthReducer from './Reducers/AuthReducer';
import ScreenReducer from './Reducers/ScreenReducer';
import PortfolioReducer from './Reducers/PortfolioReducer';
import PortfolioReducerByUser from './Reducers/PortfolioReducerByUser';

export const Store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    ScreenReducer: ScreenReducer,
    PortfolioReducer: PortfolioReducer,
    PortfolioReducerByUser:PortfolioReducerByUser
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});