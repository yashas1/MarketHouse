### Intro

---

### Demo

![Demo](https://i.imgur.com/U2xBXqx.gif)

The live demo is also available [here](https://house-marketplace-asgoshawk.vercel.app/).

---

### Features & Technologies

- React
- Firebase
- Leaflet
- User authentication (Login system)
- Responsive Web Design (RWD)

---

### Getting started

Clone the repository and install the dependencies:

```bash
$ git clone https://github.com/yashas1/MarketHouse.git
$ cd HouseSearch
$ npm install
```

```

Because this project use Firebase for data strorage and authetication, please build and configure your Firebase project first. For more configuration, please check `firebase.config.js` and setup other variables from your Firebase SDK.

Here is the rules for Firebase database:

```

rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
// Listings
match /listings/{listing} {
allow read;
allow create: if request.auth != null && request.resource.data.imageUrls.size() < 7;
allow update: if resource.data.userRef == request.auth.uid;
allow delete: if resource.data.userRef == request.auth.uid;
}

    // Users
    match /users/{user} {
    	allow read;
    	allow create;
    	allow update: if request.auth.uid == user
    }

}
}

```

Also, the rules for storage:

```

rules_version = '2';
service firebase.storage {
match /b/{bucket}/o {
match /{allPaths=\*_} {
allow read;
allow write: if
request.auth != null &&
request.resource.size < 10 _ 1024 _ 1024 && //10MB
request.resource.contentType.matches('image/._')
}
}
}

````

After configuring things above, start the app by running command:

```bash
$ npm start
````
