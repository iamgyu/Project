import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function Home() {
  return (
    <Map
      center={{ lat: 37.24302, lng: 127.04493 }}
      level={5}
      style={{ width: "100%", height: "100vh" }}>
        <MapMarker position={{ lat: 37.24302, lng: 127.04493 }} />
    </Map>
  )
}