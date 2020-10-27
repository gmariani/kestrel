import React from 'react';
import { Track, Bar } from './styles/progressbar';

export default function ProgressBar({ children, width = 100, height = 5, value = 0, ...restProps }) {
    return (
        <Track width={width} height={height} {...restProps}>
            <Bar value={value} height={height} />
        </Track>
    );
}
