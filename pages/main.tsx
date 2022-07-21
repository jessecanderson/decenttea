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

    const results = false;

    return (
        <Layout>
            <div className="p-8">
                <div className='flex justify-evenly p-8'>
                    <p>The best place to find <i>Decent</i> tea.</p>
                </div>
                <div className='flex justify-evenly items-stretch columns-2'>
                    <div className='content-center px-8'>
                        {results ? <div>Result list is here.</div> : <TeaSearch />}
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