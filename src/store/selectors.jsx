import { createSelector } from 'reselect'

const selectFetchReducer = (state) => state.fetch

export const selectCurrentUser = createSelector(
  [selectFetchReducer],
  (fetchReducer) => fetchReducer.currentUser
)

export const selectIsDeleteSuccess = createSelector(
  [selectFetchReducer],
  (fetchReducer) => fetchReducer.isDeleteSuccess
)

export const selectLoading = createSelector(
  [selectFetchReducer],
  (fetchReducer) => fetchReducer.loading
)

export const selectCurrentArticle = createSelector(
  [selectFetchReducer],
  (fetchReducer) => fetchReducer.currentArticle
)

export const selectError = createSelector(
  [selectFetchReducer],
  (fetchReducer) => fetchReducer.error
)