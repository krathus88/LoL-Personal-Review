function Baron({ baron }) {
    return (
        <>
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4L10 0L16 4L14 8L11 16L10 15H6L5 16L2 8L0 4L6 0L4 4L5 5H7L8 4L9 5H11L12 4ZM7 8C7 7.44695 7.4481 7 8 7C8.55284 7 9 7.44695 9 8C9 8.55211 8.55284 9 8 9C7.4481 9 7 8.55211 7 8ZM9 10C9 9.4481 9.44716 9 10 9C10.5528 9 11 9.4481 11 10C11 10.5519 10.5528 11 10 11C9.44716 11 9 10.5519 9 10ZM8 11C7.4481 11 7 11.4479 7 12C7 12.5531 7.4481 13 8 13C8.55284 13 9 12.5531 9 12C9 11.4479 8.55284 11 8 11ZM5 10C5 9.4481 5.44789 9 6 9C6.55211 9 7 9.4481 7 10C7 10.5519 6.55211 11 6 11C5.44789 11 5 10.5519 5 10Z"
                    fill="currentColor"></path>
                <mask
                    id="mask0_5762_288543"
                    style={{ maskType: "luminance" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    fill="currentColor">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 4L10 0L16 4L14 8L11 16L10 15H6L5 16L2 8L0 4L6 0L4 4L5 5H7L8 4L9 5H11L12 4ZM7 8C7 7.44695 7.4481 7 8 7C8.55284 7 9 7.44695 9 8C9 8.55211 8.55284 9 8 9C7.4481 9 7 8.55211 7 8ZM9 10C9 9.4481 9.44716 9 10 9C10.5528 9 11 9.4481 11 10C11 10.5519 10.5528 11 10 11C9.44716 11 9 10.5519 9 10ZM8 11C7.4481 11 7 11.4479 7 12C7 12.5531 7.4481 13 8 13C8.55284 13 9 12.5531 9 12C9 11.4479 8.55284 11 8 11ZM5 10C5 9.4481 5.44789 9 6 9C6.55211 9 7 9.4481 7 10C7 10.5519 6.55211 11 6 11C5.44789 11 5 10.5519 5 10Z"
                        fill="currentColor"></path>
                </mask>
                <g mask="url(#mask0_5762_288543)" fill="currentColor"></g>
            </svg>
            <small className="ps-1">{baron}</small>
        </>
    );
}

export default Baron;
