import { doc, getDoc, setDoc, arrayUnion } from "firebase/firestore";
import { uid } from "uid";
import { db, storage } from "@/config";
import { UserData } from "@/types/types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Функція для додавання документа до колекції
export const addUser = async (userId: string, userData: UserData) => {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    console.log("User added:", userId);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Функція для отримання документа з колекції
export const getUser = async (userId: string) => {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Unable to retrieve user data.");
  }
};

// Функція для запису даних користувача у Firestore
export const updateUserInFirestore = async (uid: string, data: any) => {
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true }); // merge: true - для оновлення існуючого документа або створення нового
    console.log("User data updated to Firestore:", uid);
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
    throw new Error("Error saving user data to Firestore");
  }
};

// Функція для завантаження зображення
export const uploadImage = async (userId: string, file: Blob, fileName: string, path: string) => {
  try {
    const imageRef = ref(storage, `${path}/${userId}/${uid()}_${fileName}`);

    const downloadURL = await new Promise<string>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Upload error:", error);
          reject(error);
        },
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", url);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        }
      );
    });

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image:");
  }
};

// Функція для отримання URL завантаженого зображення
export const getImageUrl = async (imageRef: any) => {
  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error retrieving image URL:", error);
    throw new Error("Unable to retrieve image URL.");
  }
};

// Функція для додавання посту до колекції
export const addPost = async (userId: string, post: any) => {
  try {
    const docRef = doc(db, "posts", userId);
    await setDoc(
      docRef,
      {
        userId,
        posts: arrayUnion(post),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error adding post:", error);
    throw new Error("Failed to add post");
  }
};

// Функція для отримання постів з колекції
export const getPosts = async (userId: string) => {
  try {
    const docRef = doc(db, "posts", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { posts } = docSnap.data() || {};
      return posts || [];
    } else {
      console.warn(`No document found for user ID: ${userId}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts");
  }
};
