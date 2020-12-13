import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Container = styled.div`
    align-items: center;
    display: ${({ visible }) => (visible ? 'flex' : 'none')};
    height: 100%;
    justify-content: center;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
`;

const Squares = styled.div`
    color: white;
`;

const propTypes = {
    visible: PropTypes.bool,
};

function Loading({ visible = false }) {
    return (
        <Container visible={visible}>
            <Squares>
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
            </Squares>
        </Container>
    );
}

Loading.propTypes = propTypes;
export default Loading;
