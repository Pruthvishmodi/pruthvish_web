import fetch from 'isomorphic-unfetch';

export default async (query, variables) => {
  const API = `https://pruthvish.openstackhub.com/graphql`;
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const json = await res.json();
  return json.data;
};
