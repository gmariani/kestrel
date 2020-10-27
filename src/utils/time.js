import { padNumber } from './';

export function durationToSeconds(duration = '00:00') {
    const parts = duration.split(':').map((num) => parseInt(num));
    if (parts.length >= 3) return parts[0] * 60 * 60 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0];
}

export function secondsToDuration(duration = 0) {
    const hours = Math.floor((duration %= 86400) / 3600),
        minutes = Math.floor((duration %= 3600) / 60),
        seconds = duration % 60;
    if (hours) return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(Math.floor(seconds))}`;
    return `${padNumber(minutes)}:${padNumber(Math.floor(seconds))}`;
}

export function secondsToHuman(duration) {
    let temp = duration;
    const years = Math.floor(temp / 31536000),
        days = Math.floor((temp %= 31536000) / 86400),
        hours = Math.floor((temp %= 86400) / 3600),
        minutes = Math.floor((temp %= 3600) / 60),
        seconds = temp % 60;

    if (days || hours || minutes) {
        return (
            (years ? years + 'y ' : '') +
            (days ? days + 'd ' : '') +
            (hours ? hours + 'h ' : '') +
            (minutes ? minutes + 'm ' : '')
        );
    }

    return Number.parseFloat(seconds) + 's';
}
