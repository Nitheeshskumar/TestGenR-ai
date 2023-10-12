import Resolver from "@forge/resolver";

import { storageGetHelper, storageSetHelper } from "./helpers/storageHelper";

const resolver = new Resolver();
const getUniqueId = () => "_" + Math.random().toString(16).slice(2, 15);

const getIssueKeyFromContext = (context) => context.extension.issue.key;

const getAll = async (context) => {
  console.log("context");
  return (await storageGetHelper(getIssueKeyFromContext(context))) || [];
};

resolver.define("get-all", async ({ context }) => {
  try {
    return getAll(context);
  } catch (e) {
    console.log("error in resolver create", e);
  }
});

resolver.define("create", async ({ payload, context }) => {
  try {
    const records = await getAll(context);
    const id = getUniqueId();
    const newRecord = {
      id,
      ...payload,
    };
    await storageSetHelper(getListKeyFromContext(context), [
      ...records,
      newRecord,
    ]);
    return newRecord;
  } catch (e) {
    console.log("error in resolver create", e);
  }
});

resolver.define("update", async ({ payload, context }) => {
  try {
    let records = await getAll(context);
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
    let records = await getAll(context);
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
