import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NotFound.css';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
function NotFound() {
    return (
        <div className="container notFound">
            <h1 className="text-center notFoundText">It's just not here!!!</h1>
            <img src='assets/images/404.png' className='notFoundImage' alt='404 not found' />
            <button className='btn btn-primary notFoundRedirectButton' onClick={() => window.location.href = '/'}>
                <strong><small>Head To Home</small></strong>
                <FontAwesomeIcon icon={faHouse} className="ms-2" />
            </button>
        </div>
    );
};

export default NotFound;