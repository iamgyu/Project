'use client';

import styles from "./login.module.css";
import Link from "next/link";

function Login() {
    return (
        <div className={styles.loginPage}>
            <div className={styles.loginBox}>
                <div className={styles.logoWord}>BREAD-MAP</div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>이메일 주소</p>
                    <input className={styles.input} type="text" placeholder="이메일" />
                </div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>비밀번호</p>
                    <input className={styles.input} type="password" placeholder="비밀번호" />
                </div>
                <button className={styles.button}>로그인</button>
                <div className={styles.joinNav}>
                    <Link href="/join">이메일 가입</Link>
                    <Link href="/">이메일 찾기</Link>
                    <Link href="/">비밀번호 찾기</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;