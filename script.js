//sharan adhikari 24071844
// Adding an event listener that triggers when the DOM content is fully loaded.
document.addEventListener('DOMContentLoaded', function () {

    // Selecting the search form and the fundraiser list elements from the DOM.
    const searchForm = document.querySelector('#search-form');
    const fundraiserList = document.querySelector('#fundraiser-list');

    // Function to show a loading indicator in the fundraiser list area.
    function showLoadingIndicator() {
        fundraiserList.innerHTML = '<p>Loading...</p>'; // Displaying a loading message.
    }

    // Function to hide the loading indicator once data is loaded.
    function hideLoadingIndicator() {
        fundraiserList.innerHTML = ''; // Clearing the loading message.
    }

    // Function to create a fundraiser card element with details of a single fundraiser.
    function createFundraiserCard(fundraiser) {
        // Creating a new 'div' element to serve as a card for the fundraiser.
        const card = document.createElement('div');
        
        // Assigning the 'fundraiser-card' class to the newly created div for styling purposes.
        card.className = 'fundraiser-card';

        // Using template literals to add an image, title, goal, raised amount, and a link to more details.
        card.innerHTML = `
            <img src="/images/${fundraiser.image}" alt="Fundraiser Image">
            <h3>${fundraiser.title}</h3>
            <p>Goal: $${fundraiser.goal} | Raised: $${fundraiser.raised}</p>
            <a href="/fundraiser.html?id=${fundraiser.id}">Learn More</a>
        `;

        // Returning the completed card element to be added to the DOM.
        return card;
    }

    // Function to fetch the list of all fundraisers from the server.
    function fetchFundraisers() {
        // Showing the loading indicator while waiting for the data to load.
        showLoadingIndicator();
        
        // Sending a GET request to fetch the fundraisers from the server.
        fetch('/fundraisers')
            .then(response => response.json()) // Parsing the response as JSON.
            .then(data => {
                // Hiding the loading indicator once the data is loaded.
                hideLoadingIndicator();
                
                // Clearing any existing content in the fundraiser list.
                fundraiserList.innerHTML = ''; 
                
                // Iterating through the list of fundraisers and creating a card for each one.
                data.forEach(fundraiser => {
                    fundraiserList.appendChild(createFundraiserCard(fundraiser));
                });
            })
            .catch(error => {
                // Logging any errors that occur while fetching data.
                console.error('Error:', error);
                
                // Displaying an error message in the fundraiser list area.
                fundraiserList.innerHTML = '<p>Error loading fundraisers. Please try again later.</p>';
            });
    }

    // Calling the fetchFundraisers function to load the fundraisers when the page is first loaded.
    fetchFundraisers();

    // Checking if the search form exists on the page.
    if (searchForm) {
        // Adding a submit event listener to the search form to handle searches.
        searchForm.addEventListener('submit', function (e) {
            // Preventing the default form submission action.
            e.preventDefault();

            // Getting the search query entered by the user.
            const query = document.querySelector('#search-query').value;

            // Showing the loading indicator while the search results are being fetched.
            showLoadingIndicator();

            // Sending a GET request to search for fundraisers based on the user's query.
            fetch(`/search?query=${query}`)
                .then(response => response.json()) // Parsing the response as JSON.
                .then(data => {
                    // Hiding the loading indicator after receiving the search results.
                    hideLoadingIndicator();
                    
                    // Clearing the previous search results from the fundraiser list.
                    fundraiserList.innerHTML = ''; 
                    
                    // Iterating through the search results and creating a card for each fundraiser.
                    data.forEach(fundraiser => {
                        fundraiserList.appendChild(createFundraiserCard(fundraiser));
                    });
                })
                .catch(error => {
                    // Logging any errors that occur during the search request.
                    console.error('Error:', error);
                    
                    // Displaying an error message if the search fails.
                    fundraiserList.innerHTML = '<p>Error loading fundraisers. Please try again later.</p>';
                });
        });
    }
});
