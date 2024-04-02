import React, { useState, useEffect, useRef } from 'react';
import Header from './components/MyHeader';
import SearchResults from './components/SearchResults';
import InitialSearch from './components/JamesBondSearch';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearchResults, setLastSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(null);
  const [initialSearchDone, setInitialSearchDone] = useState(false);
  const [searchLengthInfo, setSearchLengthInfo] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (noResults && searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }, [noResults]);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    if (searchTerm.trim().length < 3) {
      setSearchLengthInfo(true);
      return;
    }

    setIsSearching(true);
    setNoResults(false);
    setError(null);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Failed to fetch search results');
    
      const data = await response.json();
      const newResults = data.docs;
      if (newResults.length > 0) {
        setSearchResults(newResults);
        setLastSearchResults(newResults); // Lagrer de siste søkeresultatene hvis det er resultater
      } else {
        setNoResults(true);
      }
      setIsSearching(false);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setIsSearching(false);
      setError(error.message);
    }
  };

  const handleSearchChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearchLengthInfo(false);

    // Beholder de siste søkeresultatene hvis det ikke er skrevet inn en ny søketerm
    if (value.trim() === '' && lastSearchResults.length > 0) {
      setSearchResults(lastSearchResults); // Viser de siste søkeresultatene når søkefeltet er tomt
    }
  };

  return (
    <div className="app">
      <Header
        searchTerm={searchTerm}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        searchLengthInfo={searchLengthInfo}
        error={error}
        noResults={noResults}
        isSearching={isSearching}
      />
      {!initialSearchDone && (
        <InitialSearch
          setInitialSearchDone={setInitialSearchDone}
          setSearchResults={setSearchResults}
          setIsSearching={setIsSearching}
          setError={setError}
        />
      )}
      <div className="book-list">
        {initialSearchDone && searchResults.length > 0 && (
          <SearchResults results={searchResults} />
        )}
      </div>
    </div>
  );
}

export default App;
