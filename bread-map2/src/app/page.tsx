"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import styles from './page.module.css';
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface InfoBoxProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  categoryIndex: number;
  setCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface MainSearchProps {
  categoryIndex: number;
  setCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MainSearch: React.FC<MainSearchProps> = ({categoryIndex, setCategoryIndex}) => {
  const categoryList = [
    { id: 1, text: '전체' },
    { id: 2, text: '소금빵' },
    { id: 3, text: '식빵' },
    { id: 4, text: '베이글'},
    { id: 5, text: '휘낭시에'},
  ];

  const clickCategory = (index: number) => {
    setCategoryIndex(index === categoryIndex ? -1 : index);
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

const MainRank = () => {
  const categoryList = [
    { id: 1, text: '전체' },
    { id: 2, text: '소금빵' },
    { id: 3, text: '식빵' },
    { id: 4, text: '베이글'},
    { id: 5, text: '휘낭시에'},
    { id: 6, text: '크림빵'},
    { id: 7, text: '케이크'},
  ];

  const [categoryIndex, setCategoryIndex] = useState(0);

  const clickCategory = (index: number) => {
    setCategoryIndex(index === categoryIndex ? categoryIndex : index);
  };

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
        {categoryList[categoryIndex].text}
      </div>
    </div>
  )
}

const MainInterest = () => {
  const data = [
    { id: 1, text: '빵집1' },
    { id: 2, text: '빵집2' },
    { id: 3, text: '빵집3' },
    { id: 4, text: '빵집4' },
    { id: 5, text: '빵집5' },
  ];

  return (
    <div className={styles.info_main_interest}>
      <div className={styles.interests}>
        <p className={styles.title}>내 관심 빵집</p>
        {data.map((item, index) => (
          <div key={item.id} className={styles.bakery}>
            <p className={styles.rank}>{index + 1}</p>
            <div className={styles.bakery_info}>
              <p>{item.text}</p>
              <p>평점 : 어쩌구</p>
              <p>카테고리: 어쩌구</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const InfoBox: React.FC<InfoBoxProps> = ({activeIndex, setActiveIndex, categoryIndex, setCategoryIndex}) => {

  const clickMenu = (index: number) => {
    setActiveIndex(index === activeIndex ? activeIndex : index);
  };

  const itemList = [
    { id: 1, text: '검색' },
    { id: 2, text: '랭킹' },
    { id: 3, text: '관심' },
  ];

  return (
    <div className={styles.info_box}>
      <div className={styles.info_header}>
        <div className={styles.logoWord}>BREAD-MAP</div>
        <div className={styles.inputBox}>
          <input className={styles.textBox} type="text" placeholder="장소 검색" />
          <button className={styles.searchBtn}>검색</button>
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
      { activeIndex === 1 && <MainRank /> }
      { activeIndex === 2 && <MainInterest /> }
    </div>
  )
}

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
          <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <p>{title}</p>
            <button onClick={() => setIsClicked(-1)}>끄기</button>
          </div>
        )
      }
    </MapMarker>
  )
}

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const bread1Markers = [
    {
      id: 1,
      title: "소금빵집1",
      latlng: { lat: 37.24226, lng: 127.04576 },
    },
    {
      id:2,
      title: "소금빵집2",
      latlng: {lat: 37.24426, lng: 127.04576}
    },
    {
      id:3,
      title: "소금빵집3",
      latlng: {lat: 37.24626, lng: 127.04576}
    },
    {
      id:4,
      title: "소금빵집4",
      latlng: {lat: 37.24826, lng: 127.04576}
    },
  ]

  const bread2Markers = [
    {
      id:5,
      title: "식빵집1",
      latlng: { lat: 37.24226, lng: 127.04776 },
    },
    {
      id:6,
      title: "식빵집2",
      latlng: {lat: 37.24426, lng: 127.04776}
    },
    {
      id:7,
      title: "식빵집3",
      latlng: {lat: 37.24626, lng: 127.04776}
    },
    {
      id:8,
      title: "식빵집4",
      latlng: {lat: 37.24826, lng: 127.04776}
    },
  ]

  const bread3Markers = [
    {
      id:9,
      title: "베이글빵집1",
      latlng: { lat: 37.24226, lng: 127.04976 },
    },
    {
      id:10,
      title: "베이글빵집2",
      latlng: {lat: 37.24426, lng: 127.04976}
    },
    {
      id:11,
      title: "베이글빵집3",
      latlng: {lat: 37.24626, lng: 127.04976}
    },
    {
      id:12,
      title: "베이글빵집4",
      latlng: {lat: 37.24826, lng: 127.04976}
    },
  ]

  const position = {
    lat: Number(searchParams.get("lat")) || 37.245271,
    lng: Number(searchParams.get("lng")) || 127.06295,
  };

  const [infoBoxToggle, setInfoBoxToggle] = useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // header 메뉴 선택 정보를 저장하기 위함
  const [categoryIndex, setCategoryIndex] = useState(0); // 카테고리 선택 정보를 저장하기 위함(지도에 띄운 정보를 유지)
  const [isVisible, setIsVisible] = useState([false, false, false]); // 카테고리 선택 시 맵에 마커가 보이는 것을 위함
  const [isClicked, setIsClicked] = useState(-1); // 맵 마커 클릭 시 div 보임을 위함

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
          `/?${new URLSearchParams({
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

  const geocoder = new kakao.maps.services.Geocoder();

  geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', (result: any[], status: string) => {
    // 정상적으로 검색이 완료됐을 경우
    if (status === kakao.maps.services.Status.OK) {
        // 좌표를 가져옵니다.
        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        
        console.log('Coordinates:', coords);
    } else {
        console.error('Address search failed:', status);
    }
});

  return (
    <>
      { infoBoxToggle && <InfoBox activeIndex={activeIndex} setActiveIndex={setActiveIndex} categoryIndex={categoryIndex} setCategoryIndex={setCategoryIndex} /> }
      <div className={styles.toggleBtnBox}>
        <button className={styles.toggleBtn} onClick={toggleClick} style={{ left: `${leftPosition}px` }}>{">"}</button>
      </div>
      <div className={styles.custom_btn}>
        <Link href="/login"><button className={styles.go_login}>로그인</button></Link>
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
          isVisible[0] &&
          bread1Markers.map((marker, index) => (
            <EventMarkerContainer key={marker.id} position={marker.latlng} title={marker.title} id={marker.id} isClicked={isClicked} setIsClicked={setIsClicked}/>
          ))
        }
        {
          isVisible[1] &&
          bread2Markers.map((marker, index) => (
            <EventMarkerContainer key={marker.id} position={marker.latlng} title={marker.title} id={marker.id} isClicked={isClicked} setIsClicked={setIsClicked}/>
          ))
        }
        {
          isVisible[2] &&
          bread3Markers.map((marker, index) => (
            <EventMarkerContainer key={marker.id} position={marker.latlng} title={marker.title} id={marker.id} isClicked={isClicked} setIsClicked={setIsClicked}/>
          ))
        }
      </Map>
    </>
  );
} 