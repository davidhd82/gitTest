"use strict";
window.onload = () => {
    init();
};
const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");
const formChangePsw = document.getElementById("formChangePsw");
const overlay = document.getElementById("overlay");
const linkRegister = document.getElementById("linkRegister");
const linkLoginOrMyProfile = document.getElementById("linkLoginOrMyProfile");
const linkLoginInRegForm = document.getElementById("linkLoginInRegForm");
const linkChangePsw = document.getElementById("linkChangePsw");
const linkSignOut = document.getElementById("linkSignOut");
const btClose = document.getElementsByClassName("btClose");
const btCreate = document.getElementById("btCreate");
const btLoginSubmit = document.getElementById("btLoginSubmit");
const btRegisterSubmit = document.getElementById("btRegisterSubmit");
const btChangePswSubmit = document.getElementById("btChangePswSubmit");
const btClosePswChange = document.getElementById("btCloseChangePsw");
const init = () => {
    linkRegister.addEventListener('click', () => openForm(false));
    linkLoginOrMyProfile.addEventListener('click', () => openForm(true));
    linkLoginInRegForm.addEventListener('click', () => openForm(true));
    linkChangePsw.addEventListener('click', () => openChangePswForm());
    linkSignOut.addEventListener('click', () => signOut());
    for (let i = 0; i < btClose.length; i++) {
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
};
const openForm = (openLogin) => {
    if (!checkLoginStatus()) {
        if (openLogin) {
            formLogin.style.display = "flex";
            formRegister.style.display = "none";
        }
        else {
            formRegister.style.display = "flex";
        }
        overlay.style.display = "block";
    }
};
const closeForm = () => {
    formLogin.style.display = "none";
    formRegister.style.display = "none";
    overlay.style.display = "none";
    changeDisplayLinks();
};
const changeDisplayLinks = () => {
    let dis;
    if (checkLoginStatus()) {
        linkLoginOrMyProfile.innerHTML = 'My Profile';
        dis = 'block';
    }
    else {
        linkLoginOrMyProfile.innerHTML = 'Login';
        dis = 'none';
    }
    linkChangePsw.style.display = dis;
    linkSignOut.style.display = dis;
};
const openChangePswForm = () => {
    formChangePsw.style.display = "flex";
    overlay.style.display = "block";
};
const closeChangePswForm = () => {
    formChangePsw.style.display = "none";
    overlay.style.display = "none";
};
const fetchSubmitForm = (fetchName) => {
    const data = new URLSearchParams();
    let firstName;
    let lastName;
    let username;
    let email;
    let psw;
    let pswRetype;
    if (fetchName === 'login') {
        username = document.getElementById('tfUsernameLogin').value;
        psw = document.getElementById('tfPswLogin').value;
    }
    else {
        firstName = document.getElementById('tfFirstName').value;
        lastName = document.getElementById('tfLastName').value;
        username = document.getElementById('tfUsernameRegister').value;
        email = document.getElementById('tfEmail').value;
        psw = document.getElementById('tfPswRegister').value;
        pswRetype = document.getElementById('tfPswRegisterRetype').value;
        data.append('tfFirstName', firstName);
        data.append('tfLastName', lastName);
        data.append('tfEmail', email);
        data.append('tfPswRetype', pswRetype);
    }
    data.append('tfUsername', username);
    data.append('tfPsw', psw);
    fetch(`/users/${fetchName}`, { method: 'POST', body: data })
        .then((res) => res.json())
        .then((result) => {
        if (result.status === 'ok') {
            console.log('Got the token: ', result.data);
            if (fetchName === 'login') {
                localStorage.setItem('token', result.data);
            }
            alert('Success');
            closeForm();
        }
        else {
            alert(result.error);
        }
    });
};
const fetchSubmitChangePswForm = () => {
    const data = new URLSearchParams();
    const psw = document.getElementById('tfPswChange').value;
    const pswRetype = document.getElementById('tfPswChangeRetype').value;
    data.append('tfPsw', psw);
    data.append('tfPswRetype', pswRetype);
    const token = localStorage.getItem('token');
    if (token != null) {
        data.append('token', token);
    }
    fetch('/users/changePassword', { method: 'POST', body: data })
        .then((res) => res.json())
        .then((result) => {
        if (result.status === 'ok') {
            alert('Success');
        }
        else {
            alert(result.error);
        }
    });
};
const signOut = () => {
    if (checkLoginStatus()) {
        localStorage.removeItem('token');
        changeDisplayLinks();
    }
};
const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    return token !== null;
};
