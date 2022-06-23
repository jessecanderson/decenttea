import type { NextPage } from 'next'
import TeaSearch from '../components/tea_search';
import dynamic from 'next/dynamic';
import Layout from '../components/layout'
import styles from './main.module.css';
import { useState } from 'react';
import Address from "../global/types";

const MapWithNoSSR = dynamic(
    () => import('../components/map'),
    { ssr: false }
)



const Main: NextPage = () => {
    const [position, updatePosition] = useState({ lat: 30.4383, long: -84.2807 })

    const handleMapUpdates = (updateAddress: Address) => {
        if (updateAddress != null) {
            console.log(`Callback works with ${updateAddress.street}`);
            // updatePosition({ lat: 0, long: 0 });
        } else {
            console.log('Callback called with null');
        }

    }

    return (
        <Layout>
            <div className="p-8">
                <div className='flex justify-evenly p-8'>
                    <p>The best place to find that <i>Decent</i> tea.</p>
                </div>
                <div className='flex justify-evenly items-stretch columns-2'>
                    <div className='content-center px-8'>
                        <TeaSearch callback={handleMapUpdates} />
                    </div>
                    <div className={styles['leaflet-container']}>
                        <MapWithNoSSR lat={position.lat} long={position.long} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Main;