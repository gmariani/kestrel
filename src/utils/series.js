export default function getSeries(media, mediaId) {
    const foundSeries = media.filter((series) => {
        return mediaId === series.docId;
    });
    return foundSeries.length ? foundSeries[0] : null;
}
