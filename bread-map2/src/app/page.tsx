'use client';

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e: any) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:5001/users/login", {
          email: email,
          password: password,
        })
        .then(res => {
          if (res.data.result === "로그인 성공") {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${res.data.jwt}`;
            Cookies.set("jwt", res.data.jwt);
            router.push("/mainPage");
          } else {
            alert(res.data.result);
          }
        })
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginBox}>
                <div className={styles.logoWord}>BREAD-MAP</div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>이메일 주소</p>
                    <input className={styles.input} type="text" placeholder="이메일" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>비밀번호</p>
                    <input className={styles.input} type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className={styles.button} onClick={handleLogin}>로그인</button>
                <div className={styles.joinNav}>
                    <Link href="/join">이메일 가입</Link>
                    <Link href="/">이메일 찾기</Link>
                    <Link href="/">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;