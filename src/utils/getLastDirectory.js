export default function getLastDirectory(path) {
    return path.slice(0, -1).split('/').pop();
}
