import api, { route } from "@forge/api";
import callOpenAI from "./callopenai";
const getDescription=async (issuekey)=>{


console.log('issuekey',issuekey)

    const commentsData = await api.asApp().requestJira(route`/rest/api/3/issue/${issuekey}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    const responseData = await commentsData.json();
    const jsonData = responseData.fields.description;

    console.log('commentsData',JSON.stringify(responseData.fields))
    let extractedText=[];
    jsonData.content.forEach(content=>{

        if(content.type==='paragraph'&&content.content){
            content.content.forEach(innercontent=>{
                extractedText.push(innercontent.text)
            })
        }


    })
console.log('extractedText',extractedText.join(' '));
return extractedText.join(' ')

}
export default getDescription
