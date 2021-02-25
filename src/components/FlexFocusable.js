import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import FlexContainer from './FlexContainer';

const FlexFocusable = withFocusable({
    trackChildren: true,
})(FlexContainer);
export default FlexFocusable;
