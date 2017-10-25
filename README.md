# YeahUrls

## Table of Content

* [Backend](#backend)

## Backend

* [Requirements](#requirements)
* [API Documentation](#api-documentation)
  * [Auth](#auth)
  * [User](#user)
  * [Tag](#tag)
  * [Url](#url)
* [Realtime support for socket.io](#realtime-support-for-socket-io)

### Requirements
- node
- npm
- MongoDB server
- _OPTIONAL homebrew (for mongoDB server service)_

### API Documentation

#### **Auth**

- **POST /api/v1/signin**

  Request body:
    ```json
    {
      username: string,
      password: string
    }
    ```

  Response body:
    ```json
    {
      token: string,
      user: {
        id: string,
        name: string,
        isAdmin: boolean,
        created: Date,
        updated: Date
      }
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **POST /api/v1/signup**

  Request body:
    ```json
    {
      username: string,
      password: string
    }
    ```

  Response body:
    ```json
    {
      id: string,
      name: string,
      isAdmin: boolean,
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

#### **User**

- **GET /api/v1/user**

  Response body:
    ```json
    [
      {
        id: string,
        name: string,
        isAdmin: boolean,
        created: Date,
        updated: Date
      }
    ]
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **GET /api/v1/user/:id**

  Path Parameter:
    - id: User id

  Response body:
    ```json
    {
      id: string,
      name: string,
      isAdmin: boolean,
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **PUT /api/v1/user/:id**

  Path Parameter:
    - id: User id

  Request Body:
    ```json
    {
      name: string
    }
    ```

  Response body:
    ```json
    {
      id: string,
      name: string,
      isAdmin: boolean,
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **DELETE /api/v1/user/:id**

  Path Parameter:
    - id: User id

  Response body:
    ```json
    {
      id: string
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

#### **Tag**

- **GET /api/v1/tag**

  Response body:
    ```json
    [
      {
        id: string,
        name: string,
        created: Date,
        updated: Date
      }
    ]
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **GET /api/v1/tag/:id**

  Path Parameter:
    - id: Tag id

  Response body:
    ```json
    {
      id: string,
      name: string,
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **PUT /api/v1/tag/:id**

  Path Parameter:
    - id: Tag id

  Request Body:
    ```json
    {
      name: string
    }
    ```

  Response body:
    ```json
    {
      id: string,
      name: string,
      created: Date,
      updated: Date
    }
    ```

  Socket.io Event:
    ```
    tag_updated
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **POST /api/v1/tag/**

  Request Body:
    ```json
    {
      name: string
    }
    ```

  Response body:
    ```json
    {
      id: string,
      name: string,
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

  Socket.io Event:
    ```
    tag_added
    ```

- **DELETE /api/v1/tag/:id**

  Path Parameter:
    - id: Tag id

  Response body:
    ```json
    {
      tagId: string
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```
  
  Socket.io Event:
    ```
    tag_deleted
    ```

#### **Url**

- **GET /api/v1/url**

  Response body:
    ```json
    [
      {
        id: string,
        url: string,
        user: string,
        tags: [string],
        created: Date,
        updated: Date
      }
    ]
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **GET /api/v1/url/:userid**

  Path Parameter:
    - userid: User id

  Response body:
    ```json
    [
      {
        id: string,
        url: string,
        user: string,
        tags: [string],
        created: Date,
        updated: Date
      }
    ]
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **GET /api/v1/url/:userid/:urlid**

  Path Parameter:
    - userid: User id
    - urlid: Url id

  Response body:
    ```json
    {
      id: string,
      url: string,
      user: string,
      tags: [string],
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

- **PUT /api/v1/url/:userid/:urlid**

  Path Parameter:
    - userid: User id
    - urlid: Url id

  Request Body:
    ```json
    {
      url: string,
      tags: [string]
    }
    ```

  Response body:
    ```json
    {
      id: string,
      url: string,
      user: string,
      tags: [string],
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

  Socket.io Event:
    ```
    url_updated
    ```

- **POST /api/v1/url/:userid**

  Path Parameter:
    - userid: User id

  Request Body:
    ```json
    {
      url: string,
      tags: [string]
    }
    ```

  Response body:
    ```json
    {
      id: string,
      url: string,
      user: string,
      tags: [string],
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```
  
  Socket.io Event:
    ```
    url_added
    ```

- **POST /api/v1/url/:userid/:urlid**

  Path Parameter:
    - userid: User id
    - urlid: Url id

  Request Body:
    ```json
    {
      tags: [string]
    }
    ```

  Response body:
    ```json
    {
      id: string,
      url: string,
      user: string,
      tags: [string],
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

  Socket.io Event:
    ```
    tag_added,
    url_updated
    ```

- **DELETE /api/v1/url/:userid/:urlid**

  Path Parameter:
    - userid: User id
    - urlid: Url id

  Response body:
    ```json
    {
      urlId: string
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

  Socket.io Event:
    ```
    url_deleted
    ```

- **DELETE /api/v1/url/:userid/:urlid/:tagid**

  Path Parameter:
    - userid: User id
    - urlid: Url id
    - tagid: Tag id

  Response body:
    ```json
    {
      id: string,
      url: string,
      user: string,
      tags: [string],
      created: Date,
      updated: Date
    }
    ```

  Error body:
    ```json
    {
      message: string
    }
    ```

  Socket.io Event:
    ```
    url_updated
    ```

## Realtime support for socket io

- available events for Url:

```
  - "url_added"
  - "url_updated"
  - "url_deleted"
```

- available events for Tag:

```
  - "tag_added"
  - "tag_updated"
  - "tag_deleted"
```
