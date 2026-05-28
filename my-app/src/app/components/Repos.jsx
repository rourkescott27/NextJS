async function fetchRepos(user) {
  const res = await fetch(`https://api.github.com/users/${user}/repos` , {next: { revalidate: 60 }});
  const json = await res.json();
  return json;
}

const Repos = async ({ user }) => {
  const repos = await fetchRepos(user);
//   console.log(repos);

  return (
    <div>
      <h1 className= "text-2xl font-bold text-heading ml-4 mt-3">{user}'s Repos</h1>
      <div className="overflow-x-auto">
        <table
          className="table w-full"
        >
          {/* head */}
          <thead>
            <tr>
              <th>Repo Name</th> <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repos) => (
              <tr className = "hover:bg-base-300">
                <td>{repos.name}</td> <td>{repos.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Repos;
