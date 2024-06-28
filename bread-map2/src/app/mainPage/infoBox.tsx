'use client'

import styles from './infoBox.module.css';
import { useState } from "react";

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

export default InfoBox;