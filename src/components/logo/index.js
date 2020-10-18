import React from 'react';
import { LogoText, LogoTextSmall } from './styles/logo';

export default function Logo({ ...restProps }) {
    return <LogoText {...restProps}>Kestrel</LogoText>;
}

Logo.Small = function LogoSmall({ children, ...restProps }) {
    return <LogoTextSmall {...restProps}>Kestrel</LogoTextSmall>;
};
