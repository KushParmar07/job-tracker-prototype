import prismaClient from "../lib/prisma";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

async function getApplications(req: AuthRequest, res: Response) {
  try {
    const applications = await prismaClient.jobApplication.findMany({
      include: {
        currentStatus: true,
      },
      orderBy: {
        dateApplied: "desc",
      },
      where: {
        Userid: req.userId,
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in getApplications: ", error);
  }
}

async function getApplication(req: AuthRequest, res: Response) {
  try {
    const application = await prismaClient.jobApplication.findUnique({
      where: {
        id: req.params.id,
        Userid: req.userId,
      },
      include: {
        currentStatus: true,
      },
    });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(
      `Error in getApplication for application of id: ${req.params.id}`,
      error
    );
  }
}

async function createApplication(req: AuthRequest, res: Response) {
  try {
    const application = await prismaClient.jobApplication.create({
      data: {
        companyName: req.body.companyName,
        position: req.body.position,
        salary: Number(req.body.salary),
        jobDescription: req.body.jobDescription,
        currentStatus: {
          connect: {
            name: req.body.statusName,
          },
        },
        User: {
          connect: {
            id: req.userId,
          },
        },
      },
    });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Error in createApplication`, error);
  }
}

async function deleteApplication(req: AuthRequest, res: Response) {
  try {
    const application = await prismaClient.jobApplication.deleteMany({
      where: {
        id: req.params.id,
        Userid: req.userId!,
      },
    });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(
      `Error in deleteApplication for application of id: ${req.params.id}`,
      error
    );
  }
}

async function updateApplication(req: AuthRequest, res: Response) {
  try {
    const application = await prismaClient.jobApplication.update({
      where: {
        id: req.params.id,
        Userid: req.userId,
      },
      data: {
        companyName: req.body.companyName,
        position: req.body.position,
        salary: req.body.salary ? Number(req.body.salary) : null,
        jobDescription: req.body.jobDescription,
        currentStatus: req.body.statusName
          ? {
              connect: {
                name: req.body.statusName,
              },
            }
          : undefined,
      },
    });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(
      `Error in updateApplication for application of id: ${req.params.id}`,
      error
    );
  }
}

export default {
  getApplications,
  getApplication,
  createApplication,
  deleteApplication,
  updateApplication,
};
