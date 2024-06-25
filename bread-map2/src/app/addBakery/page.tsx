'use client'

import Link from "next/link";
import styles from "./addBakery.module.css";

const AddBakery = () => {

    return (
        <div className={styles.main}>
            <Link href="/"><button className={styles.homeBtn}>BREAD-MAP</button></Link>
            <div className={styles.question_box}>
                <p className={styles.title}>빵집 정보를 알려주세요!</p>
                <div className={styles.question_bakery_name}>
                    <p className={styles.word}>빵집 이름</p>
                    <input className={styles.name_input} placeholder="빵집 이름을 입력해 주세요"/>
                </div>
                <div className={styles.question_bakery_address}>
                    <p className={styles.word}>빵집 주소</p>
                    <input className={styles.address_input} placeholder="빵집 주소를 정확하게 입력해 주세요"/>
                </div>
                <div className={styles.question_bakery_address}>
                    <p className={styles.word}>빵집 상세주소</p>
                    <input className={styles.address_input} placeholder="빵집 상세 주소를 입력해 주세요"/>
                </div>
                <button className={styles.submitBtn}>제출</button>
            </div>
        </div>
    )
}

export default AddBakery;