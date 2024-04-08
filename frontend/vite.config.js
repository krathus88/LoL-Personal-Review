import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "dotenv/config";

export default defineConfig(() => {
    return {
        build: {
            outDir: "build",
        },
        plugins: [react()],
        server: {
            proxy: {
                "/api": {
                    target: process.env.API_URL,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    };
});
