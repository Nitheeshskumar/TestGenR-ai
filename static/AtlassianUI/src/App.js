import React, { useEffect, useState, Fragment } from "react";
import { invoke } from "@forge/bridge";

// Atlaskit
import LoadingButton from "@atlaskit/button/loading-button";
import { Checkbox } from "@atlaskit/checkbox";
import EditorCloseIcon from "@atlaskit/icon/glyph/editor/close";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import Textfield from "@atlaskit/textfield";
import Lozenge from "@atlaskit/lozenge";
import Spinner from "@atlaskit/spinner";
import Button from "@atlaskit/button";

// Custom Styles
import {
  Card,
  Row,
  Icon,
  IconContainer,
  Status,
  SummaryActions,
  SummaryCount,
  SummaryFooter,
  ScrollContainer,
  Form,
  LoadingContainer,
} from "./Styles";
import InlineEdit from "./components/InlineEdit";
import InlineEditCustomTextarea from "./components/InlineEditTextArea";
const sample = [
  {
    id: "01",
    label: "Verifyy that the button is placed at the lower end of the screen.",
    isChecked: true,
  },
  {
    id: "02",
    label: "Verify that the button text is 'Click me'.",
    isChecked: false,
  },
  {
    id: "03",
    label: "Verify that the button text is 'Click me'.",
    isChecked: false,
  },
  {
    id: "04",
    label: "Verify that the button text is 'Click me'.",
    isChecked: false,
  },
];
function App() {
  const [tests, setTests] = useState(undefined);
  const [input, setInput] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [isDeleteAllShowing, setDeleteAllShowing] = useState(false);
  const [isDeletingAll, setDeletingAll] = useState(false);
  console.log("tests", tests);
  useEffect(() => {
    if (!isFetched) {
      console.log("isfetched");
      setIsFetched(true);
      invoke("get-all").then((values) => {
        console.log(values);
        setTests(values);
      });
    }
  }, [isFetched]);

  const createTest = async (label) => {
    const newTestList = [...tests, { label, isChecked: false, isSaving: true }];

    setTests(newTestList);
  };

  const toggleChecked = (id) => {
    setTests(
      tests.map((test) => {
        if (test.id === id) {
          return { ...test, isChecked: !test.isChecked, isSaving: true };
        }
        return test;
      })
    );
  };

  const editTest = (id, text) => {
    setTests(
      tests.map((test) => {
        if (test.id === id) {
          return { ...test, label: text, isSaving: true };
        }
        return test;
      })
    );
  };

  const deleteTest = (id) => {
    setTests(
      tests.map((test) => {
        if (test.id === id) {
          return { ...test, isDeleting: true };
        }
        return test;
      })
    );
  };

  const deleteAllTests = async () => {
    setDeletingAll(true);

    await invoke("delete-all");

    setTests([]);
    setDeleteAllShowing(false);
    setDeletingAll(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTest(input);
    setInput("");
  };

  // useEffect(() => {
  //   console.log('useeffect')
  //   if (!tests) return;
  //   if (!tests.find(test => test.isSaving || test.isDeleting)) return;

  //   Promise.all(
  //     tests.map((test) => {
  //       if (test.isSaving && !test.id) {
  //         return invoke('create', { label: test.label, isChecked: false })
  //       }
  //       if (test.isSaving && test.id) {
  //         return invoke('update', { id: test.id, label: test.label, isChecked: test.isChecked })
  //       }
  //       if (test.isDeleting && test.id) {
  //         return invoke('delete', { id: test.id }).then(() => false);
  //       }
  //       return test;
  //     })
  //   )
  //   .then(saved => saved.filter(a => a))
  //   .then(setTests)
  // }, [tests]);

  if (!tests) {
    return (
      <Card>
        <LoadingContainer>
          <Spinner size="large" />
        </LoadingContainer>
      </Card>
    );
  }

  const completedCount = tests.filter((test) => test.isChecked).length;
  const totalCount = tests.length;
  return (
    <Card>
      <SummaryFooter>
        <SummaryCount>
          <Lozenge>
            {completedCount}/{totalCount} Completed
          </Lozenge>
        </SummaryCount>
      </SummaryFooter>
      <ScrollContainer>
        {tests.map(({ id, label, isChecked, isSaving, isDeleting }, i) => {
          const isSpinnerShowing = isSaving || isDeleting;

          return (
            <Row isChecked={isChecked} key={label} firstRow={i === 0}>
              {/* <Checkbox isChecked={isChecked} onChange={() => toggleChecked(id)} label={<InlineEdit onSave={editTest} id={id} label={label}/>}/> */}
              <InlineEditCustomTextarea id={id} label={label} isChecked={isChecked}>
                <Status>
                  {isSpinnerShowing ? <Spinner size="medium" /> : null}
                  {isChecked ? <Lozenge appearance="success">Done</Lozenge> : null}
                  <Button size="small" spacing="none" onClick={() => deleteTest(id)}>
                    <IconContainer>
                      <Icon>
                        <EditorCloseIcon />
                      </Icon>
                    </IconContainer>
                  </Button>
                </Status>
              </InlineEditCustomTextarea>
            </Row>
          );
        })}
        <Row>
          <Form onSubmit={onSubmit}>
            <Textfield
              appearance="subtle"
              placeholder="Add a test +"
              value={input}
              onChange={({ target }) => setInput(target.value)}
            />
          </Form>
        </Row>
      </ScrollContainer>
    </Card>
  );
}

export default App;
