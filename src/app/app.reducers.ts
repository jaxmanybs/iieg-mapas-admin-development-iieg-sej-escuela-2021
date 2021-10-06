import { ActionReducerMap } from '@ngrx/store';
import * as map from './layout/shared/map.reducer';
// import * as authReducer from './auth/auth.reducer';


export interface AppState {
    map: map.State;
    //    user: authReducer.State;
}


export const appReducers: ActionReducerMap<AppState> = {
    map: map.mapReducer,
    //    user: authReducer.authReducer
};
