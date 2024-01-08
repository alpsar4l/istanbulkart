import { ISTANBULKART_GATEWAY, ISTANBULKART_REFERRER } from "@/constant";

async function getRequest({ token, command, data, method = "POST" }: GetRequest) {
  return await fetch(ISTANBULKART_GATEWAY, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "access-control-allow-origin": "*",
      "content-type": "application/json;charset=UTF-8"
    },
    "referrer": ISTANBULKART_REFERRER,
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": JSON.stringify({
      "command": command,
      "id": token,
      "data": data
   }),
   "method": method
  });
}

export default getRequest
