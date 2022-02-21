import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Cordinate, PlaceType } from "../../types/global";
import { Rating } from 'react-simple-star-rating';
import styles from './Map.module.scss';

interface PropTypes {
    defaultCenter: Cordinate;
    defaultZoom: number;
    restaurants: PlaceType[];
    center: Cordinate;
    zoom: number;
    hoverId?: string | null
}

const Map: React.FC<PropTypes> = (props) => {
    const { defaultCenter, defaultZoom, restaurants, center, zoom, hoverId } = props;
    const router = useRouter();
    const [infoWindowPlace_Id, setInfoWindowPlace_Id] = useState<string | null>(hoverId ?? null);
    useEffect(() => {
        setInfoWindowPlace_Id(hoverId ?? null);
    }, [hoverId]);

    return (
        <GoogleMap
          defaultZoom={defaultZoom}
          defaultCenter={defaultCenter}
          center={center}
          zoom={zoom}
        >   
            {restaurants.map((elem) => {
                const {
                    geometry,
                    place_id,
                    name,
                    formatted_address,
                    rating,
                    user_ratings_total, 
                    opening_hours
                } = elem;

                return (
                    <Marker
                        position={geometry?.location}
                        key={place_id}
                        onMouseOver={() => setInfoWindowPlace_Id(place_id ?? null)}
                        onClick={() => router.push('/restaurant/[placeId]', `/restaurant/${place_id}`)}
                    >
                        {infoWindowPlace_Id === place_id && (
                            <InfoWindow>
                                <div className={styles.Toolthip}>
                                    <h5>{name}</h5>
                                    <p>{formatted_address}</p>
                                    <div className={styles.RatingsBlock}>
                                        <Rating
                                            ratingValue={(rating ?? 0) * 20}
                                            size={12}
                                            transition
                                            initialValue={0}
                                        />
                                        <span> ({user_ratings_total})</span>
                                    </div>
                                    <p className={`${!!opening_hours ? styles.Open : styles.Close}`}>
                                        {!!opening_hours ? 'Is Open' : 'Closed'}
                                    </p>
                                </div>
                            </InfoWindow>
                        )}
                    </Marker>
                )
            })}
        </GoogleMap>
    )
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;