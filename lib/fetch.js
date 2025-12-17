import fetch from 'isomorphic-unfetch';

export default async (query, variables) => {
  const API = `http://cos8s8k8w0oksck0skkgcg40.62.72.13.4.sslip.io/graphql`;
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
