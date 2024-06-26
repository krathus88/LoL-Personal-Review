import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProgress, setProgress } from "../../app/Slices/ProgressSlice";
import "./ProgressBarLoading.css";

export function ProgressBarLoading() {
    const dispatch = useDispatch();
    const progress = useSelector(selectProgress);

    useEffect(() => {
        if (progress === 100) {
            // If progress reaches 100%, reset it to 0 after animation finishes
            setTimeout(() => {
                dispatch(setProgress(0));
            }, 200); // Adjust delay time according to your animation duration
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progress]);

    const progressBarStyle: React.CSSProperties = {
        width: `${progress}%`,
        transition:
            progress < 100
                ? progress > 0
                    ? "width 10s cubic-bezier(.05, 1, .25, 1)"
                    : ""
                : progress > 0
                ? "width 0.2s ease-in"
                : "",
    };

    return (
        <div className="progress-container">
            <div className="progress-bar" style={progressBarStyle}></div>
        </div>
    );
}
