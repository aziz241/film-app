

// dom elements


let filmimg = document.getElementById('filmimg');
let filmbaslik = document.getElementById('filmbaslik');
let filmtitle = document.getElementById('filmtitle');
let puan = document.getElementById('puan');
let popular = document.getElementById('popular');
const content = document.getElementById('content');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const sira = document.getElementById('sira');
const sayfasayisi = document.getElementById('sayfa');
let sirasayisi = 1;
let filmsirasi = 0;
let sayfa = 1;
const apikey = 'YOUR APİ KEY';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apikey}`
    }
};

function baglanti() {
    fetch(`https://api.themoviedb.org/3/discover/movie?page=${sayfa}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            filmgoster(response);
        })
        .catch(err => console.error(err));
}


function filmgoster(filmbilgi) {

    filmbaslik.innerHTML = filmbilgi.results[filmsirasi].original_title;
    filmtitle.innerHTML = filmbilgi.results[filmsirasi].overview;
    puan.innerHTML = "Puan: " + filmbilgi.results[filmsirasi].vote_average;
    popular.innerHTML = "Popülarite: " + filmbilgi.results[filmsirasi].popularity;
    filmimg.src = "https://www.themoviedb.org/t/p/w220_and_h330_face/" + filmbilgi.results[filmsirasi].poster_path;
    sira.innerHTML = `Sıra: ${sirasayisi}/${filmbilgi.results.length}`;
    sayfasayisi.innerHTML = `Sayfa: ${filmbilgi.page}`

}



next.addEventListener('click', function () {


    if (filmsirasi >= 19) {
        sayfa += 1;
        filmsirasi = 0;
        sirasayisi = 1;
        baglanti();
    } else if (filmsirasi < 20) {
        filmsirasi += 1;
        sirasayisi += 1;
        baglanti();
    }
    console.log(filmsirasi);


})

prev.addEventListener('click', function () {
    if (filmsirasi > 0 && filmsirasi < 20) {
        filmsirasi -= 1;
        sirasayisi -= 1;
    }
    else if (sirasayisi <= 1 && sayfa >= 2) {
        sayfa -= 1;
        filmsirasi = 19;
        sirasayisi = 20;
        baglanti();
    }


    baglanti();




})


baglanti();

