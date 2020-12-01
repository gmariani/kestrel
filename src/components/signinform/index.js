import React, { useState, createRef } from 'react';
import { Button } from '../../components';
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
        if (targetIndex < 0) targetIndex = 0;
        if (targetIndex >= charFields.length) targetIndex = charFields.length - 1;
        return charFields[targetIndex];
    };

    const onBlur = (event) => {
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
        } else {
            if ('' !== event.target.value) selectNext(event.target);
        }
    };

    const onFocus = (event) => {
        // console.log('onFocus');
        event.target.select();
    };

    const onKeyDown = (event) => {
        // console.log('onKeyDown');
        const keyCode = event.which || event.keyCode;
        // (8) Backspace
        if (8 === keyCode) {
            if ('' === event.target.value) {
                selectPrevious(event.target);
            } else {
                // Prevents backspace from navigating away
                // https://stackoverflow.com/questions/11112127/prevent-backspace-from-navigating-back-with-jquery-like-googles-homepage/13756505
                event.target.focus();
            }
        } else if (keyCode >= 37 && keyCode <= 41) {
            // (37) Left Arrow, (39) Right Arrow
            if (37 === keyCode) {
                selectPrevious(event.target);
            } else if (39 === keyCode) {
                selectNext(event.target);
            }
            event.preventDefault();
        }
    };

    const onPaste = (event) => {
        // console.log('onPaste');
        const parentNode = groupRef.current;
        const charFields = parentNode.querySelectorAll('.char-field');
        const pasteCharIndex = parseInt(event.target.name.split('_')[1]); // char_1

        let charIndex,
            input = '';
        // inputtedLength = 0;
        for (
            event.clipboardData && event.clipboardData.getData
                ? (input = event.clipboardData.getData('Text'))
                : window.clipboardData &&
                  window.clipboardData.getData &&
                  (input = window.clipboardData.getData('Text')),
                input = input.substr(0, charFields.length - pasteCharIndex).split(''),
                charIndex = 0;
            charIndex < input.length;
            charIndex++
        ) {
            // inputtedLength++;
            charFields[charIndex + pasteCharIndex].value = input[charIndex];
        }

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

    const updateCode = () => {
        // console.log('updateCode', groupRef.current);
        const parentNode = groupRef.current;
        const charFields = parentNode.querySelectorAll('.char-field');

        // Convert NodeList to Array in order to map
        // Trim and join into string
        const updatedCode = [...charFields]
            .map(function (charField) {
                return charField.value.trim() || '';
            })
            .join('');

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

    return (
        <InputGroup ref={groupRef} {...restProps}>
            {Array.apply(null, { length: length }).map((item, index) => (
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
