import ForgeUI, { Form, IssueGlance, ModalDialog, Button, useProductContext, Fragment, useState,useEffect, render, Text, useAction, Checkbox, CheckboxGroup, Table, Head, Row, Cell } from "@forge/ui";
import { properties } from '@forge/api';

const getValues = async (issueKey) => await properties.onJiraIssue(issueKey).get('qa_demo_validator');

const App = () => {
    const context = useProductContext();
    const issueKey = context.platformContext.issueKey;
    const [values, setValues] = useState(getValues(issueKey));

  
    const saveValues = async (formData, issueKey) => {
        let dataToSave = []
        console.log('formData',formData)
        

        // await properties.onJiraIssue(issueKey).set('qa_demo_validator', dataToSave);
        // await setValues(dataToSave);

        return formData;
    };

    const [submitted, setSubmitted] = useAction(
        (_, formData) => saveValues(formData, issueKey),
        values
    );

    const openModal = async () => {
       
        setOpen(true);
    };
const sample=[
    {
      "test_case": "Verify that the button is placed at the lower end of the screen.",
      id:'01'
    },
    {
      "test_case": "Verify that the button text is 'Click me'.",
      id:'02'
    },
   
  ]
    const [isOpen, setOpen] = useState(false);
    let qaDemoParts=values||sample.map(el=>({...el,checked:true,remarks:''}));

   

    return (
        <Fragment>
            <Button
                text={`Update QA Demo status`}
                onClick={() => openModal()}
            />

            {isOpen && (
                <ModalDialog header="QA Demo Validator" onClose={() => setOpen(false)}>
                    <Form
                        onSubmit={async (data) => {
                            await setSubmitted(data);
                            setOpen(false);
                        }}
                    >
                        <CheckboxGroup label="Areas covered" name="parts">
                            {qaDemoParts.map(part =>  (
                                <Checkbox label={part.test_case} value={part} defaultChecked={part.checked} />
                            ))}
                        </CheckboxGroup>
                    </Form>
                </ModalDialog>
            )}

            <Table>
                <Head>
                    <Cell>
                        <Text content="Item" />
                    </Cell>
                    <Cell>
                        <Text content="Completed" />
                    </Cell>
                </Head>

                {qaDemoParts.map(entry => 
                    <Row key={entry.id}>
                        <Cell>
                            <Text content={entry.test_case} />
                        </Cell>
                        <Cell>
                            {entry.checked ? (<Text content={"✅"} />) : null}
                        </Cell>
                    </Row>
                ) }
            </Table>
        </Fragment>
    );
};

export const run = render(
    <IssueGlance>
        <App />
    </IssueGlance>
);
