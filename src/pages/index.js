import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

const Page = ({ serverData: { date, explanation, title, url, gatsbyImage } }) => {
  return (
    <main>
      <small>{new Date(date).toLocaleDateString()}</small>
      <h1>{title}</h1>
      <p>{explanation}</p>
      <GatsbyImage image={gatsbyImage} alt={title} backgroundColor="#242225" />
    </main>
  );
};

export default Page;

export async function getServerData() {
  const probe = require('probe-image-size');
  const {
    gatsbyImageResolver
  } = require('gatsby-plugin-utils/dist/polyfill-remote-file/graphql/gatsby-image-resolver');

  const data = await (await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`)).json();

  const image = await probe(data.url);

  const gatsbyImage = await gatsbyImageResolver(
    {
      url: image.url,
      mimeType: image.mime,
      width: image.width,
      height: image.height,
      filename: `${data.title}-image`
    },
    {
      width: 400,
      layout: 'constrained',
      placeholder: 'none',
      quality: 10
    }
  );

  return {
    status: 200,
    props: {
      ...data,
      gatsbyImage
    },
    headers: {}
  };
}
