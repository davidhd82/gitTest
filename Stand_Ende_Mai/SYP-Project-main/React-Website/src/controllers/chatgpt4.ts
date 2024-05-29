import axios from 'axios';

export async function getWebsite(message: string) {

    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/gpt4',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '43c3b15918msh9ec76a55200192ep17def1jsn09db3675870e',
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: `extend this html code to: ${message} use bootstrap classes and include the bootstrap link ` +
                        '<header>\n    <h1>My Website</h1>\n    <p>Welcome to my website</p>\n</header>\n<nav>\n    <a href="#">Home</a>\n    <a href="#">About</a>\n    <a href="#">Contact</a>\n</nav>\n<section>\n    <h2>Welcome to My Website</h2>\n    <p>This is a simple and elegant website template.</p>\n</section>\n<footer>\n    &copy; 2024 My Website. All rights reserved.\n</footer>'
                }
            ],
            web_access: false
        }
    };

    const response = await axios.request(options);
    console.log(response);
    console.log(response.data);
    return response.data;

}
