import firebase from 'firebase';
import { nanoid } from 'nanoid';

firebase.initializeApp({
  apiKey: "AIzaSyDJ4vrebJw1Rl58ybBLp-jhNpISyqukL7I",
  authDomain: "bigk-grills.firebaseapp.com",
  projectId: "bigk-grills",
  storageBucket: "bigk-grills.appspot.com",
  appId: "1:795287866438:web:b70219db7bd78f11858e47"
})

const storage = firebase.storage();

const storageRef = storage.ref();
const imagesRef = storageRef.child('images');


export const uploadImageToCloud = async (fileInBase64, existingId = null) => {
  try {
    const metadata = {
      contentType: 'image/jpeg',
    };

    const refId = nanoid();
    // console.log(refId);
    const imageRef = imagesRef.child(refId);

    const task = await imageRef.putString(fileInBase64, 'data_url', metadata);
    const imageLink = await task.ref.getDownloadURL();

    if (existingId) {
      await imagesRef.child(existingId).delete().catch(e => {
        console.error('Previous image with Id: ' + existingId + ' failed to delete');
        console.error(e.message);
      })
    }

    return { imageLink, imageId: refId }; // use the imageId to delete the image if there is a need to
  } catch (error) {
    console.log(error);
  }
}
