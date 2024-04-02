//BookCard.jsx

import React, { useState } from 'react';
import '../styles/BookCard.scss';
import BookCover from '../assets/BookCover.jpg'; // Importer BookCover.jpg
import MoreInfoImage from '../assets/merinfoomboka.png'; // Importer merinfoomboka.png

function BookCard({ book, onAuthorClick, onAuthorMouseEnter, onAuthorMouseLeave, hoveredAuthor }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleImageClick = () => {
    if (book.key) {
      window.open(`https://openlibrary.org${book.key}`, '_blank');
    }
  };

  return (
    <div className="book-card">
      <div className="book-image"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleImageClick}
      >
        <img
          src={isHovered ? MoreInfoImage : (book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : BookCover)}
          alt={book.title}
        />
      </div>
      <div className="book-details">
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author_name || 'N/A'}</p>
            <p><strong>First published:</strong> {book.first_publish_year || 'N/A'}</p>
            <p><strong>Average rating:</strong> {book.average_rating || 'N/A'}</p>
            <hr />
      </div>
    </div>
  );
}

export default BookCard;