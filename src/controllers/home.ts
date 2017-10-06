import { Request, Response, NextFunction } from "express";
import { Project } from "../models/Project";

/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    if (req.user) {
      Project.find({ creator: req.user }, (err, projects) => {
        if (err) { return next(err); }
        req.session.projects = projects;
        res.render("home", {
          title: "Home"
        });
      });
    }
  } else {
    res.render("home", {
      title: "Home"
    });
  }




};

