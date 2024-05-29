require('dotenv').config();
const axios = require('axios');

const accessToken = process.env.ACCESS_TOKEN;
const phoneNumberId = process.env.PHONE_NUMBER_ID;
const recipientPhoneNumber = '919064057662';
const templateName = 'successfullpayment';
const whatsappApiUrl = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

async function sendMessage() {
    try {
        const response = await axios.post(
            whatsappApiUrl,
            {
                messaging_product: 'whatsapp',
                to: recipientPhoneNumber,
                type: 'template',
                template: {
                    name: templateName,
                    language: {
                        code: 'en_US'
                    }
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Message sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
}

sendMessage();
