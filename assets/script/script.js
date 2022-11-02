//Fetch dom element
let genreContainer = document.getElementById("genres");

//Create array
const dataArr = [];

//Fetch data
fetch("https://api.tvmaze.com/shows")
	.then((response) => response.json())

	.then((data) => dataArr.push(...data))

	.catch((error) => console.error(error))

	.finally(() => {
		dataArr.forEach((ele) => {
			generateGenres(ele.genres);
		});
	});

//Generate sections of genres
const generateGenres = (genre) => {
	console.log(genre);
};
