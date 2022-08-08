export const apiTriviaToken = async () => {
  const urlToken = 'https://opentdb.com/api_token.php?command=request';
  const responseToken = await fetch(urlToken);
  const token = await responseToken.json();
  return token.token;
};

export const apiTrivia = async () => {
  try {
    const five = 5;
    const three = 3;
    const token = localStorage.getItem('token');
    const urlTrivia = `https://opentdb.com/api.php?amount=${five}&token=${token}`;
    const responseApi = await fetch(urlTrivia);
    const objTrivia = await responseApi.json();
    if (objTrivia.response_code === three) {
      localStorage.removeItem('token');
      throw new Error('Token inválido');
    } else {
      return objTrivia.results;
    }
  } catch (error) {
    console.log(error.message);
  }
};
