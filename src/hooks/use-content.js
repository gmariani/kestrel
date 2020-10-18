import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useContent(target, orderBy = 'name') {
    const [content, setContent] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        firebase
            .firestore()
            .collection(target)
            .orderBy(orderBy, 'asc')
            .get()
            .then((snapshot) => {
                const allContent = snapshot.docs.map((contentObj) => ({
                    ...contentObj.data(),
                    docId: contentObj.id,
                }));
                console.log('allContent', allContent);
                setContent(allContent);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [firebase, target, orderBy]);

    return { content };
}
