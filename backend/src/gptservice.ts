import { OpenAI } from "openai";
import { config } from 'dotenv';
config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function extractJobData(html: string) {
  const prompt = `
  Extract the following fields from this job posting HTML:

  - Job Title
  - Company Name
  - Job Description (brief summary)

  Return only JSON like this:
  {
    "jobTitle": "...",
    "companyName": "...",
    "jobDescription": "..."
  }

  Here is the job posting HTML:
  """${html}"""
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful job parsing assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.2,
  });

  const raw = response.choices[0].message.content;
  try {
    return JSON.parse(raw || "{}");
  } catch {
    return null;
  }
}
