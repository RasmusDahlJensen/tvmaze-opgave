//Fetch dom element
const genreContainer = document.getElementById("genres");

//Create array
const dataArr = [];

//Fetch data
fetch("https://api.tvmaze.com/shows")
	.then((response) => response.json())

	.then((data) => dataArr.push(...data))

	.catch((error) => console.error(error))

	.finally(() => {
		dataArr.forEach((film) => {
			generateGenres(film.genres);
		});
	});

//Dynamically generate sections of genres
const generateGenres = (genre) => {
	genre.forEach((genre) => {
		if (!document.getElementById(`${genre}`)) {
			//Create flex-div
			const flexDiv = document.createElement("div");
			genreContainer.appendChild(flexDiv);
			flexDiv.classList.add("genreFlex");
			// flexDiv.setAttribute("id", `${genre}`);
			//Create and append category name
			const genreName = document.createElement("h2");
			flexDiv.appendChild(genreName);
			genreName.innerHTML = `${genre}`;
			//Create and append div that contains the films
			const filmContainer = document.createElement("div");
			flexDiv.appendChild(filmContainer);
			filmContainer.setAttribute("id", `${genre}`);
		}
	});
};
