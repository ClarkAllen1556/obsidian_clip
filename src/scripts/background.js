browser.pageAction.onClicked.addListener(clipPage);

async function clipPage() {
  const { clipper_opts_vault_name: vaultName } = await browser.storage.local.get('clipper_opts_vault_name');

  if (!vaultName) {
    return;
  }

  const obsidianURI = `obsidian://advanced-uri?vault=${vaultName}&commandname=ReadItLater%3A%20Save%20clipboard`

  browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    const { url } = tabs[0];

    navigator.clipboard.writeText(url).then(() => {
      browser.tabs.create({
        url: obsidianURI
      })
    })
  }, console.error);
}

browser.commands.onCommand.addListener((command) => {
  command === 'clipPage' ? clipPage() : null
}
);