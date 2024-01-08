interface GetRequest {
  token: string
  command: string
  data: any,
  method?: "POST" | "GET"
}
