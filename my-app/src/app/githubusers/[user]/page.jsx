import Repos from "../../components/Repos";

const UserReposPage = async ({ params }) => {
    const { user } = await params;
    
  return (
    <div>
      <Repos user={user} />
    </div>
  );
};

export default UserReposPage;
