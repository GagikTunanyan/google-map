export type Cordinate = { lat:number, lng: number };

export interface PlaceType {
    geometry?: { location: { lat: number, lng: number }};
    name?: string;
    rating?: number;
    place_id?: string;
    formatted_address?: string;
    user_ratings_total?: number;
    opening_hours?: boolean;
}
export interface ReviewTypes {
    author_name: string,
    profile_photo_url: string,
    rating: number,
    time: number,
    text: string
};
