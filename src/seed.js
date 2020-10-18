export function seedDatabase(firebase) {
    function getUUID() {
        let uuidLength = 10;
        const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
        const charsetSize = charset.length;
        let uid = '';
        while (uuidLength-- > 0) {
            uid += charset.charAt(Math.floor(Math.random() * charsetSize));
        }
        return uid;
    }
    // const newId = firebase.firestore().createId();
    // console.log('seedDatabase', newId, getUUID());

    firebase.firestore().collection('categories').add({
        name: 'TV',
        slug: 'tv',
        order: 0,
    });
    firebase.firestore().collection('categories').add({
        name: 'Movies',
        slug: 'movies',
        order: 1,
    });
    firebase.firestore().collection('categories').add({
        name: 'Animation',
        slug: 'animation',
        order: 2,
    });
    firebase.firestore().collection('categories').add({
        name: 'Kids',
        slug: 'kids',
        order: 3,
    });

    /* Series
      ============================================ */
    firebase
        .firestore()
        .collection('media')
        .add({
            //id: getUUID(),
            name: 'Firefly',
            category: 'TV',
            posterPath: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/vZcKsy4sGAvWMVqLluwYuoi11Kj.jpg',
            backgroundPath: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/iP9Xjlc8KRmXE0kVMTaJRaN0umh.jpg',
            description:
                'In the year 2517, after the arrival of humans in a new star system, follow the adventures of the renegade crew of Serenity, a "Firefly-class" spaceship. The ensemble cast portrays the nine characters who live on Serenity.',
            genres: ['Drama', 'Action & Adventure', 'Sci-Fi & Fantasy'],
            year: 2002,
            contentRating: 'TV-14',
            slug: 'firefly',
            imdb: 'tt0303461',
            tmdb: 1437,
            seasons: [
                {
                    seasonNumber: 1,
                    episodeCount: 14,
                    name: 'Season 1',
                    episodes: [
                        {
                            name: 'Serenity Part 1 & 2',
                            filePath: 'Firefly - 01 - Serenity Part 1 & 2.mp4',
                        },
                        {
                            name: 'The Train Job',
                            filePath: 'Firefly - 02 - The Train Job.mp4',
                        },
                        {
                            name: 'Bushwacked',
                            filePath: 'Firefly - 03 - Bushwacked.mp4',
                        },
                        {
                            name: 'Shindig',
                            filePath: 'Firefly - 04 - Shindig.mp4',
                        },
                        {
                            name: 'Safe',
                            filePath: 'Firefly - 05 - Safe.mp4',
                        },
                        {
                            name: 'Our Mrs. Reynolds',
                            filePath: 'Firefly - 06 - Our Mrs. Reynolds.mp4',
                        },
                        {
                            name: 'Jaynestown',
                            filePath: 'Firefly - 07 - Jaynestown.mp4',
                        },
                        {
                            name: 'Out of Gas',
                            filePath: 'Firefly - 08 - Out of Gas.mp4',
                        },
                        {
                            name: 'Ariel',
                            filePath: 'Firefly - 09 - Ariel.mp4',
                        },
                        {
                            name: 'War Stories',
                            filePath: 'Firefly - 10 - War Stories.mp4',
                        },
                        {
                            name: 'Trash',
                            filePath: 'Firefly - 11 - Trash.mp4',
                        },
                        {
                            name: 'The Message',
                            filePath: 'Firefly - 12 - The Message.mp4',
                        },
                        {
                            name: 'Heart of Gold',
                            filePath: 'Firefly - 13 - Heart of Gold.mp4',
                        },
                        {
                            name: 'Objects in Space',
                            filePath: 'Firefly - 14 - Objects in Space.mp4',
                        },
                    ],
                },
            ],
        });
    firebase
        .firestore()
        .collection('media')
        .add({
            id: getUUID(),
            name: 'The Office',
            category: 'TV',
            posterPath: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg',
            backgroundPath: 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/35w8giCVT7ZXc0gAAjx8MRaWL90.jpg',
            description:
                'The everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.',
            genres: ['Comedy'],
            year: 2005,
            contentRating: 'TV-14',
            slug: 'the-office',
            imdb: 'tt0386676',
            tmdb: 2316,
            seasons: [
                {
                    seasonNumber: 1,
                    episodeCount: 6,
                    name: 'Season 1',
                    episodes: [
                        { name: 'Pilot', filePath: '1 - Pilot.m4v' },
                        { name: 'Diversity Day', filePath: '2 - Diversity Day.m4v' },
                        { name: 'Health Care', filePath: '3 - Health Care.m4v' },
                        { name: 'The Alliance', filePath: '4 - The Alliance.m4v' },
                        { name: 'Basketball', filePath: '5 - Basketball.m4v' },
                        { name: 'Hot Girl', filePath: '6 - Hot Girl.m4v' },
                    ],
                },
                { seasonNumber: 2, name: 'Season 2', episodes: [] },
                { seasonNumber: 3, name: 'Season 3', episodes: [] },
                { seasonNumber: 4, name: 'Season 4', episodes: [] },
                { seasonNumber: 5, name: 'Season 5', episodes: [] },
                { seasonNumber: 6, name: 'Season 6', episodes: [] },
                { seasonNumber: 7, name: 'Season 7', episodes: [] },
                { seasonNumber: 8, name: 'Season 8', episodes: [] },
                { seasonNumber: 9, name: 'Season 9', episodes: [] },
            ],
        });

    /* Films
      ============================================ */
    firebase
        .firestore()
        .collection('media')
        .add({
            id: getUUID(),
            name: 'Iron Man',
            category: 'Movies',
            description:
                'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.',
            genres: ['Action', 'Science Fiction', 'Adventure'],
            year: 2008,
            contentRating: 'PG-13',
            slug: 'iron-man',
            imdb: 'tt0371746',
            tmdb: 1726,
            filePath: 'https://mariani-movies.s3.us-east-1.amazonaws.com/Iron%20Man.mp4',
        });

    firebase
        .firestore()
        .collection('media')
        .add({
            id: getUUID(),
            name: 'Diebuster',
            category: 'Animation',
            description:
                "Diebuster follows the story of Nono, a country girl who dreams of becoming a space pilot who, due to a chance encounter with an actual space pilot, finds herself becoming part of the elite Fraternity. Made up of teenage pilots called Topless, and armed with quasi-humanoid weapons called Buster Machines, the Fraternity's mission is to protect the people of the Solar System from attack by swarms of space monsters.",
            genres: ['Animation', 'Sci-Fi & Fantasy', 'Action & Adventure'],
            year: 2004,
            // contentRating
            slug: 'diebuster',
            imdb: 'tt0856824',
            tmdb: 66931,
            seasons: [
                (0: {
                    episodes: [
                        {
                            name: 'Please Let Me Call You Big Sister!',
                            filePath: 'Gunbuster 2 - 01 - Please Let Me Call You Big Sister!.mkv',
                        },
                        { name: "Don't call me Big Sis!", filePath: "Gunbuster 2 - 02 - Don't call me Big Sis!.mkv" },
                        { name: 'I hate Topless!', filePath: 'Gunbuster 2 - 03 - I hate Topless!.mkv' },
                        {
                            name: 'Resurrection! The Legendary Buster Machine!',
                            filePath: 'Gunbuster 2 - 04 - Resurrection! The Legendary Buster Machine!.mkv',
                        },
                        {
                            name: 'They who move the Stars',
                            filePath: 'Gunbuster 2 - 05 - They who move the Stars.mkv',
                        },
                        { name: 'The Story of Your Life', filePath: 'Gunbuster 2 - 06 - The Story of Your Life.mkv' }
                    ],
                }),
            ],
        });

    firebase
        .firestore()
        .collection('media')
        .add({
            id: getUUID(),
            name: 'VeggieTales: Lord of the Beans',
            category: 'Kids',
            description:
                'A lesson in using your gifts told in a manner of JRR Tolkien\'s classic "The Lord of the Rings."',
            genres: ['Family', 'Animation'],
            year: 2005,
            // contentRating
            slug: 'veggietales-lord-of-the-beans',
            imdb: 'tt0791201',
            tmdb: 273309,
            filePath: 'https://mariani-movies.s3.us-east-1.amazonaws.com/VeggieTales%20-%20Lord%20Of%20The%20Beans.mp4',
        });
}
