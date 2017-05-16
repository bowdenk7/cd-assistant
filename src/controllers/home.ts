import {Request, Response} from "express";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.redirect("/projects");
  }

  res.render("home", {
    title: "Home"
  });
};

