import React from 'react';
import { Track, Bar } from './styles/progressbar';

export default function ProgressBar({
    children,
    width = '100',
    height = '5px',
    value = 0,
    theme = 'light',
    ...restProps
}) {
    return (
        <Track width={width} height={height} theme={theme} {...restProps}>
            <Bar value={value} height={height} theme={theme} />
        </Track>
    );
}
