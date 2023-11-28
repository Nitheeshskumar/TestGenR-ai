import { properties } from "@forge/api";

export const storageGetHelper = async (issueKey) => await properties.onJiraIssue(issueKey).get("test_gen");

export const storageSetHelper = async (issueKey, record) =>
  await properties.onJiraIssue(issueKey).set("test_gen", record);

export const getSelectedStatus = async (projectKey) =>
  await properties.onJiraProject(projectKey).get("test-genR-trigger-status");

export const getSelectedApikey = async (projectKey) =>
  await properties.onJiraProject(projectKey).get("test-genR-openaikey");

export const getGenStatus = async (issueKey) => await properties.onJiraIssue(issueKey).get("test-genR-status");

export const setGenStatus = async (issueKey, stat) =>
  await properties.onJiraIssue(issueKey).set("test-genR-status", stat);
