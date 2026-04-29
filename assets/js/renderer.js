function renderAbout(data) {
	return `
		<p>${data.biography}</p>
		<a href="${data.cv.url}">Academic CV</a> (last modified: ${data.cv.updated})
	`;
}

function renderPublicationLinks(links) {
	if (!links) return '';
	const configs = [
		{ key: 'paper',   iconHtml: '<span class="icon">📄</span>', label: 'Paper'   },
		{ key: 'thesis',  iconHtml: '<span class="icon">📄</span>', label: 'Thesis'  },
		{ key: 'github',  iconHtml: '<i class="icon brands fa-github"></i>', label: 'GitHub'  },
		{ key: 'gitlab',  iconHtml: '<i class="icon brands fa-gitlab"></i>', label: 'GitLab'  },
		{ key: 'website', iconHtml: '<span class="icon">🌐</span>', label: 'Website' },
	];
	return configs
		.filter(c => links[c.key])
		.map(c => `<a href="${links[c.key]}" class="pub-link" target="_blank">${c.iconHtml} ${c.label}</a>`)
		.join('');
}

function renderPublications(publications) {
	return publications.map(pub => {
		const numberHtml = pub.number !== null ? `<span class="publication-number">#${pub.number}</span>` : '';
		const tagsHtml = pub.tags.map(t => `<span class="tag tag-${t.type}">${t.label}</span>`).join('');
		const venueHtml = pub.venue_url
			? `<a href="${pub.venue_url}" target="_blank" style="color: inherit; text-decoration: none;">${pub.venue}</a>`
			: pub.venue;
		const linksHtml = renderPublicationLinks(pub.links);
		return `
			<article class="publication-card">
				${numberHtml}
				<h3 class="publication-title">${pub.title}</h3>
				<div class="publication-meta-row">
					<p class="publication-venue">${venueHtml}</p>
					<div class="publication-tags">${tagsHtml}</div>
				</div>
				<p class="publication-authors">${pub.authors}</p>
				<p class="publication-abstract">${pub.abstract}</p>
				<div class="publication-links">${linksHtml}</div>
			</article>
		`;
	}).join('');
}

function renderConferences(conferences) {
	return conferences.map(conf => {
		const posterHtml = conf.links && conf.links.poster
			? `<a href="${conf.links.poster}" class="pub-link" target="_blank"><span class="icon">📄</span> Poster</a>`
			: '';
		return `
			<article class="publication-card presentation-card">
				<h3 class="publication-title">${conf.title}</h3>
				<p class="publication-venue">${conf.venue}</p>
				<p class="publication-authors">${conf.authors}</p>
				<div class="publication-links">${posterHtml}</div>
			</article>
		`;
	}).join('');
}

function renderProjects(projects) {
	return projects.map(proj => {
		const collaborateHtml = proj.collaborate_text
			? `<div class="project-collaborate-compact"><p><strong>Looking for collaborators!</strong> ${proj.collaborate_text}</p></div>`
			: '';
		return `
			<article class="project-card">
				<div class="project-header">
					<div class="project-info">
						<h3 class="project-title">${proj.title}</h3>
						<p class="project-status">${proj.status}</p>
					</div>
					<span class="project-badge">${proj.badge}</span>
				</div>
				<div class="project-content">
					<div class="project-description">
						<p>${proj.description}</p>
					</div>
					<div class="project-screenshot">
						<img src="${proj.image}" alt="${proj.image_alt}" class="app-screenshot">
						<p class="copyright-notice">© 2026 Victor Mangeleer. All rights reserved.</p>
					</div>
					${collaborateHtml}
				</div>
			</article>
		`;
	}).join('');
}

function renderTab(tabName, data) {
	switch (tabName) {
		case 'about':        return renderAbout(data);
		case 'publications': return renderPublications(data);
		case 'conferences':  return renderConferences(data);
		case 'projects':     return renderProjects(data);
		default:             return '';
	}
}
