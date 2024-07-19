"use client";
import { Avatar } from "@/components/Avatar/Avatar";
import { useAuthProvider } from "@/context/AuthContext";
import { useAlert } from "@/hooks/useAlert";
import { useJoinCommunity, useLeaveCommunity } from "@/hooks/useCommunity";
import { IUser } from "@/types/user";
import { useEffect, useState } from "react";
import { Auth } from "../General/Auth";
import { Button } from "@mui/material";

interface props {
  id: string;
  members?: IUser[] | undefined;
}

export default function CommunityControls({ id, members }: props) {
  const { session } = useAuthProvider();
  const [showAlert] = useAlert();
  const [joined, setJoined] = useState<boolean>(false);

  const [loadingJoin, loadJoin] = useJoinCommunity(id, {
    memberID: session?._id,
  });

  const [loadingLeave, loadLeave] = useLeaveCommunity(id, {
    userID: session?._id,
  });

  console.log(members);

  useEffect(() => {
    if (members) {
      const findUser = members.find((item) => item._id === session?._id);
      console.log(findUser);
      if (findUser) {
        setJoined(true);
      } else {
        setJoined(false);
      }
    }
  }, [members, session?._id]);

  const joinCommunity = async () => {
    const { response, error } = await loadJoin();

    if (response?.data.ok) {
      setJoined(true);
      return showAlert("success", response?.data.mensaje);
    } else {
      return showAlert("warning", response?.data.mensaje);
    }
  };

  const leaveCommunity = async () => {
    const { response, error } = await loadLeave();

    if (response?.data.ok) {
      setJoined(false);
      return showAlert("success", response?.data.mensaje);
    } else {
      return showAlert("warning", response?.data.mensaje);
    }
  };

  const handleJoinLeave = () => {
    if (joined) {
      leaveCommunity();
    } else {
      joinCommunity();
    }
  };

  const openLogInModal = () => {
    // setAuthModal(!authModal);
    return showAlert("warning", "Debes iniciar sesión para unirte");
  };

  // Limitar a los primeros tres miembros
  const firstThreeMembers = members?.slice(0, 3);
  const remainingMembersCount = (members?.length || 0) - 3;

  return (
    <div className="flex w-full mt-14 justify-between px-3 pb-2 items-center">
      <div className="flex flex-row items-center gap-3 ">
        <span>{members?.length ? members?.length : 0} Miembros</span>

        <div className="flex flex-row gap-1">
          {firstThreeMembers?.map((item: IUser, index) => (
            <Avatar key={index} name={item.name} size={35} image={item.img} />
          ))}
          {remainingMembersCount > 0 && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 text-black">
              +{remainingMembersCount}
            </div>
          )}
        </div>
      </div>
      {/* <button
        onClick={() => (session?._id ? handleJoinLeave() : openLogInModal())}
        className={`${
          joined ? "bg-[#aa40c7]" : "bg-[#afafaf]"
        } p-2 rounded-md text-white`}
      >
        {joined ? "Unido" : "Unirse"}
      </button> */}
      <Button
        variant="contained"
        color={`${joined ? "primary" : "secondary"}`}
        onClick={() => (session?._id ? handleJoinLeave() : openLogInModal())}
      >
        {joined ? "Unido" : "Unirse"}
      </Button>
    </div>
  );
}
