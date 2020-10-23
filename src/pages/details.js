import React from 'react';
import { useParams } from 'react-router-dom';
import { Background, Row, Detail, Seasons, Episodes } from '../components';
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
    const padNumber = function (num) {
        return num.toString().padStart(2, '0');
    };

    const foundMeta = findMeta(media, mediaId);
    const item = foundMeta.length ? foundMeta[0] : null;
    const currentSeason = 0;
    const currentEpisode = 0;
    const episodes = item ? item.seasons[currentSeason].episodes : [];
    console.log(episodes);

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
            <Row>
                <Seasons seasons={item.seasons} selected={currentSeason} />
                <Detail>
                    <Detail.Meta>
                        <Detail.Year>{item.year}</Detail.Year>
                        <Detail.EpisodeCount>
                            {padNumber(currentEpisode + 1)} - {padNumber(item.seasons[currentSeason].episodeCount)}
                        </Detail.EpisodeCount>
                    </Detail.Meta>
                    <Detail.Genres>{item.genres.join(', ')}</Detail.Genres>
                    <Detail.Title>{item.name}</Detail.Title>
                    <Detail.ProgressBar />
                    <Detail.Controls>
                        <Detail.Continue>Continue</Detail.Continue>
                        <Detail.Restart>Restart</Detail.Restart>
                    </Detail.Controls>
                </Detail>
                <Episodes>
                    {episodes.map((episode, i) => {
                        const episodeIndex = padNumber(i + 1);
                        const isSelected = currentEpisode === i ? 1 : 0;
                        return <Episodes.Episode key={i} isSelected={isSelected} index={episodeIndex} data={episode} />;
                    })}
                </Episodes>
            </Row>
        </Background>
    );
}
