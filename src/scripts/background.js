browser.pageAction.onClicked.addListener(clipPage);

const vaultName = '<vault name>'
const obsidanURI = `obsidian://advanced-uri?vault=${vaultName}&commandname=ReadItLater%3A%20Save%20clipboard`

function clipPage() {
  browser.tabs.query({currentWindow: true, active: true}).then((tabs) => {
    const { url } = tabs[0];

    navigator.clipboard.writeText(url).then(() => {
      console.log('got it?', url)
      window.location.assign(obsidanURI, '_blank')
    })
  }, console.error);
}
