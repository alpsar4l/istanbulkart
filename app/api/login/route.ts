import getRequest from "@/helpers/getRequest";
import getToken from "@/helpers/getToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body: LoginBody = await req.json();

  if (body.type === "SEND_SMS" && body.phone_number && body.password) {
    try {
      const tokenResponse = await getToken();
      const token = await tokenResponse.json();

      const loginResponse = await getRequest({
        token: token.token,
        command: "RI.OnLogin",
        data: {
          CountryCode: "90",
          CellPhone: String(body.phone_number),
          Password: String(body.password),
          DeviceId: "1.1.1.1",
          OSType: 10,
          IPAdress: "1.1.1.1",
          Port: "",
        },
      });

      const loginData = await loginResponse.json();

      if (loginData.data.ResponseCode === "0") {
        return NextResponse.json({
          status: true,
          message: "SMS_SENT",
          token,
          login: loginData,
        });
      } else {
        return NextResponse.json({
          status: false,
          message: "ERROR",
        });
      }
    } catch (error) {
      console.error("Error during login process:", error);
      return NextResponse.json({
        status: false,
        message: "ERROR",
      });
    }
  } else if (body.type === "SMS_CONTROL") {
    const smsControlResponse = await getRequest({
      token: body.token,
      command: "RI.OnConfirmLoginSms",
      data: {
        CountryCode: "90",
        CellPhone: body.phone_number,
        SmsToken: body.sms_code,
        OSType: 10,
        AppVersion: "0.1.0",
        IPAdress: "",
        Port: "",
      },
    });

    const smsData = await smsControlResponse.json();

    if (smsData.data.ResponseCode === "1020") {
      return NextResponse.json({
        status: false,
        message: "WRONG_CODE",
      });
    } else if (smsData.data.ResponseCode === "0") {
      return NextResponse.json({
        status: true,
        message: "OK",
        data: smsData.data,
      });
    }
  }

  return NextResponse.json({
    status: false,
    message: "WTF",
  });
}
