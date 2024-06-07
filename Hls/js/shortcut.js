function resetDataAndParameter() {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#222';
    popup.style.color = '#fff';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1000';

    const message = document.createElement('p');
    message.textContent = 'Are you sure you want to clear all your data?';
    message.style.marginBottom = '20px';
    popup.appendChild(message);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'space-between';
    buttonContainer.style.gap = '10px';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Yes';
    confirmButton.style.backgroundColor = '#555';
    confirmButton.style.color = '#fff';
    confirmButton.style.border = 'none';
    confirmButton.style.padding = '10px 20px';
    confirmButton.style.borderRadius = '5px';
    confirmButton.style.cursor = 'pointer';
    confirmButton.onclick = () => {
        localStorage.clear();
        const url = new URL(window.location);
        url.search = ''; // Clear all existing parameters
        url.searchParams.set('p', '1'); // Set 'p' parameter to '1'
        history.pushState({}, '', url);
        document.body.removeChild(popup);
    };

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'No';
    cancelButton.style.backgroundColor = '#555';
    cancelButton.style.color = '#fff';
    cancelButton.style.border = 'none';
    cancelButton.style.padding = '10px 20px';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.onclick = () => {
        document.body.removeChild(popup);
    };

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    popup.appendChild(buttonContainer);

    document.body.appendChild(popup);
}

document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === '1') {
        updatePageParameter('1');
    } else if (event.altKey && event.key === '2') {
        updatePageParameter('2');
    } else if (event.altKey && event.key === '3') {
        updatePageParameter('3');
    } else if (event.altKey && event.key === '4') {
        updatePageParameter('4');
    } else if (event.altKey && event.key === '5') {
        updatePageParameter('5');
    } else if (event.altKey && event.key === '6') {
        updatePageParameter('6');
    } else if (event.altKey && (event.key === 'm' || event.key === 'M')) {
        redirectToRandomMovie();
    } else if (event.altKey && (event.key === 's' || event.key === 'S')) {
        redirectToRandomSeries();
    } else if (event.altKey && (event.key === 'x' || event.key === 'X')) {
        removeAllParametersExceptP();
    } else if (event.altKey && event.key === 'Delete') {
        resetDataAndParameter();
    } else if (event.altKey && event.key === 'ArrowRight') {
        goToNextPage();                             
    } else if (event.altKey && event.key === 'ArrowLeft') {
        goToPreviousPage();
    }
});

function isRestrictedPath() {
    const path = window.location.pathname;
    return path.includes('/anime/') || path.includes('/livetv/');
}

function updatePageParameter(page) {
    const url = new URL(window.location);
    if (isRestrictedPath()) {
        window.location.href = `../?p=${page}`;
    } else {
        url.search = ''; 
        url.searchParams.set('p', page);
        history.pushState({}, '', url);
    }
}

function removeAllParametersExceptP() {
    const url = new URL(window.location);
    const pValue = url.searchParams.get('p') || '1'; 
    url.search = ''; 
    url.searchParams.set('p', pValue);
    history.pushState({}, '', url);
}

function goToPreviousPage() {
    history.back();
}

function goToNextPage() {
    history.forward();
}

async function getRandomMovieId() {
    const encodedApiKey = 'ZjZlODQwMzMyMTQyZjc3NzQ2MTg1YWI0ZTY3YmU4NTg=';
    const apiKey = atob(encodedApiKey);
    try {
        const totalPagesResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        const totalPagesData = await totalPagesResponse.json();
        const totalPages = Math.min(totalPagesData.total_pages, 500);

        const randomPage = Math.floor(Math.random() * totalPages) + 1;
        const randomPageResponse = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${randomPage}`);
        const randomPageData = await randomPageResponse.json();
        const movies = randomPageData.results;

        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        return randomMovie.id;
    } catch (error) {
        console.error('Error fetching random movie ID:', error);
        return null;
    }
}

async function redirectToRandomMovie() {
    const randomMovieId = await getRandomMovieId();
    if (randomMovieId !== null) {
        const url = new URL(window.location);
        const currentPage = url.searchParams.get('p') || '1';
        url.search = '';
        url.searchParams.set('p', currentPage);
        url.searchParams.set('m', `m-${randomMovieId}`);
        history.pushState({}, '', url);
    } else {
        console.error('Failed to fetch random movie ID');
    }
}

async function getRandomSeriesId() {
    const encodedApiKey = 'ZjZlODQwMzMyMTQyZjc3NzQ2MTg1YWI0ZTY3YmU4NTg=';
    const apiKey = atob(encodedApiKey);
    try {
        const totalPagesResponse = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`);
        const totalPagesData = await totalPagesResponse.json();
        const totalPages = Math.min(totalPagesData.total_pages, 500);

        const randomPage = Math.floor(Math.random() * totalPages) + 1;
        const randomPageResponse = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=${randomPage}`);
        const randomPageData = await randomPageResponse.json();
        const series = randomPageData.results;

        const randomSeries = series[Math.floor(Math.random() * series.length)];
        return randomSeries.id;
    } catch (error) {
        console.error('Error fetching random series ID:', error);
        return null;
    }
}

async function redirectToRandomSeries() {
    const randomSeriesId = await getRandomSeriesId();
    if (randomSeriesId !== null) {
        const url = new URL(window.location);
        const currentPage = url.searchParams.get('p') || '1';
        url.search = '';
        url.searchParams.set('p', currentPage);
        url.searchParams.set('m', `s-${randomSeriesId}`);
        history.pushState({}, '', url);
    } else {
        console.error('Failed to fetch random series ID');
    }
}
