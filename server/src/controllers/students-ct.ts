import { Request, Response } from "express";

export const createStudent = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    return res
      .status(201)
      .json({ body, message: "Student created successfuly!" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    return res.status(201).json({ body, message: "Student updated successfuly!" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    return res.status(201).json({  });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const getStudent = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    return res.status(201).json({  });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    return res.status(201).json({ message: "Student deleted successfuly!" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};
