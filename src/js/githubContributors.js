const API_ENDPOINT = "https://api.github.com/repos/mdyd-dev/nearme-documentation/commits";
const params = `?path=marketplace_builder/views/pages/${window.location.pathname}.liquid`;

const initialize = () => {
  $.get(`${API_ENDPOINT}${params}`, data => {
    if (data[0]) {
      $("[data-contributors]").html(getHTML(data));
    }
  });
};

const getHTML = data => {
  return `
    <p class="mb-0 d-flex align-items-center">
      <span>Last edit:</span>&nbsp; ${getLastUpdateTime(data)}
    </p>
    <p class="mb-0 d-flex align-items-center">
      <span>Contributors:</span>&nbsp; ${getContributors(data)}
    </p>
  `;
};

const getLastUpdateTime = data => {
  const commitDate = new Date(data[0].commit.committer.date);

  // prettier-ignore
  return commitDate.toLocaleString("en-ENG", { day: "numeric", month: "short", year: "numeric" });
};

const getContributors = data => {
  const uniqueAuthors = [];

  return data
    .map(item => {
      if (uniqueAuthors.indexOf(item.author.id) < 0) {
        uniqueAuthors.push(item.author.id);
        return getContributor({ author: item.author, item: item });
      }
    })
    .join("");
};

const getContributor = ({ author, item }) => {
  const authorName = item.commit.author.name;
  return `<a href="${author.html_url}" target="_blank">
    <img src="${author.avatar_url}" width="20" height="20" alt="${authorName} (${author.login})" />
  </a>`;
};

export default initialize;
