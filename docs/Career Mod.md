---
sidebar_position: 2
---

# Career Mod

## 1. Career Mod Overview

Career Mod is a core mod type in the "GTS Play" game, used to define the career information and features of game characters. Players can obtain different gaming experiences and combat strategies by choosing different careers.

Career Mods mainly include the following functions:
- Define basic information of careers (name, icon, required gems, applicable character types, etc.)
- Define career features included in the career

<!-- For the reference implementation of Career Mod, please refer to `protocols/career-protocol/reference/` -->

## 2. Protocol Used by Career Mod

The core protocol used by Career Mod is `career-protocol`, which defines the services and data for Career Mod.



## 3. Module Prefix Naming Convention

Please use `career-` as the prefix for Career Mod names, for example:
- `career-test1`
- `career-warrior`
- `career-mage`



## 4. Career Protocol Definition

### 4.1 Service Interface (ServiceType)

The service interface of the Career Protocol is defined in `career-protocol/src/service/ServiceType.ts`:

```typescript
import { state } from "../state/StateType";
import { api } from "types/src/APIType"
import { characterType, careerFeatureValue, careerFeatureName } from "types/src/ImportedTypes"

export type careerData = {
    // Career name
    title: string,          
    // Career icon ID
    iconId: string,         
    // Number of gems required to unlock the career
    needGem: number,        

    // Get career feature data
    getCareerFeatureData: (state: state) => Record<
        careerFeatureName, careerFeatureValue
    >
}

// Career service interface
export type service = {
    // Get career data
    getCareerData: (api: api, state: state) => careerData,
    
    // Get character type applicable to the career
    getCharacterType: () => characterType,
};
```

### 4.2 Data Type (StateType)

The data type of the Career Protocol is defined in `career-protocol/src/state/StateType.ts`:

```typescript
import { careerFeatureName, careerFeatureValue } from "types/src/ImportedTypes"

export type state = {
    // Usually no such field, only filled when needed
    careerFeatureData?: Record<careerFeatureName, careerFeatureValue>,
}
```



## 5. Implementation Code Explanation (Main.ts)

### 5.1 Import Section

```typescript
import { service } from "career-protocol/src/service/ServiceType"
import { state } from "career-protocol/src/state/StateType"
import { getBlockService as getBlockServiceBlockManager, textData, needGem } from "types/src/CommonType"
import { characterType } from "types/src/ImportedTypes"
```

- `service`: Service interface type defined by the career protocol
- `state`: Data type defined by the career protocol
- `getBlockServiceBlockManager`: Common type definition for implementing mod services
- `textData`: Text data type for multi-language support
- `needGem`: Enumeration of required gem quantities
- `characterType`: Character type enumeration

### 5.2 Multi-language Support

```typescript
export enum languageKey {
    Title,
}

// Get Chinese and English text data
let _getTextData = (): textData => {
    return {
        ["Chinese"]: {
            [languageKey.Title]: "测试1"
        },
        ["English"]: {
            [languageKey.Title]: "Test1"
        }
    }
}
```

- `languageKey`: Enumeration defining keys for text data
- `_getTextData`: Function returning multi-language text data, supporting both Chinese and English

### 5.3 Career Service Implementation Example

```typescript
export let getBlockService: getBlockServiceBlockManager<service> = (api) => {
    return {
        getCareerData: (api, state) => {
            return {
                // Career name
                title: api.getLanguageDataByData(state, _getTextData(), languageKey.Title),
                // Career icon ID, corresponding to the icon file name in the asset/ directory
                // Should be unique, hence the prefix is added
                iconId: "career_test1_icon",
                // Number of gems required
                needGem: needGem.Middle,
                // Included career features
                getCareerFeatureData: (state) => api.MutableRecordUtils.createFromObject({
                    // Key is the name of the career feature, value is the parameter of the career feature. The value will be passed into the value parameter of the applyFunc function returned by the getFeatureData function of the career feature mod service
                    // For example, career-feature-increasefullhp->Main.ts->getBlockService->getFeatureData->applyFunc function will receive 0.5 as the value parameter

                    // Maximum health increased by 50%
                    [api.getCareerFeatureName(api, state, "career-feature-increasefullhp")]: 0.5,

                    // Damage increased by 1% for every 50 coins held
                    [api.getCareerFeatureName(api, state, "career-feature-increasedamagebycoin")]: 0.01,
                    // Damage reduced by 100%. After being attacked, damage increased by 50% for 20 seconds
                    [api.getCareerFeatureName(api, state, "career-feature-reducedamagebutincreasewhendamaged")]: [1, 0.5, 20],
                })
            }
        },
        // Character type applicable to the career (here is Little Man)
        getCharacterType: () => characterType.LittleMan,
    }
}
```

### 5.4 Data Creation

```typescript
export let createBlockState: createBlockStateBlockManager<state> = (api) => {
    return {}
}
```

- Create initial data for the mod, usually empty



## 6. Development Notes

### 6.1 Multi-language Support

- All text should be obtained using the `api.getLanguageDataByData` method
- Ensure both Chinese and English language support are provided



### 6.2 Dependency Management

- Correctly configure dependent career feature mods in `package.json->mod->dependentMods`
<!-- - Ensure compatible versions of dependent mods -->

<!-- ## 7. Common Issues

### 7.1 Career Not Displaying

- Check if `protocolName` in `package.json` is correctly set to `career-protocol`
- Ensure the icon file corresponding to `iconId` exists

### 7.2 Multi-language Display Issues

- Ensure all text uses the `getLanguageDataByData` method
- Check if the language keys and text data format are correct
 -->

---

Through the above content, you have learned the development methods and precautions for Career Mod. Wish you a smooth development!