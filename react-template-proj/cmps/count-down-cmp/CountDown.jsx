

const { useState, useEffect, useRef } = React;

export function CountDown({ startFrom, onDone, toTime }) {

    const roundedValue = Math.ceil((toTime - Date.now()) / 1000)

    const [countDown, setCountDown] = useState(() => toTime ? roundedValue : startFrom);
    const [countTo, setCountTo] = useState(() => toTime ? roundedValue : countDown);
    const [inDanger, setInDanger] = useState(false);

    const intervalIdRef = useRef()

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            setCountDown(prevCount => {
                setInDanger(prevCount <= 7)
                return prevCount - 1
            })
        }, 1000);

        return () => clearInterval(intervalIdRef.current)

    }, []);


    function getFormatTime(value) {
        if (value <= 0) {
            stopCount()
            return '00:00:00'
        }
        const hours = Math.floor(value / 3600);
        const minutes = Math.floor((value % 3600) / 60);
        const seconds = value % 60;
        const res = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return res
    }

    function stopCount() {
        onDone()
        return clearInterval(intervalIdRef.current)
    }

    const isInDanger = inDanger ? 'danger' : ''
    return (
        <section className={`count-down-container`}>
            <div>Count Dowm To {countTo}</div>
            <div className={`count-num  ${isInDanger}`}>{getFormatTime(countDown)}</div>
        </section>
    )
}
