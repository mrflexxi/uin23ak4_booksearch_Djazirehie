// ToAmazon.jsx
import React from 'react';

const ToAmazon = ({ book }) => {
  const handleAmazonClick = () => {
    try {
      if (!book.isbn || !book.isbn[0]) {
        const confirmation = window.confirm('ISBN number is not available. Do you want to search for the book title and author on Amazon?');
        if (confirmation) {
          const searchQuery = `${encodeURIComponent(book.title)} ${encodeURIComponent(book.author_name.join(' '))}`;
          const amazonUrl = `https://www.amazon.com/s?k=${searchQuery}`;
          window.open(amazonUrl, '_blank');
        }
      } else {
        //const amazonUrl = `https://www.amazon.com/s?k=${book.key}&tag=internetarchi-20`;
        const amazonUrl = `https://www.amazon.com/dp/${book.isbn.join('/')}/?tag=internetarchi-20`;
        window.open(amazonUrl, '_blank');
      }
    } catch (error) {
      console.error('Error fetching Amazon search results:', error);
    }
  };

  return (
    <button className="amazon-button" onClick={handleAmazonClick}>amazon</button>
  );
};

export default ToAmazon;