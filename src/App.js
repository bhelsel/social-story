import { RouterProvider, createHashRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import StudyDetailPage from "./pages/StudyDetailPage";
import AssessmentDetailPage from "./pages/AssessmentDetail";
import PresentationDetailPage from "./pages/PresentationDetail";
import StudiesPage from "./pages/Studies";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import ResearchProtocolChat from "./components/ChatMessages";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "studies",
        children: [
          {
            index: true,
            element: <StudiesPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: ":studyId",
            id: "study-detail",
            element: <StudyDetailPage />,
            children: [
              {
                index: true,
                path: "presentations",
                element: <PresentationDetailPage />,
                errorElement: <ErrorPage />,
              },
              {
                path: "assessments",
                element: <AssessmentDetailPage />,
                errorElement: <ErrorPage />,
              },
              {
                path: "chat",
                element: <ResearchProtocolChat />,
                errorElement: <ErrorPage />,
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
