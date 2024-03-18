cd ../repos
git clone "https://github.com/armobob74/dlipower.git"
git clone "https://github.com/armobob74/pman.git"
git clone "https://github.com/armobob74/hamilton-syringe-pump-pman.git"
git clone "https://github.com/armobob74/pman-nesp.git"
git clone "https://github.com/armobob74/elvesys.git"
python -m venv spm-venv
source ./spm-venv/bin/activate
find . -type f -name "requirements.txt" | xargs -I{} pip install -r {}
