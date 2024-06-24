'use client'

import Link from "next/link";
import styles from "./myPage.module.css";


const MyPage = () => {
    const data = [
        { id: 1, text: '빵집1' },
        { id: 2, text: '빵집2' },
        { id: 3, text: '빵집3' },
        { id: 4, text: '빵집4' },
        { id: 5, text: '빵집5' },
    ];
    
    const reviewData = [
        { id: 1, bakery: '빵집1', score: 4, text: "완전 맛있어요!"},
        { id: 2, bakery: '빵집2', score: 3, text: "이거 텍스트가 언제까지 길어지는 거에요?" },
        { id: 3, bakery: '빵집3', score: 5, text: "여기는 좀 쉽지 않네요" },
        { id: 4, bakery: '빵집4', score: 3, text: "좋아요 굿굿" },
        { id: 5, bakery: '빵집5', score: 5, text: "한번 두번 세번 네번 다섯번 또 갈 생각입니다" },
    ]

    return (
        <div className={styles.main}>
            <Link href="/"><button className={styles.homeBtn}>BREAD-MAP</button></Link>
            <div className={styles.user_info}>
                <div className={styles.user_img}>이미지</div>
                <div className={styles.user_name}>
                    <p className={styles.user_nickname}>유저 닉네임</p>
                    <p className={styles.user_email}>유저 이메일</p>
                </div>
                <button className={styles.logoutBtn}>로그아웃</button>
            </div>
            <div className={styles.user_interest}>
                <p className={styles.title}>내 관심 빵집</p>
                <div className={styles.interest_box}>
                    {data.map((item, index) => (
                        <div key={item.id} className={styles.bakery}>
                            <p className={styles.rank}>{index + 1}</p>
                            <p>{item.text}</p>
                            <p>평점 : 어쩌구</p>
                            <p>카테고리: 어쩌구</p>
                            <button className={styles.delete_interest}>관심 삭제</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.user_review}>
                <p className={styles.title}>내 리뷰</p>
                <div className={styles.review_box}>
                    {reviewData.map((review, index) => (
                        <div key={review.id} className={styles.review}>
                            <p className={styles.rank}>{index + 1}</p>
                            <p>{review.bakery}</p>
                            <p>평점 : {review.score}</p>
                            <p>카테고리: 어쩌구</p>
                            <p className={styles.text}>{review.text}</p>
                            <button className={styles.delete_review}>리뷰 삭제</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyPage;