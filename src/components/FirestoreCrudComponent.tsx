import React, { useState, useEffect } from 'react';
import { app } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

type CharacterItem = {
  id?: string;
  name: string;
  realName: string;
  camp: string;
  maisonEdition: string;
  imageUrl: string;
  videoGames: string[];
};

export default function FirestoreCrudComponent() {
  const [items, setItems] = useState<CharacterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [name, setName] = useState("Joker");
  const [realName, setRealName] = useState("Unknown");
  const [camp, setCamp] = useState("Villain");
  const [maisonEdition, setMaisonEdition] = useState("DC");
  const [imageUrl, setImageUrl] = useState("/media/static/joker.jpg");
  const [videoGames, setVideoGames] = useState([
    "Batman: Arkham Asylum",
    "Batman: Arkham City",
    "Batman: Arkham Knight"
  ]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    const firestore = getFirestore(app);
    const itemsCollection = collection(firestore, "CharacterItems");
    const docsSnapshot = await getDocs(itemsCollection);
    const loadedItems = docsSnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      realName: doc.data().realName,
      camp: doc.data().camp,
      maisonEdition: doc.data().maisonEdition,
      imageUrl: doc.data().imageUrl,
      videoGames: doc.data().videoGames,
    }));
    setItems(loadedItems);
    setLoading(false);
  }

  async function deleteItem(id: string | undefined) {
    if (id) {
      const firestore = getFirestore(app);
      const itemDoc = doc(firestore, 'CharacterItems', id);
      await deleteDoc(itemDoc);
      await loadItems();
    }
  }

  async function updateItem(item: CharacterItem) {
    if (item.id) {
      const updatedItem = { ...item, name, realName, camp, maisonEdition, imageUrl, videoGames };
      const firestore = getFirestore(app);
      const itemDoc = doc(firestore, 'CharacterItems', item.id);
      await updateDoc(itemDoc, updatedItem);
      await loadItems();
    }
  }

  async function addItem() {
    const itemToAdd: CharacterItem = {
      id,
      name,
      realName,
      camp,
      maisonEdition,
      imageUrl,
      videoGames,
    };
    const firestore = getFirestore(app);
    const itemsCollection = collection(firestore, "CharacterItems");
    const newDoc = doc(itemsCollection);
    await setDoc(newDoc, itemToAdd);
    await loadItems();
  }

  return (
    <div>
      <div className="form-group">
        <p>Ajout d'un personnage</p>
        <div>
          <label htmlFor="id">ID de l'élément :</label>
          <input
            name="id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="realName">Nom réel :</label>
          <input
            name="realName"
            type="text"
            value={realName}
            onChange={(e) => setRealName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="camp">Camp :</label>
          <input
            name="camp"
            type="text"
            value={camp}
            onChange={(e) => setCamp(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="maisonEdition">Maison d'édition :</label>
          <input
            name="maisonEdition"
            type="text"
            value={maisonEdition}
            onChange={(e) => setMaisonEdition(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="imageUrl">URL de l'image :</label>
          <input
            name="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="videoGames">Jeux vidéo :</label>
          <input
            name="videoGames"
            type="text"
            value={videoGames.join(", ")}
            onChange={(e) => setVideoGames(e.target.value.split(", "))}
          />
        </div>
        <div>
          <button onClick={addItem}>Ajouter</button>
        </div>
      </div>
      <button onClick={loadItems}>Charger les personnages</button>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <p>Nom: {item.name}</p>
                <p>Nom réel: {item.realName}</p>
                <p>Camp: {item.camp}</p>
                <p>Maison d'édition: {item.maisonEdition}</p>
                <p>URL de l'image: {item.imageUrl}</p>
                <p>Jeux vidéo: {item.videoGames.join(", ")}</p>
                <button onClick={() => deleteItem(item.id)}>Supprimer</button>
                <button onClick={() => updateItem(item)}>Modifier</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
