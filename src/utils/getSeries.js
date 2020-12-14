export default function getSeries(media, mediaId) {
    return media.find((series) => mediaId === series.docId);
}
