# Forge TestGenR ai

This project contains a Forge app written in Javascript that create testcases when an issue is updated in Jira.

To install in your site [Installation link](https://developer.atlassian.com/console/install/5218dcc8-b35d-40ab-8224-655c4de8b904?signature=3bbb307fccc5e0de0661248cdf8526b6848b532d4f4a89d4413338736236af634ebd175dbcffc2b040bbae9257effb34e100e526566ee41abddc821407aa8298&product=jira)

See the [demo](https://youtu.be/QUb6g86jdoo) on how to use the app.

#### No test cases

![No test cases](src/assets/Testgenr_notestcases.jpg)

#### With generated test cases

![With generated test cases](src/assets/Testgenr_withtestcases.jpg)

#### Config page

![Config page](src/assets/Testgent_projectsettingpage.jpg)

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

- Modify your app by editing the `src/index.jsx` file.

- Build and deploy your app by running:

```
forge deploy
```

- Install your app in an Atlassian site by running:

```
forge install
```

- Develop your app by running `forge tunnel` to proxy invocations locally:

```
forge tunnel
```

### Notes

- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help and provide feedback.
