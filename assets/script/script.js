const dataArr = [];

fetch("https://api.tvmaze.com/shows")
	.then((response) => response.json())

	.then((data) => dataArr.push(...data))

	.catch((error) => console.error(error))

	.finally(() => {
		dataArr.forEach((ele) => {
			generateGenres(ele.genres);
		});
	});

const generateGenres = (genre) => {
	console.log(genre);
};
