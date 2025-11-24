// const axios = require('axios');
import axios from 'axios'

// Fetching data from a public API
axios.get('https://api.agify.io?name=michael')
.then(response => {
    // Logging the response data
    console.log('Response Data:', response.data);
})
.catch(error => {
    // Logging an error message if the request fails
    console.error('Error fetching data:', error.message);
});