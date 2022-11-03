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
				//Content div
				const content = document.createElement("div");
				genreContainer.appendChild(content);
				content.classList.add("genreContent");
				//Create flex-div
				const flexDiv = document.createElement("div");
				content.appendChild(flexDiv);
				flexDiv.classList.add("genreFlex");
				//Create and append category name
				const genreName = document.createElement("h2");
				flexDiv.appendChild(genreName);
				genreName.innerHTML = `${genre}`;
				//Create and append div that contains the films
				const filmContainer = document.createElement("div");
				flexDiv.appendChild(filmContainer);
				filmContainer.setAttribute("id", `${genre}`);
				filmContainer.classList.add("filmContainer");
				//Arrow div
				const arrowContainer = document.createElement("div");
				arrowContainer.classList.add("arrowContainer");
				content.appendChild(arrowContainer);
				//Arrow for flex div
				const arrowRight = document.createElement("img");
				arrowContainer.appendChild(arrowRight);
				arrowRight.setAttribute("src", "/assets/images/arrowForward.svg");
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
						${film.name}
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
