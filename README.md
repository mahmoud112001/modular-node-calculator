# 🟢 Node.js — Lecture 1: Foundations

> A structured study guide covering JavaScript engines, runtimes, the module system, NPM, and semantic versioning.

---
## Table of Contents

1. [JavaScript Engine](#1-javascript-engine)
2. [JavaScript Runtime Environment](#2-javascript-runtime-environment)
3. [Browser vs Machine Runtime](#3-browser-vs-machine-runtime)
4. [Three Ways to Run JS with Node.js](#4-three-ways-to-run-js-with-nodejs)
5. [REPL Concepts](#5-repl-concepts)
6. [Module System](#6-module-system)
7. [CommonJS in Depth](#7-commonjs-in-depth)
8. [Why CommonJS Has Limitations](#8-why-commonjs-has-limitations)
9. [NPM — Node Package Manager](#9-npm--node-package-manager)
10. [Package Files Explained](#10-package-files-explained)
11. [Semantic Versioning](#11-semantic-versioning)
12. [Assignment — Calculator Project](#12-assignment--calculator-project)

---

## 1. JavaScript Engine

A **JS Engine** is a program that **reads, interprets, and executes** JavaScript code. It converts human-readable JS into machine code the computer can run.

| Engine | Used By | Built With |
|--------|---------|------------|
| **V8** | Chrome & Node.js | C++ |
| SpiderMonkey | Firefox | C/C++ |
| JavaScriptCore | Safari | C++ |

> 💡 **Key Point:** Chrome and Node.js both use **V8** — the same engine, different containers around it.

---

## 2. JavaScript Runtime Environment

A **JS Runtime Environment** wraps the engine and adds extra capabilities that JS by itself doesn't have — things like file access, timers, network requests, etc.

```
JS Code  →  JS Engine (V8)  →  Runtime APIs  →  Output
```


The runtime provides:
- The **event loop**
- **Web APIs** (browser) or **Node APIs** (server)
- The **call stack** and **callback queue**

---

## 3. Browser vs Machine Runtime

| Feature | Browser Runtime | Node.js Runtime |
|--------|----------------|----------------|
| JS Engine | V8 (Chrome) | V8 |
| Extra APIs | DOM, Fetch, localStorage | fs, http, path, os |
| Entry point | HTML `<script>` tag | `.js` file via terminal |
| Environment | Sandbox (no file access) | Full OS access |
| Global object | `window` | `global` / `globalThis` |

---

## 4. Three Ways to Run JS with Node.js

### Method 1 — JS File
```bash
node index.js
```
Most common. Write code in a `.js` file and run it from the terminal.

### Method 2 — Eval Flag
```bash
node -e "console.log('Hello from eval')"
```
Execute a short inline JS snippet directly from the terminal.

### Method 3 — REPL (Read–Eval–Print Loop)
```bash
node
```
Opens an interactive shell. Type JS and get instant results line by line.

---

## 5. REPL Concepts

| Concept | Explanation | Example |
|--------|-------------|---------|
| **Value** | A raw piece of data | `42`, `"hello"`, `true` |
| **Expression** | Code that evaluates to a value | `2 + 2` → `4` |
| **Statement** | An instruction that performs an action | `let x = 5` (no output) |

### Useful REPL Shortcuts

| Shortcut | What It Does |
|----------|-------------|
| `_` | Accesses the **last evaluated value** |
| `.exit` | Exits the REPL |
| `.help` | Shows all REPL commands |

### Browser Console Shortcuts (bonus)

| Shortcut | What It Does |
|----------|-------------|
| `$('selector')` | Shorthand for `document.querySelector()` |
| `$$('selector')` | Shorthand for `document.querySelectorAll()` |

---

## 6. Module System

A **module system** defines how files **talk to and share code with each other**.

Without a module system, every `.js` file is isolated — variables and functions can't be shared between files.

### Two Most Common Module Systems

| System | Extension | Syntax | Loading |
|--------|-----------|--------|---------|
| **CommonJS (CJS)** | `.js` / `.cjs` | `require()` / `module.exports` | Synchronous |
| **ES Modules (ESM)** | `.mjs` or `"type":"module"` | `import` / `export` | Asynchronous |

---

## 7. CommonJS in Depth

Node.js wraps every file in an **IIFE (Immediately Invoked Function Expression)**:

```js
(function(exports, require, module, __filename, __dirname) {
  // YOUR FILE CODE IS HERE
});
```

### Why IIFE?

**Reason 1 — Scope Protection:**
Variables inside the function can't leak into the global scope or be accidentally overridden by other files.

**Reason 2 — Injected Parameters:**
Node.js automatically passes these 5 arguments to every file:

| Parameter | Description |
|-----------|-------------|
| `exports` | Shorthand reference to `module.exports` |
| `require` | Function to import other modules |
| `module` | Object representing the current module |
| `__filename` | Absolute path to the current file |
| `__dirname` | Absolute path to the current directory |

### Example

```js
// math.js
function add(a, b) { return a + b; }
module.exports = { add };

// index.js
const { add } = require('./math');
console.log(add(2, 3)); // 5
```

---

## 8. Why CommonJS Has Limitations

CommonJS loads modules **synchronously** — it blocks execution until the file is fully loaded.

```
require('./bigFile') → WAIT → WAIT → WAIT → continue
```

This is fine in Node.js (server), but **terrible in browsers** because:
- The browser must fetch the file over the network
- Synchronous loading **freezes the page** during download

### Solution: ES Modules + Top-Level Await

ES Modules load **asynchronously** and support `top-level await`:

```js
// ESM — works in browser and modern Node.js
import { add } from './math.js';
const data = await fetch('/api/data'); // top-level await!
```

---

## 9. NPM — Node Package Manager

**NPM** is a tool that lets you:
- 📦 **Install** third-party packages into your project
- 🔍 **Find** packages from the public registry (npmjs.com)
- ⚙️ **Manage** dependencies and project scripts

### Common Commands

```bash
npm init -y              # Initialize a new project
npm install <package>    # Install a package (adds to dependencies)
npm install -D <package> # Install as dev dependency only
npm run <script>         # Run a script from package.json
npm uninstall <package>  # Remove a package
```

---

## 10. Package Files Explained

### `package.json`
The **identity card** of your project. Contains:
- `name`, `version`, `description`
- `scripts` — command shortcuts (`start`, `build`, `test`)
- `dependencies` — packages needed in **production**
- `devDependencies` — packages needed only in **development** (e.g., testing tools)

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "chalk": "^5.3.0"
  }
}
```

### `package-lock.json`
**Locks the exact version** of every installed package (including nested dependencies). Ensures everyone on the team installs the same versions.

> Never manually edit `package-lock.json`. It's auto-generated.

### `node_modules/`
The **actual code** of all installed packages lives here. This folder should **never** be committed to Git — add it to `.gitignore`.

```
.gitignore:
node_modules/
```

---

## 11. Semantic Versioning

Every package version follows the `MAJOR.MINOR.PATCH` format:

```
   1  .  4  .  2
   ↑     ↑     ↑
 MAJOR MINOR PATCH
```

| Type | When to Use | Breaking? | Example |
|------|-------------|-----------|---------|
| **MAJOR** | Big redesign / breaking API change | ✅ Yes | `1.0.0` → `2.0.0` |
| **MINOR** | New feature, backward compatible | ❌ No | `1.0.0` → `1.1.0` |
| **PATCH** | Bug fix only | ❌ No | `1.0.0` → `1.0.1` |

### Version Range Symbols in `package.json`

| Symbol | Meaning |
|--------|---------|
| `^1.4.2` | Accept MINOR and PATCH updates (most common) |
| `~1.4.2` | Accept PATCH updates only |
| `1.4.2` | Exact version only |

---

## 12. Assignment — Calculator Project

### Requirements

1. Create a Node.js project (with `npm init`)
2. A `main` function that accepts:
   - Two numeric values
   - An operator (`+`, `-`, `*`, `/`)
3. Output the result of the operation
4. Keep code **modular** — separate files per concern
5. Use the **[chalk](https://www.npmjs.com/package/chalk)** package to print each operation in a different color

### Bonus
Accept the values and operator directly from the **command line**:
```bash
node index.js 10 + 5   # → 15
node index.js 20 / 4   # → 5
```

### Suggested Project Structure
```
calculator/
├── index.js          # Entry point, reads args, calls main
├── calculator.js     # Core logic (add, subtract, multiply, divide)
├── display.js        # Chalk-colored output
├── package.json
└── node_modules/
```

### Getting Started
```bash
mkdir calculator && cd calculator
npm init -y
npm install chalk
touch index.js calculator.js display.js
```

---

## Quick Reference Cheatsheet

```
JS Engine     → Executes JS code (V8 in Chrome & Node)
Runtime       → Engine + APIs + Event Loop
CommonJS      → require() / module.exports — sync, IIFE-wrapped
ES Modules    → import/export — async, supports top-level await
NPM           → Install and manage packages
package.json  → Project config + scripts + deps
package-lock  → Exact version lock
node_modules  → Installed package code (gitignore it!)
SemVer        → MAJOR.MINOR.PATCH
```

---

*Lecture 1 of Node.js — Keep building 🚀*
