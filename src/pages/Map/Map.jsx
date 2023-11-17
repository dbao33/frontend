import React, { useState } from 'react'

const Map = () => {
  const [mapSrc, setMapSrc] = useState('https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1959.1463825844712!2d106.61842849235279!3d10.865322773782708!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b2a11844fb9%3A0xbed3d5f0a6d6e0fe!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggLSBDxqEgc-G7nyAz!5e0!3m2!1svi!2sus!4v1700181895758!5m2!1svi!2sus')
  const [selected, setSelected] = useState(null)
  let src1 = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1959.1463825844712!2d106.61842849235279!3d10.865322773782708!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b2a11844fb9%3A0xbed3d5f0a6d6e0fe!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmggLSBDxqEgc-G7nyAz!5e0!3m2!1svi!2sus!4v1700181895758!5m2!1svi!2sus'
  let src2 = 'https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d23651.30408792001!2d106.62409558413344!3d10.868459536359174!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1690950899112!5m2!1svi!2s'
  let src3 = ''
  const handleMapClick = (index, newSrc) => {
    setSelected(index)
    setMapSrc(newSrc)
  }



  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '60px' }}>
        <div style={{ width: '300px', margin: '20px' }}>
          <h3 style={{ fontSize: '18px' }}>Địa chỉ chi nhánh:</h3>
          <p
            onClick={() => handleMapClick(0, src1)}
            style={{ fontWeight: selected === 0 ? 'bold' : 'normal' }}
          >
            123 Đường ABC, Thành phố XYZ
          </p>
          <p
            onClick={() => handleMapClick(1, src2)}
            style={{ fontWeight: selected === 1 ? 'bold' : 'normal' }}
          >
            123 Đường XYZ, Thành phố XYZ
          </p>
        </div>
        <div>
          <iframe
            src={mapSrc}
            width='800'
            height='600'
            allowFullScreen=''
            loading='lazy'
          ></iframe>
        </div>
      </div>
    </>
  )
}

export default Map