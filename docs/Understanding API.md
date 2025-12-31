---
sidebar_position: 1
---

# Understanding API

<!-- This document introduces the APIs available in mod development, through which you can implement various functions of the mod.

## API Categories
APIs are mainly divided into the following categories:   
- Game core APIs: Used to operate core game functions such as character attributes, scene management, etc. -->

The api parameter in the module file Main.ts is the provided API, through which you can call the core functions of the game.

The default provided API is in Chinese, you can specify the English version of the API as needed:

```ts
//Select one of the following API types:
//English version API type
import { api as APIType } from "types/src/APIType_en"
//or Chinese version API type
import { api as APIType } from "types/src/APIType"

...

getCareerData: (api:api, state) => {
    ...
}
```

When calling api methods, you can see the type and js doc comments of the method.
If you don't see js doc comments, you can click the arrow in the red box in the picture below to view
![image](../static/img/Understanding%20API/before.png)
![image](../static/img/Understanding%20API/after.png)
