import React from 'react';
import { VersionText } from './styles/version';

export default function Version({ ...restProps }) {
    return <VersionText {...restProps}>Mariani 2020 - 1.0.0</VersionText>;
}
