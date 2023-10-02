import api, { route } from "@forge/api";
import getDescription from './helpers/getdescription'


// Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
export async function run(event, context) {

    // console.log('event',JSON.stringify(event))
try{
    //check if the event is triggered due to change in status. Change in status givesassociatedStatuses key

    if(event.associatedStatuses){
       
        //check if the new status is ready for test
        if( event.issue?.fields?.issuetype?.name==='Story'&&   event.associatedStatuses[1]?.name==='READY FOR TEST'){
            console.log('test',event.issue?.fields?.issuetype?.name)
    //    const extractedText=    await getDescription(event.issue.id)  
    //    const prompt = 'Write testcases for the following story requirements. Include code samples in javascript. '+extractedText.join(' ')
    //    await callOpenAI(prompt)
        }

    }

}
    catch(e){
        console.log('error',e)
    }
    


console.log('Completed')
return true

	// const response = await addComment(event.issue.id, "Hello World! It's the Comment Issue app.");

	// console.log(`Response: ${JSON.stringify(response)}`);
}