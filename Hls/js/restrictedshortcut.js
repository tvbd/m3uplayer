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

function goToPreviousPage() {
    history.back();
}

function goToNextPage() {
    history.forward();
}
