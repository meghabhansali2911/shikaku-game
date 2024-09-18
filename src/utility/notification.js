const axios = require('axios'); // Import Axios

module.exports = async (number, text) => {
    try {
        const apiUrl = 'https://api.example.com/send-notification'; // Replace with your API URL for sending notifications

        const payload = {
            mobileNumber: number,
            message: text
        };

        const response = await axios.post(apiUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer YOUR_API_KEY' 
            }
        });

        console.log('Notification sent successfully:', response.data);
    } catch (error) {
        console.error('An error occurred:', error.response ? error.response.data : error.message);
    }
};
