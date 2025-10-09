import { useState, useRef, useCallback, useEffect } from "react";

const FILL_DURATION = 600;
const REVERT_DURATION = 200;

export const useTileProgressAnimation = ({ onAnimationComplete, todayValue }) => {
    const [isPressed, setIsPressed] = useState(false);

    // Hold animation state
    const [isHolding, setIsHolding] = useState(false);
    const [fillProgress, setFillProgress] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const animationRef = useRef(null);
    const startTimeRef = useRef(null);

    const handleClick = useCallback(() => {
        setIsPressed(true);

        setTimeout(() => {
            onAnimationComplete();
            setIsPressed(false);
            setFillProgress(0); // Reset fillProgress at the same time as todayValue
            setIsTransitioning(false); // Clear transitioning flag
        }, 200);
    }, [onAnimationComplete]);


    // Animation functions
    const animateFill = useCallback((timestamp) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / FILL_DURATION, 1);

        console.log('animateFill:', { elapsed, progress });
        setFillProgress(progress);

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateFill);
        } else if (progress >= 1) {
            // Animation completed - trigger the click action
            console.log('Animation completed, triggering click');
            setIsHolding(false);
            // Keep fillProgress at 1 for forward animation since we're going to filled state
            handleClick();
        }
    }, [handleClick]);

    const animateReverseFill = useCallback((timestamp) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / FILL_DURATION, 1);

        // For reverse fill, we go from 1 to 0
        setFillProgress(1 - progress);

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateReverseFill);
        } else if (progress >= 1) {
            // Animation completed - trigger the click action
            setIsHolding(false);
            setIsTransitioning(true); // Mark as transitioning to prevent flicker
            handleClick();
            // Don't reset fillProgress immediately - let handleClick manage the timing
        }
    }, [handleClick]);

    const animateRevert = useCallback((timestamp) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / REVERT_DURATION, 1);
        const isReversing = todayValue !== "-1";

        if (isReversing) {
            // Reverting from empty back to full
            const currentProgress = fillProgress + (1 - fillProgress) * progress;
            setFillProgress(currentProgress);
        } else {
            // Reverting from full back to empty
            const currentProgress = fillProgress * (1 - progress);
            setFillProgress(currentProgress);
        }

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animateRevert);
        } else {
            setFillProgress(isReversing ? 1 : 0);
        }
    }, [fillProgress, todayValue]);

    const handlePointerDown = useCallback((e) => {
        e.preventDefault();
        console.log('Pointer down triggered');

        const isCurrentlyFilled = todayValue !== "-1";

        if (isCurrentlyFilled) {
            // For filled tiles, start with full progress and animate to empty
            setFillProgress(1);
        } else {
            // For empty tiles, start from 0 and animate to full
            setFillProgress(0);
        }

        setIsHolding(true);
        startTimeRef.current = null;
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        if (isCurrentlyFilled) {
            animationRef.current = requestAnimationFrame(animateReverseFill);
        } else {
            animationRef.current = requestAnimationFrame(animateFill);
        }
    }, [animateFill, animateReverseFill, todayValue]);

    const handlePointerUp = useCallback(() => {
        console.log('Pointer up triggered');

        setIsHolding(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        // Use a timeout to get the current fillProgress value after state updates
        setTimeout(() => {
            setFillProgress(currentProgress => {
                const isCurrentlyFilled = todayValue !== "-1";
                const shouldRevert = (isCurrentlyFilled && currentProgress > 0) || (!isCurrentlyFilled && currentProgress < 1);

                console.log('Checking revert:', { currentProgress, isCurrentlyFilled, shouldRevert });

                if (shouldRevert) {
                    startTimeRef.current = null;
                    animationRef.current = requestAnimationFrame(animateRevert);
                }

                return currentProgress; // Don't change the progress here
            });
        }, 0);
    }, [animateRevert, todayValue]);

    const handlePointerLeave = useCallback(() => {
        handlePointerUp();
    }, [handlePointerUp]);

    // Cleanup animation on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);


    return {
        isPressed,
        handleClick,
        isHolding,
        isTransitioning,
        fillProgress,
        eventHandlers: {
            onPointerDown: handlePointerDown,
            onPointerUp: handlePointerUp,
            onPointerLeave: handlePointerLeave,
            onMouseDown: handlePointerDown,
            onMouseUp: handlePointerUp,
            onMouseLeave: handlePointerLeave,
            onTouchStart: handlePointerDown,
            onTouchEnd: handlePointerUp,
        }
    }
}