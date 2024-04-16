import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectProgress, setProgress } from "../../app/Slices/ProgressSlice";
import "./ProgressBarLoading.css";

function ProgressBarLoading() {
    const dispatch = useDispatch();
    const progress = useSelector(selectProgress);

    useEffect(() => {
        if (progress === 100) {
            // If progress reaches 100%, reset it to 0 after animation finishes
            setTimeout(() => {
                dispatch(setProgress(0));
            }, 225); // Adjust delay time according to your animation duration
        }
    }, [progress]);

    const progressBarStyle = {
        width: `${progress}%`,
        transition:
            progress < 100
                ? progress > 0 && "width 10s cubic-bezier(.05, 1, .25, 1)"
                : progress > 0 && "width 0.2s ease-in",
    };

    return (
        <div className="progress-container">
            <div className="progress-bar" style={progressBarStyle}></div>
        </div>
    );
}

export default ProgressBarLoading;
