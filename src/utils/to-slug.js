const escapeRegExp = function (strToEscape) {
    // Escape special characters for use in a regular expression
    // eslint-disable-next-line
    return strToEscape.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

const trimChar = function (origString, charToTrim) {
    charToTrim = escapeRegExp(charToTrim);
    var regEx = new RegExp('^[' + charToTrim + ']+|[' + charToTrim + ']+$', 'g');
    return origString.replace(regEx, '');
};

export default function toSlug(name, context = 'display') {
    // Strip tags
    name = name.replace(/(<([^>]+)>)/gi, '');
    // Preserve escaped octets.
    name = name.replace(/%([a-fA-F0-9][a-fA-F0-9])/gi, '---$1---');
    // Remove percent signs that are not part of an octet.
    name = name.replace('%', '');
    // Restore octets.
    name = name.replace(/---([a-fA-F0-9][a-fA-F0-9])---/gi, '%$1');

    // if (seems_utf8(name)) {
    //     if (function_exists('mb_strtolower')) {
    //         name = mb_strtolower(name, 'UTF-8');
    //     }
    //     name = utf8_uri_encode(name, 200);
    // }

    name = name.toLowerCase();

    // if ('save' === context) {
    //     // Convert &nbsp, &ndash, and &mdash to hyphens.
    //     name = str_replace(array('%c2%a0', '%e2%80%93', '%e2%80%94'), '-', name);
    //     // Convert &nbsp, &ndash, and &mdash HTML entities to hyphens.
    //     name = str_replace(array('&nbsp;', '&#160;', '&ndash;', '&#8211;', '&mdash;', '&#8212;'), '-', name);
    //     // Convert forward slash to hyphen.
    //     name = str_replace('/', '-', name);

    //     // Strip these characters entirely.
    //     name = str_replace(
    //         array(
    //             // Soft hyphens.
    //             '%c2%ad',
    //             // &iexcl and &iquest.
    //             '%c2%a1',
    //             '%c2%bf',
    //             // Angle quotes.
    //             '%c2%ab',
    //             '%c2%bb',
    //             '%e2%80%b9',
    //             '%e2%80%ba',
    //             // Curly quotes.
    //             '%e2%80%98',
    //             '%e2%80%99',
    //             '%e2%80%9c',
    //             '%e2%80%9d',
    //             '%e2%80%9a',
    //             '%e2%80%9b',
    //             '%e2%80%9e',
    //             '%e2%80%9f',
    //             // Bullet.
    //             '%e2%80%a2',
    //             // &copy, &reg, &deg, &hellip, and &trade.
    //             '%c2%a9',
    //             '%c2%ae',
    //             '%c2%b0',
    //             '%e2%80%a6',
    //             '%e2%84%a2',
    //             // Acute accents.
    //             '%c2%b4',
    //             '%cb%8a',
    //             '%cc%81',
    //             '%cd%81',
    //             // Grave accent, macron, caron.
    //             '%cc%80',
    //             '%cc%84',
    //             '%cc%8c'
    //         ),
    //         '',
    //         name
    //     );

    //     // Convert &times to 'x'.
    //     name = str_replace('%c3%97', 'x', name);
    // }

    // Kill entities.
    name = name.replace(/&.+?;/gi, '');
    name = name.replace('.', '-');

    name = name.replace(/[^%a-z0-9 _-]/gi, '');
    name = name.replace(/\s+/gi, '-');
    name = name.replace(/-+/gi, '-');
    name = trimChar(name, '-');

    return name;
}
