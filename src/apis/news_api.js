import { HOST, TOKEN } from "../variables";

export const getAllNews = () => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(`${HOST}/display/news`, requestOptions).then(handleResponse);
};

const handleResponse = (response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};
