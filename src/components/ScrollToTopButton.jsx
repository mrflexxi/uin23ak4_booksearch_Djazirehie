// ScrollToTopButton.jsx

import React from 'react';

function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={scrollToTop} className="scroll-to-top-button">
      Til toppen
    </button>
  );
}

export default ScrollToTopButton;
