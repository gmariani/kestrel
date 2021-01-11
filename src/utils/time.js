import padNumber from './padNumber';

export function durationToSeconds(duration = '00:00') {
    const parts = duration.split(':').map((num) => parseInt(num, 10));
    if (parts.length >= 3) return parts[0] * 60 * 60 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0];
}

export function secondsToDuration(duration = 0) {
    let temp = duration;
    const hours = Math.floor((temp %= 86400) / 3600);
    const minutes = Math.floor((temp %= 3600) / 60);
    const seconds = temp % 60;
    if (hours) return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(Math.floor(seconds))}`;
    return `${padNumber(minutes)}:${padNumber(Math.floor(seconds))}`;
}

export function secondsToHuman(duration) {
    let temp = duration;
    const years = Math.floor(temp / 31536000);
    const days = Math.floor((temp %= 31536000) / 86400);
    const hours = Math.floor((temp %= 86400) / 3600);
    const minutes = Math.floor((temp %= 3600) / 60);
    const seconds = temp % 60;

    if (days || hours || minutes) {
        return (
            (years ? `${years} years ` : '') +
            (days ? `${days} days ` : '') +
            (hours ? `${hours} hrs ` : '') +
            (minutes ? `${minutes} mins ` : '')
        );
    }

    return `${Number.parseFloat(seconds.toFixed(1))}s`;
}
