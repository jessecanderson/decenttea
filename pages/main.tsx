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
    var position = [30.4383, -84.2807];

    const handleMapUpdates = (updateAddress: Address) => {
        console.log(`Callback works with ${updateAddress.street}`)
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
                        <MapWithNoSSR />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Main;