import capitalize from './capitalize';

export default function toName(slug) {
    // Remove single dashes into spaces, but if they were used on purpose,
    // put them back.
    // i.e. Title - subtitle
    return capitalize(slug.replaceAll('_', ' ').replaceAll('-', ' ').replaceAll('   ', ' - '))
        .replaceAll(' Of ', ' of ')
        .replaceAll(' And ', ' and ')
        .replaceAll(' In ', ' in ')
        .replaceAll(' By ', ' by ')
        .replaceAll(' The ', ' the ');
}
