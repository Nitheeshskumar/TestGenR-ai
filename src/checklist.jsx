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
  IssueContext,
  Toggle,
} from "@forge/ui";
import { properties } from "@forge/api";
import CheckCircleIcon from "@atlaskit/icon/glyph/check-circle";

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
      testcase: "Verify that the button is placed at the lower end of the screen.",
      checked: true,
    },
    {
      id: "02",
      testcase: "Verify that the button text is 'Click me'.",
      checked: false,
    },
  ];
  let qaDemoParts = values || sample;

  const saveValues = async (formData, issueKey) => {
    let dataToSave = [];
    // await properties.onJiraIssue(issueKey).set('qa_demo_validator', dataToSave);
    // await setValues(dataToSave);
    return formData;
  };

  const openModal = (entry) => {
    setOpen(true);
    setEachTCEntry(entry);
  };

  const onSubmit = async (formData, id) => {
    const editedEntry = qaDemoParts.find((el) => el.id === id);
    editedEntry.testcase = formData.testcase;
    editedEntry.checked = formData.checked;
    setValues(qaDemoParts);

    await properties.onJiraIssue(issueKey).set("qa_demo_validator", qaDemoParts);
    setOpen(false);
    return true;
  };
  const handleDelete = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Table>
        <Head>
          <Cell>
            <Text content="Case" />
          </Cell>
          <Cell>
            <Text content="Description" />
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
              <Text content={entry.testcase}></Text>
            </Cell>
            <Cell> {entry.completed ? <Text content={"✅"} /> : null}</Cell>
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
          <Form onSubmit={(data) => onSubmit(data, eachTCEntry.id)}>
            <TextArea name="testcase" label="Test case description" defaultValue={eachTCEntry?.testcase} isRequired />
            <Toggle label="Passed" name="checked" defaultChecked={eachTCEntry.checked} />
            <Button text="Delete" appearance="danger" icon={"trash"} onClick={handleDelete} />
          </Form>
        </ModalDialog>
      )}
    </Fragment>
  );
};

export const run = render(
  <IssueContext>
    <App />
  </IssueContext>
);
