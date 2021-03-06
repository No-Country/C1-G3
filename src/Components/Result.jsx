import { memo } from 'react'
import { Link } from 'react-router-dom'
import { HelperBuscador } from '../Helpers/HelperBuscador'

let datosActuales = localStorage.getItem('history')
datosActuales = datosActuales === null ? [] : JSON.parse(datosActuales)

let controller = true

const Result = ({lyric}) => {
    const {song, singer, youtubeLink, download, idLink} = HelperBuscador(lyric)

    const style = {
        width: '10rem',
        height: '10rem'
    }

    const background = document.querySelector('#body')

    if(download !== ""){
        background.style.backgroundColor = '#121212'
        background.style.backgroundImage = ""
    }

    return (
        <>
            {download === "" &&
            <div className="position-absolute top-50 start-50 translate-middle display-2">
                {song === "" ? <h3 className="display-3 fw-bold">Estamos buscando tu canción</h3> : <h3 className="display-3 fw-bold">Encontrada! Ultimando detalles</h3> }
                <div className="spinner-border text-info" style={style} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            }
            {download !== "" &&
                <article>
                    <div className="d-flex flex-wrap" id="bg2">
                        <section className="m-5 text-start d-flex justify-content-center flex-column text-white col">
                            <h2 className="display-4 fw-bold">¡CANCIÓN ENCONTRADA!</h2>
                            <br />
                            <p className="fs-2 fst-italic">Artista: {singer}</p>
                            <p className="fs-2 fst-italic">Canción: {song.title}</p>
                            <p className="fs-3 fst-italic"><a href={youtubeLink.items[0].url} target="noopener">Enlace a Youtube</a></p>
                            <p className="fs-3 fst-italic"><a href={download} target="noopener">Descarga la canción</a></p>
                        </section>
                        <section className="mt-5 col">
                            <div id="embed">
                                <iframe className="p-3" id="responsive-iframe" src={`https://www.youtube.com/embed/${idLink}`} title="Enlace de Youtube" />
                            </div>
                            
                        </section>
                    </div>
                    <div className="d-flex flex-wrap" id="bg3">
                        <section className="m-5 text-start flex-column text-dark d-flex justify-content-center col">
                            <h3 className="display-3 fw-bold">Recomendaciones de Zachary</h3>
                            <h3 className="fs-1 fst-italic">Basados en tu búsqueda...</h3>
                            <br />
                            <p className="fs-4 fw-bold">
                                {youtubeLink.refinements[0].url !== undefined && <a href={youtubeLink.refinements[0].url} className="text-decoration-none" target="noopener">{ youtubeLink.refinements[0].q }</a>} <br />
                                {youtubeLink.refinements[1].url !== undefined && <a href={youtubeLink.refinements[1].url} className="text-decoration-none" target="noopener">{ youtubeLink.refinements[1].q }</a>} <br />
                                {youtubeLink.refinements[2].url !== undefined && <a href={youtubeLink.refinements[2].url} className="text-decoration-none" target="noopener">{ youtubeLink.refinements[2].q }</a>} <br />
                                {youtubeLink.refinements[3].url !== undefined && <a href={youtubeLink.refinements[3].url} className="text-decoration-none" target="noopener">{ youtubeLink.refinements[3].q }</a>} <br />
                                {youtubeLink.refinements[4].url !== undefined && <a href={youtubeLink.refinements[4].url} className="text-decoration-none" target="noopener">{ youtubeLink.refinements[4].q }</a>}
                            </p>
                        </section>
                        <section className="text-center m-5 text-dark col">
                            <img className="img-fluid rounded-circle m-1" src={ song.images.background } alt="Artist" />
                        </section>
                    </div>
                    <div className="d-flex flex-wrap" id="bg2">
                        <section className="text-center m-5 text-dark col">
                            <img className="img-fluid rounded-circle m-1" src={ song.images.coverart } alt="Artist" />
                        </section>
                        <section className="m-5 text-start d-flex justify-content-center flex-column text-white col">
                            <h2 className="display-4 fw-bold fst-italic">¡Canción guardada en el historial!</h2>
                            <p className="fs-3 fst-italic">
                                Podrás encontrar en el historial de Zachary esta y las demás canciones
                                que hayas buscado. ¿Quieres darle un vistazo?
                            </p>
                            <Link to="/historial"><button className="btn btn-outline-secondary text-white mb-5" id="btn-1">¡ADELANTE!</button></Link>
                        </section>
                    </div>

                    {
                        datosActuales.push({'nombre': singer,
                        'cancion': song.title,
                        'link': youtubeLink.items[0].url,
                        'descarga': download})
                    }
                    {
                        controller && localStorage.setItem('history', JSON.stringify(datosActuales))
                        
                    }
                    {
                        controller = false
                    }
                </article>
            }
        </>
        )
    
}
export default memo(Result)
