import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(

    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  
);
