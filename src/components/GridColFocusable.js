import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import GridCol from './GridCol';

const GridColFocusable = withFocusable({
    trackChildren: true,
})(GridCol);
export default GridColFocusable;
