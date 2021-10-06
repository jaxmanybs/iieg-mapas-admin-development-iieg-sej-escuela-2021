import { createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './map.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false,
};

const _mapReducer = createReducer(initialState,
    on(isLoading, state => ({ ...state, isLoading: true })),
    on(stopLoading, state => ({ ...state, isLoading: false }))

);

export function mapReducer(state, action) {
    return _mapReducer(state, action);
}
