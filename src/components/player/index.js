import React from 'react';
import { Button } from '../';
import { Container, Header, Footer, Timer, Icon } from './styles/player';

export default function Player({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
}

Player.Header = function PlayerHeader({ children, ...restProps }) {
    return <Header {...restProps}>{children}</Header>;
};
Player.Footer = function PlayerFooter({ children, ...restProps }) {
    return <Footer {...restProps}>{children}</Footer>;
};
Player.PlayPause = function PlayerPlayPause({ playing = false, onClick }) {
    return playing ? (
        <Button className='player' btnStyle='secondary' onClick={onClick}>
            <Icon width='100%' height='100%' style={{ marginTop: '-35px' }} viewBox='0 0 519.479 519.479'>
                <path d='M193.441,0h-75.484c-16.897,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484c16.897,0,30.6-13.703,30.6-30.602V30.6C224.042,13.703,210.339,0,193.441,0z' />
                <path d='M401.521,0h-75.484c-16.896,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484c16.896,0,30.6-13.703,30.6-30.602V30.6C432.121,13.703,418.418,0,401.521,0z' />
            </Icon>
        </Button>
    ) : (
        <Button className='player' btnStyle='secondary' onClick={onClick}>
            <Icon width='100%' height='100%' y='-163' style={{ marginTop: '-35px' }} viewBox='0 0 163.861 163.861'>
                <path d='M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z' />
            </Icon>
        </Button>
    );
};
Player.Timer = function PlayerTimer({ children, ...restProps }) {
    return <Timer {...restProps}>{children}</Timer>;
};
