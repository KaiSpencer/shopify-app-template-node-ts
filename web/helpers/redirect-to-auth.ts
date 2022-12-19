import { Shopify } from "@shopify/shopify-api";
import { Application, Request, Response, RequestHandler } from "express";

type RedirectAuthQuery = {
  shop?: string;
  embedded?: string;
};

type RedirectWithShopAuthQuery = {
  shop: string;
  host: string;
};

type RedirectRequest = Request<
  unknown,
  unknown,
  unknown,
  RedirectAuthQuery
>;
const redirectToAuth = (app: Application) => async (req: RedirectRequest, res: Response) => {
  if (!req.query.shop) {
    res.status(500);
    return res.send("No shop provided");
  }

  if (req.query.embedded === "1") {
    return clientSideRedirect(app)(req as RedirectWithShopRequest, res);
  }

  return await serverSideRedirect(app)(req as RedirectWithShopRequest, res);
};

type RedirectWithShopRequest = Request<
  unknown,
  unknown,
  unknown,
  RedirectWithShopAuthQuery
>;
const clientSideRedirect =
  (app: Application) => async (req: RedirectWithShopRequest, res: Response) => {
    const shop = Shopify.Utils.sanitizeShop(req.query.shop)!;
    const redirectUriParams = new URLSearchParams({
      shop,
      host: req.query.host,
    }).toString();

    const queryParams = new URLSearchParams({
      ...req.query,
      shop,
      redirectUri: `https://${Shopify.Context.HOST_NAME}/api/auth?${redirectUriParams}`,
    }).toString();

    return res.redirect(`/exitiframe?${queryParams}`);
  };

const serverSideRedirect =
  (app: Application) => async (req: RedirectWithShopRequest, res: Response) => {
    const redirectUrl = await Shopify.Auth.beginAuth(
      req,
      res,
      req.query.shop,
      "/api/auth/callback",
      app.get("use-online-tokens")
    );

    return res.redirect(redirectUrl);
  };

export default redirectToAuth;
