import { createAction, props } from '@ngrx/store';

export const isLoading = createAction(
    '[Map Component] Is Loading'
);

export const stopLoading = createAction(
    '[Map Component] Stop Loading'
);
