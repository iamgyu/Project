"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import styles from './page.module.css';
import Link from "next/link";
import { useState } from "react";

interface InfoBoxProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

const InfoBox: React.FC<InfoBoxProps> = ({activeIndex, setActiveIndex}) => {

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
      {
        activeIndex === 0 && 
        <div className={styles.info_main_search}>
          검색메인페이지
        </div>
      }
      {
        activeIndex === 1 &&
        <div className={styles.info_main_rank}>
          랭킹메인페이지
        </div>
      }
      {
        activeIndex === 2 &&      
        <div className={styles.info_main_interest}>
          관심메인페이지
        </div>
      }
    </div>
  )
}

export default function Home() {

  const position = {
    lat: 37.24298628798161,
    lng: 127.04491272890326
  };

  const [infoBoxToggle, setInfoBoxToggle] = useState(false);
  const [leftPosition, setLeftPosition] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // header 메뉴 선택 정보를 저장하기 위함

  const toggleClick = () => {
    setInfoBoxToggle(!infoBoxToggle);
    setLeftPosition(leftPosition === 0 ? 400 : 0);
  };

  return (
    <>
      { infoBoxToggle && <InfoBox activeIndex={activeIndex} setActiveIndex={setActiveIndex}/> }
      <div className={styles.toggleBtnBox}>
        <button className={styles.toggleBtn} onClick={toggleClick} style={{ left: `${leftPosition}px` }}>{">"}</button>
      </div>
      <div className={styles.custom_btn}>
        <Link href="/login"><button className={styles.go_login}>로그인</button></Link>
      </div>
      <Map
        center={position}
        style={{ width: "100%", height: "100vh", left: `${leftPosition}px`}}
        level={3}>
          <MapMarker position={position}/>
      </Map>
    </>
  );
} 