import { all } from 'redux-saga/effects'
import { authSagaWatcher, checkTokenWatcher, registrationSagaWatcher } from './authSaga';
import {changeRatingWatcher, getAllUsersWatcher} from './ratingSaga';
import { editProfileSagaWatcher } from './profileSaga'
import {addReviewSagaWatcher, createEmployerSagaWatcher, getEmployersSagaWatcher} from './employerSaga';

export default function * rootSaga () {
  yield all([
    registrationSagaWatcher(),
    authSagaWatcher(),
    getAllUsersWatcher(),
    changeRatingWatcher(),
    getEmployersSagaWatcher(),
    createEmployerSagaWatcher(),
    editProfileSagaWatcher(),
    addReviewSagaWatcher(),
    checkTokenWatcher()
  ]);
}
