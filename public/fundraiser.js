//24071844 Sharan Adhikari
// Adding an event listener that triggers when the DOM content is fully loaded.
document.addEventListener('DOMContentLoaded', () => {

    // Using URLSearchParams to extract the 'id' parameter from the URL query string.
    const params = new URLSearchParams(window.location.search);
    const fundraiserId = params.get('id'); // Storing the 'id' parameter in fundraiserId.

    // If there is no 'id' in the URL, display an error message and stop further execution.
    if (!fundraiserId) {
        document.getElementById('errorMessage').textContent = 'Fundraiser ID is required.'; // Display error message.
        return; // Stop execution if the ID is missing.
    }

    // Sending a GET request to fetch the details of the fundraiser using the 'id'.
    fetch(`/fundraiser?id=${fundraiserId}`)
        .then(response => {
            // Checking if the network response is OK, otherwise throw an error.
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON.
        })
        .then(fundraiser => {
            // Finding the element with ID 'fundraiserDetails' and populating it with fundraiser details.
            const detailsDiv = document.getElementById('fundraiserDetails');
            detailsDiv.innerHTML = `
                <h2>${fundraiser.CAPTION}</h2> <!-- Displaying the fundraiser caption -->
                <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p> <!-- Displaying the organizer's name -->
                <p><strong>Target Funding:</strong> $${fundraiser.TARGET_FUNDING}</p> <!-- Displaying the target funding amount -->
                <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p> <!-- Displaying the current funding amount -->
                <p><strong>City:</strong> ${fundraiser.CITY}</p> <!-- Displaying the city of the fundraiser -->
                <p><strong>Description:</strong> ${fundraiser.DESCRIPTION}</p> <!-- Displaying the description of the fundraiser -->
                <p><strong>Status:</strong> ${fundraiser.ACTIVE ? 'Active' : 'Inactive'}</p> <!-- Displaying the status (active/inactive) -->
            `;
        })
        .catch(error => {
            // Logging the error in case of a failure in fetching data.
            console.error('Error fetching fundraiser:', error);
            // Displaying an error message in case of an issue fetching the fundraiser details.
            document.getElementById('errorMessage').textContent = 'Error fetching fundraiser details.';
        });
});
