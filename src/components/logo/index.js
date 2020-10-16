import React from 'react';
import { LogoText } from './styles/logo';

export default function Logo({ ...restProps }) {
    return <LogoText {...restProps}>Kestrel</LogoText>;
}
