import { GameApi, PlayerData, Point2D, TechnoRules, Tile } from "@chronodivide/game-api";
import { GlobalThreat } from "../threat/threat.js";
import { BasicBuilding } from "./basicBuilding.js";
import { BasicGroundUnit } from "./basicGroundUnit.js";

const IDEAL_HARVESTERS_PER_REFINERY = 2;

export class Harvester extends BasicGroundUnit {
    constructor(basePriority: number, baseAmount: number) {
        super(basePriority, baseAmount, 0, 0);
    }

    // Priority goes up when we have fewer than this many refineries.
    getPriority(
        game: GameApi,
        playerData: PlayerData,
        technoRules: TechnoRules,
        threatCache: GlobalThreat | undefined
    ): number {
        const refineries = game.getVisibleUnits(playerData.name, "self", (r) => r.refinery).length;
        const harvesters = game.getVisibleUnits(playerData.name, "self", (r) => r.harvester).length;

        if (harvesters >= refineries * IDEAL_HARVESTERS_PER_REFINERY) {
            return this.basePriority;
        } else {
            return this.basePriority * (refineries / Math.max(harvesters / IDEAL_HARVESTERS_PER_REFINERY, 1));
        }
    }
}
