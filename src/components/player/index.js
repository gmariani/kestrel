import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import {
    Container,
    Header,
    Footer,
    BufferContainer,
    Buffer,
    Timer,
    Icon,
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

Player.Header = function PlayerHeader({ children }) {
    return <Header>{children}</Header>;
};
Player.Header.propTypes = {
    children: PropTypes.node,
};

Player.Buffer = function PlayerBuffer({ visible = false }) {
    return (
        <BufferContainer visible={visible}>
            <Buffer>
                <svg
                    width='77px'
                    height='77px'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 100 100'
                    preserveAspectRatio='xMidYMid'>
                    <g transform='translate(20 20)'>
                        <rect x='-15' y='-15' width='30' height='30' fill='#fff' transform='scale(0.868024 0.868024)'>
                            <animateTransform
                                attributeName='transform'
                                type='scale'
                                calcMode='spline'
                                values='1;1;0.2;1;1'
                                keyTimes='0;0.2;0.5;0.8;1'
                                dur='1s'
                                keySplines='0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5'
                                begin='-0.4s'
                                repeatCount='indefinite'
                            />
                        </rect>
                    </g>
                    <g transform='translate(50 20)'>
                        <rect x='-15' y='-15' width='30' height='30' fill='#fff' transform='scale(0.58394 0.58394)'>
                            <animateTransform
                                attributeName='transform'
                                type='scale'
                                calcMode='spline'
                                values='1;1;0.2;1;1'
                                keyTimes='0;0.2;0.5;0.8;1'
                                dur='1s'
                                keySplines='0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5'
                                begin='-0.3s'
                                repeatCount='indefinite'
                            />
                        </rect>
                    </g>
                    <g transform='translate(80 20)'>
                        <rect x='-15' y='-15' width='30' height='30' fill='#fff' transform='scale(0.332594 0.332594)'>
                            <animateTransform
                                attributeName='transform'
                                type='scale'
                                calcMode='spline'
                                values='1;1;0.2;1;1'
                                keyTimes='0;0.2;0.5;0.8;1'
                                dur='1s'
                                keySplines='0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5'
                                begin='-0.2s'
                                repeatCount='indefinite'
                            />
                        </rect>
                    </g>
                    <g transform='translate(20 50)'>
                        <rect x='-15' y='-15' width='30' height='30' fill='#fff' transform='scale(0.58394 0.58394)'>
                            <animateTransform
                                attributeName='transform'
                                type='scale'
                                calcMode='spline'
                                values='1;1;0.2;1;1'
                                keyTimes='0;0.2;0.5;0.8;1'
                                dur='1s'
                                keySplines='0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5'
                                begin='-0.3s'
                                repeatCount='indefinite'
                            />
                        </rect>
                    </g>
                    <g transform='translate(50 50)'>
                        <rect x='-15' y='-15' width='30' height='30' fill='#fff' transform='scale(0.332594 0.332594)'>
                            <animateTransform
                                attributeName='transform'
                                type='scale'
                                calcMode='spline'
                                values='1;1;0.2;1;1'
                                keyTimes='0;0.2;0.5;0.8;1'
                                dur='1s'
                                keySplines='0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5'
                                begin='-0.2s'
                                repeatCount='indefinite'
                            />
                        </rect>
                    </g>
                    <g transform='translate(80 50)'>
                        <rect x='-15' y='-15' width='30' height='30' fill='#fff' transform='scale(0.255226 0.255226)'>
                            <animateTransform
                                attributeName='transform'
                                type='scale'
                                calcMode='spline'
                                values='1;1;0.2;1;1'
                                keyTimes='0;0.2;0.5;0.8;1'
                                dur='1s'
                                keySplines='0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5'
                                begin='-0.1s'
                                repeatCount='indefinite'
                            />
                        </rect>
                    </g>
                    <g transform='translate(20 80)'>
                        <rect x='-15' y='-15' width='30' height='30' fill='#fff' transform='scale(0.332594 0.332594)'>
                            <animateTransform
                                attributeName='transform'
                                type='scale'
                                calcMode='spline'
                                values='1;1;0.2;1;1'
                                keyTimes='0;0.2;0.5;0.8;1'
                                dur='1s'
                                keySplines='0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5'
                                begin='-0.2s'
                                repeatCount='indefinite'
                            />
                        </rect>
                    </g>
                    <g transform='translate(50 80)'>
                        <rect x='-15' y='-15' width='30' height='30' fill='#fff' transform='scale(0.255226 0.255226)'>
                            <animateTransform
                                attributeName='transform'
                                type='scale'
                                calcMode='spline'
                                values='1;1;0.2;1;1'
                                keyTimes='0;0.2;0.5;0.8;1'
                                dur='1s'
                                keySplines='0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5'
                                begin='-0.1s'
                                repeatCount='indefinite'
                            />
                        </rect>
                    </g>
                    <g transform='translate(80 80)'>
                        <rect x='-15' y='-15' width='30' height='30' fill='#fff' transform='scale(0.496586 0.496586)'>
                            <animateTransform
                                attributeName='transform'
                                type='scale'
                                calcMode='spline'
                                values='1;1;0.2;1;1'
                                keyTimes='0;0.2;0.5;0.8;1'
                                dur='1s'
                                keySplines='0.5 0.5 0.5 0.5;0 0.1 0.9 1;0.1 0 1 0.9;0.5 0.5 0.5 0.5'
                                begin='0s'
                                repeatCount='indefinite'
                            />
                        </rect>
                    </g>
                </svg>
            </Buffer>
        </BufferContainer>
    );
};
Player.Buffer.propTypes = {
    visible: PropTypes.bool,
};

Player.Footer = function PlayerFooter({ children }) {
    return <Footer>{children}</Footer>;
};
Player.Footer.propTypes = {
    children: PropTypes.node,
};

Player.PlayPause = function PlayerPlayPause({ playing = false, buffering = false, onClick }) {
    const style = { opacity: buffering ? 0.5 : 1 };
    return playing ? (
        <Button className='player' theme='secondary' style={style} onClick={onClick}>
            <Icon width='100%' height='100%' style={{ marginTop: '-35px' }} viewBox='0 0 519.479 519.479'>
                <path d='M193.441,0h-75.484c-16.897,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484c16.897,0,30.6-13.703,30.6-30.602V30.6C224.042,13.703,210.339,0,193.441,0z' />
                <path d='M401.521,0h-75.484c-16.896,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484c16.896,0,30.6-13.703,30.6-30.602V30.6C432.121,13.703,418.418,0,401.521,0z' />
            </Icon>
        </Button>
    ) : (
        <Button className='player' theme='secondary' onClick={onClick} style={style}>
            <Icon width='100%' height='100%' y='-163' style={{ marginTop: '-35px' }} viewBox='0 0 163.861 163.861'>
                <path d='M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z' />
            </Icon>
        </Button>
    );
};
Player.PlayPause.propTypes = {
    playing: PropTypes.bool,
    buffering: PropTypes.bool,
    onClick: PropTypes.func,
};

Player.Timer = function PlayerTimer({ children }) {
    return <Timer>{children}</Timer>;
};
Player.Timer.propTypes = {
    children: PropTypes.node,
};
Player.Timer.defaultProps = {
    children: null,
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
