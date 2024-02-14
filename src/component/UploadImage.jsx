import React, { useState } from 'react';
import { imageDb } from '../utils/firebase';  
import { v4 } from 'uuid'; 
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";  

// Component to handle image uploads
export default function UploadImage({ onImageUpload }) {

    // State to manage the selected image
    const [image, setImage] = useState('');

    // Function to handle the image upload to Firebase storage
    const handleUpload = () => {
        // Ensure an image has been selected
        if (image !== null) {
            const imgRef = ref(imageDb, `images/${image.name + v4()}`);

            // Upload the image to the created storage reference
            uploadBytes(imgRef, image).then(value => {
                console.log(value);

                // After uploading, retrieve and log the public download URL for the uploaded image
                getDownloadURL(value.ref).then(url => {
                    console.log(url);
                    onImageUpload(url);
                });
            });
        }
    };

    return (
        <div>
            <label htmlFor="img">Add an image:</label>
            <input 
                // When an image is selected, update the image state
                onChange={(event) => {
                    setImage(event.target.files[0]);
                }} 
                type="file" 
                id="img" 
                accept='image/*' 
                name="img" 
            />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}