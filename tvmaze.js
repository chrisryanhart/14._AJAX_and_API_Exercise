/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */
/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  //http://api.tvmaze.com/search/shows

  //make new array to add show objects to
  const showArr = [];

  //get search data from the tvmaze API
  const res = await axios.get('http://api.tvmaze.com/search/shows',{params: {q: query}});
  
  const series = res.data;

  //make an object with the API data and push to the showArr
  for(let element of series){
    // console.log(element.show);
    const obj = {id: element.show.id, name: element.show.name, summary: element.show.summary}
    
    //if no picture available, use default image
    if(element.show.image){
      obj.image = element.show.image.original;
    }else{
      obj.image = "https://tinyurl.com/tv-missing";
    }
    showArr.push(obj);
  }
  return showArr;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

//populateShows() 

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <img class="card-img-top" src="${show.image}">
             <button class=" btn btn-primary episodes" id="${show.id}">Episodes</button>
  
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);

    //Add event listener to button to get and populate episodes
    $(`button#${show.id}`).on('click', async function handleEpisode (e){
      let episodeTest = await getEpisodes(show.id);
      console.log(episodeTest);
      populateEpisodes(episodeTest);

      $('#episodes-area').show();
    });
  }
}




/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();
  $('#shows-list').show();

  let shows = await searchShows(query);
  
  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes
  const episodeInfo = [];
  const res = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`);
  const episodes = res.data;

  //Loop through episode data and push to the espisode info array
  for(episode of episodes){
    const obj = {showID: id, id: episode.id, name: episode.name, season: episode.season, number: episode.number};
    episodeInfo.push(obj);
  }

  // console.log(episodeInfo);

    // TODO: return array-of-episode-info, as described in docstring above

    return episodeInfo;
}

function populateEpisodes(arr){
  
  const $episodesList = $("#episodes-list");
  $episodesList.empty();

  //add Episodes to the DOM
  for (let element of arr) {
    let $item = $(`<li>${element.name} (season ${element.season}, number ${element.number})</li>`);

    $episodesList.append($item);
  }
}


