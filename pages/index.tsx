import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card/restaurant';
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import WrappedMap from '../components/Map';
import styles from '../styles/restaurants.module.scss';
import { Cordinate, PlaceType } from '../types/global';
import Head from 'next/head';

interface PropTypes {
  env: any
}

const Home: NextPage<PropTypes> = (props) => {
  const defaultCenter = React.useMemo(() => ({lat: 40.177200, lng: 44.513490}), []);
  
  const { env } = props;
  const [restaurants, setRestaurants] = useState<PlaceType[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [centerCordinate, setCenterCordinate] = useState<Cordinate>(defaultCenter);
  const [cardHoverId, setCardHoverId] = useState<null | string>(null);

  useEffect(() => {
    axios.get(`${env.URL}/api/restaurants`)
      .then((data) => {
        setRestaurants(data.data);
      })
      .catch(() => setError('Invalid request'))
  }, []);

  return (
    <div className={styles.HomePage}>
      <Head>
        <title>Map Restaurants</title>
      </Head>
      {!!error && <h5>{error}</h5>}
      {!error && (
        <>
          <div className={styles.ListRestaurants}>
            {restaurants.sort((a, b) => ((b.rating ?? 0) - (a.rating ?? 0))).map((elem: PlaceType, index: number) => {
              const { name, rating, place_id, geometry } = elem;
              return (
                  <div 
                    onMouseOver={() => setCardHoverId(place_id ?? null)} 
                    key={place_id ?? index}
                  >
                    <Card
                      placeId={place_id ?? 'null'}
                      name={name ?? ''}
                      rating={rating ?? 0}
                      onClick={() => setCenterCordinate(geometry?.location ?? { ...defaultCenter })}
                    />
                  </div>
              )
            })}
          </div>
          <div className={styles.Map}>
            <WrappedMap
              defaultCenter={defaultCenter}
              center={centerCordinate}
              defaultZoom={14}
              zoom={JSON.stringify(centerCordinate) !== JSON.stringify(defaultCenter) ? 17 : 14}
              restaurants={restaurants}
              hoverId={cardHoverId}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp
              &libraries=geometry,drawing,places&key=${env.API_KEY}`}
              mapElement={<div style={{ height: '100%'}} />}
              containerElement={<div style={{ height: '100%'}} />}
              loadingElement={<div style={{ height: '100%'}} />}
            />
          </div>
        </>
      )}
      
    </div>
  )
}

export default Home
