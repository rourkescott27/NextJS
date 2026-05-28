import Link from "next/link";

async function fetchGithubUsers() {
  const res = await fetch("https://api.github.com/search/users?q=type:user");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const json = await res.json();
  return json.items;
}

const GithubUsers = async () => {
  const users = await fetchGithubUsers();
  //*removed console.log(users);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th><th>URL</th><th>Repos</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-hexagon w-12 h-12">
                      <img src={user.avatar_url} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold"> {user.login}</div>
                    <div className="text-sm opacity-50"> {user.id}</div>
                  </div>
                </div>
              </td>
              <td>
                <Link
                  href={user.html_url}
                  className="btn btn-ghost btn-primary "
                >
                  View on GitHub
                </Link>
              </td>
              <td>
                <Link
                  href={`/githubusers/${user.login}`}
                  className="btn btn-ghost btn-primary "
                >
                  Go to Repos
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GithubUsers;
