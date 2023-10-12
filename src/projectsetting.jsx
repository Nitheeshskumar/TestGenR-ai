import ForgeUI, {
  ProjectSettingsPage,
  render,
  Text,
  Select,
  Option,
  Form,
  TextField,
  Button,
  useEffect,
  useState,
  Link,
  useAction,
  useProductContext,
} from "@forge/ui";
import api, { route, properties } from "@forge/api";
const App = () => {
  const context = useProductContext();
  const getStatuses = async () => {
    console.log("fetching statuses");
    try {
      const response = await api
        .asApp()
        .requestJira(route`/rest/api/3/status`, {
          headers: {
            Accept: "application/json",
          },
        });
      // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status/#api-rest-api-3-statuses-get

      const result = await response.json();
      return result.map(({ name, id }) => ({ name, id }));
    } catch (e) {
      console.log("failed to get statuses", e);
      return "false";
    }
  };
  const getSelectedStatus = async () => {
    try {
      console.log("fetching selected trigger status");
      let response = await properties
        .onJiraProject(context.platformContext.projectKey)
        .get("test-genR-trigger-status");

      return response;
    } catch (e) {
      console.log("failed to get trigger status", e);
    }
  };
  const [statuses] = useAction(
    (value) => value,
    async () => {
      return await getStatuses();
    }
  );
  const [defaultselected] = useAction(
    (value) => value,
    async () => {
      return await getSelectedStatus();
    }
  );

  useEffect(() => {
    console.log("context", context.platformContext.projectKey);
    getStatuses();
  }, []);
  // Handles form submission, which is a good place to call APIs, or to set component state...
  const onSubmit = async (formData) => {
    /**
     * formData:
     * {
     *    username: 'Username',
     *    products: ['jira']
     * }
     */
    console.log("formdata", formData);
    try {
      await properties
        .onJiraProject(context.platformContext.projectKey)
        .set("test-genR-trigger-status", formData.milestone);
    } catch (e) {
      console.log("error on setting trigger status", e);
    }
    return true;
  };

  console.log("stauts", statuses);
  console.log("defaultselected", defaultselected);
  // The array of additional buttons.
  // These buttons align to the right of the submit button.

  return (
    <ProjectSettingsPage>
      <Text>
        TestGenR uses openai to generate testcases after reading the story
        description. Add a trigger 'transition to status' to automatically
        generate the testcases. Its recommended to choose a status when the
        story is given for test so that the story descriptions are finalized
        before giving to QA and to avoid genereating testcases for stories that
        don't require testing.
      </Text>
      {statuses && (
        <Form onSubmit={onSubmit}>
          <Select label="Status to trigger" name="milestone" isRequired>
            {statuses.map((el) => (
              <Option
                label={el.name}
                value={el.name}
                defaultSelected={defaultselected === el.name}
              />
            ))}
          </Select>
          <TextField
            name="openaikey"
            label="Your openai key to use the service"
            placeholder="Your key"
          />
          <Text>
            {" "}
            Go to{" "}
            <Link
              href="https://platform.openai.com/account/api-keys"
              openNewTab
            >
              API keys
            </Link>{" "}
            to create new key from your openai account
          </Text>
        </Form>
      )}
    </ProjectSettingsPage>
  );
};
export const run = render(<App />);
