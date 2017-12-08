import { Request, Response, NextFunction } from "express";
import { Project } from "../models/Project";
import { WriteError } from "mongodb";
import {User} from "../models/User";

/**
 * GET /project/:projectId/hypotheses
 */
export let getHypotheses = (req: Request, res: Response) => {
    res.render("hypotheses", {
      title: "Hypotheses",
      project: req.session.activeProject
    });
  };

/**
 * POST /project/:projectId/hypotheses/newJob
 */
export let newJob = (req: Request, res: Response) => {
    req.assert("job", "Job hypothesis cannot be empty.").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      req.flash("errors", errors);
      return res.redirect("/project/" + req.session.activeProject + "/hypotheses");
    }

    const updatedProject = Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $push: {
          hypotheses: {
            text: req.body.job,
            kind: "job"
          }
        }
      },
      { new: true },
      function(err, updatedModel) {
        if (err) {
          console.log(err);
        }

        req.flash("success", { msg: "Success! Job hypothesis added!" });
        req.session.activeProject = updatedModel;
        return res.redirect("/project/" + updatedModel._id + "/segments");
      }
    );
  };