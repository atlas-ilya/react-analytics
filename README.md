# Wget for English-Patient

## Install to npm

### `npm install english-patient-analytics`

## Install to yarn

### `yarn add english-patient-analytics`

## Connect to app
To add our widget to the site, add the initialization of the application itself + identification of the user who entered the application

### Example
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {initialize,identify} from "english-patient-analytics"

const data = {
  objectId: "6055a40d89b2ab34955bea38",
  avatar: "https://source.unsplash.com/100x100/?random=3&people",
  userRole: "teacher",
  firstName: "Vickie",
  lastName: "Jones",
  company: "Isonus",
  email: "vickiejones@isonus.name",
  tags: ["incididunt", "ullamco", "minim", "in", "deserunt"],
};
initialize("c29a173183fa9df334cae1cb66307baca9de58cd9d8462f0720488d1ea9f2ca6");
identify(data);

    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );



```

### initialize
you must insert your application token into initialization before identification

### API initialize

```js
    import {initialize} from "english-patient-analytics"

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
    import {identify} from "english-patient-analytics"

    identify(user: data): void 
```

## Connect to component

In order to connect the handler to the component you need to insert the track function on the component event

### Example

```js
    import {track} from "english-patient-analytics"

    <button onClick={() => track("event_btn")}>Test button</button>
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





