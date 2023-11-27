import ForgeUI, {
  ProjectSettingsPage,
  render,
  Text,
  Select,
  Option,
  Form,
  TextField,
  useEffect,
  Link,
  useAction,
  useProductContext,
  SectionMessage,
  useState,
} from "@forge/ui";
import api, { route, properties } from "@forge/api";
const TestGenRConfig = () => {
  const context = useProductContext();
  const [showMessage, setShowMessage] = useState(false);
  const getStatuses = async () => {
    console.log("TestGenr Config log: fetching statuses");
    try {
      const response = await api.asApp().requestJira(route`/rest/api/3/status`, {
        headers: {
          Accept: "application/json",
        },
      });
      // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status/#api-rest-api-3-statuses-get

      const result = await response.json();
      return result.map(({ name, id }) => ({ name, id }));
    } catch (e) {
      console.log("TestGenr Config log: failed to get statuses", e);
      return "false";
    }
  };
  const getSelectedStatus = async () => {
    try {
      console.log("TestGenr Config log: fetching selected trigger status");
      let response = await properties.onJiraProject(context.platformContext.projectKey).get("test-genR-trigger-status");

      return response;
    } catch (e) {
      console.log("TestGenr Config log: failed to get trigger status", e);
    }
  };
  const getApiKey = async () => {
    try {
      console.log("TestGenr Config log: fetching OpenAI key");
      let response = await properties.onJiraProject(context.platformContext.projectKey).get("test-genR-openaikey");
      return response;
    } catch (e) {
      console.log("TestGenr Config log: failed to get OpenAI key", e);
    }
  };
  const [statuses] = useAction(
    (value) => value,
    async () => {
      return await getStatuses();
    }
  );
  const [defaultselected, setDefaultselected] = useAction(
    (value, step) => step,
    async () => {
      return await getSelectedStatus();
    }
  );
  const [defaultApiKey, setDefaultApiKey] = useAction(
    (value, step) => step,
    async () => {
      return await getApiKey();
    }
  );
  useEffect(() => {
    getStatuses();
  }, []);
  //check if new key is submitted
  const checkKeyUpdate = (newkey) => {
    if (defaultApiKey !== newkey) {
      setShowMessage(true);
    }
    return true;
  };
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Handles form submission, which is a good place to call APIs, or to set component state...
  const onSubmit = async (formData) => {
    console.log("TestGenr Config log: submitting trigger status", formData);
    try {
      await properties
        .onJiraProject(context.platformContext.projectKey)
        .set("test-genR-trigger-status", formData.milestone);
      await properties.onJiraProject(context.platformContext.projectKey).set("test-genR-openaikey", formData.openaikey);
      setDefaultselected(formData.milestone);
      setDefaultApiKey(formData.openaikey);
      checkKeyUpdate(formData.openaikey);
    } catch (e) {
      console.log("TestGenr Config log: error on setting trigger status", e);
    }
    return true;
  };

  return (
    <ProjectSettingsPage>
      <Text>
        TestGenR uses OpenAI to generate test cases after reading the story description. Add a trigger 'transition to
        status' to automatically generate the test cases. Its recommended to choose a status when the story is ready for
        test. This ensures the story descriptions are finalized and avoid generating test cases for stories that don't
        require testing.
      </Text>
      {statuses && (
        <Form onSubmit={onSubmit}>
          <Select label="Status to trigger" name="milestone" isRequired>
            {statuses.map((el) => (
              <Option label={el.name} value={el.name} defaultSelected={defaultselected === el.name} />
            ))}
          </Select>

          <TextField
            name="openaikey"
            label="Your OpenAI key to use the service"
            placeholder="Your key"
            defaultValue={defaultApiKey}
          />
          <Text>
            {" "}
            Go to{" "}
            <Link href="https://platform.openai.com/account/api-keys" openNewTab>
              API keys
            </Link>{" "}
            to create new key from your OpenAI account
          </Text>
          {showMessage && <SectionMessage title="API key updated" appearance="confirmation"></SectionMessage>}
        </Form>
      )}
    </ProjectSettingsPage>
  );
};
export const run = render(<TestGenRConfig />);
