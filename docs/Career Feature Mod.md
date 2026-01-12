---
sidebar_position: 3
---

# Career Feature Mod

## 1. Overview of Career Feature Mod

Career Feature Mod is a core mod type in the "GTS Play" game, used to define the specific features and abilities that a career possesses. These features provide various game effects for characters, such as attribute bonuses, skill effects, etc., and are key elements that distinguish different career gameplay styles.

Career Feature Mods mainly include the following functions:
- Define basic information of features (name, description, etc.)
- Specific effect logic of features
- Define parameters related to the feature when selected by a random career

For the reference implementation of Career Feature Mod, please refer to `protocols/career-feature-protocol/reference/CareerFeatureData->getCareerFeatureData`

## 2. Protocol Used by Career Feature Mod

The core protocol used by Career Feature Mod is `career-feature-protocol`, which defines the services and data for Career Feature Mod.



## 3. Module Prefix Naming Convention

Please use `career-feature-` as the prefix for Career Feature Mod names, for example:
- `career-feature-increasefullhp`
- `career-feature-increasedamagebycoin`
- `career-feature-reducedamagebutincreasewhendamaged`



## 4. Career Feature Protocol Definition

### 4.1 Service Interface (ServiceType)

The service interface of the Career Feature Protocol is defined in `career-feature-protocol/src/service/ServiceType.ts`:

```typescript
import { state, careerFeatureData } from "types/src/ImportedTypes"
import { api } from "types/src/APIType"

// Career feature service interface
export type service = {
    // Get feature data
	getFeatureData: (api: api, state: state) => careerFeatureData,
};
```

### 4.2 Data Type (StateType)

The data type of the Career Feature Protocol is defined in `career-feature-protocol/src/state/StateType.ts`:

```typescript
export type state = null
```



## 5. Implementation Code Explanation (Main.ts)

### 5.1 Import Section

```typescript
import { service } from "career-feature-protocol/src/service/ServiceType"
import { state } from "career-feature-protocol/src/state/StateType"
import { getBlockService as getBlockServiceBlockManager, textData } from "types/src/CommonType"
```

- `service`: Service interface type defined by the career feature protocol
- `state`: Data type defined by the career feature protocol
- `getBlockServiceBlockManager`: Common type definition for implementing mod services
- `textData`: Text data type for multi-language support

### 5.2 Multi-language Support

```typescript
export enum languageVariableKey {
    Description
}

let _getTextDataByVariable = (): variableTextData => {
    return {
        ["Chinese"]: {
            [languageVariableKey.Description]: (value) => `生命上限增加${value}%`
        },
        ["English"]: {
            [languageVariableKey.Description]: (value) => `Maximum health increased by ${value}%`
        }
    }
}
```

- `languageVariableKey`: Enumeration defining keys for text data
- `_getTextDataByVariable`: Function returning multi-language text data with parameters, supporting both Chinese and English

### 5.3 Career Feature Service Implementation Example

```typescript
export let getBlockService: getBlockServiceBlockManager<service> = (api) => {
    return {
        getFeatureData: (api, state) => {
            return {
                // Feature name
                name: getName(),
                // Whether it is a positive feature
                positive: true,
                // Applicable character type (here is Little Man)
                characterType: characterType.LittleMan,
                // Probability of this feature being selected by random career
                rate: rate.Middle2,
                // Feature description
                getDescriptionFunc: (state, value) => {
                    return api.getLanguageDataByData(state, _getTextDataByVariable(), languageVariableKey.Description)(api.NumberUtils.convertDecimalToPercent(value, 3))
                },
                /**
                 * Generate random value (here generates a random float between 0.2 and 1, representing maximum health increased by 20% to 100%)
                 * @description Only used when this feature is selected by random career
                 */
                generateRandomValueFunc: (state) => {
                    return api.NumberUtils.getRandomFloat(0.2, 1)
                },
                /**
                 * Specific effect logic of the feature
                 * @description Function called when applying this feature
                 * @param state Game data
                 * @param characterType_ Character type using this feature
                 * @param value Value passed from career mod->getCareerFeatureData function
                 * @param name Feature name
                 */
                applyFunc: (state, characterType_, value, name) => {
                    // increase LittleMan's maximum health
                    state = api.LittleManBuildUtils.setHp(state, (state, hp) => {
                        return hp * (1 + value)
                    }, true)

                    return Promise.resolve(state)
                },
            }
        }
    }
}
```

### 5.4 Data Creation

```typescript
export let createBlockState: createBlockStateBlockManager<state> = (api) => {
    return null
}
```

- Create initial data for the mod, which is empty here



## 6. Development Notes

### 6.1 Multi-language Support

- All text should be obtained using the `api.getLanguageDataByData` method
- Ensure both Chinese and English language support are provided



### 6.2 Dependency Management

- Correctly configure dependent mods in `package.json->mod->dependentMods`
<!-- - Ensure compatible versions of dependent mods -->

<!-- ## 7. Common Issues

### 7.1 Feature Effect Not Working

- Check if `protocolName` in `package.json` is correctly set to `career-feature-protocol`
- Ensure the `applyFunc` function of the feature is implemented correctly
- Check if the feature is correctly added to the `getCareerFeatureData` configuration of the career mod

### 7.2 Multi-language Display Issues

- Ensure all text uses the `getLanguageDataByData` method
- Check if the language keys and text data format are correct -->

---

Through the above content, you have learned the development methods and precautions for Career Feature Mod. Wish you a smooth development!