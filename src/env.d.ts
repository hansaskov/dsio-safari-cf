import type { SerializedActionResult } from "astro:actions";

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
  interface SessionData {
    name: string;
    actionResult?: {
      actionName: string;
      actionResult: SerializedActionResult;
    };
  }
}