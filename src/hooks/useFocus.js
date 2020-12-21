import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    direction: PropTypes.string,
    enabled: PropTypes.bool,
    initial: PropTypes.string,
};

function useFocus(items = [], direction = 'horizontal', enabled = true, initial) {
    const len = items.length;
    // Returns -1 if not found
    const initialIndex = initial ? items.findIndex((element) => element === initial) : 0;
    const [focus, setFocus] = useState(initialIndex >= 0 ? initialIndex : 0);
    const [key, setKey] = useState(null);

    const onKeyDown = useCallback(
        (event) => {
            // Short-circuit if not enabled
            if (!enabled) return;

            const { keyCode, key: keyName } = event;
            setKey(keyName);

            // Exit if no elements exist
            if (len === 0) {
                setFocus(null);
                return;
            }

            // (27) Esc
            if (keyCode === 27) {
                event.preventDefault();
            }

            // (13) Enter
            if (keyCode === 13) {
                event.preventDefault();
            }

            const currentFocus = focus < 0 ? 0 : focus;
            if (direction === 'horizontal') {
                if (keyCode >= 37 && keyCode <= 41) {
                    // (37) Left Arrow, (39) Right Arrow
                    if (keyCode === 37) {
                        setFocus((currentFocus - 1 + len) % len);
                    } else if (keyCode === 39) {
                        setFocus((currentFocus + 1) % len);
                    }
                    event.preventDefault();
                }
            }

            if (direction === 'vertical') {
                if (keyCode >= 37 && keyCode <= 41) {
                    // (38) Up Arrow, (40) Down Arrow
                    if (keyCode === 38) {
                        setFocus((currentFocus - 1 + len) % len);
                    } else if (keyCode === 40) {
                        setFocus((currentFocus + 1) % len);
                    }
                    event.preventDefault();
                }
            }
        },
        [direction, focus, setFocus, enabled, len]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyDown]);

    // if (focus === -1) return 'escape';
    // if (focus === -2) return 'enter';
    // return focus === null ? null : items[focus];
    return [items[focus] ?? null, key];
}

useFocus.propTypes = propTypes;
export default useFocus;
