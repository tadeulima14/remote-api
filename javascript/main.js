document.addEventListener('DOMContentLoaded', function () {
    // Code for the Art Institute of Chicago's API
    const artworkId = '129884';

    const apiUrlArtInstitute = `https://api.artic.edu/api/v1/artworks/${artworkId}`;

    // Fetch the data from the Art Institute of Chicago's API
    fetch(apiUrlArtInstitute)
        .then(response => response.json())
        .then(data => {
            const artworkContainer = document.getElementById('artwork-container');

            // Check if the response has an image ID
            const imageUrl = data?.data?.image_id
                ? `https://www.artic.edu/iiif/2/${data.data.image_id}/full/800,/0/default.jpg`
                : null;

            // Check if the image URL exists
            if (imageUrl) {
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                imageElement.alt = 'Starry Night and the Astronauts';
                artworkContainer.appendChild(imageElement);
            } else {
                artworkContainer.innerHTML = '<p>Loading error</p>';
            }
        })
        .catch(error => console.error('Error fetching Art Institute data:', error));

    const breweryApiUrl = 'https://api.openbrewerydb.org/v1/breweries'; //import api

    const breweryContainer = document.getElementById('brewery-container'); //asign js to existing html class

    // Fetch the data from the Open Brewery DB API and select the brewery at index 1
    fetch(`${breweryApiUrl}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) { //data = imported json info
                const brewery = data[5];//adjusts the index of brewery variable, shown on page
                displayBrewery(brewery);
            } else {
                breweryContainer.innerHTML = '<p>No brewery available.</p>';
            }
        })
        .catch(error => console.error('Error fetching brewery:', error));

    function displayBrewery(brewery) { //create html elements for json data I used from collection
        const breweryElement = document.createElement('div');
        breweryElement.classList.add('brewery');

        const nameElement = document.createElement('h2');
        nameElement.textContent = brewery.name;

        const addressElement = document.createElement('p');
        addressElement.textContent = `Address: ${brewery.address_1}, ${brewery.city}, ${brewery.state_province}, ${brewery.postal_code}`;

        const phoneElement = document.createElement('a');
        phoneElement.href = brewery.phone;
        phoneElement.textContent = brewery.phone;

        breweryElement.appendChild(nameElement);
        breweryElement.appendChild(addressElement);
        breweryElement.appendChild(phoneElement);

        breweryContainer.appendChild(breweryElement);
    }
});
