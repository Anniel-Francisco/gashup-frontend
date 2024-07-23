export interface ICommunityChats {
  _id: string;
  community_id: string;
  chatOwner_id: string;
  members_id: string[];
  name: string;
  img: string;
  isDeleted: boolean;
  isMember: boolean;
  isActive: boolean;
}

export interface IChat {
  id: string;
  message: string;
  publicationDate: string;
  username: string;
  userID: string;
  img: string;
}

export interface IPostMessage {
  userID: string;
  message: string;
}
