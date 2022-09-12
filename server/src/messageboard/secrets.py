from pathlib import Path
import json

def get_secrets(file: Path) -> dict:
    secrets = json.loads(file.read_text())
    return secrets
