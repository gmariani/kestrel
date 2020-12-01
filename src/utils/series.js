export default function getSeries(media, mediaId) {
    const foundSeries = media.filter((series) => mediaId === series.docId);
    return foundSeries.length ? foundSeries[0] : null;
}
