document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const fundraiserId = params.get('id');

    if (!fundraiserId) {
        document.getElementById('errorMessage').textContent = 'Fundraiser ID is required.';
        return;
    }

    fetch(`/fundraiser?id=${fundraiserId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(fundraiser => {
            const detailsDiv = document.getElementById('fundraiserDetails');
            detailsDiv.innerHTML = `
                <h2>${fundraiser.CAPTION}</h2>
                <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                <p><strong>Target Funding:</strong> $${fundraiser.TARGET_FUNDING}</p>
                <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p>
                <p><strong>City:</strong> ${fundraiser.CITY}</p>
                <p><strong>Description:</strong> ${fundraiser.DESCRIPTION}</p>
                <p><strong>Status:</strong> ${fundraiser.ACTIVE ? 'Active' : 'Inactive'}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching fundraiser:', error);
            document.getElementById('errorMessage').textContent = 'Error fetching fundraiser details.';
        });
});
