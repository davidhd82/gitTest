import bodyParser from "body-parser";
import * as AI from "./classes";
import express from "express";

const data_manager = new AI.DataManager('data.json');
const builder = new AI.WebBuilder(data_manager);
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/createPage', (req, res) => {
    const { options } = req.body;
    const websiteContent = builder.build_website(options, "");
    res.send(websiteContent);
});

router.get('/addPage', (_req, res) => {
    const html_content: string = `
    <section>
        <h2>Contact Us</h2>
        <p>Do you have any questions or feedback? Feel free to reach out to us using the contact form below.</p>
        <form id="contact-form">
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" required><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" required><br>
            <label for="message">Message:</label><br>
            <textarea id="message" name="message" rows="4" cols="50" required></textarea><br>
            <input type="submit" value="Send">
        </form>
    </section>
    `;
    const css_content: string = `
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

    section {
        padding: 20px;
        margin: 20px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    form {
        margin-top: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input[type="text"],
    input[type="email"],
    textarea {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input[type="submit"] {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        background-color: #0056b3;
    }

    @media only screen and (max-width: 600px) {
        nav a {
            display: block;
            padding: 10px 0;
        }
    }`;
    const js_content: string = "document.getElementById('contact-form').addEventListener('submit', function(event) {event.preventDefault();const formData = new FormData(this);const name = formData.get('name');const email = formData.get('email');const message = formData.get('message');console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);alert('Your message has been sent. We will get back to you shortly.');});";

    // Hinzufügen der Seite zum DataManager
    data_manager.add_page("contact", "Kontaktseite", html_content, css_content, js_content);
    res.status(201).send("Fertig!");
});

export default router;