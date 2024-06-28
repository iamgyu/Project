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
	title: string;
	isClicked: number;
	setIsClicked: React.Dispatch<React.SetStateAction<number>>;
}

const EventMarkerContainer: React.FC<EventMarkerContainerProps> = ({position, id, title, isClicked, setIsClicked}) => {

	return (
		<MapMarker position={position} clickable={true} onClick={() => setIsClicked(id)}>
			{
				isClicked === id && (
				<div className={styles.markerInfoBox} onClick={(e) => e.stopPropagation()}>
					<p className={styles.title}>{title}</p>
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

function Home() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const [infoBoxToggle, setInfoBoxToggle] = useState(false);
	const [leftPosition, setLeftPosition] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0); // header 메뉴 선택 정보를 저장하기 위함
	const [categoryIndex, setCategoryIndex] = useState(0); // 카테고리 선택 정보를 저장하기 위함(지도에 띄운 정보를 유지)
	const [isVisible, setIsVisible] = useState([false, false, false]); // 카테고리 선택 시 맵에 마커가 보이는 것을 위함
	const [isClicked, setIsClicked] = useState(-1); // 맵 마커 클릭 시 div 보임을 위함
	const [bakeries, setBakeries] = useState<Bakery[]>([]); // 빵집 리스트
	
	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: Cookies.get("jwt"),
		},
	};

	const position = {
		lat: Number(searchParams.get("lat")) || 37.245271,
		lng: Number(searchParams.get("lng")) || 127.06295,
	};

	useEffect(() => {
		axios.get("http://127.0.0.1:5001/users", config)
		.then(res => {
			if (res.data.result === "로그인 실패"){
				Cookies.remove("jwt");
				router.push("/");
			}
		})
	});

	useEffect(() => {
		const fetchBakery = async () => {
			try {
				const res = await axios.get<Bakery[]>("http://127.0.0.1:5001/bakeries", config)
				setBakeries(res.data);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					console.error('Error fetching bakeries: ', error.message);
				}
			}
		}
		
		fetchBakery();
	}, []);

	useEffect(() => {
		let newVisibility;
		switch (categoryIndex) {
		case 0:
			newVisibility = [true, true, true];
			break;
		case 1:
			newVisibility = [true, false, false];
			break;
		case 2:
			newVisibility = [false, true, false];
			break;
		case 3:
			newVisibility = [false, false, true];
			break;
		default:
			newVisibility = [false, false, false];
		}
		setIsVisible(newVisibility);
	}, [categoryIndex]);

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
	}

  return (
		<>
			{ infoBoxToggle && <InfoBox activeIndex={activeIndex} setActiveIndex={setActiveIndex} categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} /> }
			<div className={styles.toggleBtnBox}>
				<button className={styles.toggleBtn} onClick={toggleClick} style={{ left: `${leftPosition}px` }}>{">"}</button>
			</div>
			<div className={styles.custom_btn}>
				<Link href="/"><button className={styles.go_login} onClick={handleLogout}>로그아웃</button></Link>
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
						<EventMarkerContainer key={bakery.id} position={{lat: bakery.lat, lng: bakery.lng}} title={bakery.name} id={bakery.id} isClicked={isClicked} setIsClicked={setIsClicked} />
					))
				}
			</Map>
		</>
 	);
} 

export default Home;