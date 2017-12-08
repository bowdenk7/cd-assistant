import { Request, Response, NextFunction } from "express";
import { Project } from "../models/Project";
import { WriteError } from "mongodb";
import {User} from "../models/User";

export let project = (req: Request, res: Response, next: NextFunction) => {
  Project.findById(req.params.projectId, (err, project) => {
    if (err) { return next(err); }
    req.session.activeProject = project;

    res.render("project", {
      title: "Project Details",
      project: project
    });
  });
};

/**
 * GET /newProject
 * Allows user to add new project.
 */
export let newProject = (req: Request, res: Response) => {
  res.render("newProject", {
    title: "New Project"
  });
};

/**
 * GET /goals
 * Displays view that shows list of goals.
 */
export let getGoals = (req: Request, res: Response) => {
  res.render("goals", {
    title: "Goals",
    project: req.session.activeProject
  });
};

export let postGoal = (req: Request, res: Response) => {
  req.assert("goal", "Goal cannot be blank").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
      req.flash("errors", errors);
      return res.redirect("/project/" + req.session.activeProject + "/goals");
  }

  const updatedProject = Project.findByIdAndUpdate(
    req.params.projectId,
    {$push: {"goals": {text: req.body.goal}}},
    {new: true},
    function(err, updatedModel) {
      if (err) {console.log(err); }

      req.flash("success", {msg: "Success! Goal added!"});
      req.session.activeProject = updatedModel;
      return res.redirect("/project/" + updatedModel._id + "/goals");
    }
  );

};

export let getQuestions = (req: Request, res: Response) => {
  res.render("questions", {
    title: "Questions"
  });
};

export let getCustomerData = ( req: Request, res: Response) => {
  res.render("customerData", {
    title: "Customer Data"
  });
};

export let getReports = (req: Request, res: Response) => {
  res.render("reports", {
    title: "Reports"
  });
};

/**
 * POST /project
 * Creates a new project and saves to database.
 */
export let postNewProject = (req: Request, res: Response, next: NextFunction) => {
  req.assert("projectName", "Project name is required").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/projects");
  }

  const project = new Project({
    name: req.body.projectName,
    description: req.body.description,
    creator: req.user
  });

  project.save((err) => {
    if (err) { return next(err); }
  });

  req.session.projects.push(project);
  req.session.activeProject = project;

  console.log(req.user.id);
  User.findByIdAndUpdate(
    req.user.id,
    {$push: {"projects": project._id}},
    {new: true},
    function(err, model) {
      if (err) {
        console.log(err);
      }
      req.flash("success", { msg: "Success! Project created!"});
      return res.redirect("/");
    }
  );
};