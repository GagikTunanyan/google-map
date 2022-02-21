import React from 'react';
import Image from 'next/image';
import { ReviewTypes } from '../../types/global';
import { Rating } from 'react-simple-star-rating';
import styles from './styles/review.module.scss';

const Review: React.FC<ReviewTypes> = (props) => {
    const {
        author_name,
        profile_photo_url,
        rating,
        text,
        time
    } = props

    return (
        <div className={styles.reviewCardWrapper}>
            <div className={styles.AuthorInfo}>
                <Image 
                    src={profile_photo_url}
                    width={50}
                    height={50}
                />
                <p className={styles.AuthorName}>{author_name}</p>
                <Rating
                    ratingValue={(rating ?? 0) * 20}
                    size={12}
                    initialValue={0}
                                        
                />
            </div>
            <div className={styles.FeadbackBlock}>
                <p>{text}</p>
            </div>
        </div>
    )
};

export default Review;