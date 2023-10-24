import { useRef, useEffect, useMemo } from "react";
import { useNavigationStore, useSoundStore } from "../../States";
import { instruments, analyser } from "../../globals/sound";
import "./signalscope.scss";
import useAudio from "../audio-controls/useAudio";

function SignalScope() {

    const canvasRef = useRef(null);
    const bufferLen = analyser.frequencyBinCount;
    const dataArray = useMemo(() => new Uint8Array(bufferLen), []);
    useAudio()

    // draw method for canvas
    const draw = (ctx) => {
        analyser.getByteTimeDomainData(dataArray);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = "#7FD0D1";
        ctx.lineWidth = 2;
        ctx.beginPath();

        const sliceWidth = ctx.canvas.width / bufferLen;
        let x = 0;
        for (let i = 0; i < bufferLen; i++) {
            const v = (8 * dataArray[i]) / 128.0 - 7.0;
            const y = (v * ctx.canvas.height) / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(ctx.canvas.width, ctx.canvas.height / 2);
        ctx.stroke();
    };

    // useEffect for animation loop in canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        context.canvas.width = window.innerWidth / 3;
        context.canvas.height = window.innerWidth / 32;
        let animationFrameId;

        const render = () => {
            draw(context);
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [draw]);

    const handleResize = (context) => {
        context.canvas.width = window.innerWidth / 3;
        context.canvas.height = window.innerWidth / 32;
    };

    // resize canvas event listener
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        window.addEventListener("resize", () => handleResize(context));

        return () => {
            window.removeEventListener("resize", () => handleResize(context));
        };
    }, []);

    return (
        <canvas className="signalscope" ref={canvasRef}></canvas>
    );
}

export default SignalScope;
