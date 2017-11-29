# YeahUrls

## Table of Content

* [Backend](#backend)
* [Frontend](#frontend)
* [ToDo's](#todos)

## Frontend

[link](https://yeah-urls.surge.sh/)

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

## ToDo's

* Frontend
  * [google analytics #1](https://blog.thecodecampus.de/angular-2-include-google-analytics-event-tracking/)
  * [google analytics #2](https://developers.google.com/analytics/devguides/collection/analyticsjs/)
  * [google analytics #3](https://www.google.de/search?client=ms-unknown&ei=4FrzWY3tH4KxafaHnogE&q=google+analytics+&oq=google+analytics+&gs_l=mobile-gws-serp.3..41l2j0l3.891.4469.0.5792.10.10.0.6.6.0.137.1153.1j9.10.4475....0...1.1j4j5.64.mobile-gws-serp..0.10.598...0i67k1j0i10i67k1j0i131k1.0.4kykZtLMENw)
* Backend
  * [helmet](https://www.twilio.com/blog/2017/11/securing-your-express-app.html)