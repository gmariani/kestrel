export function seedDatabase(firebase) {
    function getUUID() {
        // eslint gets funny about bitwise
        /* eslint-disable */
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const piece = (Math.random() * 16) | 0;
            const elem = c === 'x' ? piece : (piece & 0x3) | 0x8;
            return elem.toString(16);
        });
        /* eslint-enable */
    }

    /* Series
      ============================================ */
    firebase.firestore().collection('tv').add({
        id: getUUID(),
        title: 'Firefly',
        description:
            'In the year 2517, after the arrival of humans in a new star system, follow the adventures of the renegade crew of Serenity, a "Firefly-class" spaceship. The ensemble cast portrays the nine characters who live on Serenity.',
        genre: 'Drama, Action & Adventure, Sci-Fi & Fantasy',
        year: 2002,
        maturity: 'TV-14',
        slug: 'firefly',
        imdb: 'tt0303461',
        tmdb: 1437,
    });
    firebase.firestore().collection('tv').add({
        id: getUUID(),
        title: 'The Office',
        description:
            'The everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.',
        genre: 'Comedy',
        year: 2005,
        maturity: 'TV-14',
        slug: 'the-office',
        imdb: 'tt0386676',
        tmdb: 2316,
    });

    /* Films
      ============================================ */
    firebase.firestore().collection('movies').add({
        id: getUUID(),
        title: 'Iron Man',
        description:
            'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
        genre: 'Action, Science Fiction, Adventure',
        year: 2008,
        maturity: 'PG-13',
        slug: 'iron-man',
        imdb: 'tt0371746',
        tmdb: 1726,
    });

    firebase.firestore().collection('animation').add({
        id: getUUID(),
        title: 'Gunbuster 2',
        description:
            "Diebuster follows the story of Nono, a country girl who dreams of becoming a space pilot who, due to a chance encounter with an actual space pilot, finds herself becoming part of the elite Fraternity. Made up of teenage pilots called Topless, and armed with quasi-humanoid weapons called Buster Machines, the Fraternity's mission is to protect the people of the Solar System from attack by swarms of space monsters.",
        genre: 'Animation, Sci-Fi & Fantasy, Action & Adventure',
        year: 2004,
        //maturity: '15',
        slug: 'gunbuster',
        imdb: 'tt0856824',
        tmdb: 66931,
    });

    firebase.firestore().collection('kids').add({
        id: getUUID(),
        title: 'VeggieTales: Lord of the Beans',
        description: 'A lesson in using your gifts told in a manner of JRR Tolkien\'s classic "The Lord of the Rings."',
        genre: 'Family, Animation',
        maturity: 'NR',
        slug: 'veggietales-lord-of-the-beans',
        imdb: 'tt0791201',
        tmdb: 273309,
    });
}
