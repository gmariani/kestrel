import React from 'react';
import PropTypes from 'prop-types';

import {
    Container,
    Overlay,
    Preview,
    PreviewThumbnail,
    PreviewTitle,
    EndContainer,
    EndDetails,
    EndTitle,
    EndSubTitle,
} from './styles/player';
import { padNumber } from '../../utils';

export default function Player({ onMouseMove, onKeyDown, tabIndex, children }) {
    return (
        <Container onMouseMove={onMouseMove} onKeyDown={onKeyDown} tabIndex={tabIndex}>
            {children}
        </Container>
    );
}
Player.propTypes = {
    onMouseMove: PropTypes.func,
    onKeyDown: PropTypes.func,
    tabIndex: PropTypes.string,
    children: PropTypes.node,
};

Player.Overlay = function PlayerOverlay({ children }) {
    return <Overlay>{children}</Overlay>;
};
Player.Overlay.propTypes = {
    children: PropTypes.node,
};

Player.End = function PlayerEnd({ children }) {
    return <EndContainer>{children}</EndContainer>;
};
Player.End.propTypes = {
    children: PropTypes.node,
};
Player.End.defaultProps = {
    children: null,
};

Player.EndDetails = function PlayerEndDetails({ children }) {
    return <EndDetails>{children}</EndDetails>;
};
Player.EndDetails.propTypes = {
    children: PropTypes.node,
};
Player.EndDetails.defaultProps = {
    children: null,
};

Player.EndTitle = function PlayerEndTitle({ children }) {
    return <EndTitle>{children}</EndTitle>;
};
Player.EndTitle.propTypes = {
    children: PropTypes.node,
};
Player.EndTitle.defaultProps = {
    children: null,
};

Player.EndSubTitle = function PlayerEndSubTitle({ episodeIndex = 0, episode = null }) {
    return episode ? (
        <EndSubTitle>
            {padNumber(episodeIndex + 1)} - {episode.name}
        </EndSubTitle>
    ) : null;
};
Player.EndSubTitle.propTypes = {
    episodeIndex: PropTypes.number,
    episode: PropTypes.shape({
        name: PropTypes.string,
    }),
};
Player.EndSubTitle.defaultProps = {
    episodeIndex: 0,
    episode: null,
};

Player.Preview = function PlayerPreview({ episodeIndex = 0, nextEpisode = null }) {
    return nextEpisode ? (
        <Preview>
            <PreviewThumbnail src={nextEpisode.thumbnail} />
            <PreviewTitle>
                Next: {padNumber(episodeIndex + 2)} - {nextEpisode.name}
            </PreviewTitle>
        </Preview>
    ) : null;
};
Player.Preview.propTypes = {
    episodeIndex: PropTypes.number,
    nextEpisode: PropTypes.shape({
        name: PropTypes.string,
        thumbnail: PropTypes.string,
    }),
};
Player.Preview.defaultProps = {
    episodeIndex: 0,
    nextEpisode: null,
};
