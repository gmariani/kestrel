export default function getFileName(path) {
    return path
        .substring(path.lastIndexOf('/') + 1)
        .split('.')
        .slice(0, -1)
        .join('.');
}
