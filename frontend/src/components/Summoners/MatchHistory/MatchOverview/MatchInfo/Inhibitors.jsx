function Inhibitors({ inhibitors }) {
    return (
        <>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="rgb(83, 131, 232)"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                    fill="currentColor"></path>
                <rect
                    x="8"
                    y="4"
                    width="5.65694"
                    height="5.65694"
                    transform="rotate(45 8 4)"
                    fill="currentColor"></rect>
            </svg>
            <small className="ps-1">{inhibitors}</small>
        </>
    );
}

export default Inhibitors;
