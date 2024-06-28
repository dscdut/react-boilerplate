import { put } from '@redux-saga/core/effects';
import { takeLatest } from 'redux-saga/effects';
import { appAction } from './appSlice';

function* handleDisplayAPIWarning() {
  try {
    yield put(appAction.setAPIState(200));
  } catch (error) {
    if (error instanceof Error) {
      yield put(appAction.setAPIState(403));
    }
  }
}
export default function* appSaga() {
  yield takeLatest(appAction.setAPIState.type, handleDisplayAPIWarning);
}
