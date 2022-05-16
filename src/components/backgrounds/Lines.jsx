import React from 'react';
import './Lines.scss';

const CIRCLE_SIZE = 5;
const DRAW_CIRCLES = true;
const SQUARE_SIZE = 2;
const USE_SQUARES = true;

const bgProperties = {
    maxScale: 400,
    minScale: 100,
    scale: 0,
    scaleAsc: false,
    paddingX: 25,
    paddingY: 100,
    invertEffect: true,
    trackedPosition: [0, 0],
    dots: []
};

const drawCircle = (ctx, x, y) => {
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;
    if (USE_SQUARES) {
        ctx.fillRect(SQUARE_SIZE / 2, SQUARE_SIZE / 2, SQUARE_SIZE, SQUARE_SIZE);
    } else {
        ctx.beginPath();
        ctx.arc(x, y, CIRCLE_SIZE, 0, 2 * Math.PI, false);
        ctx.fill();
    }
};

const setScale = (canvasElement) => {
    bgProperties.maxScale = Math.max(canvasElement.clientWidth / 1920 * 400, 175);
    bgProperties.minScale = bgProperties.maxScale / 2;
    bgProperties.scale = bgProperties.maxScale;
    bgProperties.scaleAsc = false;
    bgProperties.paddingX = Math.min(Math.max(canvasElement.clientWidth / 10, 25), 100);
};

const generateDots = (canvasElement) => {
    const canvasWidth = canvasElement.clientWidth - 2 * bgProperties.paddingX;
    const canvasHeight = canvasElement.clientHeight - 1.5 * bgProperties.paddingY;
    const xCount = Math.trunc(canvasWidth / 50);
    const yCount = Math.trunc(canvasHeight / 50);

    return new Array(xCount).fill(undefined).map((_, i) =>
        new Array(yCount).fill(undefined).map((_, j) => ({
            x: bgProperties.paddingX + (canvasWidth / (xCount - 1)) * i,
            y: bgProperties.paddingY + (canvasHeight / (yCount - 1)) * j,
        })));
};

const setupAnimation = (canvasElement) => {
    setScale(canvasElement);
    bgProperties.trackedPosition = [canvasElement.clientWidth / 2, canvasElement.clientHeight / 2];
    bgProperties.dots = generateDots(canvasElement);

    const onClick = () =>
        bgProperties.invertEffect = !bgProperties.invertEffect;

    const onResize = () => {
        canvasElement.width = canvasElement.clientWidth;
        canvasElement.height = canvasElement.clientHeight;
        bgProperties.dots = generateDots(canvasElement);
        bgProperties.trackedPosition = [canvasElement.clientWidth / 2, canvasElement.clientHeight / 2];
        setScale(canvasElement);
    };

    const onMouseMove = (event) => {
        const {clientX, clientY} = (event.clientX !== undefined ? event : event.touches[0] || {}); // Support mobile
        const boundingRect = canvasElement.getBoundingClientRect();
        bgProperties.trackedPosition = [clientX - boundingRect.left, clientY - boundingRect.top]; // Correct scroll
    };

    const onMouseLeave = () =>
        bgProperties.trackedPosition = [canvasElement.clientWidth / 2, canvasElement.clientHeight / 2];
    ;

    const tick = () => {
        const ctx = canvasElement.getContext('2d');
        ctx.fillStyle = ctx.strokeStyle = '#f7d21788';
        bgProperties.scale = bgProperties.scale + 0.25 * (bgProperties.scaleAsc ? 1 : -1);
        if (bgProperties.scale <= bgProperties.minScale || bgProperties.scale >= bgProperties.maxScale) {
            bgProperties.scaleAsc = !bgProperties.scaleAsc;
        }

        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        const mappedDots = bgProperties.dots.map((arr, x) =>
            arr.map((dot, y) => {
                let newDot = {...dot};
                const dx = bgProperties.trackedPosition[0] - dot.x;
                const dy = bgProperties.trackedPosition[1] - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < bgProperties.scale) {
                    if (bgProperties.invertEffect) {
                        newDot.x = dot.x - dx * (1 - distance / bgProperties.scale);
                        newDot.y = dot.y - dy * (1 - distance / bgProperties.scale);
                    } else {
                        newDot.x = dot.x + dx * (1 - distance / bgProperties.scale);
                        newDot.y = dot.y + dy * (1 - distance / bgProperties.scale);
                    }
                }
                return newDot;
            }),
        );

        bgProperties.dots.forEach((arr, x) =>
            arr.forEach((dot, y) => {
                let mDot = mappedDots[x][y];
                let leftDot = mappedDots[x - 1]?.[y];
                let topDot = mappedDots[x]?.[y - 1];

                [leftDot, topDot]
                    .filter(Boolean)
                    .forEach((p) => {
                        const dx = bgProperties.trackedPosition[0] - p.x;
                        const dy = bgProperties.trackedPosition[1] - p.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        let invDistance = bgProperties.scale / (distance > 0 ? distance : 0.01) / 2;

                        let opacity = new Number(Math.min(parseInt(invDistance * 255), 255), 0).toString(16);
                        if (opacity.length === 1) {
                            opacity = '0' + opacity;
                        }
                        ctx.strokeStyle = '#f7d217' + opacity;

                        ctx.beginPath();
                        ctx.moveTo(mDot.x, mDot.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                    });

                DRAW_CIRCLES && drawCircle(ctx, mDot.x, mDot.y);
            }),
        );

        requestAnimationFrame(tick);
    };


    canvasElement.addEventListener('mousemove', onMouseMove);
    canvasElement.addEventListener('touchmove', onMouseMove);
    canvasElement.addEventListener('mouseleave', onMouseLeave);
    canvasElement.addEventListener('click', onClick);
    window.addEventListener('resize', onResize);
    requestAnimationFrame(tick);

    return () => {
        canvasElement.removeEventListener('mousemove', onMouseMove);
        canvasElement.addEventListener('touchmove', onMouseMove);
        canvasElement.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('resize', onResize);
        canvasElement.removeEventListener('click', onClick);
        cancelAnimationFrame(tick);
    };
};

const Lines = (props) => {
    const canvasEl = React.useRef(undefined);

    React.useEffect(() => {
        if (canvasEl.current) {
            canvasEl.current.width = canvasEl.current.clientWidth;
            canvasEl.current.height = canvasEl.current.clientHeight;

            const cleanup = setupAnimation(canvasEl.current);
            return cleanup;
        }
    }, [canvasEl.current]);


    return <canvas className="bg-lines" ref={canvasEl}/>;
};

export default Lines;
