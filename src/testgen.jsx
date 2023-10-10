import api, { route } from "@forge/api";
import getDescription from "./helpers/getdescription";
import callOpenAI from "./helpers/callopenai";
import { storageSetHelper } from "./helpers/storageHelper";
//  const result={
//   "result": [
//     {
//       "label": "Button is clicked and current time is displayed in popup",
//       "id": "1",
//       "isChecked": true
//     },
//     {
//       "label": "Button is not clicked and no popup is displayed",
//       "id": "2",
//       "isChecked": false
//     },
//     {
//       "label": "Button is clicked multiple times and current time is displayed in multiple popups",
//       "id": "3",
//       "isChecked": false
//     }
//   ]
// }
// Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
export async function run(event, context) {
  try {
    //check if the event is triggered due to change in status. Change in status givesassociatedStatuses key
    if (event.associatedStatuses) {
      //check if the new status is ready for test
      if (event.issue?.fields?.issuetype?.name === "Story" && event.associatedStatuses[1]?.name === "READY FOR TEST") {
        console.log("eventKey", event.issue);
        let extractedText = await getDescription(event.issue.id);
        extractedText = typeof extractedText === "string" ? extractedText : extractedText.join(".");
        const prompt = "Write test cases for the following story requirements" + extractedText;
        // const responseOpenAI = await callOpenAI(prompt);
        await storageSetHelper(event.issue.key, responseOpenAI.result);
      }
    }
  } catch (e) {}
  return true;

  // const response = await addComment(event.issue.id, "Hello World! It's the Comment Issue app.");

  // console.log(`Response: ${JSON.stringify(response)}`);
}
