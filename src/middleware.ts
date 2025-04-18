import { defineMiddleware } from "astro:middleware";
import { getActionContext } from "astro:actions";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) return next();

  const { action, setActionResult, serializeActionResult } =
    getActionContext(context);

  // Cache actionResult for next request
  if (action?.calledFrom === "form") {
    const actionResult = await action.handler();

    context.session?.set("actionResult", {
      actionName: action.name,
      actionResult: serializeActionResult(actionResult),
    });

    // Error handling
    if (actionResult.error) {
      const referer = context.request.headers.get("Referer");
      if (!referer) {
        throw new Error(
          "Internal: Referer unexpectedly missing from Action POST request.",
        );
      }
      return context.redirect(referer);
    }

    // Redirect to the destination page on success
    return context.redirect(context.originPathname);
  }

  // Use The cached actionResult and then delete it.
  const sessionResult = await context.session?.get("actionResult");
  if (sessionResult) {
    setActionResult(sessionResult.actionName, sessionResult.actionResult);
    context.session?.delete("actionResult");
  }

  return next();
});
