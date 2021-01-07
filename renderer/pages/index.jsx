import Camera from "../components/Camera";
import BodyControls from "../components/BodyControls";
import BodyPartModal from "../components/BodyPartModal";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-white bg-dark">
      <BodyPartModal />
      <div className="flex items-center justify-between w-full">
        <BodyControls />
        <Camera />
      </div>
    </main>
  );
};

export default Home;
