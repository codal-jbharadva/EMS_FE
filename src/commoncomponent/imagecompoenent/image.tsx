import React, { useEffect } from 'react';

function ImageComponent({ imageUrl }) {
  // Extract file ID from the provided Google Drive URL
  const fileId = imageUrl ? imageUrl.match(/[-\w]{25,}/) : null;
  // Construct the direct image link
  const directLink = fileId ? `https://drive.google.com/uc?export=view&id=${fileId[0]}` : '';

  useEffect(() => {
    if (directLink) {
      console.log(`Direct image link: ${directLink}`);
    }
  }, []);

  return (
    <div>
      {directLink && (
        <img
          src={directLink}
          alt="Google Drive Image"
          onError={(e) => {
            // e.target.onerror = null; // Prevent infinite loop in case of a broken link
            // e.target.src = ''; // Optionally set to a placeholder image URL or leave empty
            console.error('Error loading image:', directLink);
          }}
        />
      )}
      {!directLink && <p>Invalid image URL</p>}
    </div>
  );
}

export default ImageComponent;
