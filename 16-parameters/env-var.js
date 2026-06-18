import http from 'k6/http';

export default function () {

    console.log(`BASE_URL: ${__ENV.BASE_URL}`);
    http.get(`${__ENV.BASE_URL}/public/crocodiles/`);
    
}