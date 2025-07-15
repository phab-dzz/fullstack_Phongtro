
import React, { useState,useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import {Button} from'./';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ChangeView from './ChangeView';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function MapWithSearch({address}) {
  const [searchText, setSearchText] = useState(address || '');

  const [position, setPosition] = useState({ lat: 10.762622, lng: 106.660172 }); // Mặc định TPHCM

  const provider = new OpenStreetMapProvider();
useEffect(() => {
  if (address) {
    console.log("address in map", address);
    setSearchText(address);
    setTimeout(() => {
        handleSearch(address);
    }, 5000);
    }

}, [address]);
const handleSearch = async (query) => {
  try {
    const results = await provider.search({ query });
    console.log("Geo results:", results);

    if (results.length > 0 && results[0].x && results[0].y) {
      const { x, y } = results[0]; // x = lng, y = lat
      setPosition({ lat: y, lng: x });
    } 
  } catch (error) {
    console.error("Lỗi tìm kiếm vị trí:", error);
   
  }
};




  return (
    <div>
      <h3>Vị trí & bản đồ</h3>
     <div className='flex items-center gap-2 mb-4'>
         <input
        type="text"
        value={searchText}
        readOnly
         className='w-[80%]'
        placeholder="Nhập địa chỉ (ví dụ: 1 Võ Văn Ngân, Thủ Đức)"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ padding: '8px', width: '80%', marginRight: '8px' }}
      />
      {/* <button className='bg-blue-500 rounded-lg' onClick={()=>
handleSearch(searchText)
      }>Tìm</button> */}
        <Button onClick={() => handleSearch(searchText)} text={"Tìm"} bgColor={"bg-blue-500"} textColor="text-white" />
     </div>


      <MapContainer center={[position.lat, position.lng]} zoom={15} style={{ height: '400px', marginTop: '20px' }}>
  <ChangeView center={[position.lat, position.lng]} zoom={15} />
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[position.lat, position.lng]}>
    <Popup>
      Vị trí: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
    </Popup>
  </Marker>
</MapContainer>
    </div>
  );
}
