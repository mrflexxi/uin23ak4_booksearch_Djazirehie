import React, { useState } from 'react';
import '../styles/BookCard.scss';
import BookCover from '../assets/BookCover.jpg'; // Importer BookCover.jpg
import MoreInfoImage from '../assets/merinfoomboka.png'; // Importer merinfoomboka.png
import ToAmazon from './ToAmazon'; // Importer ToAmazon.jsx
import ExportButton from './MerInfoOmBoka'; // Importer ExportBookInfo.jsx
//import ScrollToTopButton from './ScrollToTopButton';

function BookCard({ book }) {
  const [isHovered, setIsHovered] = useState(false);
  const [authorTooltip, setAuthorTooltip] = useState('');

  const handleAuthorClick = (authorName) => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(authorName)}`, '_blank');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleAuthorMouseEnter = (authorName) => {
    setAuthorTooltip(`Searching for ${authorName} on Google...`);
  };

  const handleAuthorMouseLeave = () => {
    setAuthorTooltip('');
  };

  const handleImageClick = () => {
    if (book.key) {
      window.open(`https://openlibrary.org${book.key}`, '_blank');
    }
  };

  return (
    <div className="book-card">
      <div
        className="book-image"
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
        <hr size="2" color='gray' />
        <p>
          <strong>Author:</strong>{' '}
          <span
            style={{ position: 'relative', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => handleAuthorClick(book.author_name)}
            onMouseEnter={() => handleAuthorMouseEnter(book.author_name)}
            onMouseLeave={handleAuthorMouseLeave}
            title={authorTooltip}
          >
            {book.author_name}
          </span>
        </p>
        <p><strong>First published:</strong> {book.first_publish_year || 'N/A'}</p>
        <p><strong>Average rating:</strong> {book.average_rating || 'N/A'}</p>
        <p><strong>ISBN-10:</strong> {book.isbn ? book.isbn[0] : 'N/A'}</p>
        <p><strong>ISBN-13:</strong> {book.isbn ? book.isbn[1] : 'N/A'}</p>
      </div>
      <div className="extra-buttons">
        <ToAmazon book={book} /> {/* Bruker ToAmazon-komponenten */}
        <ExportButton book={book} /> {/* Bruker ExportButton-komponenten */}
      </div>
      
    </div>
  );
}

export default BookCard;
//<ScrollToTopButton />