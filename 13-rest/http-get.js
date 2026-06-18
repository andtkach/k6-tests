import http from 'k6/http';

export default function () {
    const res = http.get('http://localhost:8000/public/crocodiles/');
    console.log(res);
}