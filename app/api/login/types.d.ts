interface LoginBody {
  phone_number: string
  password: string
  sms_code: string
  token: string
  type: "SEND_SMS" | "SMS_CONTROL"
}
