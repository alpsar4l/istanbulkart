import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.scss"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Istanbulkart",
  description: "Kişiye Özel Istanbulkart Uygulaması; kendi bilgisayarınızda kullanabileceğiniz ve özelleştirebileceğiniz bir arayüz sağlamaktadır.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
