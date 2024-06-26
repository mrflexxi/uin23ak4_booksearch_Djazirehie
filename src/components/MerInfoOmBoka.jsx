import React from 'react';

function ExportButton({ book }) {
  const handleExportClick = () => {
        try {
          // Opprett en HTML-streng med bokinformasjonen
          const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Book Information</title>
              <style>
                /* Legg til eventuelle egendefinerte stiler her */
                body {
                  font-family: Arial, sans-serif;
                }
                .book-info {
                  margin: 20px;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
                .book-info img {
                  max-width: 200px;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <div class="book-info">
                <h2>${book.title}</h2>
                <p><strong>Author(s):</strong> ${book.author_name.join(', ')}</p>
                <p><strong>Published Year:</strong> ${book.publish_year ? book.publish_year.join(', ') : 'Unknown'}</p>
                <p><strong>ISBN:</strong> ${book.isbn ? book.isbn.join(', ') : 'Not available'}</p>
                <p><strong>OpenLibrary ID:</strong> ${book.key}</p>
                <p><strong>Ratings:</strong> ${book.ratings_count}</p>
                <img src="${book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'src/assets/BookCover.jpg'}" alt="${book.title}" />
                <p><a href="https://openlibrary.org${book.key}" target="_blank"><Strong>Link to Open Library</Strong></a></p>
              </div>
            </body>
            </html>
          `;
         
          // Åpne en ny fane med den dynamiske HTML-siden
          const newWindow = window.open();
          newWindow.document.open();
          newWindow.document.write(htmlContent);
          newWindow.document.close();

          document.body.removeChild(link);
        } catch (error) {
          console.error('Error exporting book information:', error);
        }
      };

  return (
    <button className="merinfo-button" onClick={handleExportClick}>Mer om Boka</button>
  );
}

export default ExportButton;
