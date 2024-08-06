import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userDetailsReducer from '../Slices/UserDetailsSlice'

// Configure persist options
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userDetails'],
  // blacklist: ['', ''],
};

//combine all reducers into rootreducers
const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store using configureStore and the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
// Create a persisted store using persistStore
const persistor = persistStore(store);

export {store, persistor};
