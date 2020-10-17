import React from 'react';
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

SignInForm.InputGroup = function FormInputGroup({ children, ...restProps }) {
    return <InputGroup {...restProps}>{children}</InputGroup>;
};

SignInForm.Input = function FormInput({ children, ...restProps }) {
    function setHadValue(target) {
        target.dataset['hadValue'] = target.value.length > 0 ? 1 : 0;
    }

    function onFocus({ target }) {
        setHadValue(target);
    }

    function onKeyUp({ target, key }) {
        // Only move if actual letter/number pressed
        if (
            key === 'Backspace' &&
            target.value.length === 0 &&
            0 === +target.dataset['hadValue'] &&
            target.previousSibling
        ) {
            target.previousSibling.focus();
        }

        // Store prev value
        setHadValue(target);

        if (key.length !== 1) return;
        if (target.nextSibling) target.nextSibling.focus();
    }

    return (
        <Input {...restProps} onFocus={onFocus} onKeyUp={onKeyUp} pattern='[a-zA-Z0-9]' maxlength='1' type='password'>
            {children}
        </Input>
    );
};

SignInForm.Submit = function FormSubmit({ children, ...restProps }) {
    return <Button {...restProps}>{children}</Button>;
};
