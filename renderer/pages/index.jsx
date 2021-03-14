import { useContext } from "react";

import BodyControls from "../components/Body/BodyControls";
import Camera from "../components/Camera/Camera";
import RoutesModal from "../components/Routes/RoutesModal";
import usePreviousIf from "../lib/hooks/usePreviousIf";
import { RoutesContext } from "../context/RoutesContext";

const Home = () => {
  const { editingRoute } = useContext(RoutesContext);
  const key = usePreviousIf(editingRoute, "");
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white bg-dark">
      <RoutesModal key={key} />
      <div className="flex flex-row-reverse items-center justify-around w-full">
        <Camera />
        <BodyControls />
      </div>
    </main>
  );
};

export default Home;
