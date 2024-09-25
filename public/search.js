 //sharan adhikari 24071844
// Adding an event listener to the form element with the ID 'searchForm', which triggers when the form is submitted.
document.getElementById('searchForm').addEventListener('submit', function(e) {
    
    // Prevent the default form submission action to handle it via JavaScript.
    e.preventDefault();
    
    // Retrieving the value entered for the 'organizer' input field.
    const organizer = document.getElementById('organizer').value;
    
    // Retrieving the value entered for the 'city' input field.
    const city = document.getElementById('city').value;
    
    // Retrieving the value selected for the 'category' input field.
    const category = document.getElementById('category').value;

    // Calling a function to display the loading indicator while data is being fetched.
    showLoadingIndicator();

    // Using the Fetch API to send a GET request to the server, with the form values passed as query parameters.
    fetch(`/search?organizer=${organizer}&city=${city}&category=${category}`)
        .then(response => {
            
            // Checking if the response status is OK (status code 200-299); if not, throwing an error.
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Parsing the JSON data from the response.
            return response.json();
        })
        .then(data => {
            // Hiding the loading indicator as data has been successfully fetched.
            hideLoadingIndicator();
            
            // Getting the element with the ID 'fundraiserResults' where the results will be displayed.
            const fundraiserResults = document.getElementById('fundraiserResults');
            
            // Clearing any previous search results.
            fundraiserResults.innerHTML = ''; 

            // Checking if the fetched data contains any fundraisers.
            if (data.length > 0) {
                // Iterating through each fundraiser in the data array and appending it to the results.
                data.forEach(fundraiser => {
                    fundraiserResults.appendChild(createFundraiserItem(fundraiser));
                });
            } else {
                // If no fundraisers are found, displaying a message.
                fundraiserResults.innerHTML = '<p>No fundraisers found.</p>';
            }
        })
        .catch(error => {
            // Hiding the loading indicator in case of an error.
            hideLoadingIndicator();
            
            // Logging the error to the console.
            console.error('Error fetching data:', error);
            
            // Displaying an error message in the results section if data fetch fails.
            const fundraiserResults = document.getElementById('fundraiserResults');
            fundraiserResults.innerHTML = '<p>An error occurred while fetching data. Please try again later.</p>';
        });
});

// Function to create an HTML element for a single fundraiser item using the data from the server.
function createFundraiserItem(fundraiser) {
    
    // Creating a new 'div' element to hold the fundraiser information.
    const item = document.createElement('div');
    
    // Setting the class name for styling purposes.
    item.className = 'fundraiser-item';
    
    // Using template literals to set the HTML content of the 'div', including the fundraiser details.
    item.innerHTML = `
        <h3>${fundraiser.caption}</h3>
        <p>Organizer: ${fundraiser.organizer}</p>
        <p>City: ${fundraiser.city}</p>
        <p>Current Funding: $${fundraiser.currentFunding}</p>
        <p>Target Funding: $${fundraiser.targetFunding}</p>
        <a href="/fundraiser/${fundraiser.fundraiserId}">View Details</a>
    `;
    
    // Returning the created 'div' element so it can be appended to the results.
    return item;
}

// Function to show a loading message while waiting for data to be fetched.
function showLoadingIndicator() {
    
    // Getting the element where results are displayed.
    const fundraiserResults = document.getElementById('fundraiserResults');
    
    // Setting the inner HTML to display a loading message.
    fundraiserResults.innerHTML = '<p>Loading...</p>';
}

// Function to hide the loading message once data has been fetched or an error occurs.
function hideLoadingIndicator() {
    
    // Getting the element where results are displayed.
    const fundraiserResults = document.getElementById('fundraiserResults');
    
    // Clearing the inner HTML to remove the loading message.
    fundraiserResults.innerHTML = '';
}
