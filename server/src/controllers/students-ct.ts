import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

interface Student {
  id: string
  fullname: string
  subjects: string[]
  birthdate: string
  status: "paid" | "waiting" | "expired"
}

let students: Student[] = []; 

export const createStudent = async (req: Request, res: Response) => {
  const { fullname, birthdate, status, subjects } = req.body;
  try {
    const student = {
      id: uuidv4(),
      fullname, 
      birthdate, 
      status, 
      subjects
    };
    students.push(student);
    return res
      .status(201)
      .json({ student, message: "Student created successfuly!" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { id, fullname, birthdate, status, subjects } = req.body;
  try {
    students.forEach(student => {
      if (student.id === id) {
        student.fullname = fullname;
        student.birthdate = birthdate;
        student.status = status;
        student.subjects = subjects;
      }
    });
    return res.status(201).json({ message: "Student updated successfuly!" });
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
  const { id } = req.params;
  try {
    const student = students.filter(student => student.id === id)[0];
    return res.status(201).json({ student });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    students = students.filter(student => student.id !== id);
    return res.status(201).json({ message: "Student deleted successfuly!" });
  } catch (error) {
    return res.status(401).json({ error });
  }
};
