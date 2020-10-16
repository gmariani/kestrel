import React from 'react';
import { Background, Logo, Version, SignInForm, SignInFooter } from '../components';

export default function SignIn() {
    return (
        <Background>
            <SignInForm />
            <SignInFooter>
                <Logo />
                <Version />
            </SignInFooter>
        </Background>
    );
}
