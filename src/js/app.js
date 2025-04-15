import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables);

  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover === false) cover = "<div class='cover'></div>";

  let fullName = "";
  if (variables.name || variables.lastName) {
    fullName = `<h1>${variables.name || ""} ${variables.lastName || ""}</h1>`;
  }

  let role = variables.role ? `<h2>${variables.role}</h2>` : "";

  let location = "";
  if (variables.city || variables.country) {
    location = `<h3>${variables.city || ""}${
      variables.city && variables.country ? ", " : ""
    }${variables.country || ""}</h3>`;
  }

  let avatar = `<img src="${variables.avatarURL}" class="photo" />`;

  let socialLinks = "";
  if (variables.twitter)
    socialLinks += `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`;
  if (variables.github)
    socialLinks += `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`;
  if (variables.linkedin)
    socialLinks += `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`;
  if (variables.instagram)
    socialLinks += `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`;

  let socialBar = "";
  if (socialLinks !== "") {
    socialBar = `<ul class="${variables.socialMediaPosition}">${socialLinks}</ul>`;
  }

  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      ${avatar}
      ${fullName}
      ${role}
      ${location}
      ${socialBar}
    </div>
  `;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-right",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables);

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
