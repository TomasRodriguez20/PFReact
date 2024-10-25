import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ItemList from "./ItemList";

function ItemListContainer() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const db = getFirestore();
        const itemsCollection = collection(db, 'products');
        
        getDocs(itemsCollection).then((snapshot) => {
            const productsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItems(productsList);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching products:', error);
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return <ItemList items={items} />;
}

export default ItemListContainer;
