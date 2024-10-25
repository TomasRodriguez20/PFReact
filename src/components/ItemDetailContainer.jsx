import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import ItemDetail from "./ItemDetail";

function ItemDetailContainer() {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const db = getFirestore();
        const itemRef = doc(db, 'products', id);

        getDoc(itemRef).then((snapshot) => {
            if (snapshot.exists()) {
                setItem({ id: snapshot.id, ...snapshot.data() });
            } else {
                console.log('No such document!');
            }
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching product:', error);
        });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return item ? <ItemDetail item={item} /> : <p>Item not found</p>;
}

export default ItemDetailContainer;
