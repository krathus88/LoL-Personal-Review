import * as React from "react";
import { BrowserRouter, Routes, Route, useLoaderData, Form } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Routes fallbackElement={<BigSpinner />} exceptionElement={<GlobalErrorPage />}>
            <Route
                loader={({ signal }) => {
                    return fetch("/api/user.json", {
                        signal,
                    });
                }}>
                <Route
                    path="projects"
                    element={<Projects />}
                    exceptionElement={<TasksErrorPage />}
                    loader={async ({ signal }) => {
                        let res = await fetch("/api/tasks.json", { signal });

                        if (res.status === 404) {
                            throw { notFound: true };
                        }

                        return res.json();
                    }}>
                    <Route
                        path=":projectId"
                        element={<Projects />}
                        loader={async ({ signal, params }) =>
                            fetch(`/api/projects/${params.projectId}`, { signal })
                        }
                    />
                </Route>
                <Route index element={<Index />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
