import { withFocusable } from '@noriginmedia/react-spatial-navigation';
import FlexRow from './FlexRow';

const FlexRowFocusable = withFocusable({
    trackChildren: true,
})(FlexRow);
export default FlexRowFocusable;
