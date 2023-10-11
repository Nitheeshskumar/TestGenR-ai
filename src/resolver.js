import Resolver from "@forge/resolver";
import { storage } from "@forge/api";

import { storageGetHelper, storageSetHelper } from "./helpers/storageHelper";

const resolver = new Resolver();
const getUniqueId = () => "_" + Math.random().toString(16).slice(2, 15);

const getListKeyFromContext = (context) => {
  const { localId: id } = context;
  return id.split("/")[id.split("/").length - 1];
};
const getIssueKeyFromContext = (context) => context.extension.issue.key;

// const getAll = async (listId) => {
//   return (
//     (await storage.get(listId)) || [
//       { label: "Check if button present", id: "22", isChecked: true },
//       { label: "Check if click happns", id: "d22", isChecked: false },
//     ]
//   );
// };

const getAll = async (listId, context) => {
  return storageGetHelper(getIssueKeyFromContext(context)) || [];
};

resolver.define("get-all", ({ context }) => {
  try {
    return getAll(getListKeyFromContext(context), context);
  } catch (e) {
    console.log("error in resolver create", e);
  }
});

resolver.define("create", async ({ payload, context }) => {
  try {
    const listId = getListKeyFromContext(context);
    const records = await getAll(listId, context);
    const id = getUniqueId();
    const newRecord = {
      id,
      ...payload,
    };
    await storage.set(getListKeyFromContext(context), [...records, newRecord]);
    return newRecord;
  } catch (e) {
    console.log("error in resolver create", e);
  }
});

resolver.define("update", async ({ payload, context }) => {
  try {
    const listId = getListKeyFromContext(context);
    let records = await getAll(listId, context);
    records = records.map((item) => {
      if (item.id === payload.id) {
        return payload;
      }
      return item;
    });
    // await storage.set(getListKeyFromContext(context), records);
    await storageSetHelper(getIssueKeyFromContext(context), records);
    return payload;
  } catch (e) {
    console.log("error in resolver update", e);
  }
});

resolver.define("delete", async ({ payload, context }) => {
  try {
    const listId = getListKeyFromContext(context);
    let records = await getAll(listId, context);
    records = records.filter((item) => item.id !== payload.id);
    // await storage.set(getListKeyFromContext(context), records);
    await storageSetHelper(getIssueKeyFromContext(context), records);
    return payload;
  } catch (e) {
    console.log("error in resolver create", e);
  }
});

resolver.define("delete-all", async ({ context }) => {
  try {
    // return storage.set(getListKeyFromContext(context), []);
    await storageSetHelper(getIssueKeyFromContext(context), []);
    return [];
  } catch (e) {
    console.log("error in resolver create", e);
  }
});

export const handler = resolver.getDefinitions();
