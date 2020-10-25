export default function focusNext() {
    // https://stackoverflow.com/questions/7208161/focus-next-element-in-tab-index
    const focussableElements =
        'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && document.activeElement.form) {
        const focussable = Array.prototype.filter.call(
            document.activeElement.form.querySelectorAll(focussableElements),
            function (element) {
                // check for visibility while always include the current activeElement
                return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement;
            }
        );
        console.log('focussable', focussable);
        const index = focussable.indexOf(document.activeElement);
        if (index > -1) {
            const nextElement = focussable[index + 1] || focussable[0];
            nextElement.focus();
        }
    }
}
