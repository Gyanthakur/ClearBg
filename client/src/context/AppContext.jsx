import { createContext, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext();

const AppContextProvider = (props) => {
	const [credit, setCredit] = useState(false);

	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const { getToken } = useAuth();

	const loadCreditsdata = async () => {
		try {
			const token = await getToken();
			console.log("token",token);
			console.log("burl",backendUrl);

			const { data } = await axios.get(backendUrl + "/api/user/credits", {
				headers: { token },
			});
            console.log("data",data);
            
			if (data.success) {
				setCredit(data.credit);
				console.log("credit", data.credit);
			} else {
				console.log(data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const value = {
		credit,
		setCredit,
		loadCreditsdata,
		backendUrl,
	};
	return (
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
};
export default AppContextProvider;
