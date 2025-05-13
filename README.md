# ToDo List

![tech stack logos](./images/tech-stack.png)

# Tech stack
Describe the tech stack used to make this todo app.
1. ExpressJS
2. typeORM
3. postgresql
4. typescript

## etc Tech stack
Supporting microservices
1. postgresql
2. redis

# Data flow
```text
app -> routes -> middlewares -> controllers -> services -> repository -> database -> models
```

# Endpoints
## Simple list of all endpoints

| Method | Endpoint                           | Auth | Payload                  | Response Example                   | Description                  |
| ------ | ---------------------------------- | ---- | ------------------------ | ---------------------------------- | ---------------------------- |
| POST   | `/register`                        | -    | `{ username, password }` | OK                                 | Register a new user          |
| POST   | `/login`                           | -    | `{ username, password }` | JWT                                | Login and receive JWT        |
| GET    | `/todolists`                       | JWT  | –                        | status, message, data: todolist    | Fetch all to-do lists        |
| POST   | `/todolists`                       | JWT  | `{ title }`              | status, message, data: NULL        | Create a new to-do list      |
| GET    | `/todolists/:listId`               | JWT  | –                        | status, message, data: NULL        | Get a single list with todos |
| PUT    | `/todolists/:listId`               | JWT  | `{ title, status }`      | status, message, data: NULL        | Update the title of a list   |
| DELETE | `/todolists/:listId`               | JWT  | –                        | status, message, data: todo        | Delete a to-do list          |
| POST   | `/todolists/:listId/todos`         | JWT  | `{ message }`            | status, message, data: NULL        | Add a new todo to a list     |
| PUT    | `/todolists/:listId/todos/:todoId` | JWT  | `{ message, status }`    | status, message, data: todo.status | Update a specific todo       |
| DELETE | `/todolists/:listId/todos/:todoId` | JWT  | –                        | status, message, data: NULL        | Delete a specific todo       |


## Status format
the status format is drived from http status with added information.
```
node-controller-httpCode
x-xx-xxx
```

## Detailed description of the endpoint and its functions
endpoint description contains a header, payload, and reponse table for that endpoint.
#### table example
| key  | value description |
| ---- | ----------------- |
| data | i am data         |

### POST  : `/register`
add new account to database.
#### Payload
| key      | value description                                                       |
| -------- | ----------------------------------------------------------------------- |
| username | username of user, unique, only contains lowercase a-z                   |
| password | password of the user, password is stored in database with sha512 hasing |

### POST  : `/login`
login to the account, and retrives a json web token (JWT).

#### Payload
| key      | value description |
| -------- | ----------------- |
| username | self explainatory |
| password | self explainatory |

#### Response payload
| key     | value description            |
| ------- | ---------------------------- |
| status  | self explainatory            |
| message | self explainatory            |
| data    | JSON with keys: jwt (string) |

### GET   : `/todolists`
get all todolists for the user. **Note: User credential is taken from jwt**.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Params
| key    | value desciption       |
| ------ | ---------------------- |
| limit  | amount of todolists    |
| offset | todolists index offset |

#### Response payload
| key     | value description                                 |
| ------- | ------------------------------------------------- |
| status  | self explainatory                                 |
| message | self explainatory                                 |
| data    | JSON with keys: todolists [title, status] (array) |

### POST  : `/todolists/:todolistId`
add a todo to todolist to todolistId.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Payload
| key     | value description                    |
| ------- | ------------------------------------ |
| message | message that the todo should contain |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

### PUT   : `/todolists/:todolistId`
update the todolist property in this case title.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Payload
| key                | value description                    |
| ------------------ | ------------------------------------ |
| message (optional) | message that the todo should contain |
| status (optional)  | status complete and incomplete       |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

### DELETE: `/todolists/:todolistId`
delete the todolist from the user.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

### GET   : `/todolists/:todolistId`
get all the todo from todolistId.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Params
| key    | value desciption       |
| ------ | ---------------------- |
| limit  | amount of todolists    |
| offset | todolists index offset |

#### Response payload
| key     | value description                             |
| ------- | --------------------------------------------- |
| status  | self explainatory                             |
| message | self explainatory                             |
| data    | JSON with keys: todo[status, message] (array) |

### POST  : `/todolists/:todolistId/todo`
add todo to todolist

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Payload
| key     | value description                    |
| ------- | ------------------------------------ |
| message | message that the todo should contain |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

### PUT   : `/todolists/:todolistId/todo/:todoId`
update the todo status (completed, incomplete), and todo message.

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Payload
| key                | value description                    |
| ------------------ | ------------------------------------ |
| message (optional) | message that the todo should contain |
| status (optional)  | status complete and incomplete       |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |

### DELETE: `/todolists/:todolistId/todo/:todoId`
delete the todo from todolist

#### Header
| key           | value description       |
| ------------- | ----------------------- |
| Authorization | jwt token from `/login` |

#### Response payload
| key     | value description |
| ------- | ----------------- |
| status  | self explainatory |
| message | self explainatory |
| data    | NULL              |