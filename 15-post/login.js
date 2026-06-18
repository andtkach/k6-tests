import http from 'k6/http';
import { check } from 'k6';

export default function () {

    const userName = 'test_' + Date.now();

    const body = JSON.stringify({
        username: userName,
        password: 'test'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    http.post('http://localhost:8000/user/register/', body, params);

    let res = http.post(
        'http://localhost:8000/auth/token/login/',
        JSON.stringify(
            {
                username: userName,
                password: 'test'
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    const accessToken = res.json().access;
    console.log(`Access Token: ${accessToken}`);
}