const form = document.querySelector('.form-container');

const movieName = document.getElementById('movieName');
const releasedYear = document.getElementById('releasedYear');

const movieList = document.querySelector('.movie-list');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    // console.log('form submitted');

    const movieNameInput = movieName.value;
    const releasedYearInput = releasedYear.value;

    const movieListItem = document.createElement('li');

    movieListItem.innerHTML = `
        <div class="movie-info">
            <h3>
                ${movieNameInput}
            </h3>
            <p>
                <small>
                    ${releasedYearInput}
                </small>
            </p>
        </div>

        <button class="delete">Delete</button>
    `;

    // console.log(movieListItem);
    movieList.append(movieListItem);

    movieName.value = '';
    releasedYear.value = '';
});

movieList.addEventListener('click', (e)=>{
    // console.log(e.target);
    
    if(e.target.classList.contains('delete')){
        const deleteMovie = e.target.parentElement;
        // console.log(deleteMovie);
        deleteMovie.remove();
    }
})