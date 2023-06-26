import axios from "axios";

export const httpRequests = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };
    

    const source = axios.CancelToken.source();
    options.cancelToken = source.token;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;
    options.data = options.body || undefined;

    if (!options.data) delete options.data;

    setTimeout(() => {
      source.cancel();
    }, 3000);

    return axios(endpoint, options)
      .then((res) => res)
      .catch((error) => {
        if (axios.isCancel(error)) {
          throw new Error("Request canceled");
        } else {
          throw error;
        }
      });
  };

  const get = (url, options) => customFetch(url, options);
  const post = (url, options) => {
    options.method = "POST";
    return customFetch(url, options);
  };
  const put = (url, options) => {
    options.method = "PUT";
    return customFetch(url, options);
  };
  const del = (url, options) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
