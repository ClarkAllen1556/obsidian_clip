document.getElementById('clipper_options')
  .addEventListener('submit', () => saveOptions());

function saveOptions(){
  const vaultName = document.getElementById('clipper_opts_vault_name').value;

  browser.storage.local.set({ clipper_opts_vault_name: vaultName });
}
