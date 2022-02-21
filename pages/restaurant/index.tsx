import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from '../../components/UIElements/Link';
import { Rating } from 'react-simple-star-rating';
import Review from '../../components/Card/review';
import Button from '../../components/UIElements/Button';
import Head from 'next/head';
import { ReviewTypes } from '../../types/global';


import styles from '../../styles/restaurant_details.module.scss';

interface PropTypes {
    env: { URL: string, API_KEY: string, PHOTO_REFERENCE_URL: string }
};

interface PageData {
    photos: { photo_reference: string }[];
    name: string;
    formatted_address: string;
    opening_hours: {
        open_now: boolean,
        weekday_text: string[];
    };
    international_phone_number?: string
    website?: string;
    rating: number;
    reviews: ReviewTypes[];
    user_ratings_total?: number;
}

const ResaturantDetails: NextPage<PropTypes> = (props) => {
    const router = useRouter();
    const { env } = props;
    const { URL, PHOTO_REFERENCE_URL, API_KEY } = env;
    const { placeId } = router.query;
    const [pageData, setPageData] = useState<null | PageData>(null);
    const [reviewsState, setReviewsState] = useState<ReviewTypes[]>(pageData?.reviews ?? []);
    const [reviewData, setReviewData] = useState<ReviewTypes>({
        author_name: 'Vardan',
        text: '',
        profile_photo_url: 'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg',
        time: 123456789,
        rating: 0,
    })
    useEffect(() => {
        if(!!placeId) {
            axios.get(`${URL}/api/restaurant-details?place_id=${placeId}`)
            .then((s) => setPageData(s.data.result))
        }
    }, [placeId]);

    useEffect(() => {
        setReviewsState(pageData?.reviews ?? [])
    }, [pageData?.reviews]);

    function rate(value: number) {
        setReviewData({ ...reviewData, rating: value / 20 });
    };

    function mockRequestFeadbeck() {
        setReviewsState((state) => {
            state.push(reviewData);
            return state;
        });
        setReviewData({
            author_name: 'Vardan',
            text: '',
            profile_photo_url: 'https://st4.depositphotos.com/4329009/19956/v/600/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg',
            time: 123456789,
            rating: 0 
        })
    }

    return (
        <div className={styles.RestaurantDetailsPage}>
            <Head>
                <title>Restaurant Details</title>
            </Head>
            <div className={styles.RestaurantInfo}>
                <h2 className={styles.RestaurantName}>
                    {pageData?.name}
                    <span className={!!pageData?.opening_hours.open_now ? styles.IsOpen : styles.Closed}>
                        {!!pageData?.opening_hours.open_now ? 'Open' : 'Closed'}
                    </span>
                </h2>
                {!!pageData?.website && (
                    <Link to={pageData?.website} className={styles.Website} target="_blank">
                        {pageData?.website}
                    </Link>
                )}
                <p className={styles.RestaurnatAddress}>Address: {pageData?.formatted_address}</p>
                {!!pageData?.international_phone_number && (
                    <p className={styles.PhoneNumber}>Phone: {pageData?.international_phone_number}</p>
                )}
                <div className={styles.WorkingTime}>
                    <p className={styles.WorkingHoursTitle}>Working Hours:</p>
                    {pageData?.opening_hours.weekday_text.map((elem) => {
                        return <p key={elem} className={styles.WorkingHoursItem}>{elem}</p>
                    })}
                </div>
                <div className={styles.FeadbeckBlock}>
                    <div className={styles.RatingBlock}>
                        <h5>
                            {pageData?.rating}
                            <span> ({pageData?.user_ratings_total})</span>
                        </h5>
                        <div className={styles.Rating}>
                            <Rating
                                ratingValue={(pageData?.rating ?? 0) * 20}
                                size={30}
                                transition
                                initialValue={0}
                                onClick={rate}
                            />
                        </div>
                    </div>
                    <div className={styles.FeadbackSection}>
                        {reviewsState.map((elem: ReviewTypes) => {
                            return <Review {...elem} key={elem.author_name + elem.time} />
                        })}
                        <div className={styles.FeadbackArea}>
                            <textarea
                                className={styles.Textarea}
                                value={reviewData.text}
                                onChange={(e) =>  setReviewData({ ...reviewData, text: e.target.value })} 
                            />
                            <Button color={"warning"} onClick={mockRequestFeadbeck}>
                                Leave Feadback
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.RestaurantPhotosWrapper}>
                {pageData?.photos.map((elem) => {
                    const { photo_reference } = elem;
                    return (
                        <div key={photo_reference}>
                            <Image 
                                src={`${PHOTO_REFERENCE_URL}&photo_reference=${photo_reference}&key=${API_KEY}`}
                                width={400}
                                height={250}
                            />
                        </div>
                    )
                })}
            </div>
            {console.log(pageData, 'dddddddddddd')}
        </div>
    )
};


export default ResaturantDetails