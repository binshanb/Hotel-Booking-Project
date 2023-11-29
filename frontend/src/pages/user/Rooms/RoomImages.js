import React, { useState, useEffect } from 'react';
import instance from '../../../utils/Axios';

const RoomImage = ({ roomId }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await instance.get(`/api/booking/roomlistuser/${roomId}/rooms-images/`);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [roomId]);

    return (
        <div>
            {images.map(image => (
                <img key={image.id} src={image.image} alt={`Room ${roomId}`} />
            ))}
        </div>
    );
};

export default RoomImage;
