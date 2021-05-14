import { HOST, TOKEN } from "../variables";

export const getDelijn = (haltes, amount) => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(
    `${HOST}/display/delijn?path=` +
      encodeURIComponent(
        `/rise-api-core/haltes/Multivertrekken/${haltes}/${amount}?typeStoring=n1n2`
      ),
    requestOptions
  ).then((response) => response.json());
};
