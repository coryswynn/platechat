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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LocalDbProvider: function() { return /* binding */ LocalDbProvider; },\n/* harmony export */   getPlateVote: function() { return /* binding */ getPlateVote; },\n/* harmony export */   updatePlateVote: function() { return /* binding */ updatePlateVote; },\n/* harmony export */   useLocalDb: function() { return /* binding */ useLocalDb; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _sentimentAnalysis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sentimentAnalysis */ \"./lib/sentimentAnalysis.ts\");\n\nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n// Ensure getPlateVote and updatePlateVote are at the top level\nconst getPlateVote = (plateNumber)=>{\n    const savedPlateVotes = localStorage.getItem(\"plateVotes\");\n    const plateVotes = savedPlateVotes ? JSON.parse(savedPlateVotes) : {};\n    return plateVotes[plateNumber] || {\n        upvotes: 0,\n        downvotes: 0\n    };\n};\nconst updatePlateVote = (plateNumber, type)=>{\n    const savedPlateVotes = localStorage.getItem(\"plateVotes\");\n    const plateVotes = savedPlateVotes ? JSON.parse(savedPlateVotes) : {};\n    const currentVotes = plateVotes[plateNumber] || {\n        upvotes: 0,\n        downvotes: 0\n    };\n    if (type === \"upvote\") {\n        currentVotes.upvotes += 1;\n    } else if (type === \"downvote\") {\n        currentVotes.downvotes += 1;\n    }\n    plateVotes[plateNumber] = currentVotes;\n    localStorage.setItem(\"plateVotes\", JSON.stringify(plateVotes));\n};\nconst LocalDbContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction LocalDbProvider(param) {\n    let { children } = param;\n    _s();\n    const [comments, setComments] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [upvotedCommentsByUser, setUpvotedCommentsByUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const savedComments = localStorage.getItem(\"comments\");\n        const savedUpvotes = localStorage.getItem(\"upvotedCommentsByUser\");\n        if (savedComments) {\n            setComments(JSON.parse(savedComments));\n        }\n        if (savedUpvotes) {\n            setUpvotedCommentsByUser(JSON.parse(savedUpvotes));\n        }\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        localStorage.setItem(\"comments\", JSON.stringify(comments));\n        localStorage.setItem(\"upvotedCommentsByUser\", JSON.stringify(upvotedCommentsByUser));\n    }, [\n        comments,\n        upvotedCommentsByUser\n    ]);\n    const addComment = async (comment)=>{\n        const sentiment = (0,_sentimentAnalysis__WEBPACK_IMPORTED_MODULE_2__.analyzeSentiment)(comment.content);\n        const newComment = {\n            ...comment,\n            id: Date.now().toString(),\n            createdAt: new Date(),\n            upvotes: 0,\n            upvotedBy: [],\n            sentiment\n        };\n        setComments((prevComments)=>[\n                ...prevComments,\n                newComment\n            ]);\n    };\n    const updateComment = async (id, content)=>{\n        const sentiment = (0,_sentimentAnalysis__WEBPACK_IMPORTED_MODULE_2__.analyzeSentiment)(content);\n        setComments((prevComments)=>prevComments.map((comment)=>comment.id === id ? {\n                    ...comment,\n                    content,\n                    sentiment\n                } : comment));\n    };\n    const deleteComment = (id)=>{\n        setComments((prevComments)=>prevComments.filter((comment)=>comment.id !== id));\n    };\n    const getCommentsByPlate = (plateNumber)=>{\n        return comments.filter((comment)=>comment.plateNumber === plateNumber);\n    };\n    const getCommentsByUser = (userId)=>{\n        return comments.filter((comment)=>comment.userId === userId);\n    };\n    const upvoteComment = (id, userId)=>{\n        setComments((prevComments)=>prevComments.map((comment)=>comment.id === id ? {\n                    ...comment,\n                    upvotes: comment.upvotes + 1,\n                    upvotedBy: Array.from(new Set([\n                        ...comment.upvotedBy || [],\n                        userId\n                    ]))\n                } : comment));\n        setUpvotedCommentsByUser((prev)=>({\n                ...prev,\n                [userId]: Array.from(new Set([\n                    ...prev[userId] || [],\n                    id\n                ]))\n            }));\n    };\n    const downvoteComment = (id, userId)=>{\n        setComments((prevComments)=>prevComments.map((comment)=>comment.id === id ? {\n                    ...comment,\n                    upvotes: Math.max(0, comment.upvotes - 1),\n                    upvotedBy: comment.upvotedBy.filter((upvoter)=>upvoter !== userId)\n                } : comment));\n        setUpvotedCommentsByUser((prev)=>({\n                ...prev,\n                [userId]: (prev[userId] || []).filter((upvotedId)=>upvotedId !== id)\n            }));\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(LocalDbContext.Provider, {\n        value: {\n            comments,\n            addComment,\n            updateComment,\n            deleteComment,\n            getCommentsByPlate,\n            upvoteComment,\n            downvoteComment,\n            getCommentsByUser,\n            upvotedCommentsByUser,\n            getPlateVote,\n            updatePlateVote\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/cory.wynn/Desktop/license-plate/lib/localDb.tsx\",\n        lineNumber: 147,\n        columnNumber: 5\n    }, this);\n}\n_s(LocalDbProvider, \"8conrwh3eP9EfCV175yOyJCloWw=\");\n_c = LocalDbProvider;\nfunction useLocalDb() {\n    _s1();\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(LocalDbContext);\n    if (context === undefined) {\n        throw new Error(\"useLocalDb must be used within a LocalDbProvider\");\n    }\n    return context;\n}\n_s1(useLocalDb, \"b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=\");\nvar _c;\n$RefreshReg$(_c, \"LocalDbProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNLENBQUNhLENBQUFBLFlBQWFBLGNBQWN2QjtZQUNuRTtJQUNGO0lBRUEscUJBQ0UsOERBQUNmLGVBQWV1QyxRQUFRO1FBQ3RCQyxPQUFPO1lBQ0xwQztZQUNBTTtZQUNBWTtZQUNBRTtZQUNBRTtZQUNBRztZQUNBSztZQUNBUDtZQUNBckI7WUFDQXJCO1lBQ0FVO1FBQ0Y7a0JBRUNROzs7Ozs7QUFHUDtHQTlHZ0JEO0tBQUFBO0FBZ0hULFNBQVN1Qzs7SUFDZCxNQUFNQyxVQUFVN0QsaURBQVVBLENBQUNtQjtJQUMzQixJQUFJMEMsWUFBWXpDLFdBQVc7UUFDekIsTUFBTSxJQUFJMEMsTUFBTTtJQUNsQjtJQUNBLE9BQU9EO0FBQ1Q7SUFOZ0JEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2xpYi9sb2NhbERiLnRzeD8yZDkzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYW5hbHl6ZVNlbnRpbWVudCB9IGZyb20gJy4vc2VudGltZW50QW5hbHlzaXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1lbnQge1xuICBpZDogc3RyaW5nO1xuICBwbGF0ZU51bWJlcjogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIHBhcmVudElkOiBzdHJpbmcgfCBudWxsO1xuICBjcmVhdGVkQXQ6IERhdGU7XG4gIHVwdm90ZXM6IG51bWJlcjtcbiAgdXNlcklkOiBzdHJpbmc7XG4gIHVzZXJOYW1lOiBzdHJpbmc7XG4gIHVwdm90ZWRCeTogc3RyaW5nW107XG4gIHNlbnRpbWVudD86ICdwb3NpdGl2ZScgfCAnbmVnYXRpdmUnIHwgJ25ldXRyYWwnO1xufVxuXG5pbnRlcmZhY2UgTG9jYWxEYkNvbnRleHRUeXBlIHtcbiAgY29tbWVudHM6IENvbW1lbnRbXTtcbiAgYWRkQ29tbWVudDogKGNvbW1lbnQ6IE9taXQ8Q29tbWVudCwgJ2lkJyB8ICdjcmVhdGVkQXQnPikgPT4gdm9pZDtcbiAgdXBkYXRlQ29tbWVudDogKGlkOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4gdm9pZDtcbiAgZGVsZXRlQ29tbWVudDogKGlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGdldENvbW1lbnRzQnlQbGF0ZTogKHBsYXRlTnVtYmVyOiBzdHJpbmcpID0+IENvbW1lbnRbXTtcbiAgdXB2b3RlQ29tbWVudDogKGlkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBkb3dudm90ZUNvbW1lbnQ6IChpZDogc3RyaW5nLCB1c2VySWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgZ2V0Q29tbWVudHNCeVVzZXI6ICh1c2VySWQ6IHN0cmluZykgPT4gQ29tbWVudFtdO1xuICB1cHZvdGVkQ29tbWVudHNCeVVzZXI6IHsgW3VzZXJJZDogc3RyaW5nXTogc3RyaW5nW10gfTtcbiAgZ2V0UGxhdGVWb3RlOiAocGxhdGVOdW1iZXI6IHN0cmluZykgPT4geyB1cHZvdGVzOiBudW1iZXI7IGRvd252b3RlczogbnVtYmVyIH07XG4gIHVwZGF0ZVBsYXRlVm90ZTogKHBsYXRlTnVtYmVyOiBzdHJpbmcsIHR5cGU6ICd1cHZvdGUnIHwgJ2Rvd252b3RlJykgPT4gdm9pZDtcbn1cblxuLy8gRW5zdXJlIGdldFBsYXRlVm90ZSBhbmQgdXBkYXRlUGxhdGVWb3RlIGFyZSBhdCB0aGUgdG9wIGxldmVsXG5leHBvcnQgY29uc3QgZ2V0UGxhdGVWb3RlID0gKHBsYXRlTnVtYmVyOiBzdHJpbmcpID0+IHtcbiAgY29uc3Qgc2F2ZWRQbGF0ZVZvdGVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3BsYXRlVm90ZXMnKTtcbiAgY29uc3QgcGxhdGVWb3RlcyA9IHNhdmVkUGxhdGVWb3RlcyA/IEpTT04ucGFyc2Uoc2F2ZWRQbGF0ZVZvdGVzKSA6IHt9O1xuICByZXR1cm4gcGxhdGVWb3Rlc1twbGF0ZU51bWJlcl0gfHwgeyB1cHZvdGVzOiAwLCBkb3dudm90ZXM6IDAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVQbGF0ZVZvdGUgPSAocGxhdGVOdW1iZXI6IHN0cmluZywgdHlwZTogJ3Vwdm90ZScgfCAnZG93bnZvdGUnKSA9PiB7XG4gIGNvbnN0IHNhdmVkUGxhdGVWb3RlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwbGF0ZVZvdGVzJyk7XG4gIGNvbnN0IHBsYXRlVm90ZXMgPSBzYXZlZFBsYXRlVm90ZXMgPyBKU09OLnBhcnNlKHNhdmVkUGxhdGVWb3RlcykgOiB7fTtcbiAgY29uc3QgY3VycmVudFZvdGVzID0gcGxhdGVWb3Rlc1twbGF0ZU51bWJlcl0gfHwgeyB1cHZvdGVzOiAwLCBkb3dudm90ZXM6IDAgfTtcblxuICBpZiAodHlwZSA9PT0gJ3Vwdm90ZScpIHtcbiAgICBjdXJyZW50Vm90ZXMudXB2b3RlcyArPSAxO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkb3dudm90ZScpIHtcbiAgICBjdXJyZW50Vm90ZXMuZG93bnZvdGVzICs9IDE7XG4gIH1cblxuICBwbGF0ZVZvdGVzW3BsYXRlTnVtYmVyXSA9IGN1cnJlbnRWb3RlcztcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BsYXRlVm90ZXMnLCBKU09OLnN0cmluZ2lmeShwbGF0ZVZvdGVzKSk7XG59O1xuXG5jb25zdCBMb2NhbERiQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8TG9jYWxEYkNvbnRleHRUeXBlIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpO1xuXG5leHBvcnQgZnVuY3Rpb24gTG9jYWxEYlByb3ZpZGVyKHsgY2hpbGRyZW4gfTogeyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0pIHtcbiAgY29uc3QgW2NvbW1lbnRzLCBzZXRDb21tZW50c10gPSB1c2VTdGF0ZTxDb21tZW50W10+KFtdKTtcbiAgY29uc3QgW3Vwdm90ZWRDb21tZW50c0J5VXNlciwgc2V0VXB2b3RlZENvbW1lbnRzQnlVc2VyXSA9IHVzZVN0YXRlPHsgW3VzZXJJZDogc3RyaW5nXTogc3RyaW5nW10gfT4oe30pO1xuICBcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzYXZlZENvbW1lbnRzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbW1lbnRzJyk7XG4gICAgY29uc3Qgc2F2ZWRVcHZvdGVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Vwdm90ZWRDb21tZW50c0J5VXNlcicpO1xuICAgIFxuICAgIGlmIChzYXZlZENvbW1lbnRzKSB7XG4gICAgICBzZXRDb21tZW50cyhKU09OLnBhcnNlKHNhdmVkQ29tbWVudHMpKTtcbiAgICB9XG4gICAgaWYgKHNhdmVkVXB2b3Rlcykge1xuICAgICAgc2V0VXB2b3RlZENvbW1lbnRzQnlVc2VyKEpTT04ucGFyc2Uoc2F2ZWRVcHZvdGVzKSk7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY29tbWVudHMnLCBKU09OLnN0cmluZ2lmeShjb21tZW50cykpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1cHZvdGVkQ29tbWVudHNCeVVzZXInLCBKU09OLnN0cmluZ2lmeSh1cHZvdGVkQ29tbWVudHNCeVVzZXIpKTtcbiAgfSwgW2NvbW1lbnRzLCB1cHZvdGVkQ29tbWVudHNCeVVzZXJdKTtcblxuICBjb25zdCBhZGRDb21tZW50ID0gYXN5bmMgKGNvbW1lbnQ6IE9taXQ8Q29tbWVudCwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ3NlbnRpbWVudCc+KSA9PiB7XG4gICAgY29uc3Qgc2VudGltZW50ID0gYW5hbHl6ZVNlbnRpbWVudChjb21tZW50LmNvbnRlbnQpO1xuICAgIGNvbnN0IG5ld0NvbW1lbnQ6IENvbW1lbnQgPSB7XG4gICAgICAuLi5jb21tZW50LFxuICAgICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgIGNyZWF0ZWRBdDogbmV3IERhdGUoKSxcbiAgICAgIHVwdm90ZXM6IDAsXG4gICAgICB1cHZvdGVkQnk6IFtdLFxuICAgICAgc2VudGltZW50LFxuICAgIH07XG4gICAgc2V0Q29tbWVudHMocHJldkNvbW1lbnRzID0+IFsuLi5wcmV2Q29tbWVudHMsIG5ld0NvbW1lbnRdKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVDb21tZW50ID0gYXN5bmMgKGlkOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHNlbnRpbWVudCA9IGFuYWx5emVTZW50aW1lbnQoY29udGVudCk7XG4gICAgc2V0Q29tbWVudHMocHJldkNvbW1lbnRzID0+XG4gICAgICBwcmV2Q29tbWVudHMubWFwKGNvbW1lbnQgPT5cbiAgICAgICAgY29tbWVudC5pZCA9PT0gaWQgPyB7IC4uLmNvbW1lbnQsIGNvbnRlbnQsIHNlbnRpbWVudCB9IDogY29tbWVudFxuICAgICAgKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgZGVsZXRlQ29tbWVudCA9IChpZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q29tbWVudHMocHJldkNvbW1lbnRzID0+IHByZXZDb21tZW50cy5maWx0ZXIoY29tbWVudCA9PiBjb21tZW50LmlkICE9PSBpZCkpO1xuICB9O1xuXG4gIGNvbnN0IGdldENvbW1lbnRzQnlQbGF0ZSA9IChwbGF0ZU51bWJlcjogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGNvbW1lbnRzLmZpbHRlcihjb21tZW50ID0+IGNvbW1lbnQucGxhdGVOdW1iZXIgPT09IHBsYXRlTnVtYmVyKTtcbiAgfTtcblxuICBjb25zdCBnZXRDb21tZW50c0J5VXNlciA9ICh1c2VySWQ6IHN0cmluZykgPT4ge1xuICAgIHJldHVybiBjb21tZW50cy5maWx0ZXIoY29tbWVudCA9PiBjb21tZW50LnVzZXJJZCA9PT0gdXNlcklkKTtcbiAgfTtcblxuICBjb25zdCB1cHZvdGVDb21tZW50ID0gKGlkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q29tbWVudHMocHJldkNvbW1lbnRzID0+XG4gICAgICBwcmV2Q29tbWVudHMubWFwKGNvbW1lbnQgPT5cbiAgICAgICAgY29tbWVudC5pZCA9PT0gaWRcbiAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgLi4uY29tbWVudCxcbiAgICAgICAgICAgICAgdXB2b3RlczogY29tbWVudC51cHZvdGVzICsgMSxcbiAgICAgICAgICAgICAgdXB2b3RlZEJ5OiBBcnJheS5mcm9tKG5ldyBTZXQoWy4uLihjb21tZW50LnVwdm90ZWRCeSB8fCBbXSksIHVzZXJJZF0pKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IGNvbW1lbnRcbiAgICAgIClcbiAgICApO1xuICAgIHNldFVwdm90ZWRDb21tZW50c0J5VXNlcihwcmV2ID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW3VzZXJJZF06IEFycmF5LmZyb20obmV3IFNldChbLi4uKHByZXZbdXNlcklkXSB8fCBbXSksIGlkXSkpLFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBkb3dudm90ZUNvbW1lbnQgPSAoaWQ6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRDb21tZW50cyhwcmV2Q29tbWVudHMgPT5cbiAgICAgIHByZXZDb21tZW50cy5tYXAoY29tbWVudCA9PlxuICAgICAgICBjb21tZW50LmlkID09PSBpZFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAuLi5jb21tZW50LFxuICAgICAgICAgICAgICB1cHZvdGVzOiBNYXRoLm1heCgwLCBjb21tZW50LnVwdm90ZXMgLSAxKSxcbiAgICAgICAgICAgICAgdXB2b3RlZEJ5OiBjb21tZW50LnVwdm90ZWRCeS5maWx0ZXIodXB2b3RlciA9PiB1cHZvdGVyICE9PSB1c2VySWQpLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogY29tbWVudFxuICAgICAgKVxuICAgICk7XG4gICAgc2V0VXB2b3RlZENvbW1lbnRzQnlVc2VyKHByZXYgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICBbdXNlcklkXTogKHByZXZbdXNlcklkXSB8fCBbXSkuZmlsdGVyKHVwdm90ZWRJZCA9PiB1cHZvdGVkSWQgIT09IGlkKSxcbiAgICB9KSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8TG9jYWxEYkNvbnRleHQuUHJvdmlkZXJcbiAgICAgIHZhbHVlPXt7XG4gICAgICAgIGNvbW1lbnRzLFxuICAgICAgICBhZGRDb21tZW50LFxuICAgICAgICB1cGRhdGVDb21tZW50LFxuICAgICAgICBkZWxldGVDb21tZW50LFxuICAgICAgICBnZXRDb21tZW50c0J5UGxhdGUsXG4gICAgICAgIHVwdm90ZUNvbW1lbnQsXG4gICAgICAgIGRvd252b3RlQ29tbWVudCxcbiAgICAgICAgZ2V0Q29tbWVudHNCeVVzZXIsXG4gICAgICAgIHVwdm90ZWRDb21tZW50c0J5VXNlcixcbiAgICAgICAgZ2V0UGxhdGVWb3RlLCAgICAvLyBBZGRlZCB0byBwcm92aWRlclxuICAgICAgICB1cGRhdGVQbGF0ZVZvdGUsIC8vIEFkZGVkIHRvIHByb3ZpZGVyXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0xvY2FsRGJDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlTG9jYWxEYigpIHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoTG9jYWxEYkNvbnRleHQpO1xuICBpZiAoY29udGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VMb2NhbERiIG11c3QgYmUgdXNlZCB3aXRoaW4gYSBMb2NhbERiUHJvdmlkZXInKTtcbiAgfVxuICByZXR1cm4gY29udGV4dDtcbn0iXSwibmFtZXMiOlsiUmVhY3QiLCJjcmVhdGVDb250ZXh0IiwidXNlQ29udGV4dCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiYW5hbHl6ZVNlbnRpbWVudCIsImdldFBsYXRlVm90ZSIsInBsYXRlTnVtYmVyIiwic2F2ZWRQbGF0ZVZvdGVzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInBsYXRlVm90ZXMiLCJKU09OIiwicGFyc2UiLCJ1cHZvdGVzIiwiZG93bnZvdGVzIiwidXBkYXRlUGxhdGVWb3RlIiwidHlwZSIsImN1cnJlbnRWb3RlcyIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJMb2NhbERiQ29udGV4dCIsInVuZGVmaW5lZCIsIkxvY2FsRGJQcm92aWRlciIsImNoaWxkcmVuIiwiY29tbWVudHMiLCJzZXRDb21tZW50cyIsInVwdm90ZWRDb21tZW50c0J5VXNlciIsInNldFVwdm90ZWRDb21tZW50c0J5VXNlciIsInNhdmVkQ29tbWVudHMiLCJzYXZlZFVwdm90ZXMiLCJhZGRDb21tZW50IiwiY29tbWVudCIsInNlbnRpbWVudCIsImNvbnRlbnQiLCJuZXdDb21tZW50IiwiaWQiLCJEYXRlIiwibm93IiwidG9TdHJpbmciLCJjcmVhdGVkQXQiLCJ1cHZvdGVkQnkiLCJwcmV2Q29tbWVudHMiLCJ1cGRhdGVDb21tZW50IiwibWFwIiwiZGVsZXRlQ29tbWVudCIsImZpbHRlciIsImdldENvbW1lbnRzQnlQbGF0ZSIsImdldENvbW1lbnRzQnlVc2VyIiwidXNlcklkIiwidXB2b3RlQ29tbWVudCIsIkFycmF5IiwiZnJvbSIsIlNldCIsInByZXYiLCJkb3dudm90ZUNvbW1lbnQiLCJNYXRoIiwibWF4IiwidXB2b3RlciIsInVwdm90ZWRJZCIsIlByb3ZpZGVyIiwidmFsdWUiLCJ1c2VMb2NhbERiIiwiY29udGV4dCIsIkVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/localDb.tsx\n"));

/***/ })

});