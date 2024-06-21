import BlobOne from "../../components/Blobs/BlobOne.tsx";
import {TypeAnimation} from "react-type-animation";

const HomeView = () => {

    return <div className="px-16 py-16 flex items-center justify-center">

        <div className="max-w-screen-lg flex w-full relative">

            <BlobOne className="absolute w-full h-96 fill-primary-200 -z-10"/>

            <div className="self-center inline-flex flex-col items-center gap-24">


                <h1 className="text-6xl font-bold">
                    We are <TypeAnimation
                    sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Open Diffusion AI',
                        1000
                    ]}
                    className="text-9xl"
                    wrapper="span"
                    speed={50}
                    style={{ display: 'block' }}
                    // repeat={Infinity}
                />
                </h1>

                <h2 className="text-3xl font-bold text-primary">

                    <TypeAnimation
                        sequence={[
                            '',
                            1000,
                            'Our mission is making generative AI better for everyone',
                            1000
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ display: 'block' }}
                        // repeat={Infinity}
                    />
                </h2>
            </div>


        </div>
    </div>
}

export default HomeView