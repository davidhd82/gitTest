import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import UserDashboard from "./components/UserDashboard";
import HomepageContent from "./components/HomepageContent";
import Overlay from "./components/Overlay";
import CreateWebsite from "./components/CreateWebsite";

function App() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [showCreateWebsite, setShowCreateWebsite] = useState(false);

    useEffect(() => {
        const link1 = document.createElement('link');
        link1.rel = 'stylesheet';
        link1.href = 'https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Varela+Round&display=swap';
        document.head.appendChild(link1);

        const link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = 'https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap';
        document.head.appendChild(link2);
    }, []);

    return (
        <div className="">
            <UserDashboard setFormVisible={setFormVisible} setShowCreateWebsite={setShowCreateWebsite}/>
            {showCreateWebsite ? <CreateWebsite/> :
                <HomepageContent setShowCreateWebsite={setShowCreateWebsite}/>}
            {isFormVisible && <Overlay/>}
        </div>
    );
}

export default App;