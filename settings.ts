var baseUrl = 'https://localhost:5001/';

if(window.location.origin.includes('staging')) {
    baseUrl = 'https://librarymanager-api-staging.herokuapp.com/';
} else {
    baseUrl = 'https://librarymanager-api.herokuapp.com/'
}

export { baseUrl };