import getRequest from "@/helpers/getRequest";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const token = String(cookieStore.get("IstKart_Token")?.value);
  const customerNumber = String(cookieStore.get("IstKart_ID")?.value);
  const sessionToken = String(cookieStore.get("IstKart_SToken")?.value);

  try {
    const getCardList = await getRequest({
      token,
      command: "RI.OnGetCardList",
      data: {
        CustomerNumber: customerNumber,
        SessionToken: sessionToken,
      },
    });

    const cardListData = await getCardList.json();

    if (cardListData.data.ResponseCode === "0") {
      return NextResponse.json({
        status: true,
        list: cardListData.data.CardList,
      });
    }
  } catch (error) {
    console.error("Error fetching card list:", error);
  }

  return NextResponse.json({
    status: false,
    list: [],
  });
}
