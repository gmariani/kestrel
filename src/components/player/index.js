import React from 'react';
import { Button } from '../';
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

export default function Player({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}

Player.Header = function PlayerHeader({ children, ...restProps }) {
    return <Header {...restProps}>{children}</Header>;
};
Player.Buffer = function PlayerBuffer({ visible = false, ...restProps }) {
    return (
        <BufferContainer visible={visible} {...restProps}>
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
                                repeatCount='indefinite'></animateTransform>
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
                                repeatCount='indefinite'></animateTransform>
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
                                repeatCount='indefinite'></animateTransform>
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
                                repeatCount='indefinite'></animateTransform>
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
                                repeatCount='indefinite'></animateTransform>
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
                                repeatCount='indefinite'></animateTransform>
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
                                repeatCount='indefinite'></animateTransform>
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
                                repeatCount='indefinite'></animateTransform>
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
                                repeatCount='indefinite'></animateTransform>
                        </rect>
                    </g>
                </svg>
            </Buffer>
        </BufferContainer>
    );
};
Player.Footer = function PlayerFooter({ children, ...restProps }) {
    return <Footer {...restProps}>{children}</Footer>;
};
Player.PlayPause = function PlayerPlayPause({ playing = false, style, onClick }) {
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
Player.Timer = function PlayerTimer({ children, ...restProps }) {
    return <Timer {...restProps}>{children}</Timer>;
};
Player.End = function PlayerEnd({ children, ...restProps }) {
    return <EndContainer {...restProps}>{children}</EndContainer>;
};
Player.EndDetails = function PlayerEndDetails({ children, ...restProps }) {
    return <EndDetails {...restProps}>{children}</EndDetails>;
};
Player.EndTitle = function PlayerEndTitle({ children, ...restProps }) {
    return <EndTitle>{children}</EndTitle>;
};
Player.EndSubTitle = function PlayerEndSubTitle({ children, episodeIndex = 0, episode = null, ...restProps }) {
    return episode ? (
        <EndSubTitle>
            {padNumber(episodeIndex + 1)} - {episode.name}
        </EndSubTitle>
    ) : null;
};

Player.Preview = function PlayerPreview({ children, episodeIndex = 0, nextEpisode = null, ...restProps }) {
    return nextEpisode ? (
        <Preview {...restProps}>
            <PreviewThumbnail src={nextEpisode.thumbnail} />
            <PreviewTitle>
                Next: {padNumber(episodeIndex + 2)} - {nextEpisode.name}
            </PreviewTitle>
        </Preview>
    ) : null;
};
