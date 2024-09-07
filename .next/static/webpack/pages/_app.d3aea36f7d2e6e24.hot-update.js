"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./lib/localDb.tsx":
/*!*************************!*\
  !*** ./lib/localDb.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LocalDbProvider: function() { return /* binding */ LocalDbProvider; },\n/* harmony export */   useLocalDb: function() { return /* binding */ useLocalDb; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _sentimentAnalysis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sentimentAnalysis */ \"./lib/sentimentAnalysis.ts\");\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\nconst LocalDbContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction LocalDbProvider(param) {\n    let { children } = param;\n    _s();\n    const [comments, setComments] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [upvotedCommentsByUser, setUpvotedCommentsByUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const savedComments = localStorage.getItem(\"comments\");\n        const savedUpvotes = localStorage.getItem(\"upvotedCommentsByUser\");\n        if (savedComments) {\n            setComments(JSON.parse(savedComments));\n        }\n        if (savedUpvotes) {\n            setUpvotedCommentsByUser(JSON.parse(savedUpvotes));\n        }\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        localStorage.setItem(\"comments\", JSON.stringify(comments));\n        localStorage.setItem(\"upvotedCommentsByUser\", JSON.stringify(upvotedCommentsByUser));\n    }, [\n        comments,\n        upvotedCommentsByUser\n    ]);\n    const addComment = async (comment)=>{\n        const sentiment = (0,_sentimentAnalysis__WEBPACK_IMPORTED_MODULE_2__.analyzeSentiment)(comment.content);\n        const newComment = {\n            ...comment,\n            id: Date.now().toString(),\n            createdAt: new Date(),\n            upvotes: 0,\n            upvotedBy: [],\n            sentiment\n        };\n        setComments((prevComments)=>[\n                ...prevComments,\n                newComment\n            ]);\n    };\n    const updateComment = async (id, content)=>{\n        const sentiment = (0,_sentimentAnalysis__WEBPACK_IMPORTED_MODULE_2__.analyzeSentiment)(content);\n        setComments((prevComments)=>prevComments.map((comment)=>comment.id === id ? {\n                    ...comment,\n                    content,\n                    sentiment\n                } : comment));\n    };\n    const deleteComment = (id)=>{\n        setComments((prevComments)=>prevComments.filter((comment)=>comment.id !== id));\n    };\n    const getCommentsByPlate = (plateNumber)=>{\n        return comments.filter((comment)=>comment.plateNumber === plateNumber);\n    };\n    const getCommentsByUser = (userId)=>{\n        return comments.filter((comment)=>comment.userId === userId);\n    };\n    const upvoteComment = (id, userId)=>{\n        setComments((prevComments)=>prevComments.map((comment)=>comment.id === id ? {\n                    ...comment,\n                    upvotes: comment.upvotes + 1,\n                    upvotedBy: Array.from(new Set([\n                        ...comment.upvotedBy || [],\n                        userId\n                    ]))\n                } : comment));\n        setUpvotedCommentsByUser((prev)=>({\n                ...prev,\n                [userId]: Array.from(new Set([\n                    ...prev[userId] || [],\n                    id\n                ]))\n            }));\n    };\n    const downvoteComment = (id, userId)=>{\n        setComments((prevComments)=>prevComments.map((comment)=>comment.id === id ? {\n                    ...comment,\n                    upvotes: Math.max(0, comment.upvotes - 1),\n                    upvotedBy: comment.upvotedBy.filter((upvoter)=>upvoter !== userId)\n                } : comment));\n        setUpvotedCommentsByUser((prev)=>({\n                ...prev,\n                [userId]: (prev[userId] || []).filter((upvotedId)=>upvotedId !== id)\n            }));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LocalDbContext.Provider, {\n        value: {\n            comments,\n            addComment,\n            updateComment,\n            deleteComment,\n            getCommentsByPlate,\n            upvoteComment,\n            downvoteComment,\n            getCommentsByUser,\n            upvotedCommentsByUser\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/cory.wynn/Desktop/license-plate/lib/localDb.tsx\",\n        lineNumber: 122,\n        columnNumber: 5\n    }, this);\n}\n_s(LocalDbProvider, \"8conrwh3eP9EfCV175yOyJCloWw=\");\n_c = LocalDbProvider;\nfunction useLocalDb() {\n    _s1();\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(LocalDbContext);\n    if (context === undefined) {\n        throw new Error(\"useLocalDb must be used within a LocalDbProvider\");\n    }\n    return context;\n}\n_s1(useLocalDb, \"b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=\");\nvar _c;\n$RefreshReg$(_c, \"LocalDbProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VkEsYUFBYUUsR0FBRyxDQUFDYixDQUFBQSxVQUNmQSxRQUFRSSxFQUFFLEtBQUtBLEtBQ1g7b0JBQ0UsR0FBR0osT0FBTztvQkFDVlMsU0FBU2lCLEtBQUtDLEdBQUcsQ0FBQyxHQUFHM0IsUUFBUVMsT0FBTyxHQUFHO29CQUN2Q0MsV0FBV1YsUUFBUVUsU0FBUyxDQUFDSyxNQUFNLENBQUNhLENBQUFBLFVBQVdBLFlBQVlUO2dCQUM3RCxJQUNBbkI7UUFHUlYseUJBQXlCa0MsQ0FBQUEsT0FBUztnQkFDaEMsR0FBR0EsSUFBSTtnQkFDUCxDQUFDTCxPQUFPLEVBQUUsQ0FBQ0ssSUFBSSxDQUFDTCxPQUFPLElBQUksRUFBRSxFQUFFSixNQUFNLENBQUNjLENBQUFBLFlBQWFBLGNBQWN6QjtZQUNuRTtJQUNGO0lBRUEscUJBQ0UsOERBQUNyQixlQUFlK0MsUUFBUTtRQUN0QkMsT0FBTztZQUNMNUM7WUFDQVk7WUFDQWE7WUFDQUU7WUFDQUU7WUFDQUk7WUFDQUs7WUFDQVA7WUFDQTdCO1FBQ0Y7a0JBRUNIOzs7Ozs7QUFHUDtHQTNHZ0JEO0tBQUFBO0FBNkdULFNBQVMrQzs7SUFDZCxNQUFNQyxVQUFVdEQsaURBQVVBLENBQUNJO0lBQzNCLElBQUlrRCxZQUFZakQsV0FBVztRQUN6QixNQUFNLElBQUlrRCxNQUFNO0lBQ2xCO0lBQ0EsT0FBT0Q7QUFDVDtJQU5nQkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL2xvY2FsRGIudHN4PzJkOTMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhbmFseXplU2VudGltZW50IH0gZnJvbSAnLi9zZW50aW1lbnRBbmFseXNpcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbWVudCB7XG4gIGlkOiBzdHJpbmc7XG4gIHBsYXRlTnVtYmVyOiBzdHJpbmc7XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgcGFyZW50SWQ6IHN0cmluZyB8IG51bGw7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbiAgdXB2b3RlczogbnVtYmVyO1xuICB1c2VySWQ6IHN0cmluZztcbiAgdXNlck5hbWU6IHN0cmluZztcbiAgdXB2b3RlZEJ5OiBzdHJpbmdbXTsgLy8gRW5zdXJlIHRoaXMgaXMgYWx3YXlzIGluaXRpYWxpemVkXG4gIHNlbnRpbWVudD86ICdwb3NpdGl2ZScgfCAnbmVnYXRpdmUnIHwgJ25ldXRyYWwnO1xufVxuXG5pbnRlcmZhY2UgTG9jYWxEYkNvbnRleHRUeXBlIHtcbiAgY29tbWVudHM6IENvbW1lbnRbXTtcbiAgYWRkQ29tbWVudDogKGNvbW1lbnQ6IE9taXQ8Q29tbWVudCwgJ2lkJyB8ICdjcmVhdGVkQXQnPikgPT4gdm9pZDtcbiAgdXBkYXRlQ29tbWVudDogKGlkOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4gdm9pZDtcbiAgZGVsZXRlQ29tbWVudDogKGlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGdldENvbW1lbnRzQnlQbGF0ZTogKHBsYXRlTnVtYmVyOiBzdHJpbmcpID0+IENvbW1lbnRbXTtcbiAgdXB2b3RlQ29tbWVudDogKGlkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBkb3dudm90ZUNvbW1lbnQ6IChpZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgZ2V0Q29tbWVudHNCeVVzZXI6ICh1c2VySWQ6IHN0cmluZykgPT4gQ29tbWVudFtdO1xuICB1cHZvdGVkQ29tbWVudHNCeVVzZXI6IHsgW3VzZXJJZDogc3RyaW5nXTogc3RyaW5nW10gfTtcbn1cblxuY29uc3QgTG9jYWxEYkNvbnRleHQgPSBjcmVhdGVDb250ZXh0PExvY2FsRGJDb250ZXh0VHlwZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcblxuZXhwb3J0IGZ1bmN0aW9uIExvY2FsRGJQcm92aWRlcih7IGNoaWxkcmVuIH06IHsgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZSB9KSB7XG4gIGNvbnN0IFtjb21tZW50cywgc2V0Q29tbWVudHNdID0gdXNlU3RhdGU8Q29tbWVudFtdPihbXSk7XG4gIGNvbnN0IFt1cHZvdGVkQ29tbWVudHNCeVVzZXIsIHNldFVwdm90ZWRDb21tZW50c0J5VXNlcl0gPSB1c2VTdGF0ZTx7IFt1c2VySWQ6IHN0cmluZ106IHN0cmluZ1tdIH0+KHt9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkQ29tbWVudHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY29tbWVudHMnKTtcbiAgICBjb25zdCBzYXZlZFVwdm90ZXMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndXB2b3RlZENvbW1lbnRzQnlVc2VyJyk7XG4gICAgaWYgKHNhdmVkQ29tbWVudHMpIHtcbiAgICAgIHNldENvbW1lbnRzKEpTT04ucGFyc2Uoc2F2ZWRDb21tZW50cykpO1xuICAgIH1cbiAgICBpZiAoc2F2ZWRVcHZvdGVzKSB7XG4gICAgICBzZXRVcHZvdGVkQ29tbWVudHNCeVVzZXIoSlNPTi5wYXJzZShzYXZlZFVwdm90ZXMpKTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjb21tZW50cycsIEpTT04uc3RyaW5naWZ5KGNvbW1lbnRzKSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Vwdm90ZWRDb21tZW50c0J5VXNlcicsIEpTT04uc3RyaW5naWZ5KHVwdm90ZWRDb21tZW50c0J5VXNlcikpO1xuICB9LCBbY29tbWVudHMsIHVwdm90ZWRDb21tZW50c0J5VXNlcl0pO1xuXG4gIGNvbnN0IGFkZENvbW1lbnQgPSBhc3luYyAoY29tbWVudDogT21pdDxDb21tZW50LCAnaWQnIHwgJ2NyZWF0ZWRBdCcgfCAnc2VudGltZW50Jz4pID0+IHtcbiAgICBjb25zdCBzZW50aW1lbnQgPSBhbmFseXplU2VudGltZW50KGNvbW1lbnQuY29udGVudCk7XG4gICAgY29uc3QgbmV3Q29tbWVudDogQ29tbWVudCA9IHtcbiAgICAgIC4uLmNvbW1lbnQsXG4gICAgICBpZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgdXB2b3RlczogMCxcbiAgICAgIHVwdm90ZWRCeTogW10sIC8vIEVuc3VyZSB0aGlzIGlzIGluaXRpYWxpemVkXG4gICAgICBzZW50aW1lbnQsXG4gICAgfTtcbiAgICBzZXRDb21tZW50cyhwcmV2Q29tbWVudHMgPT4gWy4uLnByZXZDb21tZW50cywgbmV3Q29tbWVudF0pO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZUNvbW1lbnQgPSBhc3luYyAoaWQ6IHN0cmluZywgY29udGVudDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc2VudGltZW50ID0gYW5hbHl6ZVNlbnRpbWVudChjb250ZW50KTtcbiAgICBzZXRDb21tZW50cyhwcmV2Q29tbWVudHMgPT5cbiAgICAgIHByZXZDb21tZW50cy5tYXAoY29tbWVudCA9PlxuICAgICAgICBjb21tZW50LmlkID09PSBpZCA/IHsgLi4uY29tbWVudCwgY29udGVudCwgc2VudGltZW50IH0gOiBjb21tZW50XG4gICAgICApXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBkZWxldGVDb21tZW50ID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRDb21tZW50cyhwcmV2Q29tbWVudHMgPT4gcHJldkNvbW1lbnRzLmZpbHRlcihjb21tZW50ID0+IGNvbW1lbnQuaWQgIT09IGlkKSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0Q29tbWVudHNCeVBsYXRlID0gKHBsYXRlTnVtYmVyOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gY29tbWVudHMuZmlsdGVyKGNvbW1lbnQgPT4gY29tbWVudC5wbGF0ZU51bWJlciA9PT0gcGxhdGVOdW1iZXIpO1xuICB9O1xuXG4gIGNvbnN0IGdldENvbW1lbnRzQnlVc2VyID0gKHVzZXJJZDogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNvbW1lbnRzLmZpbHRlcihjb21tZW50ID0+IGNvbW1lbnQudXNlcklkID09PSB1c2VySWQpO1xuICB9O1xuXG4gIGNvbnN0IHVwdm90ZUNvbW1lbnQgPSAoaWQ6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRDb21tZW50cyhwcmV2Q29tbWVudHMgPT5cbiAgICAgIHByZXZDb21tZW50cy5tYXAoY29tbWVudCA9PlxuICAgICAgICBjb21tZW50LmlkID09PSBpZFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAuLi5jb21tZW50LFxuICAgICAgICAgICAgICB1cHZvdGVzOiBjb21tZW50LnVwdm90ZXMgKyAxLFxuICAgICAgICAgICAgICB1cHZvdGVkQnk6IEFycmF5LmZyb20obmV3IFNldChbLi4uKGNvbW1lbnQudXB2b3RlZEJ5IHx8IFtdKSwgdXNlcklkXSkpLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogY29tbWVudFxuICAgICAgKVxuICAgICk7XG4gICAgc2V0VXB2b3RlZENvbW1lbnRzQnlVc2VyKHByZXYgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBbdXNlcklkXTogQXJyYXkuZnJvbShuZXcgU2V0KFsuLi4ocHJldlt1c2VySWRdIHx8IFtdKSwgaWRdKSksXG4gICAgfSkpO1xuICB9O1xuXG4gIGNvbnN0IGRvd252b3RlQ29tbWVudCA9IChpZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZykgPT4ge1xuICAgIHNldENvbW1lbnRzKHByZXZDb21tZW50cyA9PlxuICAgICAgcHJldkNvbW1lbnRzLm1hcChjb21tZW50ID0+XG4gICAgICAgIGNvbW1lbnQuaWQgPT09IGlkXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIC4uLmNvbW1lbnQsXG4gICAgICAgICAgICAgIHVwdm90ZXM6IE1hdGgubWF4KDAsIGNvbW1lbnQudXB2b3RlcyAtIDEpLFxuICAgICAgICAgICAgICB1cHZvdGVkQnk6IGNvbW1lbnQudXB2b3RlZEJ5LmZpbHRlcih1cHZvdGVyID0+IHVwdm90ZXIgIT09IHVzZXJJZCksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiBjb21tZW50XG4gICAgICApXG4gICAgKTtcbiAgICBzZXRVcHZvdGVkQ29tbWVudHNCeVVzZXIocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIFt1c2VySWRdOiAocHJldlt1c2VySWRdIHx8IFtdKS5maWx0ZXIodXB2b3RlZElkID0+IHVwdm90ZWRJZCAhPT0gaWQpLFxuICAgIH0pKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxMb2NhbERiQ29udGV4dC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgY29tbWVudHMsXG4gICAgICAgIGFkZENvbW1lbnQsXG4gICAgICAgIHVwZGF0ZUNvbW1lbnQsXG4gICAgICAgIGRlbGV0ZUNvbW1lbnQsXG4gICAgICAgIGdldENvbW1lbnRzQnlQbGF0ZSxcbiAgICAgICAgdXB2b3RlQ29tbWVudCxcbiAgICAgICAgZG93bnZvdGVDb21tZW50LFxuICAgICAgICBnZXRDb21tZW50c0J5VXNlcixcbiAgICAgICAgdXB2b3RlZENvbW1lbnRzQnlVc2VyLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9Mb2NhbERiQ29udGV4dC5Qcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUxvY2FsRGIoKSB7XG4gIGNvbnN0IGNvbnRleHQgPSB1c2VDb250ZXh0KExvY2FsRGJDb250ZXh0KTtcbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlTG9jYWxEYiBtdXN0IGJlIHVzZWQgd2l0aGluIGEgTG9jYWxEYlByb3ZpZGVyJyk7XG4gIH1cbiAgcmV0dXJuIGNvbnRleHQ7XG59Il0sIm5hbWVzIjpbIlJlYWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsImFuYWx5emVTZW50aW1lbnQiLCJMb2NhbERiQ29udGV4dCIsInVuZGVmaW5lZCIsIkxvY2FsRGJQcm92aWRlciIsImNoaWxkcmVuIiwiY29tbWVudHMiLCJzZXRDb21tZW50cyIsInVwdm90ZWRDb21tZW50c0J5VXNlciIsInNldFVwdm90ZWRDb21tZW50c0J5VXNlciIsInNhdmVkQ29tbWVudHMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2F2ZWRVcHZvdGVzIiwiSlNPTiIsInBhcnNlIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImFkZENvbW1lbnQiLCJjb21tZW50Iiwic2VudGltZW50IiwiY29udGVudCIsIm5ld0NvbW1lbnQiLCJpZCIsIkRhdGUiLCJub3ciLCJ0b1N0cmluZyIsImNyZWF0ZWRBdCIsInVwdm90ZXMiLCJ1cHZvdGVkQnkiLCJwcmV2Q29tbWVudHMiLCJ1cGRhdGVDb21tZW50IiwibWFwIiwiZGVsZXRlQ29tbWVudCIsImZpbHRlciIsImdldENvbW1lbnRzQnlQbGF0ZSIsInBsYXRlTnVtYmVyIiwiZ2V0Q29tbWVudHNCeVVzZXIiLCJ1c2VySWQiLCJ1cHZvdGVDb21tZW50IiwiQXJyYXkiLCJmcm9tIiwiU2V0IiwicHJldiIsImRvd252b3RlQ29tbWVudCIsIk1hdGgiLCJtYXgiLCJ1cHZvdGVyIiwidXB2b3RlZElkIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUxvY2FsRGIiLCJjb250ZXh0IiwiRXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./lib/localDb.tsx\n"));

/***/ })

});