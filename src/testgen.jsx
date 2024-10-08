import getDescription from "./helpers/getdescription";
import callOpenAI from "./helpers/callopenai";
import { getSelectedStatus, setGenStatus, storageGetHelper, storageSetHelper } from "./helpers/storageHelper";

export async function run(event, context) {
  try {
    console.log(`testgen invoked for ${event.issue.key} with changelog`, event.changelog);

    //check if the event is triggered due to change in status. Change in status gives
    //associatedStatuses key
    //also check if the issue is a story
    if (event.associatedStatuses && event.issue?.fields?.issuetype?.name === "Story") {
      console.log("checking triggerStatus");
      const projectKey = event.issue.fields.project.key;
      const triggerStatus = await getSelectedStatus(projectKey);
      console.log("to status: ", event.associatedStatuses[1]?.name, "while triggerstatus: ", triggerStatus);
      //check if the new status is the trigger status
      if (event.associatedStatuses[1]?.name === triggerStatus) {
        console.log("checking if testcase exists");
        setGenStatus(event.issue.key, "loading");
        const existingTests = await storageGetHelper(event.issue.key);
        if (existingTests && existingTests.length != 0) {
          console.log("testcase already exists");
          return true;
        }

        console.log("extracting story description");
        let extractedText = await getDescription(event.issue.id);
        extractedText = typeof extractedText === "string" ? extractedText : extractedText.join(".");
        console.log("extractedText: ", extractedText);

        const prompt = "Write test cases for the following story requirements: " + extractedText;
        console.log("generating testcases from openai");
        const responseOpenAI = await callOpenAI(prompt, projectKey);
        console.log("response from OpenAI", responseOpenAI);

        await storageSetHelper(event.issue.key, responseOpenAI);
        console.log("added testcases to story");
      }
    }
  } catch (e) {
    console.log(`Unable to add testcases to issue ${event.issue.key}.`, e);
  } finally {
    await setGenStatus(event.issue.key, "done");
    console.log("completed invocation for ", event.issue.key);
    return true;
  }
}
