import { useMap } from "../context/MapProvider"

function usePulsingDot() {

    const { map } = useMap();

    const size = 180;

    const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
            const canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            this.context = canvas.getContext('2d', { willReadFrequently: true });
        },

        render: function () {
            const duration = 1000;
            const t = (performance.now() % duration) / duration;

            const radius = (size / 2) * 0.3;
            const context = this.context;

            context.clearRect(0, 0, this.width, this.height);

            let outerRadius = (size / 2) * 0.7 * t + radius;

            for (let i = 0; i <= 3; i++) {
                
                context.beginPath();
                context.arc(
                    this.width / 2,
                    this.height / 2,
                    outerRadius,
                    0,
                    Math.PI * 2
                );

                context.fillStyle = `rgba(235, 122, 52, ${1 - t})`;
                context.fill();

                outerRadius *= .7;
            }

            this.data = context.getImageData(
                0,
                0,
                this.width,
                this.height
            ).data;

            map.triggerRepaint();

            return true;
        }
    };

    return pulsingDot;
}

export default usePulsingDot;