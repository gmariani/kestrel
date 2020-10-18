import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useCollections() {
    // eslint-disable-next-line
    const [collections, setCollections] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        console.log(firebase.firestore());

        //     firebase
        //         .firestore()
        //         .collection(target)
        //         .get()
        //         .then((snapshot) => {
        //             const allContent = snapshot.docs.map((contentObj) => ({
        //                 ...contentObj.data(),
        //                 docId: contentObj.id,
        //             }));

        //             setCollections(allContent);
        //         })
        //         .catch((error) => {
        //             console.log(error.message);
        //         });
    }, [firebase]);

    return { collections: collections };
}
