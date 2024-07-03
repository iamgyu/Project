'use client'

import Link from "next/link";
import styles from "./myPage.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserInfo {
    id: number;
    email: string;
    nickname: string;
    image: string;
    point: number;
    level_name: string;
}

interface InterestBakeryInfo {
    id: number;
    bakery_id: number;
    bakery_name: string;
    bakery_score: number;
    breads: string[];
}

interface MyReviewInfo {
    id: number;
    content: string;
    image: string;
    score: number;
    bakery_id: number;
    bakery_name: string;
    breads: string[];
}

const MyPage = () => {
    const router = useRouter();
    const [canLogin, setCanLogin] = useState<boolean | null>(null); // 로그인 상태 유지 여부
    const [userInfo, setUserInfo] = useState<UserInfo>({
        id: 0,
        email: "email",
        nickname: "none",
        image: "image",
        point: 0,
        level_name: "none",
    });
    const [myInterest, setMyInterest] = useState<InterestBakeryInfo[]>([]);
    const [myReview, setMyReview] = useState<MyReviewInfo[]>([]);

    const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: Cookies.get("jwt"),
		},
	};

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:5001/users", config);
                if (res.data.result === undefined) {
                    setUserInfo(res.data);
                    setCanLogin(true);
                } else {
                    setUserInfo({
                        id: 0,
                        email: "email",
                        nickname: "none",
                        image: "image",
                        point: 0,
                        level_name: "none",
                    });
                    setCanLogin(false);
                    Cookies.remove("jwt");
                    router.push("/");
                }
            } catch (error) {
                console.error('Error checking login:', error);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchMyInterest = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:5001/interests", config);
                if (canLogin === false || Cookies.get('jwt') === undefined){
                    setMyInterest([]);
                } else {
                    setMyInterest(res.data);
                }
            } catch (error) {
                console.error('Error checking login:', error);
            }
        }

        fetchMyInterest();
    }, []);

    useEffect(() => {
        const fetchMyReview = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:5001/reviews", config);
                if (canLogin === false || Cookies.get('jwt') === undefined){
                    setMyReview([]);
                } else {
                    setMyReview(res.data);
                }
            } catch (error) {
                console.error('Error checking login:', error);
            }
        }

        fetchMyReview();
    }, []);

    const handleLogout = () => {
		Cookies.remove("jwt");
		router.push("/");
	}

    return (
        <div className={styles.main}>
            <Link href="/mainPage"><button className={styles.homeBtn}>BREAD-MAP</button></Link>
            <div className={styles.user_info}>
                <div className={styles.user_img}>{userInfo.image}</div>
                <div className={styles.user_name}>
                    <p className={styles.user_nickname}>{userInfo.nickname}</p>
                    <p className={styles.user_email}>{userInfo.email}</p>
                    <p className={styles.user_level}>{userInfo.level_name}({userInfo.point}포인트)</p>
                </div>
                <button className={styles.logoutBtn} onClick={handleLogout}>로그아웃</button>
            </div>
            <div className={styles.user_interest}>
                <p className={styles.title}>내 관심 빵집</p>
                <div className={styles.interest_box}>
                    {myInterest.map((interest, index) => (
                        <div key={interest.id} className={styles.bakery}>
                            <p className={styles.rank}>{index + 1}</p>
                            <p>{interest.bakery_name}</p>
                            <p>평점 : {interest.bakery_score}</p>
                            <p>카테고리: {interest.breads}</p>
                            <button className={styles.delete_interest}>관심 삭제</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.user_review}>
                <p className={styles.title}>내 리뷰</p>
                <div className={styles.review_box}>
                    {myReview.map((review, index) => (
                        <div key={review.id} className={styles.review}>
                            <p className={styles.rank}>{index + 1}</p>
                            <p>{review.bakery_name}</p>
                            <p>평점 : {review.score}</p>
                            <p>카테고리: {review.breads}</p>
                            <p className={styles.text}>{review.content}</p>
                            <button className={styles.delete_review}>리뷰 삭제</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyPage;