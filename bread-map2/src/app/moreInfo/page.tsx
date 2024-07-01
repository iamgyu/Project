'use client';

import { useEffect, useState } from "react";
import styles from "./moreInfo.module.css";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
        { id: 1, text: '베이글' },
        { id: 2, text: '소금빵' },
        { id: 3, text: '휘낭시에' },
        { id: 4, text: '식빵' },
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

interface BakeryInfo {
	id: number;
	name: string;
	address: string;
	score: number;
	review_number: number;
	breads: string[];
	interest: boolean;
}

interface Reviews {
    id: number;
    content: string;
    image: string;
    score: number;
    user_nickname: string;
    user_level: string;
    breads: string[];

}
function MoreInfo() {
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [bakeryInfo, setBakeryInfo] = useState<BakeryInfo>({
        id: 0,
		name: '기본 빵집',
		address: '알 수 없음',
		score: 0,
		review_number: 0,
		breads: [],
		interest: false,
    });
    const [reviews, setReviews] = useState<Reviews[]>([]);

    const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: Cookies.get("jwt"),
		},
	};

    const clickModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
		if (Cookies.get('jwt') === undefined){
			router.push("/");
		}
	}, []);

    useEffect(() => {
        const url = new URL(location.href);

		const fetchBakeryInfo = async () => {
			try {
				const res = await axios.get<BakeryInfo>("http://127.0.0.1:5001/bakeries/" + url.searchParams.get('data'), config)
				setBakeryInfo(res.data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error('Error fetching bakeries: ', error.message);
				}
			}
		}

		fetchBakeryInfo();
	}, [bakeryInfo]);

    useEffect(() => {
        const url = new URL(location.href);

        const fetchReview = async () => {
            try {
                const res = await axios.get<Reviews[]>("http://127.0.0.1:5001/reviews/bakery/" + url.searchParams.get('data'), config);
                setReviews(res.data);
            } catch(error) {
                if (axios.isAxiosError(error)) {
					console.error('Error fetching bakeries: ', error.message);
				}
            }
        }

        fetchReview();
    }, []);

    return (
        <>
            <div className={styles.main_box}>
                <Link href="/mainPage"><button className={styles.homeBtn}>BREAD-MAP</button></Link>
                <div className={styles.bakery_info}>
                    <p className={styles.name}>{bakeryInfo.name}</p>
                    <div className={styles.main_info}>
                        <p className={styles.score}>평점 : {bakeryInfo.score}</p>
                        <p className={styles.review}>리뷰 : {bakeryInfo.review_number}</p>
                    </div>
                    <p className={styles.address}>주소 : {bakeryInfo.address}</p>
                </div>
                <div className={styles.bakery_breadList}>
                    <p>빵 종류</p>
                    <div className={styles.breadList}>
                    {
                        bakeryInfo.breads.map((bread, index) => (
                            <div key={index} className={styles.one_bread}>{bread}</div>
                    ))}
                    </div>
                </div>
                <div className={styles.bakery_review}>
                    <div className={styles.scores_review}>
                        <div className={styles.total_score}>
                            <p className={styles.total_review}>전체 {bakeryInfo.review_number}</p>
                            <p className={styles.score}>{bakeryInfo.score}점</p>
                        </div>
                        <button className={styles.reviewBtn} onClick={clickModal}>리뷰 쓰기</button>
                    </div>
                    {
                        reviews.map((review, index) => (
                            <div className={styles.one_review}>
                                <div className={styles.user_info}>
                                    <p className={styles.name}>{review.user_nickname}</p>
                                    <p className={styles.level}>{review.user_level}</p>
                                </div>
                                <p>평점 : {review.score}점</p>
                                <div className={styles.comment}>{review.content}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {showModal && <ModalPage clickModal={clickModal}/>}
        </>
    );
}

export default MoreInfo;