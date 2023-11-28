import { fetch } from "@forge/api";
import { getSelectedApikey } from "./storageHelper";
const callOpenAI = async (prompt, projectKey) => {
  const messages = [
    { role: "system", content: "You are a helpful coding assistant." },
    { role: "user", content: prompt },
  ];

  const schema = {
    type: "object",
    properties: {
      result: {
        type: "array",
        items: {
          type: "object",
          properties: {
            label: {
              type: "string",
              description: "test case description",
            },
            // id: {
            //   type: "string",
            //   description: "unique identifier",
            // },
            // isChecked: {
            //   type: "boolean",
            //   enum: [false],
            //   description: "always returns false",
            // },
          },
        },
      },
    },
  };

  const choiceCount = 1;
  // OpenAI API endpoint
  const url = `https://api.openai.com/v1/chat/completions`;

  // Body for API call
  const payload = {
    model: getOpenAPIModel(),
    n: choiceCount,
    messages: messages,
    functions: [{ name: "test_case_generator", parameters: schema }],
    function_call: { name: "test_case_generator" },
  };

  // API call to OpenAI
  try {
    const openaikey = await getSelectedApikey(projectKey);
    // API call options
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openaikey}`,
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(payload),
    };
    console.log("openaikey ", options);
    const response = await fetch(url, options);
    let result = "";
    if (response.status === 200) {
      const chatCompletion = await response.json();
      const firstChoice = chatCompletion.choices[0];

      if (firstChoice) {
        result = JSON.parse(firstChoice.message.function_call.arguments);
      } else {
        console.warn(`Chat completion response did not include any assistance choices.`);
        // result = `AI response did not include any choices.`;
        result = { result: [] };
      }
    } else {
      // const text = await response.text();
      // result = text;
      console.log("status not 200: ", response);
      result = { result: [] };
    }
    return result.result.map((el) => ({ ...el, id: getUniqueId() }));
  } catch (e) {
    console.log("error in callopenai", e);
    return false;
  }
};

// Get OpenAI API key
export const getOpenAPIKey = async (projectKey) => {
  const openaikey = await getSelectedApikey(projectKey);
  return openaikey;
  // return process.env.OPEN_API_KEY;
};

// Get OpenAI model
export const getOpenAPIModel = () => {
  return "gpt-3.5-turbo";
  // return 'gpt-4';
};

export const getUniqueId = () => "_" + Math.random().toString(16).slice(2, 15);
export default callOpenAI;
