import { useEffect, useRef } from "react"


export const Receiver = () => {

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'receiver'
            }));
        }
        startReceiving(socket);
    }, []);

    function startReceiving(socket: WebSocket) {
       

        const pc = new RTCPeerConnection();
        pc.ontrack = (event) => {
         if (videoRef.current) {
             videoRef.current.srcObject = new MediaStream([event.track]);
             videoRef.current?.play();
         }
        }

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createOffer') {
                pc.setRemoteDescription(message.sdp).then(() => {
                    pc.createAnswer().then((answer) => {
                        pc.setLocalDescription(answer);
                        socket.send(JSON.stringify({
                            type: 'createAnswer',
                            sdp: answer
                        }));
                    });
                });
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        }
    }
    const videoRef = useRef<HTMLVideoElement | null>(null)

    return <div>
        <video width={400} height={400} ref={videoRef}></video>
    </div>
}