import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import AppContextProvider from "./context/AppContext.jsx";

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<AppContextProvider>
				<App />
			</AppContextProvider>
		</ClerkProvider>
	</BrowserRouter>
);
