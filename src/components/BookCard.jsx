//BookCard.jsx

import React, { useState } from 'react'; // Importerer React og useState hook fra 'react' modulen
import '../styles/css/BookCard.css'; // Importerer BookCard styling
import BookCover from '../assets/BookCover.jpg'; // Importerer BookCover.jpg bilde
import MoreInfoImage from '../assets/merinfoomboka.png'; // Importerer merinfoomboka.png bilde
import ToAmazon from './ToAmazon'; // Importerer ToAmazon.jsx komponenten
import ExportButton from './MerInfoOmBoka'; // Importerer ExportButton.jsx komponenten

function BookCard({ book }) { // Definerer en funksjonskomponent kalt BookCard, tar inn en prop kalt book
  const [isHovered, setIsHovered] = useState(false); // Definerer en state variabel 'isHovered' og setter den til false ved start
  const [authorTooltip, setAuthorTooltip] = useState(''); // Definerer en state variabel 'authorTooltip' og setter den til en tom streng ved start

  const handleAuthorClick = (authorName) => { // Definerer en funksjon for å håndtere klikk på forfatternavnet
    window.open(`https://www.google.com/search?q=${encodeURIComponent(authorName)}`, '_blank'); // Åpner en ny fane med Google-søk for forfatteren
  };

  const handleMouseEnter = () => { // Definerer en funksjon for å håndtere musepekeren over bokomslaget
    setIsHovered(true); // Setter 'isHovered' til true når musepekeren er over bokomslaget
  };

  const handleMouseLeave = () => { // Definerer en funksjon for å håndtere musepekeren når den forlater bokomslaget
    setIsHovered(false); // Setter 'isHovered' til false når musepekeren forlater bokomslaget
  };

  const handleAuthorMouseEnter = (authorName) => { // Definerer en funksjon for å håndtere musepekeren over forfatternavnet
    setAuthorTooltip(`Searching for ${authorName} on Google...`); // Setter teksten for forfatterverktøytips
  };

  const handleAuthorMouseLeave = () => { // Definerer en funksjon for å håndtere musepekeren når den forlater forfatternavnet
    setAuthorTooltip(''); // Fjerner teksten for forfatterverktøytips
  };

  const handleImageClick = () => { // Definerer en funksjon for å håndtere klikk på bokomslaget
    if (book.key) { // Sjekker om boka har en nøkkel
      window.open(`https://openlibrary.org${book.key}`, '_blank'); // Åpner en ny fane med bokas side på Open Library
    }
  };

  return (
    <div className="book-card"> {/* Rendrer en div med klassen 'book-card' */}
      <div
        className="book-image" // Rendrer en div med klassen 'book-image'
        onMouseEnter={handleMouseEnter} // Knytter funksjonen handleMouseEnter til onMouseEnter hendelsen
        onMouseLeave={handleMouseLeave} // Knytter funksjonen handleMouseLeave til onMouseLeave hendelsen
        onClick={handleImageClick} // Knytter funksjonen handleImageClick til onClick hendelsen
      >
        <img
          src={isHovered ? MoreInfoImage : (book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : BookCover)} 
          // Setter kilden til bildet avhengig av om musepekeren er over bokomslaget eller om boka har et dekkbilde
          alt={book.title} // Angir alternativ tekst for bildet
        />
      </div>
      <div className="book-details"> {/* Rendrer en div med klassen 'book-details' */}
        <h3>{book.title}</h3> {/* Rendrer tittelen på boka */}
        <hr size="2" color='gray' /> {/* Rendrer en horisontal linje */}
        <p>
          <strong>Author:</strong>{' '} {/* Rendrer forfatternavnet */}
          <span
            style={{ position: 'relative', cursor: 'pointer', textDecoration: 'underline' }} // Legger til stiler til forfatternavnet
            onClick={() => handleAuthorClick(book.author_name)} // Knytter funksjonen handleAuthorClick til onClick hendelsen
            onMouseEnter={() => handleAuthorMouseEnter(book.author_name)} // Knytter funksjonen handleAuthorMouseEnter til onMouseEnter hendelsen
            onMouseLeave={handleAuthorMouseLeave} // Knytter funksjonen handleAuthorMouseLeave til onMouseLeave hendelsen
            title={authorTooltip} // Angir verktøytips for forfatternavnet
          >
            {book.author_name} {/* Rendrer forfatternavnet */}
          </span>
        </p>
        <p><strong>First published:</strong> {book.first_publish_year || 'N/A'}</p> {/* Rendrer publiseringsåret for boka */}
        <p><strong>Average rating:</strong> {book.average_rating || 'N/A'}</p> {/* Rendrer gjennomsnittlig vurdering for boka */}
        <p><strong>ISBN-10:</strong> {book.isbn ? book.isbn[0] : 'N/A'}</p> {/* Rendrer ISBN-10 for boka */}
        <p><strong>ISBN-13:</strong> {book.isbn ? book.isbn[1] : 'N/A'}</p> {/* Rendrer ISBN-13 for boka */}
      </div>
      <div className="extra-buttons"> {/* Rendrer en div med klassen 'extra-buttons' */}
        <ToAmazon book={book} /> {/* Bruker ToAmazon-komponenten */}
        <ExportButton book={book} /> {/* Bruker ExportButton-komponenten */}
      </div>
      
    </div>
  );
}

export default BookCard;

