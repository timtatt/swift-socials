import { Template } from "@/common/types/template";
import mongoose from "mongoose";

export type ITemplate = Template & {
	toJSON: () => any
}

export const TemplateSchema = new mongoose.Schema<ITemplate>({
	style: {
		type: String,
	},
	layout: {
		type: String,
	},
	name: {
		type: String,
	},
	size: {
		width: Number,
		height: Number
	},
	form: [{
		type: {
			name: String,
			label: String,
			type: String,
			defaultValue: String,
			settings: {},
			options: {
				required: false,
				type: [{
					name: String,
					title: String
				}]
			},
			children: {
				type: Map,
				of: Object
			}
		},
	}],
}, {
	methods: {
		toJSON() {
			return {
				// _id: this.id,
				style: this.style,
				layout: this.layout,
				size: this.size,
				form: this.form,
			}
		}
	}
});

export const TemplateModel = mongoose.models.Template || mongoose.model<ITemplate>('Template', TemplateSchema);
