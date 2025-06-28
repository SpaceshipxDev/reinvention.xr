/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/search/route";
exports.ids = ["app/api/search/route"];
exports.modules = {

/***/ "(rsc)/./app/api/search/route.ts":
/*!*********************************!*\
  !*** ./app/api/search/route.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/../node_modules/@google/genai/dist/node/index.mjs\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"(rsc)/../node_modules/firebase/firestore/dist/index.mjs\");\n/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/firebase */ \"(rsc)/./lib/firebase.ts\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n// app/api/search/route.ts\n\n\n\n\n// API key is pulled from GOOGLE_API_KEY in .env.local automatically.\nconst ai = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n    apiKey: process.env.GOOGLE_API_KEY\n});\nfunction formatJobsForAI(jobs) {\n    return jobs.map((j)=>`Job ID: ${j.id}\\nMetadata: ${j.meta || \"No metadata\"}\\n`).join(\"---\\n\");\n}\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const searchQuery = body.query;\n        if (!searchQuery) {\n            return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n                error: \"Search query is required\"\n            }, {\n                status: 400\n            });\n        }\n        // Fetch all jobs from Firestore\n        const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.collection)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.db, \"jobs\"));\n        const snap = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getDocs)(q);\n        const allJobs = snap.docs.map((d)=>{\n            const data = d.data();\n            return {\n                id: data.id,\n                folder: data.folder,\n                fileCount: data.fileCount,\n                meta: data.meta || \"\",\n                createdAtMs: data.createdAt ? data.createdAt.toMillis() : null\n            };\n        });\n        if (allJobs.length === 0) {\n            return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json([]);\n        }\n        // Prepare the prompt for Gemini\n        const context = formatJobsForAI(allJobs);\n        const prompt = `You are an intelligent search assistant for a job management system.\n    Your task is to find the most relevant jobs based on a user's query.\n\n    Here is the full list of available jobs, each with a Job ID and its associated Metadata:\n    ---\n    ${context}\n    ---\n\n    Now, analyze the following user query and identify the most relevant Job IDs from the list above.\n    User Query: \"${searchQuery}\"\n\n    Your response MUST be a single line of text containing ONLY the relevant Job IDs, separated by commas. Do not include any other text, explanations, or formatting.\n    For example: id-abc-123,id-def-456`;\n        // Use new 2025 Gemini API\n        const aiResponse = await ai.models.generateContent({\n            model: \"gemini-2.5-flash-lite-preview-06-17\",\n            contents: prompt\n        });\n        const aiResponseText = aiResponse.text; // No .response, it's direct\n        // Parse the AI's response\n        const relevantIds = aiResponseText.split(\",\").map((id)=>id.trim());\n        const relevantJobs = allJobs.filter((job)=>relevantIds.includes(job.id));\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json(relevantJobs);\n    } catch (error) {\n        console.error(\"Error in AI search:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_3__.NextResponse.json({\n            error: \"Failed to perform AI search\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NlYXJjaC9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDBCQUEwQjtBQUVrQjtBQUNvQjtBQUM1QjtBQUVvQjtBQUV4RCxxRUFBcUU7QUFDckUsTUFBTU0sS0FBSyxJQUFJTixzREFBV0EsQ0FBQztJQUFFTyxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7QUFBQztBQUVoRSxTQUFTQyxnQkFBZ0JDLElBQWU7SUFDdEMsT0FBT0EsS0FDSkMsR0FBRyxDQUFDQyxDQUFBQSxJQUFLLENBQUMsUUFBUSxFQUFFQSxFQUFFQyxFQUFFLENBQUMsWUFBWSxFQUFFRCxFQUFFRSxJQUFJLElBQUksY0FBYyxFQUFFLENBQUMsRUFDbEVDLElBQUksQ0FBQztBQUNWO0FBRU8sZUFBZUMsS0FBS0MsR0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTUQsSUFBSUUsSUFBSTtRQUMzQixNQUFNQyxjQUFjRixLQUFLakIsS0FBSztRQUU5QixJQUFJLENBQUNtQixhQUFhO1lBQ2hCLE9BQU9qQixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztnQkFBRUUsT0FBTztZQUEyQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDaEY7UUFFQSxnQ0FBZ0M7UUFDaEMsTUFBTUMsSUFBSXRCLHlEQUFLQSxDQUFDRiw4REFBVUEsQ0FBQ0csNkNBQUVBLEVBQUU7UUFDL0IsTUFBTXNCLE9BQU8sTUFBTXhCLDJEQUFPQSxDQUFDdUI7UUFDM0IsTUFBTUUsVUFBcUJELEtBQUtFLElBQUksQ0FBQ2YsR0FBRyxDQUFDZ0IsQ0FBQUE7WUFDdkMsTUFBTUMsT0FBT0QsRUFBRUMsSUFBSTtZQUNuQixPQUFPO2dCQUNMZixJQUFJZSxLQUFLZixFQUFFO2dCQUNYZ0IsUUFBUUQsS0FBS0MsTUFBTTtnQkFDbkJDLFdBQVdGLEtBQUtFLFNBQVM7Z0JBQ3pCaEIsTUFBTWMsS0FBS2QsSUFBSSxJQUFJO2dCQUNuQmlCLGFBQWFILEtBQUtJLFNBQVMsR0FBR0osS0FBS0ksU0FBUyxDQUFDQyxRQUFRLEtBQUs7WUFDNUQ7UUFDRjtRQUVBLElBQUlSLFFBQVFTLE1BQU0sS0FBSyxHQUFHO1lBQ3hCLE9BQU8vQixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQyxFQUFFO1FBQzdCO1FBRUEsZ0NBQWdDO1FBQ2hDLE1BQU1nQixVQUFVMUIsZ0JBQWdCZ0I7UUFDaEMsTUFBTVcsU0FBUyxDQUFDOzs7OztJQUtoQixFQUFFRCxRQUFROzs7O2lCQUlHLEVBQUVmLFlBQVk7OztzQ0FHTyxDQUFDO1FBRW5DLDBCQUEwQjtRQUMxQixNQUFNaUIsYUFBYSxNQUFNakMsR0FBR2tDLE1BQU0sQ0FBQ0MsZUFBZSxDQUFDO1lBQ2pEQyxPQUFPO1lBQ1BDLFVBQVVMO1FBQ1o7UUFFQSxNQUFNTSxpQkFBaUJMLFdBQVdNLElBQUksRUFBRSw0QkFBNEI7UUFFcEUsMEJBQTBCO1FBQzFCLE1BQU1DLGNBQWNGLGVBQWVHLEtBQUssQ0FBQyxLQUFLbEMsR0FBRyxDQUFDRSxDQUFBQSxLQUFNQSxHQUFHaUMsSUFBSTtRQUMvRCxNQUFNQyxlQUFldEIsUUFBUXVCLE1BQU0sQ0FBQ0MsQ0FBQUEsTUFBT0wsWUFBWU0sUUFBUSxDQUFDRCxJQUFJcEMsRUFBRTtRQUV0RSxPQUFPVixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQzRCO0lBRTNCLEVBQUUsT0FBTzFCLE9BQU87UUFDZDhCLFFBQVE5QixLQUFLLENBQUMsdUJBQXVCQTtRQUNyQyxPQUFPbEIscURBQVlBLENBQUNnQixJQUFJLENBQUM7WUFBRUUsT0FBTztRQUE4QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNuRjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvaGFzaGFzaGluL0RvY3VtZW50cy9yZWludmVudGlvbi54ci9hcHAvYXBpL3NlYXJjaC9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcHAvYXBpL3NlYXJjaC9yb3V0ZS50c1xuXG5pbXBvcnQgeyBHb29nbGVHZW5BSSB9IGZyb20gXCJAZ29vZ2xlL2dlbmFpXCI7XG5pbXBvcnQgeyBjb2xsZWN0aW9uLCBnZXREb2NzLCBxdWVyeSB9IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcbmltcG9ydCB7IGRiIH0gZnJvbSBcIkAvbGliL2ZpcmViYXNlXCI7XG5pbXBvcnQgeyBKb2JNZXRhIH0gZnJvbSBcIkAvY29tcG9uZW50cy9Kb2JSb3dcIjtcbmltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcblxuLy8gQVBJIGtleSBpcyBwdWxsZWQgZnJvbSBHT09HTEVfQVBJX0tFWSBpbiAuZW52LmxvY2FsIGF1dG9tYXRpY2FsbHkuXG5jb25zdCBhaSA9IG5ldyBHb29nbGVHZW5BSSh7IGFwaUtleTogcHJvY2Vzcy5lbnYuR09PR0xFX0FQSV9LRVkgfSk7XG5cbmZ1bmN0aW9uIGZvcm1hdEpvYnNGb3JBSShqb2JzOiBKb2JNZXRhW10pOiBzdHJpbmcge1xuICByZXR1cm4gam9ic1xuICAgIC5tYXAoaiA9PiBgSm9iIElEOiAke2ouaWR9XFxuTWV0YWRhdGE6ICR7ai5tZXRhIHx8IFwiTm8gbWV0YWRhdGFcIn1cXG5gKVxuICAgIC5qb2luKFwiLS0tXFxuXCIpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IE5leHRSZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgY29uc3Qgc2VhcmNoUXVlcnkgPSBib2R5LnF1ZXJ5O1xuXG4gICAgaWYgKCFzZWFyY2hRdWVyeSkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiU2VhcmNoIHF1ZXJ5IGlzIHJlcXVpcmVkXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG5cbiAgICAvLyBGZXRjaCBhbGwgam9icyBmcm9tIEZpcmVzdG9yZVxuICAgIGNvbnN0IHEgPSBxdWVyeShjb2xsZWN0aW9uKGRiLCBcImpvYnNcIikpO1xuICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBnZXREb2NzKHEpO1xuICAgIGNvbnN0IGFsbEpvYnM6IEpvYk1ldGFbXSA9IHNuYXAuZG9jcy5tYXAoZCA9PiB7XG4gICAgICBjb25zdCBkYXRhID0gZC5kYXRhKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpZDogZGF0YS5pZCxcbiAgICAgICAgZm9sZGVyOiBkYXRhLmZvbGRlcixcbiAgICAgICAgZmlsZUNvdW50OiBkYXRhLmZpbGVDb3VudCxcbiAgICAgICAgbWV0YTogZGF0YS5tZXRhIHx8IFwiXCIsXG4gICAgICAgIGNyZWF0ZWRBdE1zOiBkYXRhLmNyZWF0ZWRBdCA/IGRhdGEuY3JlYXRlZEF0LnRvTWlsbGlzKCkgOiBudWxsLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGlmIChhbGxKb2JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFtdKTtcbiAgICB9XG5cbiAgICAvLyBQcmVwYXJlIHRoZSBwcm9tcHQgZm9yIEdlbWluaVxuICAgIGNvbnN0IGNvbnRleHQgPSBmb3JtYXRKb2JzRm9yQUkoYWxsSm9icyk7XG4gICAgY29uc3QgcHJvbXB0ID0gYFlvdSBhcmUgYW4gaW50ZWxsaWdlbnQgc2VhcmNoIGFzc2lzdGFudCBmb3IgYSBqb2IgbWFuYWdlbWVudCBzeXN0ZW0uXG4gICAgWW91ciB0YXNrIGlzIHRvIGZpbmQgdGhlIG1vc3QgcmVsZXZhbnQgam9icyBiYXNlZCBvbiBhIHVzZXIncyBxdWVyeS5cblxuICAgIEhlcmUgaXMgdGhlIGZ1bGwgbGlzdCBvZiBhdmFpbGFibGUgam9icywgZWFjaCB3aXRoIGEgSm9iIElEIGFuZCBpdHMgYXNzb2NpYXRlZCBNZXRhZGF0YTpcbiAgICAtLS1cbiAgICAke2NvbnRleHR9XG4gICAgLS0tXG5cbiAgICBOb3csIGFuYWx5emUgdGhlIGZvbGxvd2luZyB1c2VyIHF1ZXJ5IGFuZCBpZGVudGlmeSB0aGUgbW9zdCByZWxldmFudCBKb2IgSURzIGZyb20gdGhlIGxpc3QgYWJvdmUuXG4gICAgVXNlciBRdWVyeTogXCIke3NlYXJjaFF1ZXJ5fVwiXG5cbiAgICBZb3VyIHJlc3BvbnNlIE1VU1QgYmUgYSBzaW5nbGUgbGluZSBvZiB0ZXh0IGNvbnRhaW5pbmcgT05MWSB0aGUgcmVsZXZhbnQgSm9iIElEcywgc2VwYXJhdGVkIGJ5IGNvbW1hcy4gRG8gbm90IGluY2x1ZGUgYW55IG90aGVyIHRleHQsIGV4cGxhbmF0aW9ucywgb3IgZm9ybWF0dGluZy5cbiAgICBGb3IgZXhhbXBsZTogaWQtYWJjLTEyMyxpZC1kZWYtNDU2YDtcblxuICAgIC8vIFVzZSBuZXcgMjAyNSBHZW1pbmkgQVBJXG4gICAgY29uc3QgYWlSZXNwb25zZSA9IGF3YWl0IGFpLm1vZGVscy5nZW5lcmF0ZUNvbnRlbnQoe1xuICAgICAgbW9kZWw6IFwiZ2VtaW5pLTIuNS1mbGFzaC1saXRlLXByZXZpZXctMDYtMTdcIiwgLy8gVXNlIHlvdXIgcHJlZmVycmVkIG1vZGVsIGhlcmVcbiAgICAgIGNvbnRlbnRzOiBwcm9tcHQsXG4gICAgfSk7XG5cbiAgICBjb25zdCBhaVJlc3BvbnNlVGV4dCA9IGFpUmVzcG9uc2UudGV4dDsgLy8gTm8gLnJlc3BvbnNlLCBpdCdzIGRpcmVjdFxuXG4gICAgLy8gUGFyc2UgdGhlIEFJJ3MgcmVzcG9uc2VcbiAgICBjb25zdCByZWxldmFudElkcyA9IGFpUmVzcG9uc2VUZXh0LnNwbGl0KFwiLFwiKS5tYXAoaWQgPT4gaWQudHJpbSgpKTtcbiAgICBjb25zdCByZWxldmFudEpvYnMgPSBhbGxKb2JzLmZpbHRlcihqb2IgPT4gcmVsZXZhbnRJZHMuaW5jbHVkZXMoam9iLmlkKSk7XG5cbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24ocmVsZXZhbnRKb2JzKTtcblxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiBBSSBzZWFyY2g6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gcGVyZm9ybSBBSSBzZWFyY2hcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59Il0sIm5hbWVzIjpbIkdvb2dsZUdlbkFJIiwiY29sbGVjdGlvbiIsImdldERvY3MiLCJxdWVyeSIsImRiIiwiTmV4dFJlc3BvbnNlIiwiYWkiLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0FQSV9LRVkiLCJmb3JtYXRKb2JzRm9yQUkiLCJqb2JzIiwibWFwIiwiaiIsImlkIiwibWV0YSIsImpvaW4iLCJQT1NUIiwicmVxIiwiYm9keSIsImpzb24iLCJzZWFyY2hRdWVyeSIsImVycm9yIiwic3RhdHVzIiwicSIsInNuYXAiLCJhbGxKb2JzIiwiZG9jcyIsImQiLCJkYXRhIiwiZm9sZGVyIiwiZmlsZUNvdW50IiwiY3JlYXRlZEF0TXMiLCJjcmVhdGVkQXQiLCJ0b01pbGxpcyIsImxlbmd0aCIsImNvbnRleHQiLCJwcm9tcHQiLCJhaVJlc3BvbnNlIiwibW9kZWxzIiwiZ2VuZXJhdGVDb250ZW50IiwibW9kZWwiLCJjb250ZW50cyIsImFpUmVzcG9uc2VUZXh0IiwidGV4dCIsInJlbGV2YW50SWRzIiwic3BsaXQiLCJ0cmltIiwicmVsZXZhbnRKb2JzIiwiZmlsdGVyIiwiam9iIiwiaW5jbHVkZXMiLCJjb25zb2xlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/search/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/firebase.ts":
/*!*************************!*\
  !*** ./lib/firebase.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   app: () => (/* binding */ app),\n/* harmony export */   db: () => (/* binding */ db),\n/* harmony export */   storage: () => (/* binding */ storage)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"(rsc)/../node_modules/firebase/app/dist/index.mjs\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ \"(rsc)/../node_modules/firebase/firestore/dist/index.mjs\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/storage */ \"(rsc)/../node_modules/firebase/storage/dist/index.mjs\");\n\n\n\n// TODO: Add SDKs for Firebase products that you want to use\n// https://firebase.google.com/docs/web/setup#available-libraries\n// Your web app's Firebase configuration\n// For Firebase JS SDK v7.20.0 and later, measurementId is optional\nconst firebaseConfig = {\n    apiKey: \"AIzaSyBBLUvX3sIKQC0a757xAfOo9a_8jaoLkFE\",\n    authDomain: \"eldaline.firebaseapp.com\",\n    projectId: \"eldaline\",\n    storageBucket: \"eldaline.firebasestorage.app\",\n    messagingSenderId: \"48556909421\",\n    appId: \"1:48556909421:web:594fc97ff709ae9b49b064\",\n    measurementId: \"G-70XMNPNVNK\"\n};\n// Initialize Firebase\nconst app = !(0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)().length ? (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig) : (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApp)();\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);\nconst storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_2__.getStorage)(app);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZmlyZWJhc2UudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQThEO0FBQ1o7QUFDSjtBQUM5Qyw0REFBNEQ7QUFDNUQsaUVBQWlFO0FBRWpFLHdDQUF3QztBQUN4QyxtRUFBbUU7QUFDbkUsTUFBTUssaUJBQWlCO0lBQ3JCQyxRQUFRO0lBQ1JDLFlBQVk7SUFDWkMsV0FBVztJQUNYQyxlQUFlO0lBQ2ZDLG1CQUFtQjtJQUNuQkMsT0FBTztJQUNQQyxlQUFlO0FBQ2pCO0FBRUEsc0JBQXNCO0FBQ3RCLE1BQU1DLE1BQU0sQ0FBQ1oscURBQU9BLEdBQUdhLE1BQU0sR0FBR2QsMkRBQWFBLENBQUNLLGtCQUFrQkgsb0RBQU1BO0FBQ3RFLE1BQU1hLEtBQUtaLGdFQUFZQSxDQUFDVTtBQUN4QixNQUFNRyxVQUFVWiw0REFBVUEsQ0FBQ1M7QUFFQyIsInNvdXJjZXMiOlsiL1VzZXJzL2hhc2hhc2hpbi9Eb2N1bWVudHMvcmVpbnZlbnRpb24ueHIvbGliL2ZpcmViYXNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRpYWxpemVBcHAsIGdldEFwcHMsIGdldEFwcCB9IGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcbmltcG9ydCB7IGdldEZpcmVzdG9yZSB9IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcbmltcG9ydCB7IGdldFN0b3JhZ2UgfSBmcm9tIFwiZmlyZWJhc2Uvc3RvcmFnZVwiO1xuLy8gVE9ETzogQWRkIFNES3MgZm9yIEZpcmViYXNlIHByb2R1Y3RzIHRoYXQgeW91IHdhbnQgdG8gdXNlXG4vLyBodHRwczovL2ZpcmViYXNlLmdvb2dsZS5jb20vZG9jcy93ZWIvc2V0dXAjYXZhaWxhYmxlLWxpYnJhcmllc1xuXG4vLyBZb3VyIHdlYiBhcHAncyBGaXJlYmFzZSBjb25maWd1cmF0aW9uXG4vLyBGb3IgRmlyZWJhc2UgSlMgU0RLIHY3LjIwLjAgYW5kIGxhdGVyLCBtZWFzdXJlbWVudElkIGlzIG9wdGlvbmFsXG5jb25zdCBmaXJlYmFzZUNvbmZpZyA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUJCTFV2WDNzSUtRQzBhNzU3eEFmT285YV84amFvTGtGRVwiLFxuICBhdXRoRG9tYWluOiBcImVsZGFsaW5lLmZpcmViYXNlYXBwLmNvbVwiLFxuICBwcm9qZWN0SWQ6IFwiZWxkYWxpbmVcIixcbiAgc3RvcmFnZUJ1Y2tldDogXCJlbGRhbGluZS5maXJlYmFzZXN0b3JhZ2UuYXBwXCIsXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjQ4NTU2OTA5NDIxXCIsXG4gIGFwcElkOiBcIjE6NDg1NTY5MDk0MjE6d2ViOjU5NGZjOTdmZjcwOWFlOWI0OWIwNjRcIixcbiAgbWVhc3VyZW1lbnRJZDogXCJHLTcwWE1OUE5WTktcIlxufTtcblxuLy8gSW5pdGlhbGl6ZSBGaXJlYmFzZVxuY29uc3QgYXBwID0gIWdldEFwcHMoKS5sZW5ndGggPyBpbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKSA6IGdldEFwcCgpO1xuY29uc3QgZGIgPSBnZXRGaXJlc3RvcmUoYXBwKTtcbmNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKGFwcCk7XG5cbmV4cG9ydCB7IGFwcCwgZGIsIHN0b3JhZ2UgfTsiXSwibmFtZXMiOlsiaW5pdGlhbGl6ZUFwcCIsImdldEFwcHMiLCJnZXRBcHAiLCJnZXRGaXJlc3RvcmUiLCJnZXRTdG9yYWdlIiwiZmlyZWJhc2VDb25maWciLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiYXBwSWQiLCJtZWFzdXJlbWVudElkIiwiYXBwIiwibGVuZ3RoIiwiZGIiLCJzdG9yYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/firebase.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fhashashin%2FDocuments%2Freinvention.xr%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fhashashin%2FDocuments%2Freinvention.xr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fhashashin%2FDocuments%2Freinvention.xr%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fhashashin%2FDocuments%2Freinvention.xr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_hashashin_Documents_reinvention_xr_app_api_search_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/search/route.ts */ \"(rsc)/./app/api/search/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/search/route\",\n        pathname: \"/api/search\",\n        filename: \"route\",\n        bundlePath: \"app/api/search/route\"\n    },\n    resolvedPagePath: \"/Users/hashashin/Documents/reinvention.xr/app/api/search/route.ts\",\n    nextConfigOutput,\n    userland: _Users_hashashin_Documents_reinvention_xr_app_api_search_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzZWFyY2glMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRnNlYXJjaCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRnNlYXJjaCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmhhc2hhc2hpbiUyRkRvY3VtZW50cyUyRnJlaW52ZW50aW9uLnhyJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmhhc2hhc2hpbiUyRkRvY3VtZW50cyUyRnJlaW52ZW50aW9uLnhyJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNpQjtBQUM5RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2hhc2hhc2hpbi9Eb2N1bWVudHMvcmVpbnZlbnRpb24ueHIvYXBwL2FwaS9zZWFyY2gvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3NlYXJjaC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3NlYXJjaFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvc2VhcmNoL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2hhc2hhc2hpbi9Eb2N1bWVudHMvcmVpbnZlbnRpb24ueHIvYXBwL2FwaS9zZWFyY2gvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fhashashin%2FDocuments%2Freinvention.xr%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fhashashin%2FDocuments%2Freinvention.xr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?7f96":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?8cce":
/*!********************************!*\
  !*** supports-color (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?d1cc":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/@firebase","vendor-chunks/@grpc","vendor-chunks/protobufjs","vendor-chunks/long","vendor-chunks/@protobufjs","vendor-chunks/lodash.camelcase","vendor-chunks/idb","vendor-chunks/firebase","vendor-chunks/uuid","vendor-chunks/safe-buffer","vendor-chunks/is-stream","vendor-chunks/google-auth-library","vendor-chunks/ws","vendor-chunks/zod","vendor-chunks/gaxios","vendor-chunks/whatwg-url","vendor-chunks/jws","vendor-chunks/debug","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/tr46","vendor-chunks/https-proxy-agent","vendor-chunks/gcp-metadata","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/agent-base","vendor-chunks/node-fetch","vendor-chunks/@google","vendor-chunks/webidl-conversions","vendor-chunks/ms","vendor-chunks/jwa","vendor-chunks/gtoken","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsearch%2Froute&page=%2Fapi%2Fsearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsearch%2Froute.ts&appDir=%2FUsers%2Fhashashin%2FDocuments%2Freinvention.xr%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fhashashin%2FDocuments%2Freinvention.xr&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();