import React from 'react';
import { useParams } from 'react-router-dom';
import { Background, Detail } from '../components';
import { useContent } from '../hooks';
import { HeaderContainer } from '../containers/header';

export default function Details() {
    const { content: media } = useContent('media');
    const { mediaId } = useParams();
    const findMeta = (media, mediaId) => {
        return media.filter((poster) => {
            return mediaId === poster.docId;
        });
    };
    const foundMeta = findMeta(media, mediaId);
    const item = foundMeta.length ? foundMeta[0] : null;

    console.log(item);
    const currentSeason = 0;
    const currentEpisode = 1;

    const padNumber = function (num) {
        console.log(num);
        return num.toString().padStart(2, '0');
    };

    return !item ? (
        <div>Loading...</div>
    ) : (
        <Background
            hasShadow={true}
            opacityShadow={0.9}
            hasColor={false}
            hasImage={true}
            imagePath={item.backgroundPath}
            opacity={1}>
            <HeaderContainer />
            <Detail>
                <Detail.Seasons seasons={item.seasons} selected={currentSeason} />
                <Detail.Information>
                    <Detail.Year>{item.year}</Detail.Year>
                    <Detail.EpisodeCount>
                        {padNumber(currentEpisode)}-{padNumber(item.seasons[currentSeason].episodeCount)}
                    </Detail.EpisodeCount>
                    <Detail.EpisodeGenre>{item.genres.join(', ')}</Detail.EpisodeGenre>
                    <Detail.EpisodeTitle>{item.name}</Detail.EpisodeTitle>
                </Detail.Information>
                <Detail.Episodes />
            </Detail>
        </Background>
    );
}
