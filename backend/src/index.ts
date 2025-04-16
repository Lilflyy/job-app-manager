import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import { config } from 'dotenv';
import { extractJobData } from './gptservice';
config();

const apiKey = process.env.OPENAI_API_KEY;

const app = express();
const PORT = 3300;

app.use(cors());
app.use(express.json());

app.post('/fetch-job', async (req: Request, res: Response) => {
  const { url } = req.body;
  console.log("received request", JSON.stringify(req.body, null, 2));
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
      }
    });
    console.log("Successfully scraped the data from link: ",url);

    const html = response.data;

    const extracted = await extractJobData(html);
    if (!extracted) {
      return res.status(500).json({ error: "GPT failed to extract data" });
    }
  
    res.json(extracted);
    console.log("responded to the request")
  } catch (error: any) {
    console.error('Error fetching URL:', error.message);
    res.status(500).json({ error: 'Failed to fetch URL content' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
