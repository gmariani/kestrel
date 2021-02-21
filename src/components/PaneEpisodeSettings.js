import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import FlexRow from './FlexRow';
import FlexCol from './FlexCol';
import FlexItem from './FlexItem';
import HalfPane from './HalfPane';
import ToggleFocusable from './ToggleFocusable';
import 'react-toggle/style.css';
import mediaInterface from '../interfaces/media';

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

    & .react-toggle.selected {
        box-shadow: 0px 0px 0px 3px white;
        border-radius: 30px;
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
    settings: PropTypes.shape({ subtitles: PropTypes.bool, autoplay: PropTypes.bool }),
    setSettings: PropTypes.func,
    media: mediaInterface,
    onClickBack: PropTypes.func.isRequired,
};

// Actual object to avoid mutable object from invalidating component
const defaultSeries = { year: 0, genres: [], name: 'No Title', description: '' };

function PaneEpisodeSettings({ settings, setSettings, media = defaultSeries, onClickBack }) {
    const { subtitles, autoplay } = settings;
    const [selectedButton, setSelectedButton] = useState('SETTINGS-SUBTITLES');

    function onToggleSubtitles(event) {
        const target = document.getElementById('subtitle-status');
        setSettings({ subtitles: event ? target.checked : !target.checked, autoplay });
    }

    function onToggleAutoplay(event) {
        const target = document.getElementById('autoplay-status');
        setSettings({ subtitles, autoplay: event ? target.checked : !target.checked });
    }

    // On render, listen for tv remote to navigate as well
    useEffect(() => {
        function onKeyDown(event) {
            const { key } = event;
            // keyCode: 27 / key: Escape
            if (key === 'Escape') {
                event.preventDefault();
                onClickBack();
            }
        }

        document.addEventListener('keydown', onKeyDown, false);
        return () => {
            document.removeEventListener('keydown', onKeyDown, false);
        };
    });

    return (
        <HalfPane backgroundHue={media.backgroundHue} initialFocus='SETTINGS-SUBTITLES'>
            <Container>
                <Title>Settings</Title>
                <FlexCol>
                    <FlexRow>
                        <SettingContainer>
                            <SettingTitle htmlFor='subtitle-status'>Subtitles</SettingTitle>
                        </SettingContainer>
                        <FlexItem>
                            <ToggleFocusable
                                focusKey='SETTINGS-SUBTITLES'
                                id='subtitle-status'
                                style={{ height: '25px' }}
                                checked={subtitles}
                                onEnterPress={() => {
                                    console.log('onEnterPress onToggleSubtitles()');
                                    onToggleSubtitles();
                                }}
                                onBecameFocused={() => {
                                    setSelectedButton('SETTINGS-SUBTITLES');
                                    const target = document.getElementById('subtitle-status');
                                    target.focus();
                                }}
                                onChange={onToggleSubtitles}
                                className={`${selectedButton === 'SETTINGS-SUBTITLES' ? 'selected' : ''}`}
                            />
                        </FlexItem>
                    </FlexRow>
                    <FlexRow>
                        <SettingContainer>
                            <SettingTitle htmlFor='autoplay-status'>Autoplay</SettingTitle>
                            <SettingDesc>When you finish a video, another one plays automatically.</SettingDesc>
                        </SettingContainer>
                        <FlexItem>
                            <ToggleFocusable
                                focusKey='SETTINGS-AUTOPLAY'
                                id='autoplay-status'
                                style={{ height: '25px' }}
                                checked={autoplay}
                                onEnterPress={() => {
                                    // console.log('onEnterPress onToggleAutoplay()');
                                    onToggleAutoplay();
                                }}
                                onBecameFocused={() => {
                                    setSelectedButton('SETTINGS-AUTOPLAY');
                                    const target = document.getElementById('autoplay-status');
                                    target.focus();
                                }}
                                onChange={onToggleAutoplay}
                                className={`${selectedButton === 'SETTINGS-AUTOPLAY' ? 'selected' : ''}`}
                            />
                        </FlexItem>
                    </FlexRow>
                </FlexCol>
            </Container>
        </HalfPane>
    );
}

PaneEpisodeSettings.propTypes = propTypes;
export default PaneEpisodeSettings;
