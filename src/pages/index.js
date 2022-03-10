import React from 'react';

const Page = ({ serverData: { date, explanation, title, url } }) => {
  return (
    <main>
      <small>{new Date(date).toLocaleDateString()}</small>
      <h1>{title}</h1>
      <p>{explanation}</p>
      <img src={url} alt={title} />
    </main>
  );
};

export default Page;

export async function getServerData() {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);

  const data = await response.json();

  return {
    status: 200,
    props: {
      ...data
    },
    headers: {}
  };
}
