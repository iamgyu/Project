'use client';

import Link from "next/link";
import styles from "./join.module.css";

function Login() {
    return (
        <div className={styles.joinPage}>
            <div className={styles.joinBox}>
                <div className={styles.titleWord}>회원가입</div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>이메일 주소*</p>
                    <input className={styles.input} type="text" placeholder="예) abcd@email.com" />
                </div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>비밀번호*</p>
                    <input className={styles.input} type="password" placeholder="영문, 숫자, 특수문자 조합 8-16자" />
                </div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>닉네임*</p>
                    <input className={styles.input} type="text" placeholder="닉네임" />
                </div>
                <button className={styles.button}>가입하기</button>
                <div className={styles.loginNav}>
                    <Link href="/login">로그인페이지 가기</Link>
                    <Link href="/">홈화면 가기</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;