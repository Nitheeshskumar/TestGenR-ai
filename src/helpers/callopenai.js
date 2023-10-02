
import { fetch } from '@forge/api';
const callOpenAI = async (prompt) => {
console.log('prompt',prompt)
console.log('variables',process.env)
    const choiceCount = 1;
    // OpenAI API endpoint
    const url = `https://api.openai.com/v1/chat/completions`;
  
    // Body for API call
    const payload = {
      model: getOpenAPIModel(),
      n: choiceCount,
      messages: [{
        role: 'user',
        content: prompt
      }]
    };
  
    // API call options
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getOpenAPIKey()}`,
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(payload)
    };
  
    // API call to OpenAI
    console.log('options',options)
    try {
      const response = await fetch(url, options);
      let result = ''
      console.log('response',response)
      if (response.status === 200) {
        const chatCompletion = await response.json();
        const firstChoice = chatCompletion.choices[0]
    
        if (firstChoice) {
          result = firstChoice.message.content;
          console.log('result',result)
        } else {
          console.warn(`Chat completion response did not include any assistance choices.`);
          result = `AI response did not include any choices.`;
        }
      } else {
        const text = await response.text();
        result = text;
      }
      return result;
    }catch(e){
console.log('callopenapi',e)
return false;
    }
   
  }
  
  // Get OpenAI API key
  export const getOpenAPIKey = () => {
    return process.env.OPEN_API_KEY;
  }
  
  // Get OpenAI model
  export const getOpenAPIModel = () => {
    return 'gpt-3.5-turbo';
    // return 'gpt-4';
  }
export default callOpenAI