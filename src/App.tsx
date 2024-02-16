import "./App.css";
import { GameStadistics } from "./components/GameStadistics/GameStadistics";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { PriceChart } from "./components/PriceChart/PriceChart";
import { Bundles } from "./components/Bundles/Bundles";

import { Toaster } from "sonner";

import { useState } from "react";
import { useGame } from "./hooks/useGame";

import { LowestData } from "./types"; 

function App() {
	const [query, setQuery] = useState('storyofsurvivor');
	const { isLoading, isError, currentData, lowestData, bundlesData, gameInfoData } = useGame(query);

	const handleSearch = async (newQuery: string) => {
		setQuery(newQuery);
	};	  

	return (
		<div className="content">
			<SearchBar onSearch={handleSearch} query={query} />
			{!isLoading && !isError && currentData && lowestData && bundlesData && gameInfoData && (
				<>
					<GameStadistics currentData={currentData} lowestData={lowestData.lowest} gameInfoData={gameInfoData.gameInfo} /> 
					<PriceChart currentData={currentData} />
					<Bundles bundles={bundlesData} />
				</>
			)}
			<Toaster richColors />
		</div>
	);
}

export default App;
