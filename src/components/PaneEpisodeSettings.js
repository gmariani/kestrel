import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import Toggle from 'react-toggle';
import FlexRow from './FlexRow';
import FlexCol from './FlexCol';
import FlexItem from './FlexItem';
import 'react-toggle/style.css';

const Container = styled.div`
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: start;
    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);

    /* Toggle */
    & .react-toggle {
        height: 25px;
    }
`;

const Title = styled.div`
    font-size: 3rem;
    line-height: 3rem;
    margin-bottom: 2rem;
    user-select: none;
`;

const SettingContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const SettingTitle = styled.label`
    font-weight: bold;
`;
const SettingDesc = styled.div`
    font-size: 1.5rem;
`;

const propTypes = {
    subtitles: PropTypes.bool,
    autoplay: PropTypes.bool,
    setSettings: PropTypes.func,
};

function PaneEpisodeSettings({ subtitles, autoplay, setSettings }) {
    // const [settings, setSettings] = useLocalStorage('settings', {
    //     subtitles: true,
    //     autoplay: true,
    // });

    function onToggleSubtitles(event) {
        setSettings({ subtitles: event.target.checked, autoplay });
    }

    function onToggleAutoplay(event) {
        setSettings({ subtitles, autoplay: event.target.checked });
    }

    return (
        <Container>
            <Title>Settings</Title>
            <FlexCol>
                <FlexRow>
                    <SettingContainer>
                        <SettingTitle htmlFor='subtitle-status'>Subtitles</SettingTitle>
                    </SettingContainer>
                    <FlexItem>
                        <Toggle
                            id='subtitle-status'
                            style={{ height: '25px' }}
                            defaultChecked={subtitles}
                            onChange={onToggleSubtitles}
                        />
                    </FlexItem>
                </FlexRow>
                <FlexRow>
                    <SettingContainer>
                        <SettingTitle htmlFor='autoplay-status'>Autoplay</SettingTitle>
                        <SettingDesc>When you finish a video, another one plays automatically.</SettingDesc>
                    </SettingContainer>
                    <FlexItem>
                        <Toggle
                            id='autoplay-status'
                            style={{ height: '25px' }}
                            defaultChecked={autoplay}
                            onChange={onToggleAutoplay}
                        />
                    </FlexItem>
                </FlexRow>
            </FlexCol>
        </Container>
    );
}

PaneEpisodeSettings.propTypes = propTypes;
export default PaneEpisodeSettings;
