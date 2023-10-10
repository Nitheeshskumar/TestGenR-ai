import api, { route } from "@forge/api";
import callOpenAI from "./callopenai";
const getDescription = async (issuekey) => {
  const commentsData = await api.asApp().requestJira(route`/rest/api/3/issue/${issuekey}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const responseData = await commentsData.json();
  const jsonData = responseData.fields.description;
  let extractedText = [];
  jsonData.content.forEach((content) => {
    if (content.type === "paragraph" && content.content) {
      content.content.forEach((innercontent) => {
        extractedText.push(innercontent.text);
      });
    }
  });
  return extractedText.join(" ");
};
export default getDescription;
