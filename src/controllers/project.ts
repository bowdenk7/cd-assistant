import { Request, Response, NextFunction } from "express";
import { Project, ProjectModel } from "../models/Project";

/**
 * GET /projects
 * View that displays list of projects and allows user to add new project.
 */
export let getProjects = (req: Request, res: Response) => {
  res.render("projects", {
    title: "Projects"
  });
};

/**
 * PUT /project
 * Creates a new project and saves to database.
 */
export let createProject = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Title is required").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/projects");
  }

  const user = new Project({
    name: req.body.projectName,
    description: req.body.description,
    marketSize: req.body.marketSize,
    marketSizeUnit: req.body.marketSizeUnit
  });

  user.save((err) => {
    if (err) { return next(err); }
    res.redirect("/projects");
  });
};