import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const InputGroup = styled.div`
    display: flex;
    column-gap: 10px;
    margin-bottom: 5rem;
    justify-content: center;
`;

const Input = styled.input`
    background-color: transparent;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 2px solid white;
    width: 3rem;
    color: white;
    font-size: 2.5rem;
    text-align: center;
    transition: all 0.3s;
    &:active,
    &:focus {
        width: 3.5rem;
        border-bottom-width: 4px;
        border-top: none;
        border-right: none;
        border-right: none;
        outline: none;
    }
`;

const propTypes = {
    length: PropTypes.number,
    blurOnComplete: PropTypes.bool,
    onChange: PropTypes.func,
    onComplete: PropTypes.func,
};

function SecurityCode({ length = 8, blurOnComplete = true, onChange, onComplete }) {
    const [code, setCode] = useState('');
    const groupRef = createRef();

    const updateCode = () => {
        // console.log('updateCode', groupRef.current);
        const parentNode = groupRef.current;
        const charFields = parentNode.querySelectorAll('.char-field');

        // Convert NodeList to Array in order to map
        // Trim and join into string
        const updatedCode = [...charFields].map((charField) => charField.value.trim() || '').join('');

        setCode(updatedCode);
        return updatedCode;
    };

    const selectNext = (element) => {
        if (element.nextSibling) {
            element.nextSibling.focus();
        } else {
            element.select();
        }
    };

    const selectPrevious = (element) => {
        if (element.previousSibling) element.previousSibling.focus();
    };

    // const clearCode = () => {
    //     const parentNode = groupRef.current;
    //     parentNode.querySelectorAll('.char-field').map((charField) => {
    //         charField.value = '';
    //         return true;
    //     });
    //     setCode('');
    //     parentNode.querySelectAll('.char-field')[0].focus();
    // }

    const getIndex = (targetIndex) => {
        // console.log('getIndex', targetIndex);
        const parentNode = groupRef.current;
        const charFields = parentNode.querySelectorAll('.char-field');
        if (targetIndex < 0) return charFields[0];
        if (targetIndex >= charFields.length) return charFields[charFields.length - 1];
        return charFields[targetIndex];
    };

    const onBlur = () => {
        // console.log('onBlur');
    };

    const onInput = (event) => {
        // console.log('onInput', event.target.value);

        // If more than one character entered, grab just the first character
        const { target } = event;
        const val = target.value;
        if (val.length > 1) target.value = val.slice(-1);

        // Update the complete code
        const updatedCode = updateCode();

        if (onChange) onChange(updatedCode);

        // If we have entered enough, complete
        if (updatedCode.length === length) {
            if (blurOnComplete) {
                target.blur();
            } else {
                selectNext(target);
            }

            if (onComplete) onComplete(updatedCode);
        } else if (target.value !== '') selectNext(target);
    };

    const onFocus = (event) => {
        // console.log('onFocus');
        event.target.select();
    };

    const onKeyDown = (event) => {
        // console.log('onKeyDown');
        const keyCode = event.which || event.keyCode;
        // (8) Backspace
        if (keyCode === 8) {
            if (event.target.value === '') {
                selectPrevious(event.target);
            } else {
                // Prevents backspace from navigating away
                // https://stackoverflow.com/questions/11112127/prevent-backspace-from-navigating-back-with-jquery-like-googles-homepage/13756505
                event.target.focus();
            }
        } else if (keyCode >= 37 && keyCode <= 41) {
            // (37) Left Arrow, (39) Right Arrow
            if (keyCode === 37) {
                selectPrevious(event.target);
            } else if (keyCode === 39) {
                selectNext(event.target);
            }
            event.preventDefault();
        }
    };

    const onPaste = (event) => {
        // console.log('onPaste');
        const parentNode = groupRef.current;
        const charFields = parentNode.querySelectorAll('.char-field');
        const pasteCharIndex = parseInt(event.target.name.split('_')[1], 10); // char_1

        let charIndex;
        let input = '';
        // inputtedLength = 0;
        /* eslint-disable indent */
        for (
            event.clipboardData && event.clipboardData.getData
                ? (input = event.clipboardData.getData('Text'))
                : window.clipboardData &&
                  window.clipboardData.getData &&
                  (input = window.clipboardData.getData('Text')),
                input = input.substr(0, charFields.length - pasteCharIndex).split(''),
                charIndex = 0;
            charIndex < input.length;
            charIndex += 1
        ) {
            // inputtedLength++;
            charFields[charIndex + pasteCharIndex].value = input[charIndex];
        }
        /* eslint-disable indent */

        const updatedCode = updateCode();

        if (onChange) onChange(updatedCode);

        // setTimeout(function () {
        if (updatedCode.length === length) {
            if (blurOnComplete) {
                event.target.blur();
            } else {
                getIndex(updatedCode.length - 1).focus();
            }

            if (onComplete) onComplete(updatedCode);
        } else {
            // getIndex(pasteCharIndex + inputtedLength).focus();
            getIndex(updatedCode.length - 1).focus();
        }
        // }, 0);

        event.preventDefault();
    };

    return (
        <InputGroup ref={groupRef}>
            {Array.from(Array(length)).map((item, index) => (
                <Input
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    name={`char_${index}`}
                    className='char-field'
                    value={code.charAt(index)}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    onInput={onInput}
                    onPaste={onPaste}
                    pattern='[a-zA-Z0-9]'
                    maxlength='1'
                    autocorrect='off'
                    autocomplete='off'
                    autocapitalize='none'
                    spellcheck='false'
                    aria-label={index > 0 ? `Letter ${index + 1}` : `Enter password letter ${index + 1}`}
                    type='password'
                />
            ))}
        </InputGroup>
    );
}

SecurityCode.propTypes = propTypes;
export default SecurityCode;
