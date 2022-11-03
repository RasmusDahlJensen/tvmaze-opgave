//Grab film name from first file
let filmName;
window.onload = filmName = localStorage.getItem("storage");

//Fetch dom element
let container = document.getElementById("filmContainer");

//Create array
const dataArr = [];

//Fetch data
fetch("https://api.tvmaze.com/shows")
	.then((response) => response.json())

	.then((data) => dataArr.push(...data))

	.catch((error) => console.error(error))

	.finally(() => {
		renderFilm();
	});

const renderFilm = () => {
	dataArr.forEach((film) => {
		if (film.name === filmName) {
			container.innerHTML = `
            
            ${film.name}
            ${film.status}
            <img src="${film.image.original}">
            ${film.rating.average}
            ${film.summary}
            ${film.language}
            ${film.officialSite}
            ${film.schedule.days}

            `;
		}
	});
};
