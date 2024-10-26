const decodedTokenDTO = (data) => {
  return {
    id: data?.id,
    iat: data?.iat,
    name: data?.name,
  };
};

module.exports = { decodedTokenDTO };
