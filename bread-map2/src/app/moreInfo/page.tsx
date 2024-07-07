'use client';

import { useEffect, useState } from "react";
import styles from "./moreInfo.module.css";
import { PiStarFill, PiStarLight } from "react-icons/pi";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface ModalPageProps {
    bakeryId: number;
    bakeryName: string;
    clickModal: () => void;
    fetchBakeryInfo: () => void;
    fetchReview: () => void;
}

interface CategoryState {
    [key: number]: boolean;
}

const ModalPage: React.FC<ModalPageProps> = ({ bakeryId, bakeryName, clickModal, fetchBakeryInfo, fetchReview}) => {
    const [content, setContent] = useState('');
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

    const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: Cookies.get("jwt"),
		},
	};

    const clickCategory = (id: number) => {
        setCategorySelect(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const reviewHandle = () => {
        axios.post("http://127.0.0.1:5001/reviews", {
            content: content,
            image: "image",
            score: rating,
            bakery_id: bakeryId,
            category_ids: Object.entries(categorySelect).filter(([key, value]) => value).map(([key, value]) => parseInt(key, 10)),
        }, config)
        .then(res => {
            if (res.data.result === undefined) {
                fetchBakeryInfo();
                fetchReview();
                clickModal();
            } else {
                alert(res.data.message);
            }
        })
    };

    return(
        <div className={styles.modalPage}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <p className={styles.word}>{bakeryName}</p>
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
                    <textarea className={styles.commentBox} rows={12} cols={50} onChange={(e) => setContent(e.target.value)}/>
                    <div className={styles.btnCollection}>
                        <button className={styles.btn} onClick={clickModal}>취소</button>
                        <button className={styles.btn} onClick={reviewHandle}>등록</button>
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

    const [canLogin, setCanLogin] = useState<boolean | null>(null); // 로그인 상태 유지 여부
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

    useEffect(() => {
		const checkLogin = async () => {
			try {
				const res = await axios.get("http://127.0.0.1:5001/users", config);
				if (res.data.result === "로그인 실패") {
					setCanLogin(false);
				} else {
					setCanLogin(true);
				}
			} catch (error) {
				console.error('Error checking login:', error);
				setCanLogin(false);
			}
		};
		checkLogin();
	}, []);

    const clickModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
		if (canLogin === false || Cookies.get('jwt') === undefined){
            Cookies.remove('jwt');
            setBakeryInfo({
                id: 0,
                name: '기본 빵집',
                address: '알 수 없음',
                score: 0,
                review_number: 0,
                breads: [],
                interest: false,
            });
            setReviews([]);
			router.push("/");
		}
	}, [canLogin]);

    const fetchBakeryInfo = async () => {
        try {
            const url = new URL(location.href);
            const res = await axios.get<BakeryInfo>("http://127.0.0.1:5001/bakeries/" + url.searchParams.get('data'), config)
            if (canLogin === false || Cookies.get('jwt') === undefined){
                setBakeryInfo({
                    id: 0,
                    name: '기본 빵집',
                    address: '알 수 없음',
                    score: 0,
                    review_number: 0,
                    breads: [],
                    interest: false,
                });
            } else {
                setBakeryInfo(res.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error fetching bakeries: ', error.message);
            }
        }
    }

    useEffect(() => {
		fetchBakeryInfo();
	}, []);

    const fetchReview = async () => {
        try {
            const url = new URL(location.href);
            const res = await axios.get<Reviews[]>("http://127.0.0.1:5001/reviews/bakery/" + url.searchParams.get('data'), config);
            if (canLogin === false || Cookies.get('jwt') === undefined){
                setReviews([]);
            } else {
                setReviews(res.data);
            }
        } catch(error) {
            if (axios.isAxiosError(error)) {
                console.error('Error fetching bakeries: ', error.message);
            }
        }
    }

    useEffect(() => {
        fetchReview();
    }, []);

    const addInterest = () => {
        axios.post("http://127.0.0.1:5001/interests", {
            bakery_id: bakeryInfo.id,
        }, config)
        .then(res => {
            if (res.data.result === undefined){
                alert("관심 추가 완료");
                fetchBakeryInfo();
            } else {
                alert(res.data.message);
            }
        })
    }

    const deleteInterest = () => {
        axios.delete("http://127.0.0.1:5001/interests/bakery/" + bakeryInfo.id, config)
        .then(res => {
            if (res.data.result === undefined){
                alert("관심 삭제 완료");
                fetchBakeryInfo();
            } else {
                alert(res.data.message);
            }
        })
    }
    return (
        <>
            <div className={styles.main_box}>
                <Link href="/mainPage"><button className={styles.homeBtn}>BREAD-MAP</button></Link>
                <div className={styles.bakery_info}>
                    <button className={styles.interestBtn} onClick={bakeryInfo.interest ? deleteInterest : addInterest}>{bakeryInfo.interest ? "관심 삭제" : "관심 추가"}</button>
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
                            <div className={styles.rating}>
                                <p className={styles.score}>{bakeryInfo.score}점</p>
                                <div className={styles.star_rating}>
                                    <div className={styles.star_rating_fill} style={{width: `${(bakeryInfo.score / 5) * 100}%`}}>
                                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                    </div>
                                    <div className={styles.star_rating_base}>
                                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className={styles.reviewBtn} onClick={clickModal}>리뷰 쓰기</button>
                    </div>
                    <div className={styles.review_collection}>
                        {
                            reviews.map((review, index) => (
                                <div key={index} className={styles.one_review}>
                                    <div className={styles.user_info}>
                                        <p className={styles.name}>{review.user_nickname}</p>
                                        <p className={styles.level}>({review.user_level})</p>
                                    </div>
                                    <div className={styles.star_rating}>
                                        <div className={styles.star_rating_fill} style={{width: `${(review.score / 5) * 100}%`}}>
                                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                        </div>
                                        <div className={styles.star_rating_base}>
                                            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                        </div>
                                    </div>
                                    <div className={styles.comment}>{review.content}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {showModal && <ModalPage bakeryId={bakeryInfo.id} bakeryName={bakeryInfo.name} clickModal={clickModal} fetchBakeryInfo={fetchBakeryInfo} fetchReview={fetchReview}/>}
        </>
    );
}

export default MoreInfo;