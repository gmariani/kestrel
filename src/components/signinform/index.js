import React from 'react';
import { Button } from '../../components';
import { LoginForm, InputGroup, InputLetter, Title } from './styles/signinform';

export default function SignInForm({ ...restProps }) {
    function onKeyUp(e) {
        const input = e.currentTarget;
        input.value = input.value.charAt(0);
        if (input.nextSibling) input.nextSibling.focus();
    }
    const getInputs = (num) => {
        let content = [];
        for (let i = 0; i < num; i++) {
            content.push(
                <InputLetter
                    key={i}
                    onKeyUp={onKeyUp}
                    pattern='[a-zA-Z0-9]'
                    max-length='1'
                    type='text'
                    name={`letter${i + 1}`}
                />
            );
        }
        return content;
    };

    return (
        <LoginForm {...restProps} method='POST'>
            <Title>Passcode</Title>
            <InputGroup>{getInputs(7)}</InputGroup>
            <Button btnStyle='primary'>Login</Button>
        </LoginForm>
    );
}
