

const { useState, useEffect, useRef } = React;

export function MouseMonitorIndex() {

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isOn, setIsOn] = useState(true);
    const screen = useRef();

    useEffect(() => {
        addMouseListener()

        return () => removeListener()
    }, [isOn])

    function addMouseListener() {
        if (isOn) document.addEventListener('mousemove', updatePos)
    }

    function updatePos(ev) {
        setMousePos({ x: ev.clientX, y: ev.clientY })
    }

    function pauseMouse() {
        setIsOn(prevIsOn => !prevIsOn)
        if (isOn) screen.current.setAttribute('hidden', '')
        else screen.current.removeAttribute('hidden', '')
    }

    function removeListener() {
        document.removeEventListener('mousemove', updatePos)
    }



    return (
        <section className="mouse-monitor-container">
            <h1>Mouse Position</h1>
            <div ref={screen} className="mouse-pos">X:{mousePos.x}, Y:{mousePos.y} </div>
            <button onClick={() => pauseMouse()} className="Pause btn">Pause</button>
        </section>
    )
}
