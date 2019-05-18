const dataAccess = (function() {
  const engineAPI = ({
    url,
    method = "GET",
    body = null,
    handleError = "Error: "
  }) => {
    return fetch(url, {
        method: method,
        body: body,
      })
      .then(response => response.json())
      .then(data => data)
      .catch(err => handleError(err));

  };
  return {
    engineAPI: engineAPI
  };
})();