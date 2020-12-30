import capitalize from './capitalize';

export default function toName(slug) {
    return capitalize(slug.replaceAll('_', ' '));
}
