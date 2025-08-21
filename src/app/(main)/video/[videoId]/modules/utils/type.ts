export interface Comment {
  id: string;
  comment: string;
  createdDate: string;
  isOwn: boolean;
  user: {
    id: string;
    name: string;
    picture: string;
  };
}
