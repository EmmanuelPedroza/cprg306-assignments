import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, doc, deleteDoc } from "firebase/firestore";

export const getShoppingList = async (userId) => {
    const items = [];
    try {
        const q = query(collection(db, "users", userId, "items"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
    } catch (error) {
        console.error("Error fetching shopping list: ", error);
    }
    return items;
};

export const addItem = async (userId, item) => {
    try {
        const docRef = await addDoc(collection(db, "users", userId, "items"), item);
        return docRef.id;
    } catch (error) {
        console.error("Error adding item: ", error);
    }
};

export const deleteItem = async (userId, itemId) => {
    try {
        await deleteDoc(doc(db, "users", userId, "items", itemId));
    } catch (error) {
        console.error("Error deleting item: ", error);
    }
};
