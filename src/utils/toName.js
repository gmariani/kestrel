/* eslint-disable no-extend-native */
import capitalize from './capitalize';

export default function toName(slug) {
    /**
     * String.prototype.replaceAll() polyfill
     * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
     * @author Chris Ferdinandi
     * @license MIT
     */
    if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function (str, newStr) {
            // If a regex pattern
            if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
                return this.replace(str, newStr);
            }

            // If a string
            return this.replace(new RegExp(str, 'g'), newStr);
        };
    }

    // Remove single dashes into spaces, but if they were used on purpose,
    // put them back.
    // i.e. Title - subtitle
    return capitalize(slug.replaceAll('_', ' ').replaceAll('-', ' ').replaceAll('   ', ' - '))
        .replaceAll(' Of ', ' of ')
        .replaceAll(' And ', ' and ')
        .replaceAll(' In ', ' in ')
        .replaceAll(' By ', ' by ')
        .replaceAll(' The ', ' the ');
}
