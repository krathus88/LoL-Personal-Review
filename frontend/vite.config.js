import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
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
                    target: "http://127.0.0.1:8000",
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    };
});
