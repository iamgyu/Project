'use client';

import Link from "next/link";
import styles from "./join.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Join() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const router = useRouter();

    const handleJoin = (e: any) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:5001/users/join", {
            email: email,
            password: password,
            nickname: nickname,
        })
        .then(res => {
            if (res.data.result === "회원가입 성공") {
                alert(res.data.result);
                router.push('/');
            } else {
                alert(res.data.result);
            }
        })
    };

    return (
        <div className={styles.joinPage}>
            <div className={styles.joinBox}>
                <div className={styles.titleWord}>회원가입</div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>이메일 주소*</p>
                    <input className={styles.input} type="text" placeholder="예) abcd@email.com" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>비밀번호*</p>
                    <input className={styles.input} type="password" placeholder="영문, 숫자, 특수문자 조합 8-16자" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className={styles.inputBox}>
                    <p className={styles.word}>닉네임*</p>
                    <input className={styles.input} type="text" placeholder="닉네임" onChange={(e) => setNickname(e.target.value)}/>
                </div>
                <button className={styles.button} onClick={handleJoin}>가입하기</button>
                <div className={styles.loginNav}>
                    <Link href="/">로그인페이지 가기</Link>
                </div>
            </div>
        </div>
    );
}

export default Join;