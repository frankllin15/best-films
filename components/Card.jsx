import React from 'react'
import styled from 'styled-components'

const Item = styled.div`
    width: 200px;
    /* margin: 0 0px 0; */
    &:hover{
        transition: 400ms;
        transform: scale(1.04);
    }

    @media(max-width: 480px) {
        width: 100px;
    }
   
`
const Img = styled.img`
    border-radius: 4px;
    width: 200px;
    -webkit-box-shadow: 5px 5px 12px 2px rgba(0,0,0,0.51); 
box-shadow: 5px 5px 12px 2px rgba(0,0,0,0.51);
@media(max-width: 480px) {
        width: 99px;
    }
`
const Title = styled.h3`
    text-align: center;

    a{
        text-decoration: none;
        color: #c4c4c4;

        &:hover {
            transition: 300ms;
            color: greenyellow;
        }
    }

    @media(max-width: 480px) {
        font-size: .8rem;
    }
`

export default function Card({id, item, media_type}) {
    return (
        <Item >
        {/* {console.log(item)} */}
        <Img src={`https://image.tmdb.org/t/p/w500//${item.poster_path}`} />
        <Title><a href={`/${item.media_type || media_type}/${item.id}`}>{item.title ? item.title: item.name}</a></Title>
    </Item>
    )
}
