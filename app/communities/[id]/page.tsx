"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthProvider } from "@/context/AuthContext";
import CommunityHeader from "@/components/Community/CommunityHeader";
import CommunityControls from "@/components/Community/CommunityControls";
import CommunityDescription from "@/components/Community/CommunityDescription";
import MembersBar from "@/components/Community/MembersBar";
import MappedPosts from "@/components/Post/MappedPosts";
import CreatePost from "@/components/Post/CreatePost";
import { Spinner } from "@/components/Spinner/Spinner";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import MessageDialog from "@/components/MessageDialog";
import { useGetCommunity } from "@/hooks/useCommunity";
import { IUser } from "@/types/user";
import { ICommunity } from "@/types/community";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function CommunityPage({ params }: { params: { id: string } }) {
  const { session } = useAuthProvider();
  const router = useRouter();

  const [community, setCommunity] = useState<ICommunity | undefined>();
  const [loading, load] = useGetCommunity(params.id, session?._id ?? "");
  const [userBanned, setUserBanned] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getCommunity = async () => {
    const { response, error } = await load();

    if (response?.data.ok) {
      setCommunity(response.data.data);
      setIsMember(
        response.data.data.members_id?.some(
          (member: IUser) => member._id === session?._id
        )
      );
      setIsAdmin(
        session?._id == response.data.data.owner_id ||
          response.data.data.admins_id?.some(
            (member: IUser) => member._id === session?._id
          )
      );
    } else if (response?.data.banned) {
      setUserBanned(true);
    }
  };

  useEffect(() => {
    getCommunity();
  }, []);

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  if (userBanned) {
    return (
      <MessageDialog
        setOpen={setUserBanned}
        open={userBanned}
        titleText="Baneado"
        confirmationText="Has sido baneado de esta comunidad"
        confirmButtonText="OK"
        callback={() => {
          router.push("/");
        }}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Spinner loading={loading} message="cargando" />

      {community && (
        <>
          <CommunityHeader
            name={community?.name}
            img={community?.img as string}
            banner={community?.banner as string}
          />

          <div className="w-full flex flex-row">
            <div className="w-full md:w-[70%]">
              {/* Controls */}
              <CommunityControls
                id={params.id}
                members={community?.members_id as IUser[]}
                owner={community?.owner_id as IUser}
              />
              <Divider
                component="li"
                className="flex justify-center items-center mb-3"
              />

              <div className="w-full pr-2">
                <div className="flex flex-col md:hidden">
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      padding: 0,
                      marginBottom: 2,
                    }}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Publicaciones" {...a11yProps(0)} />
                      <Tab label="Descripción" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    {/* Create post */}
                    {isMember && (
                      <CreatePost className="w-full" community_id={params.id} />
                    )}
                    {/* Posts */}
                    <MappedPosts className="w-full" _id={params.id} />
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    <CommunityDescription
                      name={community?.name}
                      description={community?.description}
                      owner={community?.owner_id as IUser}
                      admins={community?.admins_id as IUser[]}
                      members={community?.members_id as IUser[]}
                      rank={community?.rank ?? 0}
                    />
                  </CustomTabPanel>
                </div>

                <div className="hidden md:flex flex-col">
                  {/* Create post */}
                  {isMember && (
                    <CreatePost className="w-full" community_id={params.id} />
                  )}
                  {/* Posts */}
                  <MappedPosts className="w-full" _id={params.id} />
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-2 w-[30%] border-l-1 border-black">
              <div className="flex flex-col gap-2 sticky top-12 overflow-y-scroll">
                <CommunityDescription
                  name={community?.name}
                  description={community?.description}
                  owner={community?.owner_id as IUser}
                  admins={community?.admins_id as IUser[]}
                  members={community?.members_id as IUser[]}
                  rank={community?.rank ?? 0}
                />
                <MembersBar />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
