window.onload = () => {
    init();
}

const formLogin: HTMLElement = document.getElementById("formLogin") as HTMLElement;
const formRegister: HTMLElement = document.getElementById("formRegister") as HTMLElement;
const formChangePsw: HTMLElement = document.getElementById("formChangePsw") as HTMLElement;
const overlay: HTMLElement = document.getElementById("overlay") as HTMLElement;
const linkRegister: HTMLElement = document.getElementById("linkRegister") as HTMLElement;
const linkLoginOrMyProfile: HTMLElement = document.getElementById("linkLoginOrMyProfile") as HTMLElement;
const linkLoginInRegForm: HTMLElement = document.getElementById("linkLoginInRegForm") as HTMLElement;
const linkChangePsw: HTMLElement = document.getElementById("linkChangePsw") as HTMLElement;
const linkSignOut: HTMLElement = document.getElementById("linkSignOut") as HTMLElement;
const btClose: HTMLCollection = document.getElementsByClassName("btClose") as HTMLCollection;
const btCreate: HTMLElement = document.getElementById("btCreate") as HTMLElement;
const btLoginSubmit: HTMLElement = document.getElementById("btLoginSubmit") as HTMLElement;
const btRegisterSubmit: HTMLElement = document.getElementById("btRegisterSubmit") as HTMLElement;
const btChangePswSubmit: HTMLElement = document.getElementById("btChangePswSubmit") as HTMLElement;
const btClosePswChange: HTMLElement = document.getElementById("btCloseChangePsw") as HTMLElement;

const init = () => {
    linkRegister.addEventListener('click', () => openForm(false));
    linkLoginOrMyProfile.addEventListener('click', () => openForm(true));
    linkLoginInRegForm.addEventListener('click', () => openForm(true));
    linkChangePsw.addEventListener('click', () => openChangePswForm());
    linkSignOut.addEventListener('click', () => signOut());
    for (let i: number = 0; i < btClose.length; i++) {
        const closeButton = btClose.item(i);
        if (closeButton) {
            closeButton.addEventListener('click', () => closeForm());
        }
    }
    btCreate.addEventListener('click', () => openForm(true));
    btLoginSubmit.addEventListener('click', () => fetchSubmitForm('login'));
    btRegisterSubmit.addEventListener('click', () => fetchSubmitForm('register'));
    btClosePswChange.addEventListener('click', () => closeChangePswForm());
    btChangePswSubmit.addEventListener('click', () => fetchSubmitChangePswForm());

    changeDisplayLinks();
}

const openForm = (openLogin: boolean) => {
    if (!checkLoginStatus()) {
        if (openLogin) {
            formLogin.style.display = "flex";
            formRegister.style.display = "none";
        } else {
            formRegister.style.display = "flex";
        }
        overlay.style.display = "block";
    }
}

const closeForm = () => {
    formLogin.style.display = "none";
    formRegister.style.display = "none";
    overlay.style.display = "none";

    changeDisplayLinks();
}

const changeDisplayLinks = () => {
    let dis: string;

    if (checkLoginStatus()) {
        linkLoginOrMyProfile.innerHTML = 'My Profile';
        dis = 'block';
    } else {
        linkLoginOrMyProfile.innerHTML = 'Login';
        dis = 'none';
    }

    linkChangePsw.style.display = dis;
    linkSignOut.style.display = dis;
}

const openChangePswForm = () => {
    formChangePsw.style.display = "flex";
    overlay.style.display = "block";
}

const closeChangePswForm = () => {
    formChangePsw.style.display = "none";
    overlay.style.display = "none";
}

const fetchSubmitForm = (fetchName: string) => {
    const data: URLSearchParams = new URLSearchParams();
    let firstName: string;
    let lastName: string;
    let username: string;
    let email: string;
    let psw: string;
    let pswRetype: string;
    if (fetchName === 'login') {
        username = (document.getElementById('tfUsernameLogin') as HTMLInputElement).value;
        psw = (document.getElementById('tfPswLogin') as HTMLInputElement).value;
    } else {
        firstName = (document.getElementById('tfFirstName') as HTMLInputElement).value;
        lastName = (document.getElementById('tfLastName') as HTMLInputElement).value;
        username = (document.getElementById('tfUsernameRegister') as HTMLInputElement).value;
        email = (document.getElementById('tfEmail') as HTMLInputElement).value;
        psw = (document.getElementById('tfPswRegister') as HTMLInputElement).value;
        pswRetype = (document.getElementById('tfPswRegisterRetype') as HTMLInputElement).value;
        data.append('tfFirstName', firstName);
        data.append('tfLastName', lastName);
        data.append('tfEmail', email);
        data.append('tfPswRetype', pswRetype);
    }
    data.append('tfUsername', username);
    data.append('tfPsw', psw);

    fetch(`/users/${fetchName}`, {method: 'POST', body: data})
        .then((res) => res.json())
        .then((result) => {
            if (result.status === 'ok') {
                console.log('Got the token: ', result.data);
                if (fetchName === 'login') {
                    localStorage.setItem('token', result.data);
                }
                alert('Success');
                closeForm();
            } else {
                alert(result.error);
            }
        })
}

const fetchSubmitChangePswForm = () => {
    const data: URLSearchParams = new URLSearchParams();

    const psw: string = (document.getElementById('tfPswChange') as HTMLInputElement).value;
    const pswRetype: string = (document.getElementById('tfPswChangeRetype') as HTMLInputElement).value;

    data.append('tfPsw', psw);
    data.append('tfPswRetype', pswRetype);
    const token: string | null = localStorage.getItem('token');

    if (token != null) {
        data.append('token', token);
    }

    fetch('/users/changePassword', {method: 'POST', body: data})
        .then((res) => res.json())
        .then((result) => {
            if (result.status === 'ok') {
                alert('Success');
            } else {
                alert(result.error);
            }
        })
}

const signOut = () => {
    if (checkLoginStatus()) {
        localStorage.removeItem('token');
        changeDisplayLinks();
    }
}

const checkLoginStatus = () => {
    const token: string | null = localStorage.getItem('token');

    return token !== null;
}

