async function apiRequest({ service, body = {}, method = "POST" }: ApiRequest) {
  return await fetch("/api" + service, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "access-control-allow-origin": "*",
      "content-type": "application/json;charset=UTF-8"
    },
    "body": JSON.stringify(body),
    "method": method
  });
}

export default apiRequest
