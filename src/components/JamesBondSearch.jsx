// eslint-disable-next-line
import React, { useEffect } from 'react';


const InitialSearch = ({ setInitialSearchDone, setSearchResults, setIsSearching, setError }) => {
  useEffect(() => {
    const handleInitialSearch = async () => {
      setIsSearching(true);

      try {
        const response = await fetch(`https://openlibrary.org/search.json?title=James%20Bond`);
        if (!response.ok) throw new Error('Failed to fetch James Bond books');
        
        const data = await response.json();
        setSearchResults(data.docs);
        setIsSearching(false);
        setInitialSearchDone(true);
      } catch (error) {
        console.error('Error fetching James Bond books:', error);
        setIsSearching(false);
        setError(error.message);
      }
    };

    handleInitialSearch();
  }, [setInitialSearchDone, setSearchResults, setIsSearching, setError]);

  return null; // Initial search does not render anything directly
}

export default InitialSearch;
