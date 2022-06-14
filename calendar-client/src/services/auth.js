//const URL_API = 'https://app-calendar-server.herokuapp.com';
const APP_API_URL = process.env.REACT_APP_API_URL;

export const fetchSingIn = async (data) => {
    
    const request = await fetch(`${ APP_API_URL }/auth/singIn`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    
    return await request.json();
}

export const fetchLogIn = async (data) => {
    
    const request = await fetch(`${ APP_API_URL }/auth/logIn`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    
    return await request.json();
}