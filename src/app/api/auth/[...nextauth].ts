// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"
// import { PouchDBAdapter } from "@next-auth/pouchdb-adapter"
// import PouchDB from "pouchdb"

// // Setup your PouchDB instance and database
// PouchDB
// 	.plugin(require("pouchdb-adapter-leveldb")) // Or any other adapter
// 	.plugin(require("pouchdb-find")) // Don't forget the `pouchdb-find` plugin

// const pouchdb = new PouchDB("auth_db", { adapter: "leveldb" })

// // For more information on each option (and a full list of options) go to
// // https://authjs.dev/reference/configuration/auth-options
// export default NextAuth({
// 	// https://authjs.dev/reference/providers/
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.GOOGLE_ID,
// 			clientSecret: process.env.GOOGLE_SECRET,
// 		}),
// 	],
// 	adapter: PouchDBAdapter(pouchdb),
// 	// ...
// })