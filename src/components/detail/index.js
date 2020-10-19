import React from 'react';
import {
    Container,
    Seasons,
    SeasonTitle,
    SeasonBar,
    Info,
    Episodes,
    ProgressBar,
    Thumbnail,
    Episode,
    EpisodeMeta,
    EpisodeTitle,
    EpisodeCounter,
    EpisodeTimer,
} from './styles/detail';

export default function Detail({ children, ...restProps }) {
    return <Container>{children}</Container>;
}

Detail.Seasons = function DetailSeasons({ children, seasons, ...restProps }) {
    seasons.push({ name: 'season 2' });
    return (
        <Seasons {...restProps}>
            {seasons.map((season, i) => {
                return <Detail.SeasonTitle key={i}>{season.name}</Detail.SeasonTitle>;
            })}
            <SeasonBar />
        </Seasons>
    );
};

Detail.SeasonTitle = function DetailSeasonTitle({ children, ...restProps }) {
    return (
        <SeasonTitle {...restProps}>
            <div>{children}</div>
        </SeasonTitle>
    );
};

Detail.Episode = function DetailEpisode({ children, data, ...restProps }) {
    return (
        <Episode {...restProps}>
            <Thumbnail />
            <EpisodeMeta>
                <EpisodeCounter>Episode 01</EpisodeCounter>
                <EpisodeTimer>15m left</EpisodeTimer>
            </EpisodeMeta>
            <EpisodeTitle>asdf</EpisodeTitle>
            <ProgressBar />
        </Episode>
    );
};

Detail.Information = function DetailInfo({ children, ...restProps }) {
    return <Info {...restProps}>{children}</Info>;
};
Detail.Year = function DetailYear({ children, ...restProps }) {
    return <div {...restProps}>{children}</div>;
};
Detail.EpisodeCount = function DetailEpisodeCount({ children, ...restProps }) {
    return <div {...restProps}>{children}</div>;
};
Detail.EpisodeGenre = function DetailEpisodeGenre({ children, ...restProps }) {
    return <div {...restProps}>{children}</div>;
};
Detail.EpisodeTitle = function DetailEpisodeTitle({ children, ...restProps }) {
    return <div {...restProps}>{children}</div>;
};
Detail.Episodes = function DetailEpisodes({ children, ...restProps }) {
    return <Episodes {...restProps}>{children}</Episodes>;
};
