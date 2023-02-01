import { Oval } from 'react-loader-spinner';

function Loader() {
    return (
        <div className="loader">
            <Oval
                height={35}
                width={35}
                color="white"
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="rgb(143, 143, 143)"
                strokeWidth={3}
                strokeWidthSecondary={3}
            />
        </div>
    )
}

export default Loader;