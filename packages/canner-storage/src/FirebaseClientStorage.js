// @flow
import Promise from 'promise-polyfill';
import type {UploadOptions, OnProgressType} from './types';

export default class FirebaseClientStorage {
  firebase: any;
  
  constructor({firebase}: {firebase: any}) {
    if (!firebase) {
      throw new Error("firebase client instance is required.");
    }
    this.firebase = firebase;
  }

  upload(file: File, options: UploadOptions, onProgress: OnProgressType) {
    const images = this.firebase
      .storage()
      .ref()
      .child(options.filename);

    const uploadTask = images.put(file);

    return new Promise((resolve, reject) => {  
      uploadTask.on(this.firebase.storage.TaskEvent.STATE_CHANGED,
        function(snapshot) {
          const percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          onProgress({ percent });
        },
        function(e) {
          reject(e);
        },
        function() {
          uploadTask.snapshot.ref.getDownloadURL().then(link => {
            resolve({link})
          });
        }
      );
    });
  }
}