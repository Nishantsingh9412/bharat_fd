import axios from 'axios';

// const AZURE_TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY
// const AZURE_REGION = process.env.AZURE_REGION
// const AZURE_ENDPOINT = process.env.AZURE_ENDPOINT

const translateText = async (text, targetLang) => {
    try {
        const response = await axios.post(
            `${process.env.AZURE_ENDPOINT}/translate?api-version=3.0&to=${targetLang}`,
            [{ Text: text }],
            {
                headers: {
                    'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
                    'Ocp-Apim-Subscription-Region': process.env.AZURE_REGION,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data[0].translations[0].text;
    } catch (error) {
        // console.error("Translation Error:", error.response ? error.response.data : error.message);
        return text;
    }
};

export default translateText;
