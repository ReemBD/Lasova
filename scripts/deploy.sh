client_public_dir_path="./client/public"

set -e
trap 'echo -e "\033[0;31mPlease commit all changes before deploying\033[0m"' ERR
git diff-index --quiet HEAD --
trap - ERR

npm --prefix "../client" run build:prod
git push heroku environemental-setup:main

echo "Finished deployment succesfully"
