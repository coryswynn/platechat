"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/user/[userId]",{

/***/ "./pages/user/[userId].tsx":
/*!*********************************!*\
  !*** ./pages/user/[userId].tsx ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __N_SSG: function() { return /* binding */ __N_SSG; },\n/* harmony export */   \"default\": function() { return /* binding */ UserCommentsPage; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Header */ \"./components/Header.tsx\");\n/* harmony import */ var _lib_localDb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/localDb */ \"./lib/localDb.tsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _lib_useAuth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/useAuth */ \"./lib/useAuth.ts\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n // Import Timestamp for Firestore handling\nvar __N_SSG = true;\nfunction UserCommentsPage(param) {\n    let { initialComments, userId } = param;\n    _s();\n    const { upvoteComment, downvoteComment } = (0,_lib_localDb__WEBPACK_IMPORTED_MODULE_3__.useLocalDb)();\n    const { user } = (0,_lib_useAuth__WEBPACK_IMPORTED_MODULE_5__.useAuth)();\n    const currentUserId = user ? user.id : \"\";\n    const [comments, setComments] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialComments);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchComments = async ()=>{\n            const updatedComments = await (0,_lib_localDb__WEBPACK_IMPORTED_MODULE_3__.getCommentsByUser)(userId);\n            setComments(updatedComments);\n        };\n        fetchComments();\n    }, [\n        userId\n    ]);\n    const handleVoteToggle = async (commentId)=>{\n        const comment = comments.find((c)=>c.id === commentId);\n        const hasUpvoted = comment ? comment.upvotedBy.includes(currentUserId) : false;\n        if (hasUpvoted) {\n            await downvoteComment(commentId, currentUserId);\n        } else {\n            await upvoteComment(commentId, currentUserId);\n        }\n        // Refetch comments to reflect updated vote counts\n        const updatedComments = await (0,_lib_localDb__WEBPACK_IMPORTED_MODULE_3__.getCommentsByUser)(userId);\n        setComments(updatedComments);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen bg-black flex flex-col\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                lineNumber: 46,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"flex-grow container mx-auto px-4 py-8\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-between items-center mb-6\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                className: \"text-3xl font-bold text-white\",\n                                children: \"User Comments\"\n                            }, void 0, false, {\n                                fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                lineNumber: 49,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"text-gray-400 text-lg\",\n                                children: [\n                                    comments.length,\n                                    \" comments\"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                lineNumber: 50,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                        lineNumber: 48,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"space-y-4\",\n                        children: comments.map((comment)=>{\n                            // Check if the current user has upvoted this comment\n                            const hasUpvoted = comment.upvotedBy.includes(currentUserId);\n                            // Properly handle `createdAt` conversion\n                            const createdAt = comment.createdAt instanceof firebase_firestore__WEBPACK_IMPORTED_MODULE_6__.Timestamp ? comment.createdAt.toDate() // Convert Firestore Timestamp to Date\n                             : new Date(comment.createdAt); // Convert string to Date object if serialized\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"bg-gray-800 rounded-lg p-4 flex space-x-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex flex-col items-center justify-start\",\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                            onClick: ()=>handleVoteToggle(comment.id),\n                                            className: \"flex flex-col items-center hover:text-yellow-400 \".concat(hasUpvoted ? \"text-yellow-400\" : \"text-blue-400\"),\n                                            disabled: !currentUserId,\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n                                                    className: \"w-6 h-6 \".concat(hasUpvoted ? \"text-yellow-400\" : \"\"),\n                                                    fill: \"none\",\n                                                    stroke: \"currentColor\",\n                                                    viewBox: \"0 0 24 24\",\n                                                    xmlns: \"http://www.w3.org/2000/svg\",\n                                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"path\", {\n                                                        strokeLinecap: \"round\",\n                                                        strokeLinejoin: \"round\",\n                                                        strokeWidth: 2,\n                                                        d: \"M5 15l7-7 7 7\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                                        lineNumber: 81,\n                                                        columnNumber: 23\n                                                    }, this)\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                                    lineNumber: 74,\n                                                    columnNumber: 21\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                    className: \"text-sm \".concat(hasUpvoted ? \"text-yellow-400\" : \"text-white\"),\n                                                    children: comment.upvotes || 0\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                                    lineNumber: 83,\n                                                    columnNumber: 21\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                            lineNumber: 67,\n                                            columnNumber: 19\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                        lineNumber: 66,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex-grow\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {\n                                                href: \"/plates/\".concat(comment.plateNumber),\n                                                className: \"text-blue-400 hover:underline\",\n                                                children: [\n                                                    \"License Plate: \",\n                                                    comment.plateNumber\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                                lineNumber: 89,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: \"text-white mt-2\",\n                                                children: comment.content\n                                            }, void 0, false, {\n                                                fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                                lineNumber: 92,\n                                                columnNumber: 19\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: \"text-gray-400 text-sm mt-1\",\n                                                children: [\n                                                    \"Posted on: \",\n                                                    createdAt && !isNaN(createdAt.getTime()) ? createdAt.toLocaleDateString() : \"Unknown Date\"\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                                lineNumber: 93,\n                                                columnNumber: 19\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                        lineNumber: 88,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, comment.id, true, {\n                                fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                                lineNumber: 64,\n                                columnNumber: 15\n                            }, this);\n                        })\n                    }, void 0, false, {\n                        fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                        lineNumber: 52,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/cory.wynn/Desktop/license-plate/pages/user/[userId].tsx\",\n        lineNumber: 45,\n        columnNumber: 5\n    }, this);\n}\n_s(UserCommentsPage, \"8dTzAJTVfkdiik9Wxssfpr70cIw=\", false, function() {\n    return [\n        _lib_localDb__WEBPACK_IMPORTED_MODULE_3__.useLocalDb,\n        _lib_useAuth__WEBPACK_IMPORTED_MODULE_5__.useAuth\n    ];\n});\n_c = UserCommentsPage;\nvar _c;\n$RefreshReg$(_c, \"UserCommentsPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy91c2VyL1t1c2VySWRdLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBRU47QUFDOEI7QUFDOUM7QUFDZTtBQUNHLENBQUMsMENBQTBDOztBQU8zRSxTQUFTUyxpQkFBaUIsS0FBa0Q7UUFBbEQsRUFBRUMsZUFBZSxFQUFFQyxNQUFNLEVBQXlCLEdBQWxEOztJQUN2QyxNQUFNLEVBQUVDLGFBQWEsRUFBRUMsZUFBZSxFQUFFLEdBQUdULHdEQUFVQTtJQUNyRCxNQUFNLEVBQUVVLElBQUksRUFBRSxHQUFHUCxxREFBT0E7SUFDeEIsTUFBTVEsZ0JBQWdCRCxPQUFPQSxLQUFLRSxFQUFFLEdBQUc7SUFDdkMsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdqQiwrQ0FBUUEsQ0FBWVM7SUFFcERSLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTWlCLGdCQUFnQjtZQUNwQixNQUFNQyxrQkFBa0IsTUFBTWYsK0RBQWlCQSxDQUFDTTtZQUNoRE8sWUFBWUU7UUFDZDtRQUVBRDtJQUNGLEdBQUc7UUFBQ1I7S0FBTztJQUVYLE1BQU1VLG1CQUFtQixPQUFPQztRQUM5QixNQUFNQyxVQUFVTixTQUFTTyxJQUFJLENBQUNDLENBQUFBLElBQUtBLEVBQUVULEVBQUUsS0FBS007UUFDNUMsTUFBTUksYUFBYUgsVUFBVUEsUUFBUUksU0FBUyxDQUFDQyxRQUFRLENBQUNiLGlCQUFpQjtRQUV6RSxJQUFJVyxZQUFZO1lBQ2QsTUFBTWIsZ0JBQWdCUyxXQUFXUDtRQUNuQyxPQUFPO1lBQ0wsTUFBTUgsY0FBY1UsV0FBV1A7UUFDakM7UUFFQSxrREFBa0Q7UUFDbEQsTUFBTUssa0JBQWtCLE1BQU1mLCtEQUFpQkEsQ0FBQ007UUFDaERPLFlBQVlFO0lBQ2Q7SUFFQSxxQkFDRSw4REFBQ1M7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUMzQiwwREFBTUE7Ozs7OzBCQUNQLDhEQUFDNEI7Z0JBQUtELFdBQVU7O2tDQUNkLDhEQUFDRDt3QkFBSUMsV0FBVTs7MENBQ2IsOERBQUNFO2dDQUFHRixXQUFVOzBDQUFnQzs7Ozs7OzBDQUM5Qyw4REFBQ0c7Z0NBQUtILFdBQVU7O29DQUF5QmIsU0FBU2lCLE1BQU07b0NBQUM7Ozs7Ozs7Ozs7Ozs7a0NBRTNELDhEQUFDTDt3QkFBSUMsV0FBVTtrQ0FDWmIsU0FBU2tCLEdBQUcsQ0FBQyxDQUFDWjs0QkFDYixxREFBcUQ7NEJBQ3JELE1BQU1HLGFBQWFILFFBQVFJLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDYjs0QkFFOUMseUNBQXlDOzRCQUN6QyxNQUFNcUIsWUFDSmIsUUFBUWEsU0FBUyxZQUFZNUIseURBQVNBLEdBQ2xDZSxRQUFRYSxTQUFTLENBQUNDLE1BQU0sR0FBRyxzQ0FBc0M7K0JBQ2pFLElBQUlDLEtBQUtmLFFBQVFhLFNBQVMsR0FBRyw4Q0FBOEM7NEJBRWpGLHFCQUNFLDhEQUFDUDtnQ0FBcUJDLFdBQVU7O2tEQUU5Qiw4REFBQ0Q7d0NBQUlDLFdBQVU7a0RBQ2IsNEVBQUNTOzRDQUNDQyxTQUFTLElBQU1uQixpQkFBaUJFLFFBQVFQLEVBQUU7NENBQzFDYyxXQUFXLG9EQUVWLE9BRENKLGFBQWEsb0JBQW9COzRDQUVuQ2UsVUFBVSxDQUFDMUI7OzhEQUVYLDhEQUFDMkI7b0RBQ0NaLFdBQVcsV0FBK0MsT0FBcENKLGFBQWEsb0JBQW9CO29EQUN2RGlCLE1BQUs7b0RBQ0xDLFFBQU87b0RBQ1BDLFNBQVE7b0RBQ1JDLE9BQU07OERBRU4sNEVBQUNDO3dEQUFLQyxlQUFjO3dEQUFRQyxnQkFBZTt3REFBUUMsYUFBYTt3REFBR0MsR0FBRTs7Ozs7Ozs7Ozs7OERBRXZFLDhEQUFDbEI7b0RBQUtILFdBQVcsV0FBeUQsT0FBOUNKLGFBQWEsb0JBQW9COzhEQUMxREgsUUFBUTZCLE9BQU8sSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7a0RBSTFCLDhEQUFDdkI7d0NBQUlDLFdBQVU7OzBEQUNiLDhEQUFDeEIsa0RBQUlBO2dEQUFDK0MsTUFBTSxXQUErQixPQUFwQjlCLFFBQVErQixXQUFXO2dEQUFJeEIsV0FBVTs7b0RBQWdDO29EQUN0RVAsUUFBUStCLFdBQVc7Ozs7Ozs7MERBRXJDLDhEQUFDQztnREFBRXpCLFdBQVU7MERBQW1CUCxRQUFRaUMsT0FBTzs7Ozs7OzBEQUMvQyw4REFBQ0Q7Z0RBQUV6QixXQUFVOztvREFBNkI7b0RBQzVCTSxhQUFhLENBQUNxQixNQUFNckIsVUFBVXNCLE9BQU8sTUFBTXRCLFVBQVV1QixrQkFBa0IsS0FBSzs7Ozs7Ozs7Ozs7Ozs7K0JBOUJwRnBDLFFBQVFQLEVBQUU7Ozs7O3dCQW1DeEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtWO0dBMUZ3QlA7O1FBQ3FCTCxvREFBVUE7UUFDcENHLGlEQUFPQTs7O0tBRkZFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL3VzZXIvW3VzZXJJZF0udHN4PzBlZDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBHZXRTdGF0aWNQcm9wcywgR2V0U3RhdGljUGF0aHMgfSBmcm9tICduZXh0JztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IZWFkZXInO1xuaW1wb3J0IHsgdXNlTG9jYWxEYiwgQ29tbWVudCwgZ2V0Q29tbWVudHNCeVVzZXIgfSBmcm9tICcuLi8uLi9saWIvbG9jYWxEYic7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gJy4uLy4uL2xpYi91c2VBdXRoJztcbmltcG9ydCB7IFRpbWVzdGFtcCB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7IC8vIEltcG9ydCBUaW1lc3RhbXAgZm9yIEZpcmVzdG9yZSBoYW5kbGluZ1xuXG5pbnRlcmZhY2UgVXNlckNvbW1lbnRzUGFnZVByb3BzIHtcbiAgaW5pdGlhbENvbW1lbnRzOiBDb21tZW50W107XG4gIHVzZXJJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBVc2VyQ29tbWVudHNQYWdlKHsgaW5pdGlhbENvbW1lbnRzLCB1c2VySWQgfTogVXNlckNvbW1lbnRzUGFnZVByb3BzKSB7XG4gIGNvbnN0IHsgdXB2b3RlQ29tbWVudCwgZG93bnZvdGVDb21tZW50IH0gPSB1c2VMb2NhbERiKCk7XG4gIGNvbnN0IHsgdXNlciB9ID0gdXNlQXV0aCgpO1xuICBjb25zdCBjdXJyZW50VXNlcklkID0gdXNlciA/IHVzZXIuaWQgOiAnJztcbiAgY29uc3QgW2NvbW1lbnRzLCBzZXRDb21tZW50c10gPSB1c2VTdGF0ZTxDb21tZW50W10+KGluaXRpYWxDb21tZW50cyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaENvbW1lbnRzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlZENvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHNCeVVzZXIodXNlcklkKTtcbiAgICAgIHNldENvbW1lbnRzKHVwZGF0ZWRDb21tZW50cyk7XG4gICAgfTtcbiAgICBcbiAgICBmZXRjaENvbW1lbnRzKCk7XG4gIH0sIFt1c2VySWRdKTtcblxuICBjb25zdCBoYW5kbGVWb3RlVG9nZ2xlID0gYXN5bmMgKGNvbW1lbnRJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgY29tbWVudCA9IGNvbW1lbnRzLmZpbmQoYyA9PiBjLmlkID09PSBjb21tZW50SWQpO1xuICAgIGNvbnN0IGhhc1Vwdm90ZWQgPSBjb21tZW50ID8gY29tbWVudC51cHZvdGVkQnkuaW5jbHVkZXMoY3VycmVudFVzZXJJZCkgOiBmYWxzZTtcblxuICAgIGlmIChoYXNVcHZvdGVkKSB7XG4gICAgICBhd2FpdCBkb3dudm90ZUNvbW1lbnQoY29tbWVudElkLCBjdXJyZW50VXNlcklkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdXB2b3RlQ29tbWVudChjb21tZW50SWQsIGN1cnJlbnRVc2VySWQpO1xuICAgIH1cblxuICAgIC8vIFJlZmV0Y2ggY29tbWVudHMgdG8gcmVmbGVjdCB1cGRhdGVkIHZvdGUgY291bnRzXG4gICAgY29uc3QgdXBkYXRlZENvbW1lbnRzID0gYXdhaXQgZ2V0Q29tbWVudHNCeVVzZXIodXNlcklkKTtcbiAgICBzZXRDb21tZW50cyh1cGRhdGVkQ29tbWVudHMpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctYmxhY2sgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgPEhlYWRlciAvPlxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZmxleC1ncm93IGNvbnRhaW5lciBteC1hdXRvIHB4LTQgcHktOFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBtYi02XCI+XG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+VXNlciBDb21tZW50czwvaDE+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1ncmF5LTQwMCB0ZXh0LWxnXCI+e2NvbW1lbnRzLmxlbmd0aH0gY29tbWVudHM8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgIHtjb21tZW50cy5tYXAoKGNvbW1lbnQpID0+IHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBjdXJyZW50IHVzZXIgaGFzIHVwdm90ZWQgdGhpcyBjb21tZW50XG4gICAgICAgICAgICBjb25zdCBoYXNVcHZvdGVkID0gY29tbWVudC51cHZvdGVkQnkuaW5jbHVkZXMoY3VycmVudFVzZXJJZCk7XG5cbiAgICAgICAgICAgIC8vIFByb3Blcmx5IGhhbmRsZSBgY3JlYXRlZEF0YCBjb252ZXJzaW9uXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVkQXQgPVxuICAgICAgICAgICAgICBjb21tZW50LmNyZWF0ZWRBdCBpbnN0YW5jZW9mIFRpbWVzdGFtcFxuICAgICAgICAgICAgICAgID8gY29tbWVudC5jcmVhdGVkQXQudG9EYXRlKCkgLy8gQ29udmVydCBGaXJlc3RvcmUgVGltZXN0YW1wIHRvIERhdGVcbiAgICAgICAgICAgICAgICA6IG5ldyBEYXRlKGNvbW1lbnQuY3JlYXRlZEF0KTsgLy8gQ29udmVydCBzdHJpbmcgdG8gRGF0ZSBvYmplY3QgaWYgc2VyaWFsaXplZFxuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17Y29tbWVudC5pZH0gY2xhc3NOYW1lPVwiYmctZ3JheS04MDAgcm91bmRlZC1sZyBwLTQgZmxleCBzcGFjZS14LTRcIj5cbiAgICAgICAgICAgICAgICB7LyogVXB2b3RlIGJ1dHRvbiBhbmQgY291bnQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LXN0YXJ0XCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVZvdGVUb2dnbGUoY29tbWVudC5pZCl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGhvdmVyOnRleHQteWVsbG93LTQwMCAke1xuICAgICAgICAgICAgICAgICAgICAgIGhhc1Vwdm90ZWQgPyAndGV4dC15ZWxsb3ctNDAwJyA6ICd0ZXh0LWJsdWUtNDAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFjdXJyZW50VXNlcklkfSAvLyBEaXNhYmxlIGlmIHVzZXIgaXMgbm90IGxvZ2dlZCBpblxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy02IGgtNiAke2hhc1Vwdm90ZWQgPyAndGV4dC15ZWxsb3ctNDAwJyA6ICcnfWB9XG4gICAgICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9ezJ9IGQ9XCJNNSAxNWw3LTcgNyA3XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtc20gJHtoYXNVcHZvdGVkID8gJ3RleHQteWVsbG93LTQwMCcgOiAndGV4dC13aGl0ZSd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge2NvbW1lbnQudXB2b3RlcyB8fCAwfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtZ3Jvd1wiPlxuICAgICAgICAgICAgICAgICAgPExpbmsgaHJlZj17YC9wbGF0ZXMvJHtjb21tZW50LnBsYXRlTnVtYmVyfWB9IGNsYXNzTmFtZT1cInRleHQtYmx1ZS00MDAgaG92ZXI6dW5kZXJsaW5lXCI+XG4gICAgICAgICAgICAgICAgICAgIExpY2Vuc2UgUGxhdGU6IHtjb21tZW50LnBsYXRlTnVtYmVyfVxuICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBtdC0yXCI+e2NvbW1lbnQuY29udGVudH08L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWdyYXktNDAwIHRleHQtc20gbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICBQb3N0ZWQgb246IHtjcmVhdGVkQXQgJiYgIWlzTmFOKGNyZWF0ZWRBdC5nZXRUaW1lKCkpID8gY3JlYXRlZEF0LnRvTG9jYWxlRGF0ZVN0cmluZygpIDogJ1Vua25vd24gRGF0ZSd9XG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L21haW4+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbi8vIERlZmluZSBzdGF0aWMgcGF0aHMgZm9yIHVzZXJzIGF0IGJ1aWxkIHRpbWVcbmV4cG9ydCBjb25zdCBnZXRTdGF0aWNQYXRoczogR2V0U3RhdGljUGF0aHMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHBhdGhzOiB7IHBhcmFtczogeyB1c2VySWQ6IHN0cmluZyB9IH1bXSA9IFtdO1xuXG4gIHJldHVybiB7XG4gICAgcGF0aHMsXG4gICAgZmFsbGJhY2s6ICdibG9ja2luZycsXG4gIH07XG59O1xuXG4vLyBGZXRjaCB1c2VyLXNwZWNpZmljIGNvbW1lbnRzIGR1cmluZyBidWlsZFxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzOiBHZXRTdGF0aWNQcm9wcyA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG4gIGNvbnN0IHsgdXNlcklkIH0gPSBjb250ZXh0LnBhcmFtcyE7XG5cbiAgY29uc3QgY29tbWVudHMgPSBhd2FpdCBnZXRDb21tZW50c0J5VXNlcih1c2VySWQgYXMgc3RyaW5nKTtcblxuICAvLyBDb252ZXJ0IGBjcmVhdGVkQXRgIGZpZWxkIHRvIHN0cmluZyBmb3IgSlNPTiBzZXJpYWxpemF0aW9uXG4gIGNvbnN0IGluaXRpYWxDb21tZW50cyA9IGNvbW1lbnRzLm1hcCgoY29tbWVudDogQ29tbWVudCkgPT4gKHtcbiAgICAuLi5jb21tZW50LFxuICAgIGNyZWF0ZWRBdDogY29tbWVudC5jcmVhdGVkQXQudG9TdHJpbmcoKSxcbiAgfSkpO1xuXG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHtcbiAgICAgIGluaXRpYWxDb21tZW50cyxcbiAgICAgIHVzZXJJZCxcbiAgICB9LFxuICAgIHJldmFsaWRhdGU6IDEwLCAvLyBSZXZhbGlkYXRlIHRoZSBkYXRhIGV2ZXJ5IDEwIHNlY29uZHNcbiAgfTtcbn07Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJIZWFkZXIiLCJ1c2VMb2NhbERiIiwiZ2V0Q29tbWVudHNCeVVzZXIiLCJMaW5rIiwidXNlQXV0aCIsIlRpbWVzdGFtcCIsIlVzZXJDb21tZW50c1BhZ2UiLCJpbml0aWFsQ29tbWVudHMiLCJ1c2VySWQiLCJ1cHZvdGVDb21tZW50IiwiZG93bnZvdGVDb21tZW50IiwidXNlciIsImN1cnJlbnRVc2VySWQiLCJpZCIsImNvbW1lbnRzIiwic2V0Q29tbWVudHMiLCJmZXRjaENvbW1lbnRzIiwidXBkYXRlZENvbW1lbnRzIiwiaGFuZGxlVm90ZVRvZ2dsZSIsImNvbW1lbnRJZCIsImNvbW1lbnQiLCJmaW5kIiwiYyIsImhhc1Vwdm90ZWQiLCJ1cHZvdGVkQnkiLCJpbmNsdWRlcyIsImRpdiIsImNsYXNzTmFtZSIsIm1haW4iLCJoMSIsInNwYW4iLCJsZW5ndGgiLCJtYXAiLCJjcmVhdGVkQXQiLCJ0b0RhdGUiLCJEYXRlIiwiYnV0dG9uIiwib25DbGljayIsImRpc2FibGVkIiwic3ZnIiwiZmlsbCIsInN0cm9rZSIsInZpZXdCb3giLCJ4bWxucyIsInBhdGgiLCJzdHJva2VMaW5lY2FwIiwic3Ryb2tlTGluZWpvaW4iLCJzdHJva2VXaWR0aCIsImQiLCJ1cHZvdGVzIiwiaHJlZiIsInBsYXRlTnVtYmVyIiwicCIsImNvbnRlbnQiLCJpc05hTiIsImdldFRpbWUiLCJ0b0xvY2FsZURhdGVTdHJpbmciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/user/[userId].tsx\n"));

/***/ })

});