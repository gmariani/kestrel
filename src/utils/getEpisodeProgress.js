import { durationToSeconds } from './time';

export default function getEpisodeProgress(currentSeconds = 0, duration = '00:00') {
    const totalSeconds = durationToSeconds(duration);
    const percent = Math.floor(totalSeconds > 0 && currentSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0);
    return { percent, currentSeconds, totalSeconds };
}
