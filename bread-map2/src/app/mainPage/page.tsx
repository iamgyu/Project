"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import styles from './mainPage.module.css';
import InfoBox from "./infoBox";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

interface EventMarkerContainerProps {
	position: {lat: number, lng: number};
	id: number;
	isClicked: number;
	setIsClicked: React.Dispatch<React.SetStateAction<number>>;
}

interface OneBakery {
	id: number;
	name: string;
	address: string;
	score: number;
	review_number: number;
	breads: string[];
	interest: boolean;
}

const EventMarkerContainer: React.FC<EventMarkerContainerProps> = ({position, id, isClicked, setIsClicked}) => {
	const [oneBakery, setOneBakery] = useState<OneBakery>({
		id: 0,
		name: '기본 빵집',
		address: '알 수 없음',
		score: 0,
		review_number: 0,
		breads: [],
		interest: false,
	});

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: Cookies.get("jwt"),
		},
	};
	
	useEffect(() => {
		const fetchOneBakery = async () => {
			try {
				const res = await axios.get<OneBakery>("http://127.0.0.1:5001/bakeries/" + id, config)
				setOneBakery(res.data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error('Error fetching bakeries: ', error.message);
				}
			}
		}
		fetchOneBakery();
	}, [id])

	return (
		<MapMarker position={position} clickable={true} onClick={() => setIsClicked(id)}>
			{
				isClicked === id && (
				<div className={styles.markerInfoBox} onClick={(e) => e.stopPropagation()}>
					<p className={styles.title}>{oneBakery.name}</p>
					<div className={styles.rating}>
						<p className={styles.score}>평점 : {oneBakery.score}</p>
						<div className={styles.star_rating}>
							<div className={styles.star_rating_fill} style={{width: `${(oneBakery.score / 5) * 100}%`}}>
								<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
							</div>
							<div className={styles.star_rating_base}>
								<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
							</div>
						</div>
						<p className={styles.review}>| 리뷰 : {oneBakery.review_number}</p>
					</div>
					<p className={styles.address}>{oneBakery.address}</p>
					<Link target="_blank" href={{
						pathname: "/moreInfo",
						query: {
							data: id
						}}}>
						<p className={styles.goMoreInfo}>상세 페이지 이동</p>
					</Link>
					<button className={styles.offBtn} onClick={() => setIsClicked(-1)}>끄기</button>
				</div>
				)
			}
		</MapMarker>
	)
}

interface Bakery {
	id: number;
	interest: boolean;
	lat: number;
	lng: number;
	name: string;
}

function MainPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const [canLogin, setCanLogin] = useState<boolean | null>(null); // 로그인 상태 유지 여부
	const [infoBoxToggle, setInfoBoxToggle] = useState(false);
	const [leftPosition, setLeftPosition] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0); // header 메뉴 선택 정보를 저장하기 위함
	const [categoryIndex, setCategoryIndex] = useState(0); // 카테고리 선택 정보를 저장하기 위함(지도에 띄운 정보를 유지)
	const [isClicked, setIsClicked] = useState(-1); // 맵 마커 클릭 시 div 보임을 위함
	const [bakeries, setBakeries] = useState<Bakery[]>([]); // 빵집 리스트
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: Cookies.get("jwt"),
		},
	};

	const position = {
		lat: Number(searchParams.get("lat")) || 37.500,
		lng: Number(searchParams.get("lng")) || 126.77,
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
			setBakeries([]);
			router.push("/");
		}
	}, [canLogin]);

	useEffect(() => {
		const fetchBakeries = async () => {
			try {
				var res;
				if (categoryIndex === 0){
					res = await axios.get<Bakery[]>("http://127.0.0.1:5001/bakeries", config);
				} else {
					res = await axios.get<Bakery[]>("http://127.0.0.1:5001/bakeries/category/" + categoryIndex, config);
				}
				

				if (!canLogin || Cookies.get('jwt') === undefined){
					setBakeries([]);
				} else {
					setBakeries(res.data);
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error('Error fetching bakeries: ', error.message);
				}
			}
		}
		
		fetchBakeries();
	}, [canLogin, categoryIndex]);

	const handlePosition = (map: kakao.maps.Map) => {
		const lng = map.getCenter().getLng();
		const lat = map.getCenter().getLat();
		const params = new URLSearchParams(searchParams);
		params.set("lng", String(lng));
		params.set("lat", String(lat));
		router.replace(`${pathname}?${params.toString()}`);
	};

	const toggleClick = () => {
		setInfoBoxToggle(!infoBoxToggle);
		setLeftPosition(leftPosition === 0 ? 400 : 0);
	};

	const currentLocClick = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
					router.replace(
					`/mainPage?${new URLSearchParams({
						lat: String(position.coords.latitude),
						lng: String(position.coords.longitude),
					}).toString()}`
				);
			},
			() => alert("위치 정보를 가져오는데 실패했습니다."),
			{
				enableHighAccuracy: true,
				maximumAge: 30000,
				timeout: 27000,
			}
		);
	};

	const handleLogout = () => {
		Cookies.remove("jwt");
		router.push("/");
	}

  return (
		<>
			{ infoBoxToggle && <InfoBox activeIndex={activeIndex} setActiveIndex={setActiveIndex} categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} setIsClicked={setIsClicked}/> }
			<div className={styles.toggleBtnBox}>
				<button className={styles.toggleBtn} onClick={toggleClick} style={{ left: `${leftPosition}px` }}>{">"}</button>
			</div>
			<div className={styles.custom_btn}>
				<button className={styles.go_login} onClick={handleLogout}>로그아웃</button>
			</div>
			<div className={styles.currentLoc}>
				<button className={styles.currentLocBtn} onClick={currentLocClick}>현재위치</button>
			</div>
			<div className={styles.myPage}>
				<Link href={"/myPage"}><button className={styles.myPageBtn}>마이페이지</button></Link>
			</div>
			<div className={styles.addBakery}>
				<Link href={"/addBakery"}><button className={styles.addBakeryBtn}>빵집 추가</button></Link>
			</div>
			<Map
				center={position}
				onDragEnd={handlePosition}
				style={{ width: "100%", height: "100vh", left: `${leftPosition}px`}}
				level={3}>
				{
					bakeries.map((bakery, index) => (
						<EventMarkerContainer key={bakery.id} position={{lat: bakery.lat, lng: bakery.lng}} id={bakery.id} isClicked={isClicked} setIsClicked={setIsClicked} />
					))
				}
			</Map>
		</>
 	);
} 

export default MainPage;