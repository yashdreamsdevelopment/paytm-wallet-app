import { useSelector } from "react-redux";

const Appbar = () => {
  const userData = useSelector((state) => state.user.userData);

  console.log("## userData:", userData);

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello, {userData?.firstName}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {userData?.firstName?.split("")[0]?.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
