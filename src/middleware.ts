import { defineMiddleware } from "astro:middleware";
import { getActionContext } from "astro:actions";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) return next();

  const { action, setActionResult, serializeActionResult } =
    getActionContext(context);

  if (action?.calledFrom === "form") {
    const result = await action.handler();
    // ... handle the action result
    setActionResult(action.name, serializeActionResult(result));
  }
  return next();
});
