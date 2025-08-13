import prismaClient from "../lib/prisma";
import { Request, Response } from "express";

async function getApplications(_: Request, res: Response) {
  try {
    const applications = await prismaClient.jobApplication.findMany({
      include: {
        currentStatus: true,
      },
      orderBy: {
        dateApplied: "desc",
      },
    });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in getApplications: ", error);
  }
}

async function getApplication(req: Request, res: Response) {
  try {
    const application = await prismaClient.jobApplication.findUnique({
      where: {
        id: req.params.id,
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

async function createApplication(req: Request, res: Response) {
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
      },
    });
    console.log(application);
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Error in createApplication`, error);
  }
}

async function deleteApplication(req: Request, res: Response) {
  try {
    const application = await prismaClient.jobApplication.delete({
      where: {
        id: req.params.id,
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

async function updateApplication(req: Request, res: Response) {
  try {
    const application = await prismaClient.jobApplication.update({
      where: {
        id: req.params.id,
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
