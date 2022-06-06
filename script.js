var movies = [];
const form = document.querySelector('.form-container');


window.onload = function() {
    movies = JSON.parse(localStorage.getItem('movies'));

    // as soon as the page is loaded 
    displayMoviesList();
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const newMovie = {
        movie: e.target.elements.movie.value,
        year: e.target.elements.year.value
    };

    movies.push(newMovie);

    localStorage.setItem('movies', JSON.stringify(movies));

    e.target.reset();

    displayMoviesList();
});

function displayMoviesList(){
    const ul = document.querySelector('.movie-list');

    ul.innerHTML = '';

    movies.forEach(movieItem=>{
        const li = document.createElement('li');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('movie-info');

        const update = document.createElement('button');
        update.classList.add('update');

        const del = document.createElement('button');
        del.classList.add('delete');

        infoDiv.innerHTML = `
            <input type="text" class="movie" value="${movieItem.movie}" readonly>                
            <input type="number" class="year" value="${movieItem.year}" max="2022" min="1950" readonly>`;

        update.innerHTML = 'EDIT';
        del.innerHTML = 'DELETE';

        li.append(infoDiv);
        li.append(update);
        li.append(del);

        ul.append(li);

        update.addEventListener('click', e=>{
            // console.log('update clicked');
            const content = infoDiv.querySelectorAll('input').forEach(inputElement=>{
                if(update.innerHTML == 'EDIT') {
                    update.innerHTML = 'UPDATE';
                    inputElement.removeAttribute('readonly');
                    inputElement.focus();
                    movieItem.movie = inputElement.value;
                    localStorage.setItem('movies', JSON.stringify(movies));
                    displayMoviesList();
                } else {
                    inputElement.setAttribute('readonly', true);
                    update.innerHTML = 'EDIT';
                }
            });
        });

        del.addEventListener('click', ()=>{
            movies = movies.filter(movie => movie != movieItem);
            localStorage.setItem('movies', JSON.stringify(movies));
            displayMoviesList();
        });
    })
}