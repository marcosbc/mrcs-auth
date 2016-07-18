# mrcs-auth

## Introduction

This module is a simple JWT-based authentication and authorization
server.

It does not handle user creation, which has to be done separately.
The [mrcs-user-management](https://github.com/marcosbc/mrcs-user-management)
server was created for that purpose in this example.

### Example

Once your server is started, in order to perform the auth, it is enough
to access your server via your browser or with cURL:

```
curl -u myuser http://localhost:3000/auth
```

### Liveness and readiness

This server implements a liveness and readiness page, accessible at
`/liveness` and `/readiness` respectively:

- `/liveness` will always show a simple `{"hello":"world"}` response,
  used to checking whether the microservice is running or not (if it is
  not, the page would not be accessible).
- `/readiness` will show a simple `{"ready":STATUS}` response, where
  STATUS is either `true` or `false`, depending on whether the database
  was initialized or not.

### What is JWT?

JWT stands for JSON Web Tokens. You can read more about them
[here](https://jwt.io).

## License

Copyright 2016 Marcos Bjørkelund

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

