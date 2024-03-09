import { ExpoRequest, ExpoResponse } from "expo-router/server";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(request: ExpoRequest) {
  console.log("Hello on the server!");
  await sleep(2000);
  return ExpoResponse.json({ hello: "world" });
}
