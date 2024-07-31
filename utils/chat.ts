import { database } from "./config";
import { ref, onValue } from "firebase/database";
// TYPES
import { IChat } from "@/types/chats";
export function getChat(communityID: string, chatID: string): Promise<IChat[]> {
  return new Promise((resolve, reject) => {
    try {
      const db = database;
      const dbRef = ref(db, `${communityID}/${chatID}`);

      onValue(dbRef, (snapshot) => {
        if (snapshot.exists() && Object.keys(snapshot.val()).length > 0) {
          const data = snapshot.val();
          const messages: IChat[] = [];
          for (const key in data) {
            messages.push({
              id: key,
              userID: data[key].userID,
              username: data[key].username,
              img: data[key].img,
              message: data[key].message,
              publicationDate: data[key].publicationDate,
            });
          }
          resolve(messages);
        } else {
          resolve([]);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}
