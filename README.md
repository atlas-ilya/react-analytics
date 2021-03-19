# Wget for English-Patient

## Install to npm

### `npm install english-patient-analytics`

## Connect to app
To add our widget to the site, add the initialization of the application itself + identification of the user who entered the application

### Example
```js
    import SuperWidget from "english-patient-analytics"

    const data = {
        objectId: "akkOJiYay9",
        createdAt: "2014-11-06T13:43:17.269Z",
        updatedAt: "2021-01-31T19:32:25.547Z",
        email: "User@User.ru",
        firstName: "User",
        lastName: "User",
        mePicSrc: "http://User.jpg",
        phone: "+798212111212",
        userPassword: "User",
        userRole: "student",
        username: "User@User.ru",
        wePicSrc: "http://User.jpg",
        avatar: "https://User.jpg",
        activated: true,
        activationCode: "8QDPBQ85I5MW63AFQRKS73SXPZTPZK",
        distant: true,
        skype: "User",
        tags: [],
        stasiNote: "какие-то заметки",
        lastActivityTimestamp: 1606814229619,
        studentIntroductionUrl: "https://s3-eu-west-1.amazonaws.com/indie-wave-files/d5383a1e-3b17-4504-b212-1ba797496bd8",
        passwordRecoveryKey: "c0fea625-752f-49e5-b018-f6451135de2d",
        __type: "Object",
        className: "_User",
        sessionToken: "r:a943022fdd136d586409fcc959680e8b"
    }

	SuperWidget.initialize("your_token_app");
    SuperWidget.identify(data);

```

### initialize
you must insert your application token into initialization before identification

### API initialize

```js
    initialize(token: string): void 
```


### identify
it is possible to insert less voluminous objects into the identification, but there must be fields such as
```js
    const data = {
        objectId: String,
        email: String,
        firstName: String,
        lastName: String,
        userRole: String,
        avatar: String,
        tags: JSON.stringify(Array),
    }
```
### API identify

```js
    identify(user: data): void 
```

## Connect to component

In order to connect the handler to the component you need to insert the track function on the component event

### Example

```js
    <button onClick={() => SuperWidget.track("event_btn")}>Test button</button>
```

### API track

```js
    track(event: string, options?: object, eventTagsArray?: string[]): void
```

### event: string

event name (required)

### options?: object

event description (optional)

### eventTagsArray?: string[]

event type (optional)





