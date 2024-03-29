let movies;
const form = document.querySelector('.form-container');

let movieName = document.getElementById('movieName');
let releasedYear = document.getElementById('releasedYear');

window.onload = function() {
    movies = JSON.parse(localStorage.getItem('movies'))?JSON.parse(localStorage.getItem('movies')) : [];
    // as soon as the page is loaded 
    displayMoviesList();
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const newMovie = {
        movie: e.target.elements.movie.value,
        year: e.target.elements.year.value
    };

    if(movies.some(record => record.movie == newMovie.movie)) {
        alert('movie already exists!');
    } else {
        movies.push(newMovie);
    }

    localStorage.setItem('movies', JSON.stringify(movies));

    e.target.reset();

    displayMoviesList();
});

function displayMoviesList(){
    // sort movies by year in ascending
    movies.sort((a, b) => a.year - b.year);

    const ul = document.querySelector('.movie-list');

    ul.innerHTML = '';

    if (movies == null) return;

    movies.forEach(movieItem=>{
        const li = document.createElement('li');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('movie-info');

        const update = document.createElement('button');
        update.classList.add('update');

        const del = document.createElement('button');
        del.classList.add('delete');

        infoDiv.innerHTML = `
            <p class="movie">${movieItem.movie}</p>                
            <p class="year"><small>${movieItem.year}</small></p>`;

        update.innerHTML = 'EDIT';
        del.innerHTML = 'DELETE';

        li.append(infoDiv);
        li.append(update);
        li.append(del);

        ul.append(li);

        update.addEventListener('click', ()=>{
            // console.log('update clicked');
            movies = movies.filter(movie => movie != movieItem);
            localStorage.setItem('movies', JSON.stringify(movies));
            
            // edit movie
            let addMovie = document.getElementById('add');
            let saveMovie = document.getElementById('save');
            movieName.value = movieItem.movie;
            releasedYear.value = movieItem.year;
            addMovie.style.display = 'none';
            saveMovie.style.display = 'inline';
            
            // update movie
            saveMovie.addEventListener('click', () => {
                movieItem.movie = movieName.value;
                movieItem.year = releasedYear.year;
                saveMovie.style.display = 'none';
                addMovie.style.display = 'inline';
            })
        });

        del.addEventListener('click', ()=>{
            // console.log('delete clicked!');
            movies = movies.filter(movie => movie != movieItem);
            localStorage.setItem('movies', JSON.stringify(movies));
            displayMoviesList();
        });
    })
}