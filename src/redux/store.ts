import rootSaga from '@/redux/rootSaga';
import authReducer from '@/redux/store/appSlice';
import { history } from '@/utils/history';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers({
  auth: authReducer,
});
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
