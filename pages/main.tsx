import type { NextPage } from 'next'
import TeaSearch from '../components/tea_search';
import dynamic from 'next/dynamic';
import Layout from '../components/layout'
import styles from './main.module.css';

const MapWithNoSSR = dynamic(
    () => import('../components/map'),
    { ssr: false }
)

const Main: NextPage = () => {
    return (
        <Layout>
            <div className="p-8">
                <div className='flex justify-evenly p-8'>
                    <p>The best place to find that <i>Decent</i> tea.</p>
                </div>
                <div className='flex justify-evenly items-stretch columns-2'>
                    <div className='content-center px-8'>
                        <TeaSearch />
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