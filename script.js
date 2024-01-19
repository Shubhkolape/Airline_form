document.addEventListener('DOMContentLoaded', function () {
    const circle = document.getElementById('circle');
    const mainDiv = document.getElementById('mainDiv');
    const issueForm = document.getElementById('issueForm');

    let isChatbotOpen = false;

    function toggleChatbot() {
        isChatbotOpen = !isChatbotOpen;
        mainDiv.style.display = isChatbotOpen ? 'block' : 'none';
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const email = localStorage.getItem('userEmail') || '';
        const sessionId = sessionStorage.getItem('df-messenger-sessionID') || '';
        const issue = document.getElementById('w3review').value;

        console.log(email, sessionId, issue);

        try {
            const response = await axios.post('https://sheet.best/api/sheets/a29f63ad-148f-4a21-ab45-f56c8697afee', {
                Email: email,
                SessionId: sessionId,
                Issue: issue
            });

            console.log('Post Response:', response);

            // Reset form values
            document.getElementById('first').value = '';
            document.getElementById('Sessoonid').value = '';
            document.getElementById('w3review').value = '';

            // Fetch updated data after submission
            getData();
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    async function getData() {
        try {
            const response = await axios.get('https://sheet.best/api/sheets/a29f63ad-148f-4a21-ab45-f56c8697afee');
            
            console.log('Get Data Response:', response.data);

            // Update your UI with the fetched data (response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    circle.addEventListener('click', toggleChatbot);
    issueForm.addEventListener('submit', handleSubmit);

    // Fetch initial data
    getData();
});
