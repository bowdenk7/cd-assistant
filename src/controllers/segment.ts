import { Request, Response, NextFunction } from "express";
import { Project } from "../models/Project";
import { WriteError } from "mongodb";
import { User } from "../models/User";

export let getSegments = (req: Request, res: Response) => {
  res.render("segments", {
    title: "Segmentation",
    project: req.session.activeProject
  });
};

/**
 * POST /project/:projectId/targetMarket
 */
export let postTargetMarket = (req: Request, res: Response) => {
  req
    .assert(
      "targetMarket",
      "Target market cannot be empty. What market this product trying to capture?"
    )
    .notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/project/" + req.session.activeProject + "/segments");
  }

  const updatedProject = Project.findByIdAndUpdate(
    req.params.projectId,
    {
      $set: {
        targetMarket: req.body.targetMarket,
        marketSize: req.body.marketSize,
        marketSizeUnit: req.body.marketSizeUnit
      }
    },
    { new: true },
    function(err, updatedModel) {
      if (err) {
        console.log(err);
      }

      req.flash("success", { msg: "Success! Market info updated!" });
      req.session.activeProject = updatedModel;
      return res.redirect("/project/" + updatedModel._id + "/segments");
    }
  );
};

/**
 * POST /project/:projectId/:segmentIndex
 */
export let updateSegment = (req: Request, res: Response) => {
    req.assert("segmentName", "Segment name cannot be empty.").notEmpty();
    const errors = req.validationErrors();
    if (errors) {
      req.flash("errors", errors);
      return res.redirect("/project/" + req.session.activeProject + "/segments");
    }

    const updatedProject = Project.findByIdAndUpdate(
      req.params.projectId,
      {
        $set: {
          segments: {
            name: req.body.segmentName,
            size: req.body.segmentSize,
            description: req.body.segmentDescription
          }
        }
      },
      { new: true },
      function(err, updatedModel) {
        if (err) {
          console.log(err);
        }

        req.flash("success", { msg: "Success! Segment added!" });
        req.session.activeProject = updatedModel;
        return res.redirect("/project/" + updatedModel._id + "/segments");
      }
    );
  };

/**
 * POST /project/:projectId/segment
 */
export let newSegment = (req: Request, res: Response) => {
  req.assert("segmentName", "Segment name cannot be empty.").notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    req.flash("errors", errors);
    return res.redirect("/project/" + req.session.activeProject + "/segments");
  }

  const updatedProject = Project.findByIdAndUpdate(
    req.params.projectId,
    {
      $push: {
        segments: {
          name: req.body.segmentName,
          size: req.body.segmentSize,
          description: req.body.segmentDescription
        }
      }
    },
    { new: true },
    function(err, updatedModel) {
      if (err) {
        console.log(err);
      }

      req.flash("success", { msg: "Success! Segment added!" });
      req.session.activeProject = updatedModel;
      return res.redirect("/project/" + updatedModel._id + "/segments");
    }
  );
};
