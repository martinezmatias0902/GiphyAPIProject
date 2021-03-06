document.addEventListener("DOMContentLoaded", async() => {

    const apikey = 'QHWaY2sOQWWdbhyONNL87TJ5wWtPx5EA';

    function manipularDom(divFather, gif) {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let title = document.createElement("figcaption");
        divFather.appendChild(figure)
        figure.appendChild(img);
        figure.appendChild(title);
        img.setAttribute("src", gif.images.fixed_height_downsampled.url);
        img.src = gif.images.fixed_height.url;
        title.setAttribute('class', 'searchTitle')
        title.innerHTML = '#' + gif.title;
    }

    // Tendencias
    async function searchTrends() {
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=20&rating=G`;
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        return datos
    }
    const trends = searchTrends();
    trends.then(function(resp) {
            console.log(resp.data)
            console.log(resp.data[0].images)
            resp.data.forEach(gif => {
                let divFather = document.querySelector(".tendencias")
                manipularDom(divFather, gif)
            })
        })
        // Numero RANDOM de visitas
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandomNum() {
        let aleatorio = Math.round(Math.random() * 999)
        return aleatorio
    }
    let visitas = document.querySelector("#numero")
    visitas.innerHTML = getRandomInt(1, 13) + "," + getRandomNum() + "," + getRandomNum()
        // Cambio de Tema
    function cambiarTema(sheet) {
        document.getElementById('pagestyle').setAttribute('href', sheet);
    }


    document.getElementById("botonSailor").addEventListener('click', () => {
        cambiarTema('css/styles.css');
        document.getElementById("miLogo").setAttribute('src', 'assets/gifOF_logo.png');
        document.getElementById('lupa').setAttribute('src', 'assets/CombinedShape.svg');
    });


    document.getElementById("boton5").addEventListener('click', () => {
        cambiarTema('css/stylesTwo.css');
        document.getElementById("miLogo").setAttribute('src', 'assets/gifOF_logo_dark.png');
    });
    // Busqueda USUARIO
    document.getElementById("buscador").onclick = (e) => {
            document.getElementById('lupa').setAttribute('src', 'assets/lupa_light.svg')
            let valorBusqueda = document.querySelector("#queBuscar").value;
            let busquedaUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${valorBusqueda}&limit=20&offset=0&rating=G&lang=en`;
            fetch(busquedaUrl)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    document.querySelector(".tendencias").innerHTML = '';
                    document.querySelector(".resultados").innerHTML = valorBusqueda;
                    console.log(data)
                    data.data.forEach(gif => {
                        let divFather = document.querySelector(".tendencias")
                        manipularDom(divFather, gif)
                        document.querySelector('.resultados').scrollIntoView();
                    });
                })
                .catch(err => {
                    console.log(err)
                });
        }
        // Sugerencias en barra de busqueda
    const sugeridoUno = document.querySelector('#sugeridoUno')
    const sugeridoDos = document.querySelector('#sugeridoDos')
    const sugeridoTres = document.querySelector('#sugeridoTres')
    sugeridoUno.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&q=deadpool`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector(".tendencias").innerHTML = '';
                document.querySelector(".resultados").innerHTML = "Dead Pool";
                data.data.forEach(gif => {
                    let divFather = document.querySelector(".tendencias")
                    manipularDom(divFather, gif);
                    document.querySelector('.resultados').scrollIntoView();
                });
            })
            .catch(err => {
                console.error(err);
            });
    })
    sugeridoDos.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&q=marvel`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector(".tendencias").innerHTML = '';
                document.querySelector(".resultados").innerHTML = "Marvel";
                data.data.forEach(gif => {
                    let divFather = document.querySelector(".tendencias")
                    manipularDom(divFather, gif);
                    document.querySelector('.resultados').scrollIntoView();
                });
            })
            .catch(err => {
                console.error(err);
            });
    })
    sugeridoTres.addEventListener('click', () => {
            url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&q=vikings`
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.querySelector(".tendencias").innerHTML = '';
                    document.querySelector(".resultados").innerHTML = "Vikingos";
                    data.data.forEach(gif => {
                        let divFather = document.querySelector(".tendencias")
                        manipularDom(divFather, gif);
                        document.querySelector('.resultados').scrollIntoView();
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        })
        //Primeros 4 resultados hardcodeados
    function gifRecomendado(recomendacion, espacioDiv) {
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=` + recomendacion + `&limit=1&offset=0&rating=G&lang=en`)
            .then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data);
                document.getElementById(espacioDiv).src = 'https://i.giphy.com/media/' + data.data[0].id + '/giphy.webp'
            })
    }
    gifRecomendado('Jonathan-Van-Ness', 'gifUno');
    gifRecomendado('Sailor-Mercury', 'gifDos');
    gifRecomendado('Fab-Five', 'gifTres');
    gifRecomendado('Unicorns-and-Rainbows', 'gifCuatro');


    // Usuario utuliza botón "VER MÁS"
    const verMas1 = document.querySelector('#sugerencia1');
    const verMas2 = document.querySelector('#sugerencia2');
    const verMas3 = document.querySelector('#sugerencia3');
    const verMas4 = document.querySelector('#sugerencia4');
    verMas1.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&q=jonathan_van_ness`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector(".tendencias").innerHTML = '';
                document.querySelector(".resultados").innerHTML = "Jonathan Van Ness";
                data.data.forEach(gif => {
                    let divFather = document.querySelector(".tendencias")
                    manipularDom(divFather, gif)
                    document.querySelector('.resultados').scrollIntoView();
                });
            })
            .catch(err => {
                console.error(err);
            });
    });
    verMas2.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&q=sailor_mercury`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector(".tendencias").innerHTML = '';
                document.querySelector(".resultados").innerHTML = "Sailor Mercury";
                data.data.forEach(gif => {
                    let divFather = document.querySelector(".tendencias")
                    manipularDom(divFather, gif)
                    document.querySelector('.resultados').scrollIntoView();
                });
            })
            .catch(err => {
                console.error(err);
            });
    });
    verMas3.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&q=fab_five`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector(".tendencias").innerHTML = '';
                document.querySelector(".resultados").innerHTML = "Fab Five";
                data.data.forEach(gif => {
                    let divFather = document.querySelector(".tendencias")
                    manipularDom(divFather, gif)
                    document.querySelector('.resultados').scrollIntoView();
                });
            })
            .catch(err => {
                console.error(err);
            });
    });
    verMas4.addEventListener('click', () => {
        url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=12&q=unicorns_rainbows`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                document.querySelector(".tendencias").innerHTML = '';
                document.querySelector(".resultados").innerHTML = "Unicorns & Rainbows";
                data.data.forEach(gif => {
                    let divFather = document.querySelector(".tendencias")
                    manipularDom(divFather, gif)
                    document.querySelector('.resultados').scrollIntoView();
                });
            })
            .catch(err => {
                console.error(err);
            });
    })

});