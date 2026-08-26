import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom"//Tumhari JS browser ke document ko use karti hai: document.getElementById("tasbeehList");Node.js normally document nahi jaanta. jsdom ek fake browser-like environment provide karega:
    }
});

/* Vitest
   ↓
jsdom
   ↓
fake document/window
   ↓
script.js can be tested*/