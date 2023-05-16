const API_KEY = 'sk-';
const CHATGPT_API_URL = 'https://api.openai.com/v1/completions';

export const chatGPT = async (message: string) => {
  try {
    const response = await fetch(CHATGPT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `${persona}: ${business} ${outcomes} ${message}`,
        model: "text-davinci-003",
         temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from OpenAI API:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].text.trim();

  } catch (error) {
    return JSON.stringify(error);
  }
};
