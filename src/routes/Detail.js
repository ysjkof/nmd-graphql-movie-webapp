/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      language
      rating
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;
const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;
const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;
const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;
const Description = styled.p`
  font-size: 28px;
`;
const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

export default () => {
  const { id } = useParams();
  // 아래 variables는 위의 GET_MOVIE에 $id를 주는 거다.
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  return (
    <Container>
      <Column>
        {/* 아래 로딩에서 삼항연산자를 쓰지 않고 data.movie.title를 하면 로딩 중에 data가 없기 때문에 에러난다. 항상 삼항연산자 사용! */}
        <Title>{loading ? "Loading..." : `${data.movie.title} ${data.movie.isLiked ? "💖" : "😞"}`}</Title>
        <Subtitle>
          {data?.movie?.language} · {data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      {/* optional chaining == data있어? 있으면 movie있어? 있으면 medium~ 있어? ㄱㄱ. 없으면 거기서 중단됨. */}
      <Poster bg={data?.movie?.medium_cover_image}></Poster>
      {data && data.suggestions && data.suggestions.map((s) => <div key={s.id} id={s.id} bg={s.medium_cover_image} />)}
    </Container>
  );
};
