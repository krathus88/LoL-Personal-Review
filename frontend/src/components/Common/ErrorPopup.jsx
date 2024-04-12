function ErrorPopup(props) {
    return (
        <div className="error-popup-container text-center">
            <div className="error-popup container d-flex flex-row align-items-center rounded-2 pe-0 mt-1">
                <p>{props.message}</p>
                <button
                    className="ms-2 d-flex justify-content-center"
                    onClick={props.onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        fill="currentColor"
                        className="bi bi-x user-select-none"
                        viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default ErrorPopup;
