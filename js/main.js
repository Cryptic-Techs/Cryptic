const doc = Object.freeze({
	body: document.body,
	head: document.head,
	
	class: c => document.getElementsByClassName(c),
	id: i => document.getElementById(i),
	tag: t => document.getElementsByTagName(t)
});

const GITHUB = Object.freeze({
	getRepoDatas: (repo) => {
		return {
			description: repo.description,
			forked: repo.fork,
			forks: Formate(repo.forks_count),
			issues: Formate(repo.open_issues),
			name: repo.name,
			private: repo.private,
			public: !repo.private,
			stars: Formate(repo.stargazers_count),
			url: repo.html_url,
			watchers: Formate(repo.subscribers_count)
		};
	}
});

const Formate = (value) =>
{
	value = Number(value);
	
	if (!isNaN(value))
	{
		if (value > 1000000)
		{
			return value % 1000000 + "M";
		} else if (value > 1000)
		{
			return value % 1000 + "K";
		} else {
			return String(value);
		}
	} else {
		return "Error";
	}
};

const request = (url="",method="GET") =>
{
	return new Promise(resolve =>
	{
		const xhr = new XMLHttpRequest();
		xhr.open(method,url,true);
		xhr.onload = () => resolve(xhr.responseText);
		xhr.send();
	});
};

const loader = {
	show: () => {
		if (loader.ref)
		{
			loader.scroll = setInterval(() => {
				window.scrollTo(0,0);
			},1);
			loader.ref.style.display = "flex";
		}
	},
	hide: () => {
		if (loader.ref)
		{
			loader.ref.style.display = "none";
		}
	}
};

onload = () =>
{
	loader.ref = doc.tag("loader")[0];
	loader.show();
	request("https://raw.githubusercontent.com/Cryptic-Techs/Cryptic/Default/html/header.html").then(html =>
	{
		doc.tag("header")[0].innerHTML = html;
		
		request("https://raw.githubusercontent.com/Cryptic-Techs/Cryptic/Default/html/footer.html").then(html =>
		{
			doc.tag("footer")[0].innerHTML = html;
			init().then(() =>
			{
				loader.hide();
				clearInterval(loader.scroll);
			});
		});
	});
};
