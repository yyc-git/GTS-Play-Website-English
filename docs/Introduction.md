---
sidebar_position: 1
---

# Introduction

【Giantess Play】 is a roguelite H5 3D Giantess action shooting game. You can extend the game in various aspects through mods.

[Enter Game](https://gts-play.cn) • [Enter Game (Debug Mode)](https://gts-play.cn?mod)



## Development Environment Preparation

- Get the project code through [Mod Development Github](https://github.com/yyc-git/GiantessPlay-Mod?tab=readme-ov-file#%E5%B7%A8%E5%A4%A7%E5%A8%98%E7%9A%84%E7%8E%A9%E8%80%8D%E6%A8%A1%E7%BB%84) or [Directly Download Mod Development Project](https://pan.baidu.com/s/1gn6hB0RV-k6FnG1to5R7VQ?pwd=1111)
- Install node.js (version 22 or above)
- Execute `npm install` in the project root directory



## Project Structure Analysis

```plaintext
├── mods/   # Mod folder
├── protocols/   # Protocols corresponding to mods (specify the types of services and data) folder
```

All mods are stored in the `mods/` folder. Each mod is an independent project written in TypeScript, containing the following main files:

- `package.json` - Mod configuration file, including mod name, version, author, dependencies, etc.
- `src/Main.ts` - Main entry file of the mod, implementing the core functionality of the mod
- `README.md` - Mod description document, including mod function description, usage method, notes, etc., **should include both Chinese and English**



## Start Your First Step
1. [Develop, Test, and Publish Your First Mod](Develop,%20Test,%20and%20Publish%20Your%20First%20Mod.md)
2. [Understanding API](Understanding%20API.md)
3. [Understand Development Specifications for Various Mods](Career%20Mod.md)

## Other Resources

- [Official Website](https://gts-play.cn/website/english/index.html)