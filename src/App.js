import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import AssessmentDetailPage from "./pages/AssessmentDetail";
import PresentationDetailPage from "./pages/PresentationDetail";
import StudiesPage from "./pages/Studies";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/social-story",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "studies",
        children: [
          {
            index: true,
            element: <StudiesPage />,
          },
          {
            path: ":studyId",
            id: "study-detail",
            children: [
              {
                index: true,
                path: "presentations",
                element: <PresentationDetailPage />,
              },
              {
                path: "assessments",
                element: <AssessmentDetailPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
