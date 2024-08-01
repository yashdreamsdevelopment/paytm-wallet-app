import { useEffect, useState } from "react";
import Button from "./Button";
import {
  useLazySearchUserQuery,
  useSearchUserQuery,
} from "../store/services/user/user.api";
import { debounce } from "../utility/debounce";
import { setTransferToUserData } from "../store/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

const Users = () => {
  const {
    data: usersData,
    isSuccess: isUserDataSuccess,
    isLoading: isUserDataLoading,
    refetch: refetchUsersData,
  } = useSearchUserQuery();

  const [
    searchUserAPI,
    { isSuccess: isSearchUserSucess, isLoading: isSearchUserLoading },
  ] = useLazySearchUserQuery();

  // STATEs
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  // FUNCTIONs
  const handleSearchUserApi = async (query) => {
    if (!query) {
      refetchUsersData();
    }

    try {
      const resp = await searchUserAPI(query.trim()).unwrap();

      if (resp.results > 0) {
        setUsers(resp.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      // TODO: add toast here
      return [];
    }
  };

  // EFFECTs
  useEffect(() => {
    if (isUserDataSuccess) {
      setUsers(usersData.data);
    }
  }, [isUserDataLoading]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleSearchUserApi(query);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [query]);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map((user, id) => (
          <User key={id} user={user} />
        ))}
      </div>
    </>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (user) => {
    dispatch(setTransferToUserData(user));

    navigate("/send");
  };

  return (
    <div className="flex align-middle justify-between">
      <div className="flex align-middle">
        <Avatar contents={[user?.firstName, user?.lastName]} />
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user?.firstName} {user?.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button label={"Send Money"} onClick={() => handleClick(user)} />
      </div>
    </div>
  );
};

export default Users;
