export default function removeNumbering(string) {
    return string.replace(/^\d+\s?-\s?/gi, '');
}
