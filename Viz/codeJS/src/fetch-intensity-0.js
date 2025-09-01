const headers = {
    'Accept':'application/json'

};

/*var thisDate = new Date();
var dd = String(thisDate.getDate()).padStart(2, '0');
var mm = String(thisDate.getMonth() + 1).padStart(2, '0');
var yyyy = thisDate.getFullYear();
var thisDateString = yyyy + '-' + mm + '-' + dd;

var requestPeriod = '20';

const url = 'https://api.carbonintensity.org.uk/intensity/date/' + thisDateString + '/' + requestPeriod;*/

export const fetchIntensity = async (url) => {
    const res = await fetch(url,
        {
            method: 'GET',
            headers: headers
        });
    if (!res.ok) {
        throw Object.assign(new Error(`${res.status}: ${res.statusText}`), {
            url,
            text: await res.text(),
        });
    }
    // console.log(res.Status);
    return res.json();
};