import useFlyToCoordinates from "../hooks/useFlyToCoordinates";
import useCreatePopup from "../hooks/useCreatePopup";

const getMagnitudeTagClass = m => {
    return m <= 4 ? 'minor' : m <= 6 ? 'moderate' : 'major';
}

function TimelineItem({ feature }) {

    const {localDateTime, reference, magnitude} = feature.properties;
    const [date, time] = localDateTime.split(' ');

    const formattedTime = new Date(`${date} ${time}`).toLocaleString(
        'en-US',
        { hour: 'numeric', minute: 'numeric', hour12: true }
    );

    const formattedMagnitude = String(magnitude).length === 1 ? `${magnitude}.0` : magnitude;

    const flyToCoordinates = useFlyToCoordinates();
    const createPopup = useCreatePopup();

    const handleItemClick = () => {
        flyToCoordinates(feature);
        createPopup(feature);

        document.querySelectorAll('.timeline__item').forEach(item => {
            item.classList.remove('active');
        })

        const item = document.getElementById(feature.properties.id);

        item.classList.add('active');
    }

    return (
        <div className="timeline__item" id={feature.properties.id}>
            <div className="timeline__item-marker">
                <div className="timeline__item-marker-dot"></div>
                <div className="timeline__item-marker-border"></div>
            </div>
            <button className="timeline__content item" onClick={handleItemClick}>
                <span className="item__time">{formattedTime}</span>

                <div className="item__info">
                    <h2 className="item__heading">
                        {reference}
                    </h2>
                    <span className={`item__tag item__tag--${getMagnitudeTagClass(Number(magnitude))}`}>
                        <i className="uil uil-heart-rate"></i>
                        {`Magnitud de ${formattedMagnitude}`}
                    </span>
                    <i className="uil uil-angle-right item__arrow"></i>
                </div>
            </button>
        </div>
    )
}

export default TimelineItem;