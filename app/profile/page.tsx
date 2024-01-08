"use client"

import { useEffect, useState } from "react"
import styles from "./page.module.scss"
import { setCookie, getCookie } from "cookies-next"
import getRequest from "@/helpers/getRequest"
import { useRouter } from "next/navigation"
import apiRequest from "@/helpers/apiRequest"
import { FaUser } from "react-icons/fa"
import capitalizeWords from "@/utils/capitalizeWords"
import { Bars } from "react-loader-spinner"
import { THEME_COLOR } from "@/constant"
import extractLastWord from "@/utils/extractLastWord"

function Profile() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [customerNumber, setCustomerNumber] = useState<string>("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [transList, setTransList] = useState([]);

  const getCard = async (card: any) => {
    setSelectedCard(card);
    setTransList([]);

    try {
      const getCardRequest = await apiRequest({
        service: "/getCardTransactionList",
        body: {
          cardId: card.CardId,
        },
      });

      const cardData = await getCardRequest.json();

      if (cardData.status) {
        setTransList(cardData.list);
      } else {
        setSelectedCard(null);
        alert("No transactions found, try another card.");
      }
    } catch (error) {
      console.error("Error fetching card transactions:", error);
      alert("An error occurred, please try again.");
    }
  };

  const getCards = async () => {
    try {
      const getCardListRequest = await apiRequest({ service: "/getCardList" });
      const cardList = await getCardListRequest.json();

      if (cardList.status) {
        setCards(cardList.list);
      }
    } catch (error) {
      console.error("Error fetching card list:", error);
    }
  };

  useEffect(() => {
    const istKartToken = getCookie("IstKart_Token");
    const istKartId = getCookie("IstKart_ID");

    if (typeof istKartToken === "string" && typeof istKartId === "string") {
      setToken(istKartToken);
      setCustomerNumber(istKartId);

      getCards();
    } else {
      alert("An error occurred, please log in again.");
      router.push("/login");
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.header}>
          <div className={styles.banner}>
            <img src="./anna-berdnik-0n0AHB1fgTQ-unsplash.jpg" alt="Istanbul" />
          </div>
          <div className={styles.profile_content}>
            <div className={styles.profile_picture}>
              <FaUser color={"#fff"} size={32} />
            </div>
            <div className={styles.profile_details}>
              <span>{String(getCookie("IstKart_Name")) !== "undefined" && capitalizeWords(String(getCookie("IstKart_Name")))}</span>
              <span>{getCookie("IstKart_Email")}</span>
            </div>
          </div>
        </div>

        <div className={styles.cards}>
          <div className={styles.title}>
            <span>Kartlar</span>
          </div>

          {cards.length === 0 && (
            <div className={styles.loader}>
              <Bars
                height={60}
                width={60}
                color={THEME_COLOR}
              />
            </div>
          )}

          {cards.length !== 0 && cards.map((card: any, index) => {
            return (
              <div onClick={() => getCard(card)} className={styles.card} key={index}>
                <div className={styles.card_left}>
                  <div className={styles.card_icon}></div>
                  <div className={styles.card_details}>
                    <span className={styles.card_nickname}>{card.NickName ? card.NickName : "İstanbulkart"}</span>
                    <span className={styles.card_description}>{card.ProductCodeDesc}</span>
                  </div>
                </div>
                <div className={styles.card_right}>
                  <span>{card.CardBalance}₺</span>
                </div>
              </div>
            )
          })}
        </div>


        {String(selectedCard) !== "null" && (
          <div className={styles.cards}>
            <div className={styles.title}>
              <span>{selectedCard.NickName ? selectedCard.NickName : "İstanbulkart"} İşlemleri</span>
            </div>
            {transList.length === 0 && (
              <div className={styles.loader}>
                <Bars
                  height={60}
                  width={60}
                  color={THEME_COLOR}
                />
              </div>
            )}
            {transList.length !== 0 && transList.map((item: any, index) => {
              const line = extractLastWord(item.TrnDescription)
              return (
                <div className={styles.card} key={index}>
                  <div className={styles.card_left}>
                    <div className={line.startsWith("M") ? styles.metro_icon : styles.card_icon}>{line === "MARMARAY" ? "B1" : line.startsWith("M") ? line : ""}</div>
                    <div className={styles.card_details}>
                      <span className={styles.card_nickname}>{item.TrnCodeDescription} {line.startsWith("M")}</span>
                      <span className={styles.card_description}>{item.TrnDescription}</span>
                    </div>
                  </div>
                  <div className={styles.card_right}>
                    <span>{item.TrnAmount}₺</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
