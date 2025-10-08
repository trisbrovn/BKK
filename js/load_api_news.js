// Load RSS chiu roi
fetch(
  "https://api.rss2json.com/v1/api.json?rss_url=https://vnexpress.net/rss/tin-moi-nhat.rss"
)
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("newsContainer");
    data.items.forEach((item) => {
      const html = `
            <div class="col-md-6 col-lg-4">
              <div class="card h-100 shadow">
                <img src="${item.enclosure.link}" class="card-img-top" alt="${
        item.title
      }">
                <div class="card-body">
                  <h5 class="card-title">
                    <a href="${item.link}" target="_blank">${item.title}</a>
                  </h5>
                  <p class="card-text">${item.description.split("</a>")[1]}</p>
                </div>
              </div>
            </div>
          `;
      container.insertAdjacentHTML("beforeend", html);
    });
  });
