import './index.scss';

import "reflect-metadata"
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TemplateEditor from './templates/TemplateEditor';
import { TemplateList } from './templates/TemplateList';
import { PostEditor } from './posts/PostEditor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
    	<Routes>
				<Route path="/" element={<Navigate to="/templates" />}></Route>
				<Route path="/templates/" element={<TemplateList />} />
				<Route path="/templates/:templateId" element={<TemplateEditor />} />
				<Route path="/posts/new" element={<PostEditor />} />
			</Routes>
		</BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
