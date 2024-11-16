import { useEffect, useRef, useState } from "react"

export const Sender = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [pc, setPC] = useState<RTCPeerConnection | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setSocket(socket);
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: 'sender'
            }));
        }
    }, []);

    const initiateConn = async () => {

        if (!socket) {
            alert("Socket not found");
            return;
        }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'createAnswer') {
                await pc.setRemoteDescription(message.sdp);
            } else if (message.type === 'iceCandidate') {
                pc.addIceCandidate(message.candidate);
            }
        }

        const pc = new RTCPeerConnection();
        setPC(pc);
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket?.send(JSON.stringify({
                    type: 'iceCandidate',
                    candidate: event.candidate
                }));
            }
        }

        pc.onnegotiationneeded = async () => {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket?.send(JSON.stringify({
                type: 'createOffer',
                sdp: pc.localDescription
            }));
        }

        getCameraStreamAndSend();
    }
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const getCameraStreamAndSend = () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current?.play();
            }

            stream.getTracks().forEach((track) => {
                pc?.addTrack(track);
            });
        });
    }


    return <div>
        Sender
        <button onClick={initiateConn}> Send data </button>
        <video width={400} ref={videoRef} height={400}></video>
    </div>
}