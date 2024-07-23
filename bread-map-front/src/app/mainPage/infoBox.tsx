'use client'

import axios from 'axios';
import styles from './infoBox.module.css';
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

interface InfoBoxProps {
    activeIndex: number;
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
    categoryIndex: number;
    setCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
    setIsClicked: React.Dispatch<React.SetStateAction<number>>;
}
  
interface MainSearchProps {
    categoryIndex: number;
    setCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
}
  
const MainSearch: React.FC<MainSearchProps> = ({categoryIndex, setCategoryIndex}) => {
    const categoryList = [
        { id: 0, text: '전체'},
        { id: 1, text: '베이글' },
        { id: 2, text: '소금빵' },
        { id: 3, text: '휘낭시에' },
        { id: 4, text: '식빵' },
        { id: 5, text: '크림빵' },
        { id: 6, text: '케이크' },
    ];

    const clickCategory = (index: number) => {
        setCategoryIndex(index === categoryIndex ? categoryIndex : index);
    };

    return (
        <div className={styles.info_main_search}>
            <div className={styles.around_search}>
                <p className={styles.title}>주변 검색</p>
                <ul className={styles.category}>
                {
                    categoryList.map((item, index) => (
                    <li className={styles.item} key={item.id} onClick={() => clickCategory(index)}
                    style={{borderColor: index === categoryIndex ? "#98DDBD" : "gray"}}>
                        {item.text}
                    </li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}

interface BakeryRankInfo {
    id: number;
    name: string;
    address: string;
    score: number;
    review_number: number;
    breads: string[];
}

interface MainRankProps {
    setIsClicked: React.Dispatch<React.SetStateAction<number>>;
}

const MainRank: React.FC<MainRankProps> = ({setIsClicked}) => {
    
    const categoryList = [
        { id: 0, text: '전체'},
        { id: 1, text: '베이글' },
        { id: 2, text: '소금빵' },
        { id: 3, text: '휘낭시에' },
        { id: 4, text: '식빵' },
        { id: 5, text: '크림빵' },
        { id: 6, text: '케이크' },
    ];

    const router = useRouter();
    const [canLogin, setCanLogin] = useState<boolean | null>(null);
    const [bakeryRank, setBakeryRank] = useState<BakeryRankInfo[]>([]);
    const [categoryIndex, setCategoryIndex] = useState(0);

    const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: Cookies.get("jwt"),
		},
	};

    const clickCategory = (index: number) => {
      setCategoryIndex(index === categoryIndex ? categoryIndex : index);
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

	useEffect(() => {
		if (canLogin === false || Cookies.get('jwt') === undefined){
			Cookies.remove('jwt');
			setBakeryRank([]);
			router.push("/");
		}
	}, [canLogin]);

    useEffect(() => {
		const fetchBakeries = async () => {
			try {
				var res;
				if (categoryIndex === 0){
					res = await axios.get<BakeryRankInfo[]>("http://127.0.0.1:5001/bakeries/ranking", config);
				} else {
					res = await axios.get<BakeryRankInfo[]>("http://127.0.0.1:5001/bakeries/ranking/" + categoryIndex, config);
				}
				
				if (!canLogin || Cookies.get('jwt') === undefined){
					setBakeryRank([]);
				} else {
					setBakeryRank(res.data);
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error('Error fetching bakeries: ', error.message);
				}
			}
		}
		
		fetchBakeries();
	}, [canLogin, categoryIndex]);
  
    return (
        <div className={styles.info_main_rank}>
            <div className={styles.rank_category}>
                <p className={styles.title}>카테고리 별 랭킹</p>
                <ul className={styles.category}>
                    {
                    categoryList.map((item, index) => (
                        <li className={styles.item} key={item.id} onClick={() => clickCategory(index)}
                        style={{borderColor: index === categoryIndex ? "#98DDBD" : "gray"}}>
                        {item.text}
                        </li>
                    ))
                    }
                </ul>
            </div>
            <div className={styles.menu_rank}>
                {bakeryRank.map((bakery, index) => (
                    <div key={bakery.id} className={styles.bakery_rank} onClick={() => setIsClicked(bakery.id)}>
                        <p className={styles.rank}>{index + 1}</p>
                        <div className={styles.bakery_info}>
                            <p>{bakery.name}</p>
                            <p>평점 : {bakery.score}</p>
                            <p>카테고리: {bakery.breads.join(", ")}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

interface InterestBakeryInfo {
    id: number;
    bakery_id: number;
    bakery_name: string;
    bakery_score: number;
    breads: string[];
}

interface MainInterestProps {
    setIsClicked: React.Dispatch<React.SetStateAction<number>>;
}
  
const MainInterest: React.FC<MainInterestProps> = ({setIsClicked}) => {
    const [canLogin, setCanLogin] = useState<boolean | null>(null);
    const [myInterest, setMyInterest] = useState<InterestBakeryInfo[]>([]);
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
        };

        fetchMyInterest();
    }, []);
  
    return (
      <div className={styles.info_main_interest}>
        <div className={styles.interests}>
            <p className={styles.title}>내 관심 빵집</p>
            {myInterest.map((interest, index) => (
                <div key={interest.id} className={styles.bakery} onClick={() => setIsClicked(interest.bakery_id)}>
                <p className={styles.rank}>{index + 1}</p>
                <div className={styles.bakery_info}>
                    <p>{interest.bakery_name}</p>
                    <p>평점 : {interest.bakery_score}</p>
                    <p>카테고리: {interest.breads.join(", ")}</p>
                </div>
                </div>
            ))}
        </div>
      </div>
    )
}

interface SearchBakeryInfo {
    id: number;
    name: string;
    address: string;
    score: number;
    review_number: number;
    breads: string[];
    interest: boolean;
}

const InfoBox: React.FC<InfoBoxProps> = ({activeIndex, setActiveIndex, categoryIndex, setCategoryIndex, setIsClicked}) => {
    
    const [searchBakeryWords, setSearchBakeryWords] = useState(""); // 빵집 검색 변수
    const [searchBakeries, setSearchBakeries] = useState<SearchBakeryInfo[]>([]);
    const clickMenu = (index: number) => {
      setActiveIndex(index === activeIndex ? activeIndex : index);
    };
    const itemList = [
      { id: 1, text: '검색' },
      { id: 2, text: '랭킹' },
      { id: 3, text: '관심' },
    ];
    const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: Cookies.get("jwt"),
		},
	};

    useEffect(() => {
        const fetchSearchBakery = async () => {
            try {
                if (searchBakeryWords){
                    const res = await axios.post("http://127.0.0.1:5001/bakeries/search", {
                        name: searchBakeryWords
                    }, config);
                    console.log(res.data);
                    setSearchBakeries(res.data);
                }

            } catch (error) {
                console.error('Error checking login:', error);
            }
        };
        fetchSearchBakery();

    }, [searchBakeryWords]);

    const handleSearchBakery = () => {
        if (searchBakeryWords) {
            axios.post("http://127.0.0.1:5001/bakeries/search", {
                name: searchBakeryWords
            }, config)
            .then(res => {
                setSearchBakeries(res.data);
            });
        }
    };
  
    return (
      <div className={styles.info_box}>
        <div className={styles.info_header}>
            <div className={styles.logoWord}>BREAD-MAP</div>
            <div className={styles.search_bakery}>
                <div className={styles.inputBox}>
                    <input className={styles.textBox} type="text" placeholder="장소 검색" onChange={(e) => {setSearchBakeryWords(e.target.value)}}/>
                    <button className={styles.searchBtn} onClick={handleSearchBakery}>검색</button>
                </div>
                <div className={styles.search_result}>
                    {
                        searchBakeries.map((bakery, index) => (
                            <p className={styles.word} key={bakery.id} onClick={() => setIsClicked(bakery.id)}>{bakery.name}</p>
                        ))
                    }
                </div>
            </div>
            <div className={styles.navBar}>
                <ul className={styles.menu}>
                {
                    itemList.map((item, index) => (
                    <li className={styles.tab} key={item.id} onClick={() => clickMenu(index)} 
                        style={{backgroundColor: index === activeIndex ? "#98DDBD" : "transparent"}}>
                        {item.text}
                    </li>
                    ))
                }
                </ul>
            </div>
        </div>
        { activeIndex === 0 && <MainSearch categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex}/> }
        { activeIndex === 1 && <MainRank setIsClicked={setIsClicked}/> }
        { activeIndex === 2 && <MainInterest setIsClicked={setIsClicked}/> }
      </div>
    )
}

export default InfoBox;