import { useContext } from "react";

import Camera from "../components/Camera";
import BodyControls from "../components/BodyControls";
import BodyPartModal from "../components/BodyPartModal";
import usePreviousIf from "../lib/hooks/usePreviousIf";
import { BodyPartsContext } from "../context/BodyPartsContext";

const Home = () => {
  const { editingPart } = useContext(BodyPartsContext);
  const key = usePreviousIf(editingPart, "");
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white bg-dark">
      {/* Force rerender only when key changes, this prevents content from disappearing out in animations */}
      <BodyPartModal key={key} />
      <div className="flex items-center justify-around w-full">
        <BodyControls />
        <Camera />
      </div>
    </main>
  );
};

export default Home;
