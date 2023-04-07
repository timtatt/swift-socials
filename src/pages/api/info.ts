import { NextApiRequest, NextApiResponse } from "next";
import { version } from './../../../package.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({
		version
	});
}