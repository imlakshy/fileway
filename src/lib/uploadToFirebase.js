"use client";
import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

const uploadToFirebase = async ({ selectedFiles, onProgress }) => {
  const urls = [];

  for (const f of selectedFiles) {
    const file = f.file;
    const fileRef = ref(storage, `uploads/${Date.now()}-${file.name}`);

    const uploadTask = uploadBytesResumable(fileRef, file);

    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(Math.round(progress));
        },
        reject,
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          urls.push(url);
          resolve();
        }
      );
    });
  }

  return urls;
};


export default uploadToFirebase;
