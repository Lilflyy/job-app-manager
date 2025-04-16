import axios from 'axios';

async function fetchUrlContent(url:string) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    return html; // Or extract text using a parser if needed
  } catch (error) {
    console.error("Error fetching URL:", error);
    return null;
  }
}

export { fetchUrlContent };