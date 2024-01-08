"use client"

import { useEffect } from "react"
import styles from "./page.module.scss"
import { getCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { Bars } from "react-loader-spinner"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = getCookie("IstKart_Token")

    if (typeof token !== "string") {
      router.push("/login")
    } else {
      router.push("/profile")
    }
  }, [router])

  return (
    <main className={styles.main}>
      <div className={styles.loader}>
        <Bars
          height={80}
          width={80}
          color={"#fff"}
        />
      </div>
    </main>
  )
}
