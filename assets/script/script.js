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
		generateGenres();
	});

//Dynamically generate sections of genres
const generateGenres = () => {
	dataArr.forEach((film) => {
		film.genres.forEach((genre) => {
			if (!document.getElementById(`${genre}`)) {
				//Create flex-div
				const flexDiv = document.createElement("div");
				genreContainer.appendChild(flexDiv);
				flexDiv.classList.add("genreFlex");
				//Title
				const headerContainer = document.createElement("div");
				flexDiv.appendChild(headerContainer);
				headerContainer.classList.add("headerFlex");
				//Create and append category name
				const genreName = document.createElement("h2");
				headerContainer.appendChild(genreName);
				genreName.innerHTML = `${genre}`;
				//Create and append div that contains the films
				const filmContainer = document.createElement("div");
				flexDiv.appendChild(filmContainer);
				filmContainer.setAttribute("id", `${genre}`);
				filmContainer.classList.add("filmContainer");
				//Arrow div
				const arrowContainer = document.createElement("div");
				arrowContainer.classList.add("arrowContainer");
				headerContainer.appendChild(arrowContainer);
				//arrows and H2 in header
				const arrowLeft = document.createElement("img");
				arrowContainer.appendChild(arrowLeft);
				arrowLeft.setAttribute("src", "/assets/images/arrowBack.svg");
				arrowLeft.classList.add("arrow");
				const arrowRight = document.createElement("img");
				arrowContainer.appendChild(arrowRight);
				arrowRight.setAttribute("src", "/assets/images/arrowForward.svg");
				arrowRight.classList.add("arrow");
				arrowRight.style.color = "white";
			}
		});
	});
	//Filter films out in the correct genre category
	dataArr.forEach((film) => {
		film.genres.forEach((genre) => {
			let container = document.getElementById(`${genre}`);
			if (genre == container.id) {
				container.innerHTML += `
                <div class="card">
					<div class = "cardContent">
					<img src="${film.image.medium}" draggable="false">
					<p>${film.name}</p>
					</div>
				</div>
                `;
			}
		});
	});
	scrollableDiv();
};

//scrollable containers
const scrollableDiv = () => {
	const filmContainer = document.querySelectorAll(".filmContainer");
	let isDown = false;
	let startX;
	let scrollLeft;

	filmContainer.forEach((slider) => {
		slider.addEventListener("mousedown", (e) => {
			isDown = true;
			slider.classList.add("active");
			startX = e.pageX - slider.offsetLeft;
			scrollLeft = slider.scrollLeft;
		});
		slider.addEventListener("mouseleave", () => {
			isDown = false;
			slider.classList.remove("active");
		});
		slider.addEventListener("mouseup", () => {
			isDown = false;
			slider.classList.remove("active");
		});
		slider.addEventListener("mousemove", (e) => {
			if (!isDown) return;
			e.preventDefault();
			const x = e.pageX - slider.offsetLeft;
			const walk = (x - startX) * 2; //scroll-fast
			slider.scrollLeft = scrollLeft - walk;
		});
	});
};

// //Filter films
// const filter = (value) => {
// 	console.log(value);
// 	const genres = document.querySelectorAll(`.genreFlex:not(.${value})`);
// 	genres.forEach((genre) => {
// 		console.log(genre);
// 	});
// };

// let checkboxes = document.querySelectorAll(".checkbox");
// checkboxes.forEach((checkbox) => {
// 	checkbox.addEventListener("click", () => {
// 		if (checkbox.checked === true) {
// 			filter(checkbox.value);
// 		}
// 	});
// });
