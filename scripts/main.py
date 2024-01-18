import os

def process_file(file_path):
    with open(file_path, 'a') as file:
        if os.stat(file_path).st_size == 0:
            if file_path.endswith('main.css'):
                file.write("""
body {
  background: #1d1e22;
  display: flex;
  justify-content: center;
  align-items: center;
}
""")
            elif file_path.endswith('main.js'):
                file.write('// TODO: Your JavaScript code goes here\n')

def traverse_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            if 'src' in root and file == 'main.css':
                process_file(file_path)
            elif 'src' in root and file == 'main.js':
                process_file(file_path)

directory_path = '/workspaces/genuary-2024'
traverse_directory(directory_path)
