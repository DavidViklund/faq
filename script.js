// Funktion som körs när en titel klickas på
function toggle(e) {
  // Hämta den klickade titeln o beskrivning
  const title = e.currentTarget;
  const description = title.nextElementSibling;

  // Ändrar klassen för att via eller dölja
  title.classList.toggle("active");
  description.classList.toggle("active");

  //Hämta post-ID genom att använda numrent i elementets id (section 1 = nr1)
  const postId = title.parentElement.id.replace("section", "");

  //Hämtar data fråne n extern källa baserat på post-ID
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json()) //Konverterar svaret till JSON-format
    .then((data) => {
      //Om beskrivingen är synlig visas den hämtade datan. Annars, rensa
      if (description.classList.contains("active")) {
        description.textContent = data.body;
        // Visa hämtad data i beskrivning
      } else {
        description.textContent = "";
        //Rensa beskriviing om den är dold
      }
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
      // Visar felmeddelande om hämnting misslyckas
    });
}
//Lägger till en eventlyssnare för varje titel som anropar toggle funktionen när de klickas
document.querySelectorAll(".title").forEach((title) => {
  title.addEventListener("click", toggle);
});
