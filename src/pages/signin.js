import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Background, SignInForm, SecurityCode, Footer } from '../components';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function SignIn() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const emailAddress = 'gmariani405@gmail.com';
    // const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isInvalid = password.length < 8 || emailAddress === '';

    const onChange = (code) => {
        // console.log('onChange', code);
        setPassword(code);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        return firebase
            .auth()
            .signInWithEmailAndPassword(emailAddress, password)
            .then(() => {
                history.push(ROUTES.BROWSE);
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err);
                // setEmailAddress('');
                setPassword('');
                setError(err.message);
            });
    };

    return (
        <Background hasColor opacity={0.8} startColor='#EE6B4D' endColor='rgba(255, 255, 255, 0)'>
            <SignInForm onSubmit={onSubmit} method='POST'>
                <SignInForm.Title>Passcode</SignInForm.Title>
                {error && <SignInForm.Error>{error}</SignInForm.Error>}
                <SecurityCode length={8} onChange={onChange} />
                <Button disabled={isInvalid} type='submit' theme='primary' width='280px'>
                    Login
                </Button>
            </SignInForm>
            <Footer />
        </Background>
    );
}
