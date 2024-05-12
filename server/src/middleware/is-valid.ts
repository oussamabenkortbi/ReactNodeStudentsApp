import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from 'express';

const isValid = (req: Request, res: Response, next: NextFunction) => {
	const validation = validationResult(req);
	if (!validation.isEmpty()) {
		return res.status(422).json({ message: validation.array()[0].msg + " " + validation.array()[0].param })
	}
	next();
}
 
export default isValid