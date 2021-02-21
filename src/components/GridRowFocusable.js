import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import GridRow from './GridRow';

const GridRowFocusable = withFocusable({
    trackChildren: true,
})(GridRow);
export default GridRowFocusable;
