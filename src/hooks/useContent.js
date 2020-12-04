import { useEffect, useState, useContext } from 'react';
import FirebaseContext from '../context/firebase';

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
                setContent(allContent);
            })
            .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
    }, [firebase, target, orderBy]);

    return { content, loaded: content.length > 0 };
}
