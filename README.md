# Supalosa's Chrono Divide Bot

[中文版文档](README-CN.md)

[Chrono Divide](https://chronodivide.com/) is a ground-up rebuild of Red Alert 2 in the browser. It is feature-complete and allows for online skirmish play against other players.
It also provides [an API to build bots](https://discord.com/channels/771701199812558848/842700851520339988), as there is no built-in AI yet.

This repository is one such implementation of a bot. The original template for the bot is available at [game-api-playground](https://github.com/chronodivide/game-api-playground/blob/master/README.md).

## Development State and Future plans

The developer of Chrono Divide has expressed interest in integrating this bot into the game directly. As a consequence, I am aiming to implement missing features to create a satisfactory AI opponent for humans.
Directionally, this means I am not looking to make this AI a perfect opponent with perfect compositions or micro, and instead hope that it can be a fun challenge for newer players.

See `TODO.md` for a granular list of structural changes and feature improvements that are planned for the bot.

Feel free to contribute to the repository, or even fork the repo and build your own version.

## Install instructions

Node 14 is required by the Chrono Divide API. Higher versions are not supported yet.

```sh
npm install
npm run build
npx cross-env MIX_DIR="C:\path_to_ra2_install_dir" npm start
```

This will create a replay (`.rpl`) file that can be [imported into the live game](https://game.chronodivide.com/).

You can modify `exampleBot.ts` to configure the match. You will most likely want to look at the line with `const mapName = "..."` to change the map, or the `const offlineSettings1v1` to change the bot countries.

## Playing against the bot

Currently, playing against this bot **is only possible for developers**, because it requires you to run this repository from source. Please send a message in the [#dev-talk](https://discord.com/channels/771701199812558848/842700851520339988) channel of the Chrono Divide if you want to do this, as it currently requires connecting to the live server with an appropriate server URL and bot credentials. The code is not currently set up to do this easily, so we may need to step through the instructions together.

```sh
export SERVER_URL="wss://<region_server>"
export CLIENT_URL="https://game.chronodivide.com/"
```

## Debugging

To generate a replay with debugging enabled:

```sh
npx cross-env MIX_DIR="C:\path_to_ra2_install_dir" npm --node-options="${NODE_OPTIONS} --inspect" start
```

To log all actions generated by the bots:

```sh
DEBUG_LOGGING="action" npx cross-env MIX_DIR="${GAMEPATH}" npm --node-options="${NODE_OPTIONS} --inspect" start
```

We also take advantage of the in-game bot debug functionality provided by CD. These are basically bot-only actions that are saved in the replay, but you must enable the visualisations in the CD client before watching the replay, by typing the following into the dev console:.

```
r.debug_text = true;
```

This will debug the bot which has been configured with `setDebugMode(true)`, this is done in `exampleBot.ts`.

## Publishing

Have the npmjs token in ~/.npmrc or somewhere appropriate.

```
npm publish
```
