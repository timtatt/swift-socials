import mongoose, { ObjectId, Types, connect, Model } from 'mongoose';
import { Template } from '../types/template';
import { ITemplate, TemplateModel } from './models/template';

declare global {
	var db: SwiftSocialsDatabase;
}

export class SwiftSocialsDatabase {
	// dexie: Dexie;
	// templates!: Dexie.Table<Template, number>;
	connection: any
	connectionPromise: any

	constructor() {
		this.connect();
	}

	async connect() {
		if (this.connection) {
			return this.connection
		}

		if (!this.connectionPromise) {
			this.connectionPromise = mongoose.connect('mongodb://127.0.0.1:27017/db?authSource=admin', {
				user: 'root',
				pass: 'example'
			})
		}
		this.connection = await this.connectionPromise;
		return this.connection	
	}

	async getTemplates(): Promise<Array<ITemplate>> {
		return await TemplateModel.find({}).exec();
	}

	async getTemplate(templateId: number): Promise<Template> {
		const template = await TemplateModel.findById(templateId);

		if (!template) {
			throw new Error(`Template not found with id ${templateId}`);
		}

		return template;
	}

	async deleteTemplate(templateId: ObjectId) {
		await TemplateModel.deleteOne(templateId);
	}

	async saveTemplate(template: Template): Promise<Types.ObjectId> {
		const model = new TemplateModel(template);
		await model.save();

		return model.id;
	}
}

const db = global.db ?? new SwiftSocialsDatabase();
export { db };