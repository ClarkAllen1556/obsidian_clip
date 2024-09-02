const config = {
  "clipper_opts_shortcut": {
    "defaultValue": "Ctrl+Shift+U",
    "command": "clipPage"
  },
  "clipper_opts_vault_name": {
    "defaultValue": undefined,
    "command": undefined
  }
};

const targetKeys = Object.keys(config);

const updateUI = async () => {
  try {
    const resp = await browser.storage.local.get(targetKeys);

    targetKeys.forEach(key => {
      const element = document.getElementById(key);
      if (element) {
        element.value = resp[key] ?? config[key].defaultValue;
      }
    });
  } catch (error) {
    console.error('Error retrieving values from storage:', error);
  }
};

const saveOptions = async () => {
  const optionsToSave = {};

  for (const key of targetKeys) {
    const element = document.getElementById(key);
    optionsToSave[key] = element?.value || config[key].defaultValue;

    if (config[key].command) {
      await browser.commands.update({ name: config[key].command, shortcut: element?.value });
    }
  }

  try {
    await browser.storage.local.set(optionsToSave);
    console.log('Options saved:', optionsToSave);
  } catch (error) {
    console.error('Error saving options:', error);
  }
};

const restoreOptions = async () => {
  try {
    const resp = await browser.storage.local.get(targetKeys);
    const optionsToSave = {};

    targetKeys.forEach(key => {
      const element = document.getElementById(key);
      const value = resp[key] ?? config[key].defaultValue;
      if (element) element.value = value;
      if (!(key in resp)) optionsToSave[key] = value;
    });

    if (Object.keys(optionsToSave).length > 0) {
      await browser.storage.local.set(optionsToSave);
      console.log('Default options were saved:', optionsToSave);
    }
  } catch (error) {
    console.error('Error restoring options:', error);
  }
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('clipper_options').addEventListener('submit', event => {
  event.preventDefault();
  saveOptions();
});