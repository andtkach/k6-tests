import http from 'k6/http';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check } from 'k6';
import { SharedArray } from 'k6/data';

const userCredentials = new SharedArray('users with credentials', function () {
    return JSON.parse(open('./users.json')).users;
});

export default function () {

    const randomCredential = randomItem(userCredentials);

// Create all users from the users.json file in the system. This is a one-time operation, so it is commented out to avoid creating duplicate users on subsequent runs.
    // userCredentials.forEach((user) => {
    //     const res = http.post(
    //         'http://localhost:8000/user/register/',
    //         JSON.stringify(
    //             {
    //                 username: user.username,
    //                 password: user.password
    //             }
    //         ),
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //     );

    //     console.log(`Response status for user ${user.username}: ${res.status}`);
    // }
    // );

    let res = http.post(
        'http://localhost:8000/auth/token/login/',
        JSON.stringify(
            {
                username: randomCredential.username,
                password: randomCredential.password
            }
        ),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    // Expected to have 401 due to users from users.json not being registered in the system.
    console.log(`Response status: ${res.status}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'has access token': (r) => r.json() !== undefined
    });
    
    const accessToken = res.json().access;
}
