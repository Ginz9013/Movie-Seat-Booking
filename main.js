const container = document.querySelector(".container");
const movie = document.querySelector("#movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");

let ticketPrice = +movie.value;

// --- METHODS ---

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// cal Seats
function UpdateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .selected");

  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCounts = selectedSeats.length;

  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;
}

// Get data from lacalstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  // Get movie from localstorage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
  }

  // Get price from lacalstorage
  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

  if (selectedMoviePrice !== null) {
    ticketPrice = +selectedMoviePrice;
    UpdateSelectedCount();
  }
}

// Movie select event
movie.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  UpdateSelectedCount();
});

// Seats select event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    // calSeats();
    UpdateSelectedCount();
  }
});

// Initial
populateUI();
