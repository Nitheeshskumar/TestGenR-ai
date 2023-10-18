import api, { route } from "@forge/api";
const getDescription = async (issuekey) => {
  const descriptionData = await api.asApp().requestJira(route`/rest/api/3/issue/${issuekey}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const responseData = await descriptionData.json();
  const jsonData = responseData.fields.description;
  let extractedText = [];
  //we are checking only for content type paragraph for now, formatted texts are included but not lists or images
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
