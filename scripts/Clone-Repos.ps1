Set-Location ../repos
git clone "https://github.com/armobob74/dlipower.git"
git clone "https://github.com/armobob74/pman.git"
git clone "https://github.com/armobob74/hamilton-syringe-pump-pman.git"
git clone "https://github.com/armobob74/pman-nesp.git"
git clone "https://github.com/armobob74/elvesys.git"
python -m venv spm-venv
./spm-venv/Scripts/Activate.ps1
Get-ChildItem -Filter "requirements.txt" -Recurse | ForEach-Object { pip install -r $_.FullName }

