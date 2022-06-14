//const API_URL = 'https://app-calendar-server.herokuapp.com';
const APP_API_URL = process.env.REACT_APP_API_URL;

export const createEvent = async ( data, token ) => {
    
    let request = await fetch(`${ APP_API_URL }/event/create`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'x-token': token
      },
      body: JSON.stringify(data)
    });

    return await request.json();
}

export const getEvents = async ( ) =>{

  let request = await fetch(`${ APP_API_URL }/event/`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      }
  });

  return await request.json();

}

export const updateEvent = async (data, token) => {
  const { id, ...values } = data; 
  
  let request = await fetch(`${ APP_API_URL }/event/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(values)
  });

  return await request.json();

}

export const deleteEvent = async (event_id, user_id, sessionToken) => {
    
  let request = await fetch(`${ APP_API_URL }/event/${event_id}/${user_id}`, {
      method: 'DELETE',
      headers: {
        'x-token': sessionToken
      }
  })

  return await request.json();
}