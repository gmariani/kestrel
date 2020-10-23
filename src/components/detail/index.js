import React from 'react';
import { Button } from '../../components';
import { Container, Controls, ProgressBar, Meta, Year, EpisodeCount, Genres, Title } from './styles/detail';

export default function Detail({ children, ...restProps }) {
    return <Container>{children}</Container>;
}

Detail.Meta = function DetailMeta({ children, ...restProps }) {
    return <Meta {...restProps}>{children}</Meta>;
};
Detail.Year = function DetailYear({ children, ...restProps }) {
    return <Year {...restProps}>{children}</Year>;
};
Detail.EpisodeCount = function DetailEpisodeCount({ children, ...restProps }) {
    return <EpisodeCount {...restProps}>{children}</EpisodeCount>;
};
Detail.Genres = function DetailGenres({ children, ...restProps }) {
    return <Genres {...restProps}>{children}</Genres>;
};
Detail.Title = function DetailTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>;
};
Detail.ProgressBar = function DetailProgressBar({ children, ...restProps }) {
    return <ProgressBar {...restProps}>{children}</ProgressBar>;
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
