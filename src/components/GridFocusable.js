import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import GridContainer from './GridContainer';

const GridFocusable = withFocusable({
    trackChildren: true,
})(GridContainer);
export default GridFocusable;
