'use client';

import { useState } from "react";
import styles from "./moreInfo.module.css";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import Link from "next/link";

interface ModalPageProps {
    clickModal: () => void;
}

interface CategoryState {
    [key: number]: boolean;
}

const ModalPage: React.FC<ModalPageProps> = ({ clickModal }) => {
    const [rating, setRating] = useState(1);
    const [categorySelect, setCategorySelect] = useState<CategoryState>({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
    });
  
    const categoryList = [
        { id: 1, text: '소금빵' },
        { id: 2, text: '식빵' },
        { id: 3, text: '베이글' },
        { id: 4, text: '휘낭시에' },
        { id: 5, text: '크림빵' },
        { id: 6, text: '케이크' },
    ];

    const clickCategory = (id: number) => {
        setCategorySelect(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return(
        <div className={styles.modalPage}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <p className={styles.word}>빵집 이름</p>
                <div className={styles.starRating}>
                    {[...Array(rating)].map((a, i) => (
                        <PiStarFill className={styles.star} key={i} onClick={() => setRating(i + 1)} />
                    ))}
                    {[...Array(5 - rating)].map((a, i) => (
                        <PiStarLight className={styles.star} key={i} onClick={() => setRating(rating + i + 1)} />
                    ))}
                    <p>{rating} / 5</p>
                </div>
                <div className={styles.recommand_category}>
                    <p>추천 카테고리</p>
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
                <div className={styles.comment}>
                    <textarea className={styles.commentBox} rows={12} cols={50}/>
                    <div className={styles.btnCollection}>
                        <button className={styles.btn} onClick={clickModal}>취소</button>
                        <button className={styles.btn}>등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MoreInfo() {
    const [showModal, setShowModal] = useState(false);

    const clickModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <div className={styles.main_box}>
                <Link href="/"><button className={styles.homeBtn}>BREAD-MAP</button></Link>
                <div className={styles.bakery_info}>
                    <p className={styles.name}>빵집 이름</p>
                    <div className={styles.main_info}>
                        <p className={styles.score}>평점 : 4.5</p>
                        <p className={styles.review}>리뷰 : 40</p>
                    </div>
                    <p className={styles.address}>주소 : 경기 수원시 영통구 덕영대로 1467 (우)16681</p>
                </div>
                <div className={styles.bakery_breadList}>
                    <p>빵 종류</p>
                    <div className={styles.breadList}>
                    {
                        ["빵1", "빵2", "빵3", "빵4", "빵5"].map((bread, index) => (
                            <div key={index} className={styles.one_bread}>{bread}</div>
                    ))}
                    </div>
                </div>
                <div className={styles.bakery_review}>
                    <div className={styles.scores_review}>
                        <div className={styles.total_score}>
                            <p className={styles.total_review}>전체 30</p>
                            <p className={styles.score}>3.7점</p>
                        </div>
                        <button className={styles.reviewBtn} onClick={clickModal}>리뷰 쓰기</button>
                    </div>
                    <div className={styles.one_review}>
                        <div className={styles.user_info}>
                            <p className={styles.name}>유저 이름</p>
                            <p className={styles.level}>유저 레벨</p>
                        </div>
                        <p>평점 : 4점</p>
                        <div className={styles.comment}>블라블라블라블라블라블라블라</div>
                    </div>
                </div>
            </div>
            {showModal && <ModalPage clickModal={clickModal}/>}
        </>
    );
}

export default MoreInfo;