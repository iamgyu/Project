'use client'

import Link from "next/link";
import styles from "./addBakery.module.css";
import { useState } from "react";

interface CategoryState {
    [key: number]: boolean;
}

const AddBakery = () => {
    const categoryList = [
        { id: 1, text: '소금빵' },
        { id: 2, text: '식빵' },
        { id: 3, text: '베이글' },
        { id: 4, text: '휘낭시에' },
        { id: 5, text: '크림빵' },
        { id: 6, text: '케이크' },
    ];

    const [categorySelect, setCategorySelect] = useState<CategoryState>({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
    });

    const clickCategory = (id: number) => {
        setCategorySelect(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

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
                <div className={styles.question_bakery_category}>
                    <p className={styles.word}>빵집 카테고리</p>
                    <div className={styles.categoryList}>
                    {
                        categoryList.map((item, index) => (
                        <li className={styles.item} key={item.id} onClick={() => clickCategory(item.id)}
                            style={{borderColor: categorySelect[item.id] ? "#98DDBD" : "gray"}}>
                            {item.text}
                        </li>
                        ))
                    }
                    </div>
                </div>
                <button className={styles.submitBtn}>제출</button>
            </div>
        </div>
    )
}

export default AddBakery;