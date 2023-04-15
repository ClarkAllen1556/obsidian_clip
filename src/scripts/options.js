document.getElementById('clipper_options')
  .addEventListener('submit', () => saveOptions());

browser.storage.local.get("clipper_opts_vault_name").then(resp => {
  const { vaultName, clipper_opts_vault_name } = resp;

  document.getElementById('clipper_opts_vault_name').value = clipper_opts_vault_name;
})

function saveOptions(){
  const vaultName = document.getElementById('clipper_opts_vault_name').value;

  browser.storage.local.set({ clipper_opts_vault_name: vaultName });
}
