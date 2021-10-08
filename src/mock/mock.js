import Mock from "mockjs"
import floors from "./floors.json"
import recommends from "./recommends.json"

Mock.mock("/api/mock/floors", { code: 200, data: floors })
Mock.mock("/api/mock/recommends", { code: 200, data: recommends })
