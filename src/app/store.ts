import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore, createSlice } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { studentsApiSlice } from "../features/students/studentsApiEndpoints"

// Define initial state
interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

// Create a slice for authentication
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Export actions
export const { login, logout } = authSlice.actions;

// Export reducer
export const authReducer = authSlice.reducer;

// Create a thunk action for login (you can expand this for API calls or any async tasks)
export const loginAsync = (): AppThunk => (dispatch) => {
  // Simulate async login process
  setTimeout(() => {
    dispatch(login());
  }, 1000);
};

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(studentsApiSlice, authSlice)
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(studentsApiSlice.middleware)
    },
    preloadedState,
  })
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
