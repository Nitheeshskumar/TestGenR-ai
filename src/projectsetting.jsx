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
} from "@forge/ui";
import api, { route, properties } from "@forge/api";
const TestGenRConfig = () => {
  const context = useProductContext();
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
  const [statuses] = useAction(
    (value) => value,
    async () => {
      return await getStatuses();
    }
  );
  const [defaultselected, setDefaultselected] = useAction(
    (value) => value,
    async () => {
      return await getSelectedStatus();
    }
  );

  useEffect(() => {
    getStatuses();
  }, []);
  // Handles form submission, which is a good place to call APIs, or to set component state...
  const onSubmit = async (formData) => {
    console.log("TestGenr Config log: submitting trigger status", formData);
    try {
      await properties
        .onJiraProject(context.platformContext.projectKey)
        .set("test-genR-trigger-status", formData.milestone);
      setDefaultselected(formData.milestone);
    } catch (e) {
      console.log("TestGenr Config log: error on setting trigger status", e);
    }
    return true;
  };

  return (
    <ProjectSettingsPage>
      <Text>
        TestGenR uses openai to generate testcases after reading the story description. Add a trigger 'transition to
        status' to automatically generate the testcases. Its recommended to choose a status when the story is ready for
        test. This ensures the story descriptions are finalized and avoid generating testcases for stories that don't
        require testing.
      </Text>
      {statuses && (
        <Form onSubmit={onSubmit}>
          <Select label="Status to trigger" name="milestone" isRequired>
            {statuses.map((el) => (
              <Option label={el.name} value={el.name} defaultSelected={defaultselected === el.name} />
            ))}
          </Select>
          <TextField name="openaikey" label="Your openai key to use the service" placeholder="Your key" />
          <Text>
            {" "}
            Go to{" "}
            <Link href="https://platform.openai.com/account/api-keys" openNewTab>
              API keys
            </Link>{" "}
            to create new key from your openai account
          </Text>
        </Form>
      )}
    </ProjectSettingsPage>
  );
};
export const run = render(<TestGenRConfig />);
