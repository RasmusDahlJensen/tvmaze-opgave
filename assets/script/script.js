const dataArr = [];

fetch("https://api.tvmaze.com/shows")
	.then((response) => response.json())

	.then((data) => dataArr.push(...data))

	.catch((error) => console.error(error))

	.finally(() => {
		dataArr.forEach((ele) => {
			console.log(ele.genres);
		});
	});
