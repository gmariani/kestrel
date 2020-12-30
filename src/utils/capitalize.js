export default function capitalize(str) {
    let raw = str;
    if (raw === 'tv') raw = raw.toUpperCase();
    return raw.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}
