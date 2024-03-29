import { useRouter } from "next/router";
import MediaDetails from "../../components/MediaDetails";
import { getTrandingMedia } from "../../lib/apiTmdb";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { gql } from "@apollo/client";
import { client } from "../../lib/graphql/client";

export default function Movie({
  data,
  videos,
  similarMedia,
  mediaRecommendations,
}) {
  const Router = useRouter();
  const { media } = Router.query;

  const { isFallback } = Router;

  useEffect(() => {
    if (media) {
      // Armazena a media atual no historico do localStorage

      let watched =
        JSON.parse(window.localStorage.getItem("medias_watched")) || [];

      const dateNow = Date.now();

      if (!watched?.some((e) => e.id == data.id)) {
        watched.unshift({
          id: `${data.id}`,
          media_type: media,
          name: data.title || data.name,
          date: dateNow,
        });

        localStorage.setItem("medias_watched", JSON.stringify(watched));
      } else {
        const array_id = watched.findIndex((e) => e.id == data.id);
        watched.splice(array_id, 1);

        watched.unshift({
          id: `${data.id}`,
          media_type: media,
          name: data.title || data.name,
          date: dateNow,
        });

        localStorage.setItem("medias_watched", JSON.stringify(watched));
      }

      if (watched.length > 15) watched.pop();
    }
  });

  if (isFallback)
    return (
      <div className="flex items-center w-full h-screen justify-center">
        <CircularProgress />
      </div>
    );

  return (
    <>
      <NextSeo
        title={data.title || data.name}
        description={data.overview}
        facebook={{
          appId: "1234567890",
        }}
        openGraph={{
          title: data.title || data.name,
          description: data.overview,

          images: [
            {
              url: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
              alt: data.title || data.name,
              width: 500,
              height: 750,
            },
          ],
        }}
      />
      <MediaDetails
        mediaRecommendations={mediaRecommendations}
        type={media}
        data={data}
        videos={videos}
        similarMedia={similarMedia}
      />
    </>
  );
}

export async function getStaticPaths() {
  const trendingTv = await getTrandingMedia("tv");
  const trendingMovie = await getTrandingMedia("movie");

  const paths = await trendingTv
    .map((e) => ({
      params: { media: "tv", id: `${e.id}` },
    }))
    .concat(
      trendingMovie.map((e) => ({
        params: { media: "movie", id: `${e.id}` },
      }))
    );

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { media, id } = params;

  const { data: props } = await client.query({
    query: gql`
          query{

            data: media(id: ${id}, media_type: "${media}") {
                id
                name
                imdb_id
                poster_path
                backdrop_path
                vote_average
                release_date
                overview
                runtime
                genres {
                  name
                  id
                }
                cast {
                    name
                    id
                    profile_path
                }
              }
              videos: mediaVideos(id: ${id}, media_type: "${media}") {
                key
                name
                site
              }
              mediaRecommendations(id: ${id}, media_type: "${media}") {
                id
                name
                poster_path
                media_type
                vote_average
              }
              similarMedia(id: ${id}, media_type: "${media}") {
                id
                name
                poster_path
                media_type
                vote_average
              }
        }
        `,
  });

  return {
    props,
    revalidate: 60 * 60 * 24 * 31,
  };
}
