//App.jsx

import React, { useState, useEffect, useRef } from 'react'; 
//https://react.dev/reference/react/useState : const [state, setState] = useState(initialState)
//https://react.dev/reference/react/useEffect : useEffect(setup, dependencies?)
//https://react.dev/reference/react/useRef : const ref = useRef(initialValue)
import './styles/css/ScrollToTopButton.css';
import Header from './components/MyHeader';
import SearchResults from './components/SearchResults';
import InitialSearch from './components/JamesBondSearch';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // Søketermen som brukeren skriver inn.
  const [searchResults, setSearchResults] = useState([]); // Resultatene av søket.
  const [lastSearchResults, setLastSearchResults] = useState([]); // Lagrer siste søk når det er resultater.
  const [isSearching, setIsSearching] = useState(false); // Indikerer om det pågår et søk.
  const [noResults, setNoResults] = useState(false); // Indikerer om søket ga ingen resultater.
  const [error, setError] = useState(null); // Eventuelle feilmeldinger ved søk.
  const [initialSearchDone, setInitialSearchDone] = useState(false); // Indikerer om det første søket er utført.
  const [searchLengthInfo, setSearchLengthInfo] = useState(false); // Informasjon om søketermens lengde.
  const searchInputRef = useRef(null); // Referanse til søkefeltet.

  
  useEffect(() => { // Dette useEffect-hooket kjøres hver gang det skjer en endring i "noResults"-tilstanden.
    // Hvis "noResults" er sann og det er et gyldig referanse til søkefeltet, fokuserer den på søkefeltet og velger teksten i det.
    if (noResults && searchInputRef.current) {
      searchInputRef.current.focus(); // Fokuserer på søkefeltet
      searchInputRef.current.select(); // Velger teksten i søkefeltet
    }
  }, [noResults]);

  // Funksjon for å håndtere innsending av søk.
  const handleSearchSubmit = async (event) => {
    event.preventDefault(); // Forhindrer standard oppførsel ved innsending av skjema.

    // Sjekker om søketermen er for kort.
    if (searchTerm.trim().length < 3) {
      setSearchLengthInfo(true); // Setter tilstanden for å vise informasjon om at søketermen er for kort til å være sann.
      return; // Avbryter funksjonen.
    }

    setIsSearching(true); // Indikerer at et søk er i gang, og komponenten kan vise en indikator eller annen tilbakemelding til brukeren om at søket pågår.
    setNoResults(false); // Dette betyr at det ikke er noen tomme søkeresultater i øyeblikket.
    setError(null); // Dette betyr at det ikke er noen feil i øyeblikket. Dersom det var en tidligere feil, vil den nå være fjernet

    try {
      // bruker Fetch API for å sende en nettverksforespørsel til Open Library API. 
      // Den inkluderer en tittelparameter (searchTerm) som er kodet med encodeURIComponent for å sikre at URL-en er riktig formatert og sikker.
      const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Failed to fetch search results'); // Sender feil hvis responsen ikke er ok.
    
      const data = await response.json(); // Konverterer responsen til JSON-format.
      const newResults = data.docs; // Henter ut søkeresultatene fra responsen.
      if (newResults.length > 0) {
        setSearchResults(newResults); // Oppdaterer søkeresultatene hvis det er resultater.
        setLastSearchResults(newResults); // Lagrer de siste søkeresultatene hvis det er resultater
      } else {
        setNoResults(true); // Setter noResults til true hvis søket ga ingen resultater.
      }
      setIsSearching(false); // Setter isSearching til false når søket er ferdig.
    } catch (error) {
      console.error('Error fetching search results:', error); // Logger feilmelding ved feil.
      setIsSearching(false); // Setter isSearching til false.
      setError(error.message); // Setter feilmeldingen.
    }
  };
// Funksjon for å håndtere endringer i søkefeltet.
const handleSearchChange = event => {
  const value = event.target.value; // Inneholder den aktuelle verdien som ble skrevet inn i søkefeltet.
  setSearchTerm(value); // Oppdaterer søketermen i tilstanden.
  setSearchLengthInfo(false); // Nullstiller informasjon om søketermens lengde.

  // Oppdaterer noResults til false når søkefeltet blir tomt
  if (value.trim() === '') {
    setNoResults(false);
  }

  // Beholder de siste søkeresultatene hvis det ikke er skrevet inn en ny søketerm
  if (value.trim() === '' && lastSearchResults.length > 0) {
    setSearchResults(lastSearchResults); // Viser de siste søkeresultatene når søkefeltet er tomt
  }
};

  // Returnerer JSX for å vise komponentene i appen.
  return (
    <div className="app"> {/* Dette oppretter en <div> med klassenavn "app", som fungerer som en container for resten av innholdet i komponenten. */}
      <Header
        searchTerm={searchTerm} // Sender søketerminalen som en prop til Header-komponenten.
        handleSearchSubmit={handleSearchSubmit}  // Sender håndteringsfunksjonen for søkesending som en prop
        handleSearchChange={handleSearchChange}  // Sender håndteringsfunksjonen for søkeendringer som en prop
        searchLengthInfo={searchLengthInfo} // Sender informasjon om søketermens lengde som en prop
        error={error} // Sender eventuelle feil som en prop
        noResults={noResults} // Sender informasjon om ingen resultater som en prop
        isSearching={isSearching} // Sender informasjon om søk pågår som en prop
      />
      {!initialSearchDone && ( // Sjekker om initialSearchDone er falsk
        <InitialSearch // Rendrer InitialSearch-komponenten hvis initialSearchDone er falsk
          setInitialSearchDone={setInitialSearchDone} // Sender en funksjon for å oppdatere initialSearchDone som en prop til InitialSearch-komponenten
          setSearchResults={setSearchResults} // Sender en funksjon for å oppdatere søkeresultater som en prop til InitialSearch-komponenten
          setIsSearching={setIsSearching} // Sender en funksjon for å oppdatere søketilstand som en prop til InitialSearch-komponenten
          setError={setError} // Sender en funksjon for å oppdatere feiltilstand som en prop til InitialSearch-komponenten
        />
      )}
      <div className="book-list">
        {initialSearchDone && searchResults.length > 0 && ( // Sjekker om initialSearchDone er sant og det finnes søkeresultater
          <SearchResults results={searchResults} /> // Rendrer SearchResults-komponenten med søkeresultatene
        )}
      </div>
      <ScrollToTopButton /> {/* Rendrer ScrollToTopButton-komponenten */}
    </div>
  );
}

export default App;

// Inspirasjon fra: 
// https://www.youtube.com/watch?v=7xL9c39DhjI
// https://dev.to/learnwithparam/learn-by-building-a-book-search-app-using-react-and-its-siblings-part-1-1590
// https://booksfinder.jos3s.dev/
// https://www.youtube.com/watch?v=reN_okp2Gq4&t=526s
// https://www.youtube.com/watch?v=LNKuZBYpl4o