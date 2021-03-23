const linkShareForms = document.getElementsByClassName("link-search");

$(document).ready(function() {
  $(".link-search").submit(e => {
    e.preventDefault();

    const link = e.target.querySelector("input").value;
    e.target.action = `/list/${link}`;
    e.target.submit();
  });

  $("#add-item").submit(e => {
    e.preventDefault();
    const url = e.target.dataset.action;
    const link = e.target.dataset.link;
    const inputs = e.target.querySelectorAll("input");
    const name = inputs[0].value;
    const amount = inputs[1].value;
    
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify({
        name, amount, link
      }),
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        location.reload();
      },
      error: function(err) {
        alert(`failed to add item: ${name}`)
      }
    })
  })

  $(".mark").click(function(e) {
    const link = e.target.dataset.link;
    const dataName = e.target.dataset.name;
    const name = e.target.name;
    const url = `/api/list/${link}/item`

    const data = {
      link: link,
      item: dataName,
      isPurchased: name === "yes"
    }
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(data) {
        location.reload();
      },
      error: function(err) {
        alert(`failed to mark ${name}`)
      }
    })
  })

  $("#share").click(function(e) {
    const link = e.target.dataset.link;
    const url = `${window.location.origin}/list/${link}`;

    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(url).select();
    document.execCommand("copy");
    $temp.remove();
  })
})