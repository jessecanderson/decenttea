import type { NextPage } from 'next'
import TeaSearch from '../components/tea_search';

const Main: NextPage = () => {
    return (
        <div className="container py-8">
            <div className='flex justify-around columns-2'>
                <p>The best place to find that <i>Decent</i> tea.</p>
                <TeaSearch />
            </div>
        </div>
    )
}

export default Main;