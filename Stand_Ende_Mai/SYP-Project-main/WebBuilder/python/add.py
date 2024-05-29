from DataManager import DataManager

data_manager = DataManager('data.json')

# Inhalt von HTML, CSS und JavaScript
html_content = """
<header>
    <h1>My Website</h1>
    <p>Welcome to my website</p>
</header>
<nav>
    <a href="#">Home</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
</nav>
<section>
    <h2>Welcome to My Website</h2>
    <p>This is a simple and elegant website template.</p>
</section>
<footer>
    &copy; 2024 My Website. All rights reserved.
</footer>
"""
css_content = """
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden; /* Verhindert horizontales Scrollen */
}
header {
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;
}
nav {
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 10px 0;
}
nav a {
    color: #fff;
    text-decoration: none;
    padding: 10px 20px;
}
section {
    flex: 1;
    padding: 20px;
    margin: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 20px;
    margin-top: auto;
    width: 100%;
}
@media only screen and (max-width: 600px) {
    nav a {
        display: block;
        padding: 10px 0;
    }
}"""
js_content = "console.log('Hello, JavaScript!');"

# Hinzufügen der Seite zum DataManager
data_manager.add_page("index", html_content, css_content, js_content)