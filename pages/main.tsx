import type { NextPage } from 'next'
import TeaSearch from '../components/tea_search';
import dynamic from 'next/dynamic';
import Layout from '../components/layout';

const MapWithNoSSR = dynamic(
    () => import('../components/map'),
    { ssr: false }
)

const Main: NextPage = () => {
    return (
        <Layout>
            <div className="container py-8">
                <div className='flex justify-around p-8'>
                    <p>The best place to find that <i>Decent</i> tea.</p>
                </div>
                <div className='flex justify-evenly columns-2'>
                    <TeaSearch />
                    <div className='h-full'>
                        <div id="map">
                            <MapWithNoSSR />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Main;