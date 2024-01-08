import getRequest from "@/helpers/getRequest";
import getThreeMonthsAgoDate from "@/utils/getThreeMonthsAgoDate";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const body: CardTransaction = await req.json();

  if (!body.cardId) {
    return NextResponse.json({
      status: false,
      list: [],
    });
  }

  const token = String(cookieStore.get("IstKart_Token")?.value);
  const customerNumber = Number(String(cookieStore.get("IstKart_ID")?.value));
  const sessionToken = String(cookieStore.get("IstKart_SToken")?.value);

  const getTransactionList = await getRequest({
    token,
    command: "RI.OnGetCardTransactionList",
    data: {
      CustomerNumber: customerNumber,
      SessionToken: sessionToken,
      CardId: body.cardId,
      TrnType: 0,
      PageIndex: 1,
      PageSize: 30,
      StartDate: getThreeMonthsAgoDate(),
      EndDate: new Date().toISOString().slice(0, 10),
    },
  });

  try {
    const transactionListData = await getTransactionList.json();

    if (transactionListData.data.ResponseCode === "0") {
      return NextResponse.json({
        status: true,
        list: transactionListData.data.TransactionList,
      });
    }
  } catch (error) {
    console.error("Error fetching transaction list:", error);
  }

  return NextResponse.json({
    status: false,
    list: [],
  });
}
