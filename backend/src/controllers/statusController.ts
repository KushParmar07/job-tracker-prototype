import prismaClient from "../lib/prisma";
import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

async function getStatuses(req: AuthRequest, res: Response) {
  try {
    const statuses = await prismaClient.status.findMany({});
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in getStatuses: ", error);
  }
}

async function getStatus(req: AuthRequest, res: Response) {
  try {
    const status = await prismaClient.status.findFirstOrThrow({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(`Error in getStatus for status of id: ${req.params.id}`, error);
  }
}

async function createStatus(req: AuthRequest, res: Response) {
  try {
    const status = await prismaClient.status.create({
      data: {
        name: req.body.name,
        priority: Number(req.body.priority),
      },
    });
    res.status(200).json(status);
  } catch (error: any) {
    if (error.code == "P2002") {
      res.status(400).json({ message: "Status name must be unique." });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
    console.log("Error in createStatus", error);
  }
}

async function deleteStatus(req: AuthRequest, res: Response) {
  try {
    const status = await prismaClient.status.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(
      `Error in deleteStatus for status of id: ${req.params.id}`,
      error
    );
  }
}

async function updateStatus(req: AuthRequest, res: Response) {
  try {
    const status = await prismaClient.status.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });
    res.status(200).json(status);
  } catch (error: any) {
    if (error.code == "P2002") {
      res.status(400).json({ message: "Status name must be unique" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
    console.log(
      `Error in updateStatus for status of id: ${req.params.id}`,
      error
    );
  }
}

export default {
  getStatuses,
  getStatus,
  createStatus,
  deleteStatus,
  updateStatus,
};
