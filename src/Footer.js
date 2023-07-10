import imagenFooter from './assets/maxresdefault.jpg'

function Footer(){
    return(
        <div>
            <footer className='footer-eti'>
                <h1 className='footer-text'>Dont lose it!</h1>
                <img className="footer-img" src={imagenFooter}></img>
            </footer>
        </div>
    )
}


export default Footer