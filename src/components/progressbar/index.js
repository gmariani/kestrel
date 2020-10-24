import React from 'react';
import { Track, Bar } from './styles/progressbar';

export default function ProgressBar({ children, value = 0, ...restProps }) {
    return (
        <Track>
            <Bar value={value} />
        </Track>
    );
}
