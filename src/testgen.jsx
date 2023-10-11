import api, { route } from "@forge/api";
import getDescription from "./helpers/getdescription";
import callOpenAI from "./helpers/callopenai";
import { storageGetHelper, storageSetHelper } from "./helpers/storageHelper";

// Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
export async function run(event, context) {
  try {
    console.log("started");
    //check if the event is triggered due to change in status. Change in status givesassociatedStatuses key
    if (event.associatedStatuses) {
      //check if the new status is ready for test
      if (
        event.issue?.fields?.issuetype?.name === "Story" &&
        event.associatedStatuses[1]?.name === "READY FOR TEST"
      ) {
        console.log("eventKey", event.issue);
        const existingTests = await storageGetHelper(event.issue.key);
        if (existingTests && existingTests.length != 0) {
          console.log("testcase already exists");
          return true;
        }
        let extractedText = await getDescription(event.issue.id);
        extractedText =
          typeof extractedText === "string"
            ? extractedText
            : extractedText.join(".");
        const prompt =
          "Write test cases for the following story requirements" +
          extractedText;
        const responseOpenAI = await callOpenAI(prompt);
        console.log("responseOpenAI", responseOpenAI);
        await storageSetHelper(event.issue.key, responseOpenAI);
      }
    }
  } catch (e) {
    console.log(e);
  } finally {
    console.log("completed invocation");
    return true;
  }
}
