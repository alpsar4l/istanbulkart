import { ISTANBULKART_GATEWAY, ISTANBULKART_REFERRER, ISTANBULKART_TOKEN } from "@/constant";

async function getToken() {
  const token = await fetch(ISTANBULKART_GATEWAY, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "access-control-allow-origin": "*",
      "content-type": "application/json;charset=UTF-8",
      "password": "",
      "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "username": "",
      "Referer": ISTANBULKART_REFERRER,
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": JSON.stringify({
      res: ISTANBULKART_TOKEN
    }),
    "method": "POST"
  });

  return token
}

export default getToken
