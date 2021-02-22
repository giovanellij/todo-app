import * as firebase from 'firebase';

export function dateToFirestamp(date: Date) {
  return firebase.default.firestore.Timestamp.fromDate(date);
}
