with open("src/App.js", "r") as f:
    code = f.read()

# Email correct ensure karna
code = code.replace("mauryal.ansh@gmail.com", "maurya1.ansh@gmail.com")

# Agar chat container wrapper div ke closing tag me missing tha
# Let's inspect around chat view closing:
if "{/* Chat Messages and Input Container */}" in code:
    # Ensure inner chat container and outer flex container both close properly
    # Check if there is missing </div> before )}
    # Replace the chat view ending if it has unmatched divs
    pattern = r'(\s*<\/div>\s*<\/div>\s*)(\}\s*\)\s*\}\s*\{currentView ===)'
    # ensure proper balancing

with open("src/App.js", "w") as f:
    f.write(code)
