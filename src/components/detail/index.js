import React from 'react';
import { Button } from '../../components';
import { Container, Controls, Meta, Title, Description } from './styles/detail';

export default function Detail({ children, ...restProps }) {
    return <Container>{children}</Container>;
}

Detail.Meta = function DetailMeta({ children, ...restProps }) {
    return <Meta {...restProps}>{children}</Meta>;
};
Detail.Title = function DetailTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
};
Detail.Description = function DetailDescription({ children, ...restProps }) {
    return <Description {...restProps}>{children}</Description>;
};
Detail.Controls = function DetailControls({ children, ...restProps }) {
    return <Controls {...restProps}>{children}</Controls>;
};
Detail.Continue = function DetailContinue({ children, ...restProps }) {
    return <Button {...restProps}>{children}</Button>;
};
Detail.Restart = function DetailRestart({ children, ...restProps }) {
    return <Button {...restProps}>{children}</Button>;
};
Detail.Play = function DetailPlay({ children, ...restProps }) {
    return <Button {...restProps}>{children}</Button>;
};
