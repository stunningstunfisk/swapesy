import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const upload = async (imageUri, imageName) => {
  const storage = getStorage();
  try {
    const response = await fetch(imageUri);
    const blobFile = await response.blob();

    const reference = ref(storage, imageName);
    const result = await uploadBytes(reference, blobFile);
    const url = await getDownloadURL(result.ref);

    return url;
  } catch (err) {
    return Promise.reject(err);
  }
};

export default upload;
