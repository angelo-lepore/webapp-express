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
  connection.query(sql, [id], (err, results) => {
    // se si verifica un errore durante la connessione o l'esecuzione della query
    if (err) return res.status(500).json({ error: "Database query failed" });
    // se non viene trovato alcun risultato (l'ID non esiste nella tabella "movies"),
    if (results.length === 0)
      return res.status(404).json({ error: "Post not found" });
    // aggiungiamo il percorso completo dell'immagine per ogni film
    results.map((item) => {
      item.image = `${process.env.SERVER_URL}/imgs/movies_cover/` + item.image;
    });
    // se l'elemento è stato trovato, lo restituisce come risposta JSON
    return res.json(results[0]);
  });
}

// esportiamo tutto
module.exports = { index, show };
