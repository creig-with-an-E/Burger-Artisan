#### Use the ansible controller to deploy to s3

`$ ansible-playbook --vault-password-file keys/vault_password_file -i inventory/prod playbook.yml`