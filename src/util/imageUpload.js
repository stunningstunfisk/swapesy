import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const upload = async (imageUri, imageName) => {
  const storage = getStorage();

  try {
    const response = await fetch(imageUri);
    const blobFile = await response.blob();
    const reference = ref(storage, `cardImages/${imageName}`);
    const metadata = {
      contentType: 'image/jpeg',
      size: 20000,
    };
    const result = await uploadBytes(reference, blobFile, metadata);
    const url = await getDownloadURL(result.ref);
    return url;
  } catch (err) {
    return Promise.reject(err);
  }
};

export default upload;
