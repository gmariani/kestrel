import { toSlug } from './';

export default function getUUID(mediaId: String, seasonIndex: Number, episode = null) {
    // Is slug already
    if (episode && typeof episode === 'string') {
        return `${mediaId}_${seasonIndex}_${episode}`;
    }
    return episode ? `${mediaId}_${seasonIndex}_${toSlug(episode.name)}` : '';
}
