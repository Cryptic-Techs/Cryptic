const init = () =>
{
	return new Promise(resolve =>
	{
		request("https://api.github.com/orgs/Cryptic-Techs/repos").then(repos =>
		{
			repos = JSON.parse(repos);
			
			for (let x in repos)
			{
				request(repos[x].url).then(repo =>
				{
					console.log(JSON.stringify(repo));
					
					repo = GITHUB.getRepoDatas(repo);
					
					if (!repo.forked)
					{
						doc.id("repos").innerHTML += `<a href="${repo.url}" target="_blank" class="repo"><h3>${repo.name}</h3><bar><div><i class="far fa-star"></i> ${repo.stars}</div><div><i class="far fa-eye"></i> ${repo.watchers}</div><div><i class="fas fa-exclamation-circle"></i> ${repo.issues}</div><div><i class="fas fa-code-branch"></i> ${repo.forks}</div><div><i class="fas fa-${repo.public ? "unlock" : "lock"}"></i></div></bar><p>${repo.description}</p></a>`;
					}
				});
			}
			
			resolve();
		});
	});
};
