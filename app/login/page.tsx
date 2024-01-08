"use client"

import { useState } from "react"
import styles from "./page.module.scss"
import apiRequest from "@/helpers/apiRequest"
import { useRouter } from "next/navigation"
import { setCookie, getCookie } from "cookies-next"

function Login() {
  const router = useRouter();

  const [token, setToken] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [page, setPage] = useState(0);
  const [smsCode, setSmsCode] = useState<string>("");

  const sendSms = async () => {
    if (phone.length === 0 || password.length === 0 || smsCode.length === 0) return;

    try {
      const newRequest = await apiRequest({
        service: "/login",
        body: {
          phone_number: phone,
          password: password,
          sms_code: smsCode,
          token: token,
          type: "SMS_CONTROL",
        },
      });

      const data = await newRequest.json();

      if (data.status) {
        setCookies(data);
        router.push("/profile");
      } else {
        alert("Invalid code, please try again!");
      }
    } catch (error) {
      console.error("Error during login process:", error);
      alert("An error occurred, please try again.");
    }
  };

  const getSms = async () => {
    if (phone.length === 0 || password.length === 0) return;

    try {
      const newRequest = await apiRequest({
        service: "/login",
        body: {
          phone_number: phone,
          password: password,
          type: "SEND_SMS",
        },
      });

      const data = await newRequest.json();

      if (data.status) {
        setToken(data.token.token);
        setPage(1);
      } else {
        resetPageAndInputs();
        alert("An error occurred while sending SMS, please try again.");
      }
    } catch (error) {
      console.error("Error during login process:", error);
      resetPageAndInputs();
      alert("An error occurred, please try again.");
    }
  };

  const setCookies = (data: any) => {
    setCookie("IstKart_ID", `${data.data.CustomerNumber}`);
    setCookie("IstKart_Name", `${data.data.Name} ${data.data.Surname}`);
    setCookie("IstKart_Email", `${data.data.Mail}`);
    setCookie("IstKart_BirthDate", `${data.data.BirthDate}`);
    setCookie("IstKart_SToken", `${data.data.SessionToken}`);
    setCookie("IstKart_Token", `${token}`);
  };

  const resetPageAndInputs = () => {
    setPage(0);
    setPhone("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.center_content}>
      {page === 0 && (
          <div className={styles.login_form}>
            <div className={styles.form_title}>
              <span>Giriş Yap</span>
              <span>IstanbulKart bilgilerinle giriş yap</span>
            </div>
            <div className={styles.form_inputs} data-active={phone.length !== 0 && password.length !== 0}>
              <div className={styles.form_input}>
                <span>Telefon Numarası</span>
                <input
                  type="text"
                  placeholder="Telefon Numarası"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className={styles.form_input}>
                <span>Şifre</span>
                <input
                  type="password"
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div
                onClick={getSms}
                className={styles.send_button}
                data-active={phone.length !== 0 && password.length !== 0}
              >
                <span>Giriş Yap</span>
              </div>
            </div>
          </div>
        )}
        {page === 1 && (
          <div className={styles.login_form}>
            <div className={styles.form_title}>
              <span>Bilgileri Doğrulama</span>
              <span>{phone} telefon numarasına gönderilen kodu giriniz</span>
            </div>
            <div className={styles.form_inputs} data-active={smsCode.length !== 0}>
              <div className={styles.form_input}>
                <span>Doğrulama Kodu</span>
                <input
                  type="text"
                  placeholder="Doğrulama Kodu"
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                />
              </div>
              <div
                onClick={sendSms}
                className={styles.send_button}
                data-active={smsCode.length !== 0}
              >
                <span>Doğrula</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
