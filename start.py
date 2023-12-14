import subprocess

# Start the backend
backend_process = subprocess.Popen(['python', '-m', 'flask', 'run'], cwd='ccda-parser-master')

# Start the frontend
frontend_process = subprocess.Popen(['npm', 'start'], cwd='cda_viewer')

try:
    backend_process.wait()
except KeyboardInterrupt:
    backend_process.terminate()
    frontend_process.terminate()
