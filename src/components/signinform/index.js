import React, { useState, createRef } from 'react';
import Button from '../button';
import { Container, Title, Error, InputGroup, Input } from './styles/signinform';

export default function SignInForm({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}

SignInForm.Error = function FormError({ children, ...restProps }) {
    return <Error {...restProps}>{children}</Error>;
};

SignInForm.Title = function FormTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
};

SignInForm.InputGroup = function FormInputGroup({
    length,
    blurOnComplete = true,
    onChange = null,
    onComplete = null,
    ...restProps
}) {
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
        const val = event.target.value;
        if (val.length > 1) event.target.value = val.slice(-1);

        // Update the complete code
        const updatedCode = updateCode();

        if (onChange) onChange(updatedCode);

        // If we have entered enough, complete
        if (updatedCode.length === length) {
            if (blurOnComplete) {
                event.target.blur();
            } else {
                selectNext(event.target);
            }

            if (onComplete) onComplete(updatedCode);
        } else if (event.target.value !== '') selectNext(event.target);
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
        <InputGroup ref={groupRef} {...restProps}>
            {Array.from(Array(length)).map((item, index) => (
                <Input
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
                    type='password'></Input>
            ))}
        </InputGroup>
    );
};

SignInForm.Submit = function FormSubmit({ children, ...restProps }) {
    return <Button {...restProps}>{children}</Button>;
};
