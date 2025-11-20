# Minecraft Items API v2


![GitHub Release](https://img.shields.io/github/v/release/PetarMc1/Minecraft-Items-API-v2?include_prereleases&logo=github&color=red)
[![GitHub Issues](https://img.shields.io/github/issues/PetarMc1/Minecraft-Items-API-v2?logo=github)](https://github.com/PetarMc1/Minecraft-Items-API-v2/issues) 
[![Pull Requests](https://img.shields.io/github/issues-pr/PetarMc1/Minecraft-Items-API-v2?logo=github)](https://github.com/PetarMc1/Minecraft-Items-API-v2/pulls)
![GitHub License](https://img.shields.io/github/license/PetarMc1/Minecraft-Items-API-v2%20?color=blue)


Welcome to the Minecraft Items API v2! This API provides comprehensive access to information about items, blocks, effects, and other things in Minecraft, from version 1.9 to the latest release.


## How to get API running on your local machine for development.

**You need [`pnmp`](https://pnpm.io) to run the API locally!**

### Local Development

1. Clone the repository (only the `master` branch). If you plan to make changes, create a fork first!

```
git clone https://github.com/PetarMc1/Minecraft-Items-API-v2 -b master
```

2. Install all required dependencies and `wrangler`.

```
pnpm install
pnpm install -g wrangler
```

3. Start the development server

```
wrangler dev
```

This will start a local development server. The majority of changes will
be instantly reflected live without the need to restart the development server or reload the page in
your browser.

## Deployment
Ive designed this project to be deployable to Cloudflare Workers.
To do it you need to run the following command:
```
wrangler deploy
```
Then you will be prompted what to do.

## Usage
https://mc-api.petarmc.com

Begin your journey with the Minecraft Items API v2 by making HTTP requests to the endpoint. <!--Explore the API [documentation](https://docs.petarmc.com/api/available-endpoints) for comprehensive details on available endpoints, request parameters, and response formats.

# License
This project is licensed under the [MIT](/LICENCE) License.

All of the data for blocks/items/biomes/effects/verisons etc. is from [PrismarineJS/minecraft-data](https://github.com/PrismarineJS/minecraft-data) and is not under my license. Check [PrismarineJS/minecraft-data/README.md](https://github.com/PrismarineJS/minecraft-data/blob/master/README.md)