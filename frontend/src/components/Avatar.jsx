import React, { memo, useEffect, useState } from "react";

/* @params 
    contents []:string 
*/

const Avatar = ({ contents = [] }) => {
  const [avatar, setAvatar] = useState("U");

  const generateAvatar = () => {
    let txt = "";

    contents?.forEach((content) => {
      let firstChar = content?.charAt(0)?.toUpperCase();

      txt += firstChar;
    });

    setAvatar(() => txt);
  };

  useEffect(() => {
    if (contents.length > 0) {
      generateAvatar();
    }
  }, []);

  return (
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold mt-2 mr-2">
      <div className="flex flex-col justify-center h-full text-xl">
        {avatar}
      </div>
    </div>
  );
};

export default Avatar;
