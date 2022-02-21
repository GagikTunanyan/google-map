import React from "react";
import styles from './styles/restaurant.module.scss';
import { Rating } from 'react-simple-star-rating';
import Button from '../UIElements/Button/';
import Link from '../UIElements/Link';
import { useRouter } from 'next/router';

interface PropTypes {
    name: string;
    rating: number;
    onClick: CallableFunction;
    placeId: string
}

const Card: React.FC<PropTypes> = (props) => {
    const { name, rating, onClick, placeId } = props;
    const router = useRouter();
    return (
        <div className={styles.CardWrapper} onClick={() => onClick()}>
            <h4>{name}</h4>
            <div className={styles.Rating}>
                <Rating
                    // gunavorumy katarvum e tokosov ete raitingy 4.5 e petqe gtnenq te 5i qani
                    // tokosne kazmum mer stacac 4.5 raitingy da klini 4.5 * 100/5 = 90% 
                    ratingValue={rating * 20}
                    size={18}
                    transition
                    initialValue={0}
                    // onClick={(e) => console.log(e/20, 'sssssssssss')}
                />
                <span> {rating} </span>
            </div>
            <Button
                color="info"
                onClick={() => router.push('/restaurant/[placeId]', `/restaurant/${placeId}`)}
            >
                View Restaurant
            </Button>
        </div>
    );
};

export default Card;