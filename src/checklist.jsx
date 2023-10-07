import ForgeUI, {
  Form,
  IssueGlance,
  ModalDialog,
  Button,
  useProductContext,
  Fragment,
  useState,
  useEffect,
  render,
  Text,
  TextArea,
  TextField,
  useAction,
  Checkbox,
  CheckboxGroup,
  Table,
  Head,
  Row,
  Cell,
  Tooltip,
} from "@forge/ui";
import { properties } from "@forge/api";

const getValues = async (issueKey) => await properties.onJiraIssue(issueKey).get("qa_demo_validator");

const App = () => {
  const context = useProductContext();
  const issueKey = context.platformContext.issueKey;
  const [values, setValues] = useState(getValues(issueKey));
  const [submitted, setSubmitted] = useAction((_, formData) => saveValues(formData, issueKey), values);
  const [isOpen, setOpen] = useState(false);
  const [eachTCEntry, setEachTCEntry] = useState({});

  const sample = [
    {
      id: "01",
      test_case: "Verify that the button is placed at the lower end of the screen.",
      status: "Completed",
    },
    {
      id: "02",
      test_case: "Verify that the button text is 'Click me'.",
      status: "Not completed",
    },
  ];
  let qaDemoParts = values || sample.map((el) => ({ ...el, checked: true, remarks: "" }));

  const saveValues = async (formData, issueKey) => {
    let dataToSave = [];
    console.log("formData", formData);
    // await properties.onJiraIssue(issueKey).set('qa_demo_validator', dataToSave);
    // await setValues(dataToSave);
    return formData;
  };

  const openModal = (entry) => {
    setOpen(true);
    setEachTCEntry(entry);
  };

  const onSubmit = async (formData) => {
    /**
     * formData:
     * {
     *    username: 'Username',
     *    products: ['jira']
     * }
     */
    // setFormState(formData);
    console.log(
      qaDemoParts.find((el) => {
        el.test_case === formData.testcase;
      })
    );
  };

  //   const goBack = () => {};
  //   const cancel = () => {};

  // The array of additional buttons.
  // These buttons align to the right of the submit button.
  //   const actionButtons = [<Button text="Go back" onClick={goBack} />, <Button text="Cancel" onClick={cancel} />];

  return (
    <Fragment>
      <Table>
        <Head>
          <Cell>
            <Text content="Serial No." />
          </Cell>
          <Cell>
            <Text content="Test case" />
          </Cell>
          <Cell>
            <Text content="Status" />
          </Cell>
          <Cell>
            <Text content="Actions" />
          </Cell>
        </Head>

        {qaDemoParts.map((entry) => (
          <Row key={entry.id}>
            <Cell>
              <Text content={entry.id} />
            </Cell>
            <Cell>
              <Text content={entry.test_case}></Text>
            </Cell>
            <Cell>{entry.checked ? <Text content={entry.status} /> : null}</Cell>
            <Cell>
              <Tooltip text="Click for more actions">
                <Button text="View more" onClick={() => openModal(entry)}></Button>
              </Tooltip>
            </Cell>
          </Row>
        ))}
      </Table>
      {isOpen && (
        <ModalDialog header="Edit test case" onClose={() => setOpen(false)}>
          <Form onSubmit={onSubmit}>
            <TextArea name="testcase" label="Test case description" defaultValue={eachTCEntry?.test_case} />
            <CheckboxGroup name="actions" label="Actions">
              <Checkbox value="complete" label="Mark as complete" />
              <Checkbox value="delete" label="Delete test case" />
            </CheckboxGroup>
          </Form>
        </ModalDialog>
      )}
    </Fragment>
  );
};

export const run = render(
  <IssueGlance>
    <App />
  </IssueGlance>
);
