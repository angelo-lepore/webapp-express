// importiamo il modulo "connection"
const connection = require("../db/connection");

/* rotte CRUD */

/* index (read all) */
function index(req, res) {
  // definiamo una query SQL che seleziona tutta la tabella "movies"
  const sql = "SELECT * FROM movies";
  // eseguiamo la query usando la connessione al database
  connection.query(sql, (err, results) => {
    // se c'è un errore durante l'esecuzione della query, restituiamo un errore 500 al client
    if (err) return res.status(500).json({ error: "Database query failed" });
    // aggiungiamo il percorso completo dell'immagine per ogni film
    results.map((item) => {
      item.image = `${process.env.SERVER_URL}/imgs/movies_cover/` + item.image;
    });
    // se non ci sono errori, restituiamo i risultati della query in formato JSON
    res.json(results);
  });
}

/* show (read) */
function show(req, res) {
  // estrae l'ID dalla URL e lo converte da stringa a numero
  const id = parseInt(req.params.id);
  // definiamo la query SQL per selezionare un elemento dalla tabella "movies" con l'ID specificato
  const sql = "SELECT * FROM movies WHERE id = ? ;";
  // esegue la query sul database, passando l'ID come parametro
  connection.query(sql, [id], (err, result) => {
    // se si verifica un errore durante la connessione o l'esecuzione della query
    if (err) return res.status(500).json({ error: "Database query failed" });
    // se non viene trovato alcun risultato (l'ID non esiste nella tabella "movies"),
    if (result.length === 0)
      return res.status(404).json({ error: "Movie not found" });
    // salviamo il film ottenuto dalla query
    const movie = result[0];
    // definiamo la query SQL per ottenere tutte le recensioni associate al film
    const reviewsSql = "Select * from reviews WHERE movie_id=?";
    // eseguiamo la query per ottenere le recensioni del film
    connection.execute(reviewsSql, [id], (err, result) => {
      // se si verifica un errore durante l'esecuzione della query delle recensioni, restituiamo un errore 500
      if (err) return res.status(500).json({ error: "Database query failed" });
      // salviamo le recensioni ottenute
      const movieReviews = result;
      // aggiungiamo le recensioni all'oggetto "movie"
      movie.reviews = movieReviews;
      // aggiungiamo il percorso completo dell'immagine del film
      movie.image = `${process.env.SERVER_URL}/imgs/movies_cover/${movie.image}`;
      // restituiamo il film (con le recensioni e l'immagine aggiornata) come risposta JSON
      return res.json(movie);
    });
  });
}

// esportiamo tutto
module.exports = { index, show };
