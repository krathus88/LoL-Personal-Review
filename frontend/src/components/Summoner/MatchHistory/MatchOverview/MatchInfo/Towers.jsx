function Towers({ towers }) {
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
                    d="M4 4L8 0L11.9992 4L10.9982 5.0012L11 5H14L8 11L2 5H5L4 4ZM6.4 3.99963L8 2.4L9.6 3.99963L8 5.6L6.4 3.99963ZM8 12L12 8L10 16H6L4 8L8 12Z"
                    fill="currentColor"></path>
                <mask
                    id="mask0_5762_288549"
                    maskUnits="userSpaceOnUse"
                    x="2"
                    y="0"
                    width="12"
                    height="16"
                    fill="currentColor">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 4L8 0L11.9992 4L10.9982 5.0012L11 5H14L8 11L2 5H5L4 4ZM6.4 3.99963L8 2.4L9.6 3.99963L8 5.6L6.4 3.99963ZM8 12L12 8L10 16H6L4 8L8 12Z"
                        fill="currentColor"></path>
                </mask>
                <g mask="url(#mask0_5762_288549)" fill="currentColor"></g>
            </svg>
            <small className="ps-1">{towers}</small>
        </>
    );
}

export default Towers;
