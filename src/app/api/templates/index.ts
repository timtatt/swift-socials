import { NextApiRequest, NextApiResponse } from "next";
import { db } from '@/common/lib/database';

// TODO add request validation
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await db.connect();
	if (req.method == 'POST') {

		const template = JSON.parse(req.body);
		const templateId = await db.saveTemplate(template);

		res.status(201).send({
			status: "Success",
			templateId
		})
	} else if (req.method == 'GET') {
		await db.connect();
		const templates = await db.getTemplates();

		res.status(200).send({
			templates
		})
	}
}