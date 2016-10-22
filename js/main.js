$('#submit').on('click', ()=>{
  $("#hidingDiv").hide();
  $('#nav').addClass('animated fadeInUp');
  searchWiki()
})

$("#searchText").keypress((e)=> {
    const key= e.keyCode
    if (e.keyCode === 13) {
        e.preventDefault()
        $("#hidingDiv").hide();
        $('#nav').addClass('animated fadeInUp');
        searchWiki()
  }
})

const searchWiki = ()=>{
  $('#box').html("");
    const text = $('#searchText').val()
    const numArticles = 7
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${text}&limit=${numArticles}&format=json&callback=?`
    $.getJSON({
    url:url,
    success: function(result){
    return handlerResult(result)
    }
  })
}

const handlerResult = (result)=>{
  const listTitles = result[1]
  const listDescription = result[2]
  const listLinks = result[3]
  errorMsg(listTitles)
  listArrange(listTitles,listDescription,listLinks)
}

const listArrange = (titles,descriptions,links)=>{
  for (i = 0; i < titles.length; i++) {
    $('<div class="card animated fadeIn" />').html(`
    <h2 class="card-title">${titles[i]}</h2>
    <div class="card-block">
    <p class="card-text">${descriptions[i]}</p>
    <a href="${links[i]}" target="_blank" class="btn btn-primary">read more</a>
    </div>`).appendTo($('#box'))
  }
}

const errorMsg = (noArticles)=>{
  if(noArticles.length===0){
    $('<div class="card" />').html(`
      <h1 class="card-title"> ooops[!] No Results Found</h1>
      <div class="card-block">
      <p class="card-text"><font size="6">Chill, Please check your spelling or contribute by writing this article</font></p>
      <a href="https://en.wikipedia.org/wiki/Wikipedia:Contributing_to_Wikipedia" target="_blank" class="btn btn-primary" >find out how</a>
      </div>`).appendTo($('#box'))
  }
}
