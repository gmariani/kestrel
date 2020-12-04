import toSlug from './toSlug';

export default function getUUID(mediaId: String, seasonIndex: Number, episode = null) {
    if (!episode) {
        return `${mediaId}_${seasonIndex}`;
    }

    // Is slug already
    if (episode && typeof episode === 'string') {
        return `${mediaId}_${seasonIndex}_${episode}`;
    }
    return episode ? `${mediaId}_${seasonIndex}_${toSlug(episode.name)}` : '';
}
