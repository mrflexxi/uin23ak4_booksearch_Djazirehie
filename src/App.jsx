//App.jsx

import React, { useState, useEffect, useRef } from 'react';
//https://react.dev/reference/react/useState : const [state, setState] = useState(initialState)
//https://react.dev/reference/react/useEffect : useEffect(setup, dependencies?)
//https://react.dev/reference/react/useRef : const ref = useRef(initialValue)
//import './styles/App.scss';
import Header from './components/MyHeader';
import SearchResults from './components/SearchResults';
import InitialSearch from './components/JamesBondSearch';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState(null);
  const [initialSearchDone, setInitialSearchDone] = useState(false);
  const [searchLengthInfo, setSearchLengthInfo] = useState(false);
  const [searchResultsCount, setSearchResultsCount] = useState(0);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!initialSearchDone && searchTerm === 'James Bond') {
      setIsSearching(true);
      setInitialSearchDone(true);
      handleSearch(searchTerm);
      setSearchTerm('');
    } else if (initialSearchDone && searchTerm !== '') {
      handleSearch(searchTerm);
    } else if (initialSearchDone && searchTerm === '') { // Check if search term is empty
      setSearchResults([]); // Clear search results if search term is empty
    }
  }, [initialSearchDone, searchTerm]);

  useEffect(() => {
    if (noResults && searchInputRef.current) {
      searchInputRef.current.focus();
      searchInputRef.current.select();
    }
  }, [noResults]);

  useEffect(() => {
    setSearchResultsCount(searchResults.length);
  }, [searchResults]);

  const handleSearch = async (term) => {
    if (term.length < 3) {
      setSearchLengthInfo(true);
      return;
    }

    setIsSearching(true);
    setNoResults(false);
    setError(null);

    try {
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(term)}`);
      if (!response.ok) throw new Error('Failed to fetch search results');
    
      const data = await response.json();
      setSearchResults(data.docs);
      setIsSearching(false);
      setNoResults(data.docs.length === 0); // Set noResults based on the length of data.docs
    } catch (error) {
      console.error('Error fetching search results:', error);
      setIsSearching(false);
      setError(error.message);
    }
    
  };

    const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setSearchLengthInfo(false);
  };

  const handleSearchSubmit = event => {
    event.preventDefault();
    handleSearch(searchTerm); // Send searchTerm som parameter
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
        searchResultsCount={searchResultsCount}
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
