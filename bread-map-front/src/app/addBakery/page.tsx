'use client'

import Link from "next/link";
import styles from "./addBakery.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Geocoder {
    addressSearch: (address: string, callback: (result: any[], status: string) => void) => void;
}

const AddBakery = () => {
    const router = useRouter();
    const [geocoder, setGeocoder] = useState<Geocoder | null>(null);
    const [canLogin, setCanLogin] = useState<boolean | null>(null);
    const [bakeryName, setBakeryName] = useState("");
    const [bakeryAddress, setBakeryAddress] = useState("");
    const [bakeryDetailAddress, setBakeryDetailAddress] = useState("");

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
		if (canLogin === false || Cookies.get('jwt') === undefined){
			Cookies.remove('jwt');
			router.push("/");
		}
	}, [canLogin]);

    useEffect(() => {
        kakao.maps.load(() => {
            setGeocoder(new kakao.maps.services.Geocoder());
        });
    }, []);

    const submitHandle = () => {
        if (geocoder) {
            geocoder.addressSearch(bakeryAddress, (result: any[], status: string) => {
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    axios.post("http://127.0.0.1:5001/bakeries", {
                        name: bakeryName,
                        address: bakeryAddress + " " + bakeryDetailAddress,
                        lat: coords.getLat(),
                        lng: coords.getLng(),
                    }, config)
                    .then(res => {
                        alert("정상적으로 빵집이 추가되었습니다!");
                        router.push("/mainPage");
                    })
                } else {
                    alert("잘못된 정보입니다! 주소를 다시 입력해주세요!");
                }
            })
        }
    }

    return (
        <div className={styles.main}>
            <Link href="/mainPage"><button className={styles.homeBtn}>BREAD-MAP</button></Link>
            <div className={styles.question_box}>
                <p className={styles.title}>빵집 정보를 알려주세요!</p>
                <div className={styles.question_bakery_name}>
                    <p className={styles.word}>빵집 이름</p>
                    <input className={styles.name_input} placeholder="빵집 이름을 입력해 주세요" onChange={(e) => setBakeryName(e.target.value)}/>
                </div>
                <div className={styles.question_bakery_address}>
                    <p className={styles.word}>빵집 주소</p>
                    <input className={styles.address_input} placeholder="빵집 주소를 정확하게 입력해 주세요" onChange={(e) => setBakeryAddress(e.target.value)}/>
                </div>
                <div className={styles.question_bakery_address}>
                    <p className={styles.word}>빵집 상세주소</p>
                    <input className={styles.address_input} placeholder="빵집 상세 주소를 입력해 주세요" onChange={(e) => setBakeryDetailAddress(e.target.value)}/>
                </div>
                <button className={styles.submitBtn} onClick={submitHandle}>제출</button>
            </div>
        </div>
    )
}

export default AddBakery;