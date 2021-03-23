const linkShareForms = document.getElementsByClassName("link-search");

$(document).ready(function() {
  $(".link-search").submit(e => {
    e.preventDefault();

    const link = e.target.querySelector("input").value;
    e.target.action = `/link/${link}`;
    e.target.submit();
  })
})