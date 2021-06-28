export const isObjEmpty = (request) => {
  for (let key in request) {
    if (request[key] === "" || request[key] === null || request[key] === 0)
      return false;
  }
  return true;
};
