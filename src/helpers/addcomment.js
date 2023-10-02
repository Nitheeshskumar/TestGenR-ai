import api, { route } from "@forge/api";
async function addComment(issueIdOrKey, message) {
    /**
    * @issueIdOrKey - the Jira issueId number or key for the issue that this function will try to add
    * a comment to (as per the Jira Rest API)
    * @message {string} - the message that will appear in the comment
    *
    * @example addComment('10050', 'Hello world')
    */

// See https://developer.atlassian.com/cloud/jira/platform/rest/v3/#api-rest-api-3-issue-issueIdOrKey-comment-post
// IssueIDOrKey: The ID or key of the issue.
const requestUrl = route`/rest/api/3/issue/${issueIdOrKey}/comment`;
const body = {
    "body": {
        "type": "doc",
        "version": 1,
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "text": message,
                        "type": "text"
                    }
                ]
            }
        ]
    }
};

    // Use the Forge Runtime API to fetch data from an HTTP server using your (the app developer) Authorization header
    let response = await api.asApp().requestJira(requestUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    // Error checking: the Jira issue comment Rest API returns a 201 if the request is successful
    if (response.status !== 201) {
        console.log(response.status);
        throw `Unable to add comment to issueId ${issueIdOrKey} Status: ${response.status}.`;
    }

    return response.json();
}

export default addComment