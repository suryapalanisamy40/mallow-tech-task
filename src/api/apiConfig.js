export const baseURL = "https://reqres.in/api";

const getBaseUrl = (url) => {
  return `${baseURL}${url}`;
};

const getUserToken = () => {
  try {
    const data = JSON.parse(localStorage.getItem("auth")) || [];
    const token = data[0]?.token || "";
    return token;
  } catch (error) {
    console.log("TOKEN ERROR :", error);
  }
};

export function apiReturnCallBack(method, url, object = null, config = null) {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
    "Cache-Control": "no-cache",
    "If-Modified-Since": 0,
    auth: getUserToken(),
  };

  const fetchConfig = {
    method,
    headers,
    ...config,
  };

  if (object) {
    if (method === "FORMPUT" || method === "FORMPOST") {
      fetchConfig.method = "POST";
      fetchConfig.body = object;
      delete fetchConfig.headers["Content-Type"];
      fetchConfig.headers["Content-Type"] = "multipart/form-data";
    } else if (method === "GET") {
      const queryParams = new URLSearchParams(object).toString();
      url += `?${queryParams}`;
    } else if (method === "DELETE") {
      fetchConfig.method = "DELETE";
      if (object) {
        fetchConfig.body = JSON.stringify(object);
      }
    } else {
      fetchConfig.body = JSON.stringify(object);
    }
  }
  return fetch(getBaseUrl(url), fetchConfig);
}
