import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 3,
    duration: '5s'
}

console.log(' -- init stage --');

export default function (data) {
    console.log('-- VU stage --');
    console.log(data);
    sleep(1);
}

export function setup() {
    console.log('-- setup stage --');
    sleep(3);
    const data = { foo: 'bar - some data from setup function' };
    return data;
}

export function teardown(data) {
    console.log('-- Teardown stage --');
    console.log('teardown data:', data);
    sleep(3);
}