const url =
  'https://newsapi.org/v2/everything?q=sports&apiKey=79af8a0825ba4443adf9c1f76f8913cb';

export const getNews = async (page, currentTime) => {
  let updatedURL = `${url}&page=${page}`;
  if (currentTime) updatedURL = `${url}&from=${currentTime}`;
  const result = await fetch(updatedURL).then(response => response.json());
  return result;
};
