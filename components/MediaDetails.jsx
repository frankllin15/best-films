import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getMediaById, getDetails, getMediaVideos, getSimilarMedia } from '../lib/apiTmdb'
import TabPanel from './TabPanel'
import MultiCarousel from './MultiCarousel'
import { Title } from './styles'
import { useThemeContext } from '../context/ThemeStore'
import MediaInfos from './MediaInfos'

const Container = styled.div`
    display: flex;
    flex-direction: column;

`

const GridContainer = styled.div`
    padding-top: 12px;
    padding-left: 8px;
    margin-bottom: 1em;

    /* @media(max-width:480px) {
        display: grid;
        grid-grid-template-rows: 1fr 2fr 1fr;
        width: 100%;
    } */
    /* Tablets */
    @media(min-width:935px) {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        width: 100%;
        }
    /* Desktop */
    @media(min-width:1025px) {

    }
`
const GridItem = styled.section`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    cursor: default;
    /* height: 3000px; */

    dt {
        color: #fff;
        margin: 1rem 0 1rem;
    }

`

const Float = styled.div`
    position: sticky;
    top: 100px;
    margin: 0 auto 0;
    display: flex;
    flex-direction: column;
`

const Img = styled.img`
    border-radius: 8px;
    width: 260px;
    -webkit-box-shadow: 5px 7px 11px 5px rgba(0,0,0,0.67); 
box-shadow: 5px 7px 11px 5px rgba(0,0,0,0.67);

    @media(max-width: 480px) {
        width: 198px;
        margin-top: 12px;
    }
`

export default function MediaDetails({ data, videos, similarMedia, type, mediaRecommendations }) {

    const { setBgImage, isMediaQueryMd } = useThemeContext()

    useEffect(() => {
        if (data)
            setBgImage(`https://image.tmdb.org/t/p/w1280//${data.backdrop_path}`)
    }, [data])

    if (data)
        return (
            <Container>

                <GridContainer>
                    <GridItem>
                        <Float>
                            <Img src={`https://image.tmdb.org/t/p/w500//${data.poster_path}`} />
                        </Float>
                    </GridItem>
                    <GridItem>
                        <h1>{data.title ? data.title : data.name} <span style={{ color: '#5e5e5e' }}>({(data.release_date ? data.release_date : data.first_air_date).substring(0, 4)})</span></h1>
                        <TabPanel similarMedia={similarMedia} videos={videos} data={data} imdb_id={data.imdb_id || data.external_ids.imdb_id} type={type} />

                    </GridItem>
                    <GridItem >
                        {!isMediaQueryMd ?
                            <MediaInfos data={data} />
                            :
                            ""
                        }

                    </GridItem>

                </GridContainer>
                {mediaRecommendations.length > 0 ?
                    <>
                        <Title>Talvez você goste</Title>
                        <MultiCarousel data={mediaRecommendations} />
                    </>
                    :
                    ""
                }
                {similarMedia.length > 0 ?
                    <>
                        <Title>Similares</Title>
                        <MultiCarousel data={similarMedia} type={type} />
                    </>
                    :
                    ""
                }
            </Container>

        )
    else
        return ""
}
