//BookCard.jsx

import React from 'react';
import '../styles/BookCard.scss';

function BookCard({ book }) {
  return (
    <div className="book-card">
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