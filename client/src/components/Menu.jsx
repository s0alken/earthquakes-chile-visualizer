import TimelineItem from "./TimelineItem";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import Loader from "./Loader";
import ErrorBox from "./ErrorBox";
import es from 'date-fns/locale/es';
registerLocale('es', es);

function Menu({ data, selectedDate, setSelectedDate, selectedSource, setSelectedSource, isLoading, isActive, setIsActive }) {

    const handleRadioChange = event => {
        if (event.target.checked) {
            setSelectedSource(event.target.value);
        }
    }

    return (
        <div className="container">
            <div className="menu">

                <input className="menu__checkbox" type="checkbox" id="menu-checkbox" defaultChecked />

                <label className="menu__toggle" htmlFor="menu-checkbox">
                    <i className="uil uil-angle-down menu__toggle-icon"></i>
                </label>

                <div className="menu__container">
                    <div className="menu__content">
                        <header className="menu__header">
                            <div className="menu__header-text-box">
                                <h1 className="menu__heading">Actividad sísmica</h1>
                                <h2 className="menu__subheading">Información actualizada sobre sismos en Chile</h2>
                            </div>
                            <div className="date-picker">
                                <ReactDatePicker
                                    locale="es"
                                    selected={selectedDate}
                                    onChange={(date) => { setSelectedDate(date) }}
                                    dateFormat="dd-MM-yyyy"
                                    maxDate={new Date()}
                                    onFocus={e => e.target.readOnly = true}
                                    portalId="root"
                                />
                                <i className="uil uil-calendar-alt date-picker__icon"></i>
                            </div>
                        </header>

                        <div className="source-picker">
                            <div className="source-picker__container">
                                <input
                                    className="source-picker__radio"
                                    type="radio"
                                    name="source"
                                    id="csn"
                                    value="csn"
                                    checked={selectedSource === 'csn'}
                                    onChange={handleRadioChange}
                                />
                                <label className="source-picker__label" htmlFor="csn">Centro Sismológico Nacional</label>
                                <input
                                    className="source-picker__radio"
                                    type="radio"
                                    name="source"
                                    id="usgs"
                                    value="usgs"
                                    checked={selectedSource === 'usgs'}
                                    onChange={handleRadioChange}
                                />
                                <label className="source-picker__label" htmlFor="usgs">U.S. Geological Survey</label>
                                <div className="source-picker__slider"></div>
                            </div>
                        </div>

                        {isLoading ? <Loader /> : !data.features.length ? <ErrorBox>Ups! Nada encontrado...</ErrorBox> :
                            <div className="timeline">
                                {data.features.map((feature) => {
                                    return (
                                        <TimelineItem
                                            key={feature.properties.id}
                                            feature={feature}
                                            isActive={isActive}
                                            setIsActive={setIsActive}
                                        />
                                    )
                                })}
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu;