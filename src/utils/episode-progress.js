import { durationToSeconds } from './';
export default function getEpisodeProgress(uuid, duration = '00:00') {
    const currentSeconds = +(localStorage.getItem(uuid) || 0);
    const totalSeconds = durationToSeconds(duration);
    const progress = Math.floor(totalSeconds > 0 && currentSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0);
    return { percent: progress, currentSeconds, totalSeconds };
}
