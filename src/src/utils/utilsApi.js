import { getUserEmail } from "./utilsChrome";

export async function getUserUrlCaptures(limit, offset){
    const userEmail = await getUserEmail();

    const url = 'http://localhost:8085/capture?email=' + userEmail + '&limit=' + limit + '&offset=' + offset;

    return fetch(url)
    .then(response => response.json())
    .then(responseData => responseData)
    .catch(error => console.log(error));
}

export async function getTopSites(){
    const url = 'http://localhost:8085/topsites?userId=' + 3;
    return fetch(url)
    .then(response => response.json())
    .then(responseData => responseData.topSites)
    .catch(error => console.log(error));
}