import http from "k6/http";
import { check } from 'k6';

export default function () {
  const res = http.get("https://quickpizza.grafana.com/test.k6.io/");
  console.log(res.status);

  // just a simple check to demonstrate the check function success
  check(true, {
    "true is true": (value) => value === true,
  });

  // just a simple check to demonstrate the check function failure
  check(true, {
    "true is false": (value) => value === false,
  });

  // http response validation check
  check(res, {
        'status is 200': (r) => r.status === 200,
        'app title': (r) => r.body.includes('QuickPizza Legacy')
    });
}
