// api.js
import axios from 'axios';
import md5 from 'md5'; // Asegúrate de tener instalada la biblioteca md5

const publicKey = '41edff1b71f802305f641d0c4ede754a';
const privateKey = 'f5804545fe6cb2badb0939acfc4a5f29df82149e';
const baseURL = 'https://gateway.marvel.com/v1/public';

const generateHash = (timestamp) => {
  return md5(`${timestamp}${privateKey}${publicKey}`);
};

export const fetchData = async (endpoint) => {
  const timestamp = new Date().getTime();
  const hash = generateHash(timestamp);

  try {
    const response = await axios.get(`${baseURL}/${endpoint}`, {
      params: {
        apikey: publicKey,
        ts: timestamp,
        hash: hash,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
