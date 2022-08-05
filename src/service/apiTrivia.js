export const apiTriviaToken = async () => {
  const urlToken = 'https://opentdb.com/api_token.php?command=request';
  const responseToken = await fetch(urlToken);
  const token = await responseToken.json();
  return token.token;
};

export const apiTrivia = async () => {
  // const five = 5;
  // const urlTrivia = `https://opentdb.com/api.php?amount=${five}&token=${token}`;
  // const responseApi = await fetch(urlTrivia);
  // const objTrivia = await responseApi.json();
};
