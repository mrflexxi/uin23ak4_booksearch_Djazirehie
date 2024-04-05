//SearchResult.jsx

import React from 'react'; // Importerer React fra 'react' biblioteket
import BookCard from './BookCard';  // Importerer BookCard komponenten fra './BookCard' filen

function SearchResults({ results }) { // Definerer en funksjonskomponent kalt SearchResults, som tar inn en prop kalt results
  return ( // Returnerer JSX innholdet nedenfor
    <div className="search-results"> {/* En div som omgir søkeresultatene, med CSS-klassen 'search-results' */}
      {results.map((book, index) => ( // Mapper hvert element i 'results' arrayet til JSX
        <div key={index} className="book-result"> {/* En div som omgir hvert søkeresultat, med en unik nøkkel satt til 'index' og CSS-klassen 'book-result' */}
          <BookCard book={book} /> {/* Rendrer BookCard komponenten for hvert søkeresultat, og sender 'book' objektet som en prop */}      
        </div>
      ))}
    </div>
  );
}

export default SearchResults;