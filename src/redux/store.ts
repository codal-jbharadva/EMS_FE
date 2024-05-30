import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slices/userAuthSlice';
import { saveState, loadState } from './localStorage';

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        auth: authReducer,  // Use a consistent key
    },
    preloadedState,
});


store.subscribe(() => {
    const state = store.getState().auth;
    saveState(state);
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
