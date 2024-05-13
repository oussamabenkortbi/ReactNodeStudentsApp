import { Request, Response } from "express";

interface Student {
  id: string
  fullname: string
  subjects: string[]
  birthdate: string
  status: "paid" | "waiting" | "expired"
}

let students: Student[] = []; 

export const createStudent = async (req: Request, res: Response) => {
  const { student } = req.body;
  try {
    students.push(student);
    return res
      .status(201)
      .json({ student, message: "Student created successfuly!" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { student } = req.body;
  try {
    return res.status(201).json({ student, message: "Student updated successfuly!" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try { 
    return res.status(201).json({ students });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const getStudent = async (req: Request, res: Response) => {
  const { id } = req.query;
  const student = students.filter(student => student.id === id)[0];
  try {
    return res.status(201).json({ student });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.query;
  students = students.filter(student => student.id !== id);
  try {
    return res.status(201).json({ message: "Student deleted successfuly!" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};
