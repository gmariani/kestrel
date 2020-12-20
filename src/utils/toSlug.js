// Escape special characters for use in a regular expression
// eslint-disable-next-line no-useless-escape
const escapeRegExp = (strToEscape) => strToEscape.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

const trimChar = (origString, charToTrim) => {
    const escapedChar = escapeRegExp(charToTrim);
    const regEx = new RegExp(`^[${escapedChar}]+|[${escapedChar}]+$`, 'g');
    return origString.replace(regEx, '');
};

export default function toSlug(name = '') {
    if (name === '') return '';

    /* eslint-disable no-param-reassign */
    // Strip tags
    name = name.replace(/(<([^>]+)>)/gi, '');
    // Preserve escaped octets.
    name = name.replace(/%([a-fA-F0-9][a-fA-F0-9])/gi, '---$1---');
    // Remove percent signs that are not part of an octet.
    name = name.replace('%', '');
    // Restore octets.
    name = name.replace(/---([a-fA-F0-9][a-fA-F0-9])---/gi, '%$1');

    name = name.toLowerCase();

    // Kill entities.
    name = name.replace(/&.+?;/gi, '');
    name = name.replace('.', '-');

    name = name.replace(/[^%a-z0-9 _-]/gi, '');
    name = name.replace(/\s+/gi, '-');
    name = name.replace(/-+/gi, '-');
    name = trimChar(name, '-');
    /* eslint-enable no-param-reassign */
    return name;
}
