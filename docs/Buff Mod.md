---
sidebar_position: 3
---

# Buff Mod

## 1. Buff Mod Overview

Buff Mod is a core mod type in the "GTS Play" game, used to define various temporary data effects in the game. These effects can provide attribute bonuses, data changes, or special abilities to characters, usually with a duration or specific triggering conditions.

Buff Mods mainly include the following functions:
- Define basic information of Buffs (name, description, duration, etc.)
- Implement Buff effect logic (application, update, removal)
- Support configuration of Buff parameters (such as bonus values, triggering conditions, etc.)
- Manage Buff lifecycle

For the reference implementation of Buff Mod, please refer to `protocols/buff-protocol/reference/`

## 2. Protocol Used by Buff Mod

The core protocol used by Buff Mod is `buff-protocol`, which defines the services and data for Buff Mod.


## 3. Module Prefix Naming Convention

Please use `buff-` as the prefix for Buff Mod names, for example:
- `buff-littleman-masochism`
- `buff-luck`



## 4. Buff Protocol Definition

### 4.1 Service Interface (ServiceType)

The service interface of the Buff Protocol is defined in `buff-protocol/src/service/ServiceType.ts`:

### 4.2 Data Type (StateType)

The data type of the Buff Protocol is defined in `buff-protocol/src/state/StateType.ts`:

```typescript
import { nullable } from "types/src/ImportedTypes"

export type state = {
    // Used to store old values for restoring when removing Buff
    // Also used to store some data
    oldValue: nullable<any>,
    // Used to calculate Buff duration
    startTime?: number,
    // Used to store custom data
    customData?: any,
}
```



## 5. Implementation Code Explanation (src/)

### 5.1 Modular Structure

Buff Mod adopts a modular structure design, distributing different functions across multiple files:

```typescript
// Directory structure
├── Main.ts              # Main entry file, implements service interface
├── json/   # Data folder
│   └── Data.ts          # Defines Buff data
├── script/ # Script folder
│   ├── Event.ts         # Event binding and unbinding
│   └── Utils.ts         # Utility functions and data creation
└── asset/   # Asset folder
    └── buff.png         # Buff icon
```

### 5.2 Buff Data (Data.ts)

**Multi-language Support**

```typescript
export enum languageKey {
    Description,
}

let _getTextData = () => {
    return {
        [language.Chinese]: {
            [languageKey.Description]: "受虐狂"
        },
        [language.English]: {
            [languageKey.Description]: "Masochism"
        },
    }
}
```

- `languageKey`: Enumeration defining keys for text data
- `_getTextData`: Function returning multi-language text data, supporting both Chinese and English

**Buff Data Definition**

```typescript
export let getBuffData = (api: api): singleBuffData => {
    return {
        name: getName(),
        imageSrc: getImageSrc(),
        isPositive: isPositive(),
        characterType: getCharacterType(),
        maxSuperPositionCount: +Infinity,
        getDescriptionFunc: (state, superPositionCount: number, value: number) => api.getLanguageDataByData(state, _getTextData(), languageKey.Description),
        /**
         * Function called when applying this Buff
         * @param state Game data
         * @param name Buff name
         * @param usedGirl_ Giantess applying this Buff (null here)
         * @param superPositionCount Current stack count
         * @param sumValue Total bonus value of all stacks
         */
        applyFunc: (state, name, usedGirl_, superPositionCount: number, sumValue: number) => {
            // Save current stack count to mod data's oldValue for display on game's Buff icon
            state = api.saveBuffSuperPositionCount(api, state, getBlockName(), superPositionCount)
            return Promise.resolve(state)
        },
        /**
         * Function called when removing Buff effect
         * @param state Game data
         * @param name Buff name
         * @param usedGirl_ Giantess removing this Buff (null here)
         * @param superPositionCount Current stack count
         * @param sumValue Total bonus value of all stacks
         */
        deapplyFunc: (state, name, usedGirl_, superPositionCount: number, sumValue: number) => {
            // Restore oldValue of mod data
            state = api.restoreBuffSuperPositionCount(api, state, getBlockName())
            return Promise.resolve(state)
        },
    }
}
```

**Helper Functions**

```typescript
export let getName = () => "Buff_LittleMan_Masochism"

export let getCharacterType = () => characterType.LittleMan

export let isPositive = () => true

export let getImageSrc = () => `./${getBlockName()}/src/asset/buff.png`

export let getDescription = (api, state) => api.getLanguageDataByData(state, _getTextData(), languageKey.Description)

/** 
 * Add Masochism Buff to character
 * @param api Game API
 * @param state Game data
 * @param lastTime Buff duration (unit: seconds)
 * @param value Buff bonus value
 */
export let addBuff = (api: api, state: state, lastTime, value) => {
    return api.addBuff(state, getName(), api.getLittleManName(), api.NullableUtils.getEmpty(), lastTime, 1, getCharacterType(), value)
}
```

- `getName`: Get unique name of the Buff
- `getCharacterType`: Specify character type applicable for the Buff
- `isPositive`: Specify whether the Buff is a positive effect
- `getImageSrc`: Specify the path of the Buff icon
- `getDescription`: Get description text of the Buff

### 5.3 Event Handling (Event.ts)

```typescript
let _disposeHandler = (api: api, state: state, _) => {
    // Reset data when disposing
    state = setState(api, state, {
        ...createState(api),
    })
    return Promise.resolve(state)
}

export let bindEvent = (api: api, state) => {
    state = api.event.on(state, api.event.getDisposeEventName(), _disposeHandler)
    return state
}

export let unbindEvent = (api: api, state) => {
    state = api.event.offAll(state, api.event.getDisposeEventName())
    return state
}
```

- `bindEvent`: Bind event handlers
- `unbindEvent`: Unbind event handlers
- `_disposeHandler`: Handle mod disposal events

### 5.4 Utility Functions (Utils.ts)

```typescript
export let getProtocolName = () => modProtocolName.BuffProtocol
export let getBlockName = () => "buff-littleman-masochism"

export let getState = (api: api, state) => {
    return api.block.getBlockState<any>(state,
        getProtocolName(),
        getBlockName()
    )
}

export let setState = (api: api, state, s) => {
    return api.block.setBlockState(state,
        getProtocolName(),
        getBlockName(),
        s
    )
}
```

- `getProtocolName`: Get protocol name
- `getBlockName`: Get mod name
- `getState`: Get mod data
- `setState`: Set mod data

### 5.5 Main Entry File (Main.ts)

```typescript
import { createState, getBlockName } from "./script/Utils"
import { addBuff, getBuffData, getCharacterType, getDescription, getImageSrc, getName, isPositive } from "./json/Data"
import { bindEvent, unbindEvent } from "./script/Event"
import { service } from "buff-protocol/src/service/ServiceType"
import { state } from "buff-protocol/src/state/StateType"
import { api } from "types/src/APIType"
import { getBlockService as getBlockServiceBlockManager, createBlockState as createBlockStateBlockManager } from "types/src/CommonType"
```

- `service`: Service interface type defined by the Buff protocol
- `state`: Data type defined by the Buff protocol
- `getBlockServiceBlockManager`: Common type definition for implementing mod services
- `createBlockStateBlockManager`: Common type definition for creating initial mod data
- Modular structure, distributing different functions in Utils, Data, and Event files


<!-- ### 5.3 Buff Service Implementation Example -->

```typescript
export let getBlockService: getBlockServiceBlockManager<service> = (api) => {
    return {
        /**
         * Function called when initializing Buff mod
         * @param api Game API
         * @param state Game state
         * @returns Promise<Updated game state>
         */
        init: (api: api, state) => {
            state = bindEvent(api, state)
            return Promise.resolve(state)
        },
        /**
         * Function called when disposing Buff mod
         * @param api Game API
         * @param state Game state
         * @returns Promise<Updated game state>
         */
        dispose: (api: api, state) => {
            state = unbindEvent(api, state)
            return Promise.resolve(state)
        },

        getName: getName,
        getBuffData: getBuffData,
        addBuff: addBuff,
        getCharacterType: getCharacterType,
        isPositive: isPositive,
        getImageSrc: getImageSrc,
        getDescription: getDescription,

        getCount: (api: api, usedGirl) => (state: state) => {
            return api.getNonGiantessBuffCountBySuperPositionCount(api, state, getBlockName())
        }
    }
}
```

- Implements `init` and `dispose` methods to bind and unbind events
- Uses function separation approach, placing different functions in different files
- Implements `getCount` method to get Buff stack count for display on game's Buff icon

<!-- ### 5.4 Data Creation -->

```typescript
export let createBlockState: createBlockStateBlockManager<state> = (api: api) => {
    return createState(api)
}

// createState function implementation (located in script/Utils.ts)
export let createState = (api: api) => {
    return {
        oldValue: api.NullableUtils.getEmpty(),
    }
}
```

- Uses `createState` function to create initial data
- Uses `api.NullableUtils.getEmpty()` to initialize nullable fields



## 6. Development Notes

### 6.1 Multi-language Support

- All text should be obtained using the `api.getLanguageDataByData` method
- Ensure both Chinese and English language support are provided



### 6.2 Dependency Management

- Correctly configure dependent mods in `package.json->mod->dependentMods`
<!-- - Ensure compatible versions of dependent mods -->

<!-- ## 7. Common Issues

### 7.1 Buff Effect Not Working

- Check if `protocolName` in `package.json` is correctly set to `buff-protocol`
- Ensure the `applyFunc` and `deapplyFunc` functions of the Buff are implemented correctly
- Check if the Buff is correctly applied to the character
- Confirm the Buff's `characterType` is set correctly, matching the target character type

### 7.2 Buff Duration Issues

- Check if the time system in the game is working properly
- For permanent Buffs, you can set a large duration value or handle it specially in code

### 7.3 Buff Stacking Issues

- Ensure the `maxSuperPositionCount` parameter is set correctly
- Consider the impact of stack count when implementing effect functions
- Use the `superPositionCount` parameter to calculate actual effect values

### 7.4 Buff Icon Not Displaying

- Check if the path returned by `getImageSrc` function is correct
- Ensure the icon file exists at the specified path
- Confirm the file path uses the correct slash direction (use / instead of \\)
 -->

---

Through the above content, you have learned the development methods and precautions for Buff Mod. Wish you a smooth development!